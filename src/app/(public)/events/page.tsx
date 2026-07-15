'use client';

import PageShell from '@/components/pages/page-shell';
import { CalendarDays, Clock, MapPin, Users } from 'lucide-react';

const events = [
  {
    title: 'Ward Cleanliness Drive',
    category: 'Public Participation',
    date: '18 July 2026',
    time: '7:30 AM - 10:30 AM',
    venue: 'Ward 24 Community Ground',
    seats: 'Open to all citizens',
    description: 'Join the ward team for a focused cleanliness and waste segregation awareness drive.',
  },
  {
    title: 'Property Tax Help Camp',
    category: 'Citizen Services',
    date: '22 July 2026',
    time: '11:00 AM - 5:00 PM',
    venue: 'Town Hall Citizen Facilitation Centre',
    seats: '120 appointments',
    description: 'On-site support for tax assessment queries, online payment help, and receipt downloads.',
  },
  {
    title: 'Rain Preparedness Review',
    category: 'Emergency Planning',
    date: '25 July 2026',
    time: '4:00 PM - 6:00 PM',
    venue: 'Disaster Control Room',
    seats: 'Department officials',
    description: 'Inter-department coordination meeting for drainage, road safety, and emergency response.',
  },
];

export default function PublicEventsPage() {
  return (
    <PageShell
      eyebrow="Events"
      title="City Events & Public Camps"
      description="Upcoming civic programmes, citizen camps, and municipal coordination events."
    >
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {events.map((event) => (
          <article key={event.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <span className="rounded-md bg-orange-50 px-2.5 py-1 text-xs font-bold text-orange-700">
              {event.category}
            </span>
            <h2 className="mt-4 text-lg font-bold text-slate-950">{event.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{event.description}</p>

            <div className="mt-5 space-y-3 text-sm text-slate-700">
              <div className="flex gap-2">
                <CalendarDays size={16} className="mt-0.5 text-orange-600" aria-hidden />
                <span>{event.date}</span>
              </div>
              <div className="flex gap-2">
                <Clock size={16} className="mt-0.5 text-orange-600" aria-hidden />
                <span>{event.time}</span>
              </div>
              <div className="flex gap-2">
                <MapPin size={16} className="mt-0.5 text-orange-600" aria-hidden />
                <span>{event.venue}</span>
              </div>
              <div className="flex gap-2">
                <Users size={16} className="mt-0.5 text-orange-600" aria-hidden />
                <span>{event.seats}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
