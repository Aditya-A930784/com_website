"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Card, CardBody } from '@/components/ui/card';

const officials = [
  { 
    name: 'श्री देवेंद्र फडणवीस', 
    designation: 'मा.मुख्यमंत्री',
    department: 'महाराष्ट्र शासन',
    image: 'https://chhsambhajinagarmc.org/assets/cdma/testimonials/DevendraFadnavis17.png',
    profileUrl: 'https://www.maharashtra.gov.in/',
    bio: 'महाराष्ट्राचे मुख्यमंत्री आणि राज्याच्या विकासाचे प्रमुख'
  },
  { 
    name: 'श्री एकनाथ शिंदे', 
    designation: 'मा.उपमुख्यमंत्री',
    department: 'महाराष्ट्र शासन',
    image: 'https://chhsambhajinagarmc.org/assets/cdma/testimonials/Eknath_Shinde6.png',
    profileUrl: 'https://www.maharashtra.gov.in/',
    bio: 'महाराष्ट्राचे उपमुख्यमंत्री'
  },
  { 
    name: 'श्रीमती सुनेत्रा अजित पवार', 
    designation: 'मा.उपमुख्यमंत्री',
    department: 'महाराष्ट्र शासन',
    image: 'https://chhsambhajinagarmc.org/assets/cdma/testimonials/vahini-saheb5.png',
    profileUrl: 'https://www.maharashtra.gov.in/',
    bio: 'महाराष्ट्राच्या उपमुख्यमंत्री'
  },
  { 
    name: 'श्रीमती माधुरी मिसाळ', 
    designation: 'मा.राज्यमंत्री',
    department: 'नगरविकास विभाग',
    image: 'https://chhsambhajinagarmc.org/assets/cdma/testimonials/madhuri_misal21.png',
    profileUrl: 'https://www.maharashtra.gov.in/',
    bio: 'नगरविकास विभागाच्या राज्यमंत्री'
  },
  { 
    name: 'श्री समीर राजुरकर', 
    designation: 'मा.महापौर',
    department: 'CSMC',
    image: 'https://chhsambhajinagarmc.org/assets/cdma/testimonials/samir-bhaiya-rajurkar4.png',
    profileUrl: 'https://chhsambhajinagarmc.org/institutional-structure',
    bio: 'छत्रपती संभाजीनगर महानगरपालिकेचे महापौर'
  },
  { 
    name: 'श्री राजेंद्र जंजाळ', 
    designation: 'मा.उपमहापौर',
    department: 'CSMC',
    image: 'https://chhsambhajinagarmc.org/assets/cdma/testimonials/raju-bhaiya-janjal5.png',
    profileUrl: 'https://chhsambhajinagarmc.org/institutional-structure',
    bio: 'छत्रपती संभाजीनगर महानगरपालिकेचे उपमहापौर'
  },
  { 
    name: 'श्री अमोल येडगे (भा प्र से)', 
    designation: 'मा. महानगरपालिका आयुक्त',
    department: 'CSMC',
    image: 'https://chhsambhajinagarmc.org/assets/cdma/testimonials/amol_sir_gem5.png',
    profileUrl: 'https://chhsambhajinagarmc.org/institutional-structure',
    bio: 'महानगरपालिकेचे मुख्य प्रशासकीय अधिकारी'
  },
];

export default function OfficialsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const lastActiveRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpenIndex(null);
    }
    if (openIndex !== null) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [openIndex]);

  function openModal(i: number) {
    lastActiveRef.current = document.activeElement as HTMLElement | null;
    setOpenIndex(i);
    setTimeout(() => modalRef.current?.focus(), 50);
  }

  function closeModal() {
    setOpenIndex(null);
    lastActiveRef.current?.focus();
  }

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-blue-50 to-white">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
            पदाधिकारी
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            आमचे नेतृत्व
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            छत्रपती संभाजीनगर महानगरपालिकेचे प्रमुख पदाधिकारी आणि नेतृत्व
          </p>
        </div>

        <div className="mx-auto max-w-6xl py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {officials.map((official, index) => (
              <div
                key={index}
                className={`reveal`} 
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <Card
                  hover
                  className="official-card p-0"
                  role="listitem"
                >
                  <div className="flex flex-col items-center justify-between h-[360px] px-6 pt-6">
                    <div className="flex flex-col items-center">
                      <div className="w-20 h-20 rounded-full overflow-hidden official-avatar">
                        <Image
                          src={official.image}
                          alt={official.name}
                          width={80}
                          height={80}
                          className="object-cover w-full h-full"
                          loading="lazy"
                        />
                      </div>

                      <h3 className="mt-5 text-[22px] font-bold text-gray-900 text-center leading-tight">
                        {official.name}
                      </h3>
                      <p className="mt-2 text-[16px] font-semibold text-[#F58220]">{official.designation}</p>
                      <p className="mt-1 text-sm text-gray-500">{official.department}</p>
                    </div>

                    <div className="w-full mt-4 pb-6 flex justify-center">
                      <button
                        className="btn-primary rounded-[10px] px-4 py-2 text-sm"
                        onClick={() => openModal(index)}
                        aria-haspopup="dialog"
                        aria-controls={`official-modal-${index}`}
                      >
                        View Profile
                      </button>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Modal */}
        {openIndex !== null && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center officials-modal-backdrop"
            role="presentation"
            onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
          >
            <div
              id={`official-modal-${openIndex}`}
              className="officials-modal bg-white p-6 shadow-xl"
              role="dialog"
              aria-modal="true"
              aria-labelledby={`official-modal-title-${openIndex}`}
              tabIndex={-1}
              ref={modalRef}
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden official-avatar">
                    <Image src={officials[openIndex].image} alt={officials[openIndex].name} width={80} height={80} className="object-cover w-full h-full" />
                  </div>
                  <div>
                    <h2 id={`official-modal-title-${openIndex}`} className="text-2xl font-bold text-gray-900">{officials[openIndex].name}</h2>
                    <p className="text-sm font-semibold text-[#F58220] mt-1">{officials[openIndex].designation}</p>
                    <p className="text-xs text-gray-500 mt-1">{officials[openIndex].department}</p>
                  </div>
                </div>

                <div>
                  <button aria-label="Close profile" className="p-2 rounded-md hover:bg-gray-100" onClick={closeModal}>✕</button>
                </div>
              </div>

              <div className="mt-4 prose prose-sm text-sm text-gray-700">
                <p><strong>Biography:</strong> {officials[openIndex].bio || 'Biography not available.'}</p>
                <p className="mt-2"><strong>Responsibilities:</strong> Leading and representing the department — details to be added.</p>
                <p className="mt-2"><strong>Contact:</strong> <a href={officials[openIndex].profileUrl} className="text-blue-600 underline">Official page</a></p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
