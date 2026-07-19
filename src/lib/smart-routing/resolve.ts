import { SERVICE_CATALOG, type ServiceEntry } from './catalog';

/**
 * Smart Routing — Resolver (MVP / Layer 1: deterministic alias matcher)
 *
 * Pure, synchronous, dependency-free → runs instantly on the client and works
 * offline (PWA-ready). This is the "workhorse" layer that handles the majority
 * of head queries at zero cost. The embedding + LLM tiers (see
 * docs/SMART_ROUTING_ARCHITECTURE.md) slot in later as fallbacks for the tail;
 * this module's public API (`classify`) is designed not to change when they do.
 */

export interface IntentMatch {
  service: ServiceEntry;
  score: number; // 0..1
}

export type ClassifyStatus = 'confident' | 'ambiguous' | 'none';

export interface Classification {
  status: ClassifyStatus;
  matches: IntentMatch[]; // ranked, best first (already limited)
  query: string;
}

const CONFIDENT_SCORE = 0.75; // top match must clear this to auto-route on Enter
const CONFIDENT_MARGIN = 0.15; // ...and beat the runner-up by this much
const MIN_SCORE = 0.35; // below this we don't surface a match at all

/** lowercase, strip punctuation, collapse whitespace. Keeps Devanagari + latin + digits. */
export function normalize(input: string): string {
  return input
    .toLowerCase()
    .replace(/[.,!?;:()"'/\\_\-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokenize(input: string): string[] {
  return normalize(input).split(' ').filter(Boolean);
}

/** Best match score of one service against the query. */
function scoreService(qNorm: string, qTokens: string[], service: ServiceEntry): number {
  let best = 0;
  const haystacks = [service.titleMr, service.titleEn, ...service.aliases];

  for (const raw of haystacks) {
    const h = normalize(raw);
    if (!h) continue;

    // 1. Exact phrase match
    if (h === qNorm) return 1;

    // 2. Whole-phrase containment (alias inside query, or query inside alias).
    //    Scaled by how much of the longer string is covered → longer, more
    //    specific aliases score higher than incidental short ones.
    if (qNorm.includes(h) || h.includes(qNorm)) {
      const ratio = Math.min(h.length, qNorm.length) / Math.max(h.length, qNorm.length);
      best = Math.max(best, 0.7 + 0.25 * ratio); // 0.70 .. 0.95
      continue;
    }

    // 3. Token overlap (shared words)
    const hTokens = h.split(' ').filter(Boolean);
    const shared = qTokens.filter((t) => hTokens.includes(t));
    if (shared.length > 0) {
      const overlap = shared.length / Math.max(qTokens.length, hTokens.length);
      best = Math.max(best, 0.45 + 0.4 * overlap); // 0.45 .. 0.85
      continue;
    }

    // 4. Prefix overlap — tolerates minor typos / partial words.
    //    Both tokens must be >= 3 chars, else short stopwords like the "a" in
    //    "File a Complaint" would match any query starting with that letter.
    for (const qt of qTokens) {
      if (qt.length < 3) continue;
      for (const ht of hTokens) {
        if (ht.length < 3) continue;
        if (ht.startsWith(qt) || qt.startsWith(ht)) {
          best = Math.max(best, 0.4);
        }
      }
    }
  }

  return best;
}

/** Ranked matches above MIN_SCORE, best first. */
export function resolveIntent(query: string): IntentMatch[] {
  const qNorm = normalize(query);
  if (!qNorm) return [];
  const qTokens = tokenize(query);

  return SERVICE_CATALOG.map((service) => ({
    service,
    score: scoreService(qNorm, qTokens, service),
  }))
    .filter((m) => m.score >= MIN_SCORE)
    .sort((a, b) => b.score - a.score);
}

/**
 * Classify a query into a routing decision.
 * - `confident`: one clear winner → safe to auto-route on Enter.
 * - `ambiguous`: several plausible → show top options (the "multi-option" case).
 * - `none`: nothing matched → caller shows a graceful fallback.
 */
export function classify(query: string, limit = 3): Classification {
  const all = resolveIntent(query);
  const matches = all.slice(0, limit);

  if (matches.length === 0) {
    return { status: 'none', matches, query };
  }

  const top = matches[0];
  const runnerUp = matches[1];
  const isConfident =
    top.score >= CONFIDENT_SCORE && (!runnerUp || top.score - runnerUp.score >= CONFIDENT_MARGIN);

  return { status: isConfident ? 'confident' : 'ambiguous', matches, query };
}
