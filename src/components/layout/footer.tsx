'use client';

import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { ROUTES } from '@/lib/constants/routes';
import { useTranslation } from '@/lib/i18n/LanguageContext';

export default function Footer() {
  const { t } = useTranslation();

  const footerLinks = {
    services: [
      { labelKey: 'home.services.tax', href: ROUTES.CITIZEN.PROPERTY_TAX },
      { labelKey: 'home.services.water', href: ROUTES.CITIZEN.WATER_BILLS },
      { labelKey: 'common.guest_complaint', href: ROUTES.PUBLIC.COMPLAINTS.NEW },
      { labelKey: 'common.track_complaint', href: ROUTES.PUBLIC.COMPLAINTS.TRACK },
    ],
    quickLinks: [
      { labelKey: 'common.home', href: ROUTES.PUBLIC.HOME },
      { labelKey: 'home.about.tag', href: ROUTES.PUBLIC.ABOUT.BASE },
      { labelKey: 'nav.services', href: ROUTES.PUBLIC.SERVICES.BASE },
      { label: 'Events', href: ROUTES.PUBLIC.EVENTS },
      { label: 'Notices', href: ROUTES.PUBLIC.NOTICES },
      { label: 'Gallery', href: ROUTES.PUBLIC.GALLERY },
      { label: 'Resources', href: ROUTES.PUBLIC.RESOURCES },
      { labelKey: 'nav.contact', href: ROUTES.PUBLIC.CONTACT },
    ],
    information: [
      { label: 'RTI', href: ROUTES.RTI },
      { label: 'FAQ', href: ROUTES.FAQ },
      { labelKey: 'footer.privacy', href: '/privacy' },
      { labelKey: 'footer.sitemap', href: '/sitemap' },
    ],
    government: [
      { label: 'Digital India', href: 'https://dic.gov.in/' },
      { label: 'Make in India', href: 'https://www.makeinindia.com/' },
      { label: 'MyGov', href: 'https://www.mygov.in/' },
      { label: 'Aaple Sarkar', href: 'https://aaplesarkar.mahaonline.gov.in/en' },
    ],
  };

  return (
    <footer className="mt-auto bg-slate-950 text-white" aria-label="Footer Area">
      {/* Main Footer */}
      <div className="container-custom py-12 lg:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* About Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-orange-600 rounded-lg flex items-center justify-center shadow-sm shrink-0 select-none">
                <span className="text-white font-bold text-base">CSMC</span>
              </div>
              <div>
                <h3 className="text-lg font-bold leading-tight">{t('footer.about_title')}</h3>
                <p className="text-xs text-gray-400">{t('footer.about_sub')}</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              {t('footer.about_desc')}
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 text-sm">
                <MapPin size={18} className="text-orange-400 mt-0.5 shrink-0" aria-hidden />
                <span className="text-slate-400 leading-normal">
                  {t('footer.address')}
                </span>
              </div>
              <a href="tel:+911234567890" className="flex items-center gap-3 text-sm hover:text-orange-400 transition-colors min-h-[36px]" aria-label="Call CSMC Helpline: +91-1234567890">
                <Phone size={18} className="text-orange-400 shrink-0" aria-hidden />
                <span>+91-1234567890</span>
              </a>
              <a href="mailto:info@chhsambhajinagarmc.org" className="flex items-center gap-3 text-sm hover:text-orange-400 transition-colors min-h-[36px]" aria-label="Email CSMC support: info@chhsambhajinagarmc.org">
                <Mail size={18} className="text-orange-400 shrink-0" aria-hidden />
                <span className="truncate">info@chhsambhajinagarmc.org</span>
              </a>
            </div>

            {/* Social Media */}
            <div className="flex gap-3 pt-2">
              <a
                href="https://www.facebook.com/commr.abdmahapalika"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors min-w-[40px] min-h-[40px]"
                aria-label="Facebook"
              >
                <Facebook size={18} aria-hidden />
              </a>
              <a
                href="https://www.instagram.com/csmcmahapalika/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-pink-600 rounded-lg flex items-center justify-center transition-colors min-w-[40px] min-h-[40px]"
                aria-label="Instagram"
              >
                <Instagram size={18} aria-hidden />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-sky-500 rounded-lg flex items-center justify-center transition-colors min-w-[40px] min-h-[40px]"
                aria-label="Twitter"
              >
                <Twitter size={18} aria-hidden />
              </a>
              <a
                href="https://www.youtube.com/channel/UCfty7aRYvcL3evtdIVytYUg"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-red-600 rounded-lg flex items-center justify-center transition-colors min-w-[40px] min-h-[40px]"
                aria-label="YouTube"
              >
                <Youtube size={18} aria-hidden />
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-base font-bold mb-4 border-b border-white/10 pb-2">{t('footer.links_services')}</h3>
            <ul className="space-y-2.5">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-slate-400 hover:text-orange-400 transition-colors text-sm py-1 block">
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-base font-bold mb-4 border-b border-white/10 pb-2">{t('footer.links_quick')}</h3>
            <ul className="space-y-2.5">
              {footerLinks.quickLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-slate-400 hover:text-orange-400 transition-colors text-sm py-1 block">
                    {'labelKey' in link ? t(link.labelKey) : link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info & Gov Links Column */}
          <div>
            <h3 className="text-base font-bold mb-4 border-b border-white/10 pb-2">{t('footer.links_govt')}</h3>
            <ul className="space-y-2.5 mb-6">
              {footerLinks.government.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-orange-400 transition-colors text-sm py-1 flex items-center gap-1.5 group"
                  >
                    <span>{link.label}</span>
                    <ExternalLink size={12} className="opacity-40 group-hover:opacity-100 transition-opacity shrink-0" aria-label="बाह्य दुवा" />
                  </a>
                </li>
              ))}
            </ul>

            {/* Visitor Counter */}
            <div className="p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="text-xs text-slate-400 mb-1 leading-none">{t('footer.visits')}</div>
              <div className="text-2xl font-mono font-bold text-orange-400">1,50,448</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-black/20">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs md:text-sm text-gray-400">
            <p className="text-center md:text-left">{t('footer.copyright')}</p>
            <div className="flex gap-4 md:gap-6 flex-wrap justify-center">
              <Link href="/privacy" className="hover:text-orange-500 transition-colors py-1">
                {t('footer.privacy')}
              </Link>
              <span className="text-white/10 select-none">|</span>
              <Link href="/sitemap" className="hover:text-orange-500 transition-colors py-1">
                {t('footer.sitemap')}
              </Link>
            </div>
          </div>
          <div className="text-center mt-4 text-[10px] text-gray-600 tracking-wider">
            {t('footer.developed_by')}
          </div>
        </div>
      </div>
    </footer>
  );
}
