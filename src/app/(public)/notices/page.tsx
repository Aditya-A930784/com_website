'use client';

import PageShell from '@/components/pages/page-shell';
import { AlertCircle, Calendar, Download, FileText } from 'lucide-react';

const notices = [
  {
    id: 'CSMC/NOTICE/2026/0715',
    title: 'Water supply maintenance schedule for central zones',
    department: 'Water Supply',
    date: '15 July 2026',
    priority: 'Important',
    summary: 'Temporary changes in supply timings due to pipeline maintenance and valve replacement work.',
  },
  {
    id: 'CSMC/NOTICE/2026/0712',
    title: 'Property tax rebate window extended',
    department: 'Tax Department',
    date: '12 July 2026',
    priority: 'General',
    summary: 'Citizens can pay online and download receipts through the municipal services portal.',
  },
  {
    id: 'CSMC/NOTICE/2026/0708',
    title: 'Monsoon control room helpline activation',
    department: 'Disaster Management',
    date: '08 July 2026',
    priority: 'Urgent',
    summary: 'Dedicated helpline support is active for waterlogging, fallen trees, and emergency assistance.',
  },
];

export default function PublicNoticesPage() {
  return (
    <PageShell
      eyebrow="Notices"
      title="Public Notices"
      description="Official circulars, service alerts, and department notices for citizens."
    >
      <div className="space-y-4" role="list">
        {notices.map((notice) => (
          <article
            key={notice.id}
            className="flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between"
            role="listitem"
          >
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-orange-700">
                <FileText size={22} aria-hidden />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-bold text-slate-500">{notice.id}</span>
                  <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700">
                    {notice.department}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-700">
                    <AlertCircle size={12} aria-hidden />
                    {notice.priority}
                  </span>
                </div>
                <h2 className="mt-2 text-base font-bold text-slate-950">{notice.title}</h2>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{notice.summary}</p>
                <p className="mt-3 flex items-center gap-1.5 text-xs font-medium text-slate-500">
                  <Calendar size={13} aria-hidden />
                  Published: {notice.date}
                </p>
              </div>
            </div>
            <button
              type="button"
              className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 text-sm font-bold text-slate-700 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700"
            >
              <Download size={16} aria-hidden />
              PDF
            </button>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
