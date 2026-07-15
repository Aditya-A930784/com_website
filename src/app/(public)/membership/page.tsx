'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle2, ClipboardList, FileCheck, Users } from 'lucide-react';

import PageShell from '@/components/pages/page-shell';
import { ROUTES } from '@/lib/constants/routes';

const memberOptions = [
  {
    title: 'Citizen Volunteer',
    icon: Users,
    description: 'Participate in cleanliness drives, awareness campaigns, and ward-level civic activities.',
    items: ['Open to residents', 'Ward coordinator approval', 'Event alerts by SMS or email'],
  },
  {
    title: 'Resident Welfare Association',
    icon: ClipboardList,
    description: 'Register an association to coordinate local issues, service requests, and public meetings.',
    items: ['Association details', 'Office bearer contacts', 'Locality and ward mapping'],
  },
  {
    title: 'Civic Partner',
    icon: FileCheck,
    description: 'Support public programmes through CSR, institution-led initiatives, and city campaigns.',
    items: ['Organization profile', 'Proposal note', 'Department review'],
  },
];

export default function PublicMembershipPage() {
  return (
    <PageShell
      eyebrow="Membership"
      title="Citizen Membership & Participation"
      description="Join public participation programmes and help improve civic service delivery in your ward."
    >
      <div className="space-y-8">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {memberOptions.map((option) => {
            const Icon = option.icon;
            return (
              <article key={option.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-50 text-orange-700">
                  <Icon size={22} aria-hidden />
                </div>
                <h2 className="mt-4 text-lg font-bold text-slate-950">{option.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{option.description}</p>
                <ul className="mt-4 space-y-2">
                  {option.items.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-slate-700">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-green-600" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        <div className="flex flex-col gap-4 rounded-lg bg-slate-950 p-5 text-white md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-bold">Ready to participate?</h2>
            <p className="mt-1 text-sm text-white/70">Use the contact page to submit your interest with ward details.</p>
          </div>
          <Link
            href={ROUTES.PUBLIC.CONTACT}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-orange-600 px-5 text-sm font-bold text-white transition hover:bg-orange-700"
          >
            Contact CSMC
            <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
