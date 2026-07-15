'use client';

import Image from 'next/image';

import PageShell from '@/components/pages/page-shell';

const galleryItems = [
  {
    title: 'Bibi Ka Maqbara Heritage Precinct',
    image: '/images/home-slider/Bibi_ka_makbara.png',
    tag: 'Heritage',
  },
  {
    title: 'Ellora Caves Tourism Corridor',
    image: '/images/home-slider/ellora_caves.png',
    tag: 'Tourism',
  },
  {
    title: 'Devgiri Fort Region',
    image: '/images/home-slider/devgir_fort.png',
    tag: 'Culture',
  },
  {
    title: 'Kranti Chowk City Landmark',
    image: '/images/home-slider/karnti_chowk.png',
    tag: 'City',
  },
];

export default function PublicGalleryPage() {
  return (
    <PageShell
      eyebrow="Gallery"
      title="City Gallery"
      description="A visual archive of heritage places, landmarks, civic work, and city identity."
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {galleryItems.map((item) => (
          <article key={item.title} className="group overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <span className="absolute left-4 top-4 rounded-md bg-white/90 px-2.5 py-1 text-xs font-bold text-slate-800 shadow-sm">
                {item.tag}
              </span>
            </div>
            <div className="p-4">
              <h2 className="text-base font-bold text-slate-950">{item.title}</h2>
              <p className="mt-1 text-sm text-slate-600">Chhatrapati Sambhajinagar Municipal Corporation</p>
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
