'use client';

import Link from 'next/link';
import { ArrowRight, BookOpen, FileText, Landmark, LifeBuoy, Megaphone, ShieldCheck } from 'lucide-react';

import PageShell from '@/components/pages/page-shell';
import { ROUTES } from '@/lib/constants/routes';

const resources = [
  {
    title: 'Citizen Services',
    description: 'Access tax, water bill, certificates, licenses, and complaint services.',
    href: ROUTES.PUBLIC.SERVICES.BASE,
    icon: Landmark,
  },
  {
    title: 'Documents & Info',
    description: 'RTI, RTS citizen charter, public reports, and official publication downloads.',
    href: ROUTES.PUBLIC.DOCUMENTS,
    icon: FileText,
  },
  {
    title: 'Public Notices',
    description: 'Department circulars, urgent alerts, and citizen-facing announcements.',
    href: ROUTES.PUBLIC.NOTICES,
    icon: Megaphone,
  },
  {
    title: 'Emergency Plan',
    description: 'Disaster management guidance and important help information.',
    href: ROUTES.PUBLIC.ABOUT.EMERGENCY_PLAN,
    icon: ShieldCheck,
  },
  {
    title: 'FAQs',
    description: 'Answers for common portal, payment, certificate, and complaint questions.',
    href: ROUTES.PUBLIC.ABOUT.FAQS,
    icon: BookOpen,
  },
  {
    title: 'Contact & Feedback',
    description: 'Reach the municipal office or share feedback through the public contact form.',
    href: ROUTES.PUBLIC.CONTACT,
    icon: LifeBuoy,
  },
];

export default function PublicResourcesPage() {
  return (
    <PageShell
      eyebrow="Resources"
      title="Citizen Resource Centre"
      description="A quick directory for the most useful public information, services, and support pages."
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {resources.map((resource) => {
          const Icon = resource.icon;
          return (
            <Link
              key={resource.href}
              href={resource.href}
              className="group flex gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-orange-300 hover:shadow-md"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-orange-700 transition group-hover:bg-orange-100">
                <Icon size={22} aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block text-base font-bold text-slate-950 transition group-hover:text-orange-700">
                  {resource.title}
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-slate-600">{resource.description}</span>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[0.14em] text-orange-700">
                  Open
                  <ArrowRight size={13} aria-hidden />
                </span>
              </span>
            </Link>
          );
        })}
      </div>
    </PageShell>
  );
}
