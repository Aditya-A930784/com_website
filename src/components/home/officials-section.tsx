"use client";

import React, { useState } from 'react';
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
  const [selected, setSelected] = useState<any | null>(null);

  return (
    <section className="py-12 lg:py-20 bg-gradient-to-b from-blue-50 to-white">
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

        {/* Mobile compact scroller */}
        <div className="sm:hidden mb-6">
          <div className="-mx-4 px-4 overflow-x-auto touch-pan-x snap-x snap-mandatory">
            <div className="flex gap-4">
              {officials.map((o, i) => (
                <a
                  key={i}
                  href={o.profileUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => { e.preventDefault(); setSelected(o); }}
                  role="button"
                  className="min-w-[110px] flex-shrink-0 bg-white/80 backdrop-blur rounded-xl p-3 shadow-sm hover:shadow-md transition snap-start"
                >
                  <div className="w-16 h-16 mx-auto mb-2 overflow-hidden rounded-full ring-2 ring-orange-200">
                    <Image src={o.image} alt={o.name} width={64} height={64} className="object-cover" />
                  </div>
                  <h4 className="text-sm font-semibold text-center text-gray-900 leading-5 line-clamp-2">{o.name}</h4>
                  <p className="text-xs text-center text-orange-600 mt-1">{o.designation}</p>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Top Officials Grid - 4 Cards */}
        <div className="hidden sm:block mx-auto mb-8 grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {officials.slice(0, 4).map((official, index) => (
            <Card key={index} hover onClick={() => setSelected(official)} className="group overflow-hidden border border-blue-100 transition-all duration-300 hover:border-blue-300 cursor-pointer enter-up">
              <div className="relative">
                {/* Image Container */}
                <div className="relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br from-blue-100 via-white to-blue-50">
                  <Image
                    src={official.image}
                    alt={official.name}
                    width={300}
                    height={220}
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                
                {/* Blue Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 text-white w-full">
                    <p className="text-sm font-medium">{official.department}</p>
                    <p className="text-xs text-blue-200 mt-1">{official.bio}</p>
                  </div>
                </div>
              </div>
              
              {/* Card Body */}
              <CardBody className="bg-white px-4 py-3 text-center">
                <h3 className="mb-0.5 line-clamp-2 text-sm font-semibold text-gray-900">{official.name}</h3>
                <p className="text-xs font-medium text-orange-600">{official.designation}</p>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* Additional Officials - 3 Cards */}
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {officials.slice(4).map((official, index) => (
            <Card key={index} hover onClick={() => setSelected(official)} className="group overflow-hidden border border-blue-100 transition-all duration-300 hover:border-blue-300 cursor-pointer enter-up">
              <div className="relative">
                <div className="relative flex h-36 items-center justify-center overflow-hidden bg-gradient-to-br from-blue-100 via-white to-blue-50">
                  <Image
                    src={official.image}
                    alt={official.name}
                    width={260}
                    height={180}
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                
                {/* Blue Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 text-white w-full">
                    <p className="text-sm font-medium">{official.department}</p>
                    <p className="text-xs text-blue-200 mt-1">{official.bio}</p>
                  </div>
                </div>
              </div>
              
              {/* Card Body */}
              <CardBody className="bg-white px-4 py-3 text-center">
                <h3 className="mb-0.5 line-clamp-2 text-sm font-semibold text-gray-900">{official.name}</h3>
                <p className="text-xs font-medium text-orange-600">{official.designation}</p>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* Modal for full bio */}
        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50" onClick={() => setSelected(null)} />
            <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full mx-auto p-6 z-10 transform transition-all">
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-orange-100 flex-shrink-0">
                  <Image src={selected.image} alt={selected.name} width={80} height={80} className="object-cover" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{selected.name}</h3>
                  <p className="text-sm text-orange-600">{selected.designation}</p>
                  <p className="text-xs text-gray-500 mt-1">{selected.department}</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-700">{selected.bio}</p>
              <div className="mt-4 flex justify-end gap-2">
                <a href={selected.profileUrl} target="_blank" rel="noreferrer" className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-md">प्रोफाइल पहा</a>
                <button onClick={() => setSelected(null)} className="px-4 py-2 text-sm font-medium bg-gray-100 rounded-md">Close</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
