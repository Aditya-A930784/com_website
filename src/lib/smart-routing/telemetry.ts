'use client';

/**
 * Smart Routing — Client-side telemetry (Tier 1: localStorage)
 *
 * All data stays on the citizen's device until Firestore is wired (F1/F2).
 * Designed for zero-infra MVP; public API is intentionally unchanged when we
 * swap the persistence layer to Firestore later.
 *
 * Commissioner-facing metrics this enables:
 *   - Top searched terms → homepage prioritisation
 *   - Miss rate → which services need to be digitised next
 *   - Step drop-off → which flows are broken
 *   - Weekly self-served count → the ROI slide number
 */

export type QueryEvent = {
  q: string;
  status: 'confident' | 'ambiguous' | 'none';
  serviceId?: string;
  ts: number; // Unix ms
};

export type StepEvent = {
  serviceId: string;
  step: number;
  completed: boolean; // false = dropped, true = marked done
  ts: number;
};

const QUERY_KEY = 'csmc_telem_queries';
const STEP_KEY = 'csmc_telem_steps';
const MAX_EVENTS = 500; // cap storage

// ── Helpers ──────────────────────────────────────────────────────────────────

function readJSON<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage full — silent fail, never crash the UX
  }
}

// ── Write ─────────────────────────────────────────────────────────────────────

export function trackQuery(
  q: string,
  status: 'confident' | 'ambiguous' | 'none',
  serviceId?: string
): void {
  const events = readJSON<QueryEvent[]>(QUERY_KEY, []);
  events.push({ q: q.trim().toLowerCase(), status, serviceId, ts: Date.now() });
  writeJSON(QUERY_KEY, events.slice(-MAX_EVENTS));
}

export function trackStep(serviceId: string, step: number, completed: boolean): void {
  const events = readJSON<StepEvent[]>(STEP_KEY, []);
  events.push({ serviceId, step, completed, ts: Date.now() });
  writeJSON(STEP_KEY, events.slice(-MAX_EVENTS));
}

// ── Read / Aggregate ──────────────────────────────────────────────────────────

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

function sinceMs(windowMs: number): number {
  return Date.now() - windowMs;
}

export function getWeeklyStats(): {
  totalQueries: number;
  routedCount: number; // confident matches
  missCount: number;   // no match
  selfServedCount: number; // completed at least 1 guidance step
} {
  const since = sinceMs(WEEK_MS);
  const queries = readJSON<QueryEvent[]>(QUERY_KEY, []).filter((e) => e.ts > since);
  const steps = readJSON<StepEvent[]>(STEP_KEY, []).filter((e) => e.ts > since && e.completed);

  const uniqueServiced = new Set(steps.map((e) => `${e.serviceId}:${Math.floor(e.ts / 60000)}`));

  return {
    totalQueries: queries.length,
    routedCount: queries.filter((e) => e.status === 'confident').length,
    missCount: queries.filter((e) => e.status === 'none').length,
    selfServedCount: uniqueServiced.size,
  };
}

export function getTopQueries(limit = 10): { q: string; count: number; status: string }[] {
  const queries = readJSON<QueryEvent[]>(QUERY_KEY, []);
  const counts: Record<string, { count: number; status: string }> = {};
  for (const e of queries) {
    if (!counts[e.q]) counts[e.q] = { count: 0, status: e.status };
    counts[e.q].count++;
  }
  return Object.entries(counts)
    .map(([q, { count, status }]) => ({ q, count, status }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

export function getMissedQueries(limit = 20): { q: string; count: number }[] {
  const queries = readJSON<QueryEvent[]>(QUERY_KEY, []).filter((e) => e.status === 'none');
  const counts: Record<string, number> = {};
  for (const e of queries) {
    counts[e.q] = (counts[e.q] ?? 0) + 1;
  }
  return Object.entries(counts)
    .map(([q, count]) => ({ q, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

export function getStepDropOff(): Record<string, number[]> {
  const steps = readJSON<StepEvent[]>(STEP_KEY, []).filter((e) => !e.completed);
  const result: Record<string, number[]> = {};
  for (const e of steps) {
    if (!result[e.serviceId]) result[e.serviceId] = [];
    result[e.serviceId].push(e.step);
  }
  return result;
}

// ── Recent services (E3) ──────────────────────────────────────────────────────

export type RecentService = {
  serviceId: string;
  titleMr: string;
  titleEn: string;
  route: string;
  iconKey: string;
  ts: number;
};

const RECENT_KEY = 'csmc_recent_services';
const MAX_RECENT = 3;

export function recordRecentService(service: RecentService): void {
  const existing = readJSON<RecentService[]>(RECENT_KEY, []).filter(
    (s) => s.serviceId !== service.serviceId
  );
  existing.unshift({ ...service, ts: Date.now() });
  writeJSON(RECENT_KEY, existing.slice(0, MAX_RECENT));
}

export function getRecentServices(): RecentService[] {
  return readJSON<RecentService[]>(RECENT_KEY, []);
}
