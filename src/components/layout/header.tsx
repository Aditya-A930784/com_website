'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Home, Menu, X, Lock } from 'lucide-react';

import { useTranslation } from '@/lib/i18n/LanguageContext';
import { ROUTES } from '@/lib/constants/routes';

type NavItem = {
  labelKey: string;
  labelEn: string;
  labelMr: string;
  href: string;
  descKey?: string;
  requiresLogin?: boolean;
};

type NavGroup = {
  labelKey: string;
  labelEn: string;
  labelMr: string;
  href?: string;
  items?: NavItem[];
};

// Complete navigation structure matching the reference
const navGroups: NavGroup[] = [
  {
    labelKey: 'nav.home',
    labelEn: 'Home',
    labelMr: 'मुख्यपृष्ठ',
    href: ROUTES.PUBLIC.HOME,
  },
  {
    labelKey: 'nav.about',
    labelEn: 'About Us',
    labelMr: 'आमच्याबद्दल',
    items: [
      { labelKey: 'about.corporation', labelEn: 'About Corporation', labelMr: 'महानगरपालिका बद्दल', href: ROUTES.PUBLIC.ABOUT.BASE },
      { labelKey: 'about.history', labelEn: 'History', labelMr: 'इतिहास', href: '/about/history' },
      { labelKey: 'about.vision', labelEn: 'Vision & Mission', labelMr: 'दृष्टीकोन आणि ध्येय', href: ROUTES.PUBLIC.ABOUT.MISSION },
      { labelKey: 'about.mayor', labelEn: 'Mayor', labelMr: 'महापौर', href: '/about/mayor' },
      { labelKey: 'about.commissioner', labelEn: 'Municipal Commissioner', labelMr: 'आयुक्त', href: '/about/commissioner' },
      { labelKey: 'about.structure', labelEn: 'Administrative Structure', labelMr: 'प्रशासकीय रचना', href: '/about/structure' },
      { labelKey: 'about.charter', labelEn: 'Citizen Charter', labelMr: 'नागरी सनद', href: '/about/charter' },
    ],
  },
  {
    labelKey: 'nav.organization',
    labelEn: 'Organization',
    labelMr: 'संघटना',
    items: [
      { labelKey: 'org.structure', labelEn: 'Organizational Structure', labelMr: 'संघटनात्मक रचना', href: '/organization/structure' },
      { labelKey: 'org.directory', labelEn: 'Officers Directory', labelMr: 'अधिकारी निर्देशिका', href: ROUTES.PUBLIC.ABOUT.OFFICIALS },
      { labelKey: 'org.departments', labelEn: 'Departments', labelMr: 'विभाग', href: '/organization/departments' },
      { labelKey: 'org.committees', labelEn: 'Committees', labelMr: 'समित्या', href: '/organization/committees' },
      { labelKey: 'org.standing', labelEn: 'Standing Committee', labelMr: 'स्थायी समिती', href: '/organization/standing-committee' },
    ],
  },
  {
    labelKey: 'nav.departments',
    labelEn: 'Departments',
    labelMr: 'विभाग',
    items: [
      { labelKey: 'dept.health', labelEn: 'Health Department', labelMr: 'आरोग्य विभाग', href: '/departments/health' },
      { labelKey: 'dept.water', labelEn: 'Water Supply', labelMr: 'पाणीपुरवठा', href: '/departments/water' },
      { labelKey: 'dept.waste', labelEn: 'Solid Waste Management', labelMr: 'घनकचरा व्यवस्थापन', href: '/departments/waste' },
      { labelKey: 'dept.fire', labelEn: 'Fire Department', labelMr: 'अग्निशमन विभाग', href: '/departments/fire' },
      { labelKey: 'dept.planning', labelEn: 'Town Planning', labelMr: 'शहर नियोजन', href: '/departments/planning' },
      { labelKey: 'dept.engineering', labelEn: 'Engineering', labelMr: 'अभियांत्रिकी', href: '/departments/engineering' },
      { labelKey: 'dept.education', labelEn: 'Education', labelMr: 'शिक्षण', href: '/departments/education' },
      { labelKey: 'dept.garden', labelEn: 'Garden Department', labelMr: 'उद्यान विभाग', href: '/departments/garden' },
      { labelKey: 'dept.tax', labelEn: 'Tax Department', labelMr: 'कर विभाग', href: '/departments/tax' },
      { labelKey: 'dept.birth', labelEn: 'Birth & Death Registration', labelMr: 'जन्म-मृत्यू नोंदणी', href: '/departments/birth-death' },
      { labelKey: 'dept.accounts', labelEn: 'Accounts Department', labelMr: 'लेखा विभाग', href: '/departments/accounts' },
      { labelKey: 'dept.legal', labelEn: 'Legal Department', labelMr: 'कायदेशीर विभाग', href: '/departments/legal' },
      { labelKey: 'dept.it', labelEn: 'IT Department', labelMr: 'आयटी विभाग', href: '/departments/it' },
    ],
  },
  {
    labelKey: 'nav.zones',
    labelEn: 'Zones / Wards',
    labelMr: 'झोन / प्रभाग',
    items: [
      { labelKey: 'zone.1', labelEn: 'Zone 1', labelMr: 'झोन १', href: '/zones/zone-1' },
      { labelKey: 'zone.2', labelEn: 'Zone 2', labelMr: 'झोन २', href: '/zones/zone-2' },
      { labelKey: 'zone.3', labelEn: 'Zone 3', labelMr: 'झोन ३', href: '/zones/zone-3' },
      { labelKey: 'zone.4', labelEn: 'Zone 4', labelMr: 'झोन ४', href: '/zones/zone-4' },
      { labelKey: 'zone.5', labelEn: 'Zone 5', labelMr: 'झोन ५', href: '/zones/zone-5' },
      { labelKey: 'zone.maps', labelEn: 'Ward Maps', labelMr: 'प्रभाग नकाशे', href: '/zones/maps' },
      { labelKey: 'zone.officers', labelEn: 'Ward Officers', labelMr: 'प्रभाग अधिकारी', href: '/zones/officers' },
    ],
  },
  {
    labelKey: 'nav.tenders',
    labelEn: 'Tenders',
    labelMr: 'निविदा',
    items: [
      { labelKey: 'tender.current', labelEn: 'Current Tenders', labelMr: 'चालू निविदा', href: ROUTES.PUBLIC.TENDERS },
      { labelKey: 'tender.archived', labelEn: 'Archived Tenders', labelMr: 'जुन्या निविदा', href: '/tenders/archived' },
      { labelKey: 'tender.documents', labelEn: 'Download Documents', labelMr: 'कागदपत्रे डाऊनलोड करा', href: '/tenders/documents' },
    ],
  },
  {
    labelKey: 'nav.ncap',
    labelEn: 'NCAP',
    labelMr: 'एनसीएपी',
    items: [
      { labelKey: 'ncap.air', labelEn: 'Air Quality', labelMr: 'हवा गुणवत्ता', href: '/ncap/air-quality' },
      { labelKey: 'ncap.projects', labelEn: 'NCAP Projects', labelMr: 'एनसीएपी प्रकल्प', href: '/ncap/projects' },
      { labelKey: 'ncap.reports', labelEn: 'Reports', labelMr: 'अहवाल', href: '/ncap/reports' },
      { labelKey: 'ncap.dashboard', labelEn: 'Progress Dashboard', labelMr: 'प्रगती डॅशबोर्ड', href: '/ncap/dashboard' },
    ],
  },
  {
    labelKey: 'nav.rti',
    labelEn: 'RTI Act',
    labelMr: 'आरटीआय',
    items: [
      { labelKey: 'rti.info', labelEn: 'RTI Information', labelMr: 'आरटीआय माहिती', href: '/rti/information' },
      { labelKey: 'rti.officer', labelEn: 'Public Information Officer', labelMr: 'माहिती अधिकारी', href: '/rti/officer' },
      { labelKey: 'rti.forms', labelEn: 'Download Forms', labelMr: 'फॉर्म डाऊनलोड करा', href: '/rti/forms' },
      { labelKey: 'rti.manual', labelEn: 'RTI Manual', labelMr: 'आरटीआय मार्गदर्शक', href: '/rti/manual' },
      { labelKey: 'rti.faqs', labelEn: 'FAQs', labelMr: 'सामान्य प्रश्न', href: ROUTES.PUBLIC.ABOUT.FAQS },
    ],
  },
  {
    labelKey: 'nav.rts',
    labelEn: 'RTS Act',
    labelMr: 'आरटीएस',
    items: [
      { labelKey: 'rts.services', labelEn: 'Services', labelMr: 'सेवा', href: '/rts/services' },
      { labelKey: 'rts.process', labelEn: 'Application Process', labelMr: 'अर्ज प्रक्रिया', href: '/rts/process' },
      { labelKey: 'rts.limits', labelEn: 'Time Limits', labelMr: 'वेळ मर्यादा', href: '/rts/time-limits' },
      { labelKey: 'rts.apply', labelEn: 'Online Application', labelMr: 'ऑनलाईन अर्ज', href: '/rts/apply' },
    ],
  },
  {
    labelKey: 'nav.census',
    labelEn: 'Census 2026-27',
    labelMr: 'जनगणना २०२६-२७',
    items: [
      { labelKey: 'census.info', labelEn: 'Census Information', labelMr: 'जनगणना माहिती', href: '/census/information' },
      { labelKey: 'census.notifications', labelEn: 'Notifications', labelMr: 'सूचना', href: '/census/notifications' },
      { labelKey: 'census.reports', labelEn: 'Reports', labelMr: 'अहवाल', href: '/census/reports' },
      { labelKey: 'census.statistics', labelEn: 'Statistics', labelMr: 'सांख्यिकी', href: '/census/statistics' },
    ],
  },
  {
    labelKey: 'nav.recruitment',
    labelEn: 'Recruitment 2026',
    labelMr: 'भरती २०२६',
    items: [
      { labelKey: 'recruit.vacancies', labelEn: 'Current Vacancies', labelMr: 'रिक्त जागा', href: '/recruitment/vacancies' },
      { labelKey: 'recruit.results', labelEn: 'Results', labelMr: 'निकाल', href: '/recruitment/results' },
      { labelKey: 'recruit.admit', labelEn: 'Admit Card', labelMr: 'प्रवेशपत्र', href: '/recruitment/admit-card' },
      { labelKey: 'recruit.notifications', labelEn: 'Notifications', labelMr: 'सूचना', href: '/recruitment/notifications' },
      { labelKey: 'recruit.apply', labelEn: 'Apply Online', labelMr: 'ऑनलाईन अर्ज', href: '/recruitment/apply' },
    ],
  },
  {
    labelKey: 'nav.election',
    labelEn: 'General Election 2025',
    labelMr: 'सर्वसाधारण निवडणूक २०२५',
    items: [
      { labelKey: 'election.info', labelEn: 'Election Information', labelMr: 'निवडणूक माहिती', href: '/election/information' },
      { labelKey: 'election.voters', labelEn: 'Voter List', labelMr: 'मतदार यादी', href: '/election/voter-list' },
      { labelKey: 'election.polling', labelEn: 'Polling Stations', labelMr: 'मतदान केंद्रे', href: '/election/polling' },
      { labelKey: 'election.results', labelEn: 'Results', labelMr: 'निकाल', href: '/election/results' },
      { labelKey: 'election.notifications', labelEn: 'Notifications', labelMr: 'सूचना', href: '/election/notifications' },
    ],
  },
  {
    labelKey: 'nav.dp',
    labelEn: 'DP Plan',
    labelMr: 'डीपी योजना',
    items: [
      { labelKey: 'dp.development', labelEn: 'Development Plan', labelMr: 'विकास योजना', href: '/dp/development' },
      { labelKey: 'dp.master', labelEn: 'Master Plan', labelMr: 'मास्टर प्लॅन', href: '/dp/master' },
      { labelKey: 'dp.gis', labelEn: 'GIS Maps', labelMr: 'जीआयएस नकाशे', href: '/dp/gis' },
      { labelKey: 'dp.landuse', labelEn: 'Land Use', labelMr: 'जमीन वापर', href: '/dp/landuse' },
      { labelKey: 'dp.download', labelEn: 'Download PDFs', labelMr: 'पीडीएफ डाऊनलोड करा', href: '/dp/download' },
    ],
  },
  {
    labelKey: 'nav.portal',
    labelEn: 'CSMC IMP Portal',
    labelMr: 'सीएसएमसी आयएमपी पोर्टल',
    items: [
      { labelKey: 'portal.login', labelEn: 'Login', labelMr: 'लॉगिन', href: ROUTES.LOGIN, requiresLogin: true },
      { labelKey: 'portal.dashboard', labelEn: 'Dashboard', labelMr: 'डॅशबोर्ड', href: ROUTES.CITIZEN.DASHBOARD, requiresLogin: true },
      { labelKey: 'portal.services', labelEn: 'Citizen Services', labelMr: 'नागरी सेवा', href: ROUTES.PUBLIC.SERVICES.BASE },
      { labelKey: 'portal.reports', labelEn: 'Reports', labelMr: 'अहवाल', href: '/portal/reports' },
    ],
  },
  {
    labelKey: 'nav.contact',
    labelEn: 'Contact Us',
    labelMr: 'संपर्क साधा',
    items: [
      { labelKey: 'contact.address', labelEn: 'Office Address', labelMr: 'कार्यालय पत्ता', href: ROUTES.PUBLIC.CONTACT },
      { labelKey: 'contact.phone', labelEn: 'Phone Numbers', labelMr: 'दूरध्वनी क्रमांक', href: '/contact/phones' },
      { labelKey: 'contact.email', labelEn: 'Email', labelMr: 'ईमेल', href: '/contact/email' },
      { labelKey: 'contact.feedback', labelEn: 'Feedback Form', labelMr: 'अभिप्राय फॉर्म', href: '/contact/feedback' },
      { labelKey: 'contact.grievance', labelEn: 'Grievance', labelMr: 'तक्रार', href: ROUTES.PUBLIC.COMPLAINTS.NEW },
    ],
  },
  {
    labelKey: 'nav.sitemap',
    labelEn: 'Site Map',
    labelMr: 'साइट नकाशा',
    href: '/sitemap',
  },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [openDesktopMenu, setOpenDesktopMenu] = React.useState<string | null>(null);
  const [openMobileSections, setOpenMobileSections] = React.useState<Record<string, boolean>>({});
  const [fontSize, setFontSize] = React.useState<'small' | 'normal' | 'large'>('normal');
  
  const desktopNavRef = React.useRef<HTMLDivElement | null>(null);
  // Timer ref for debounced menu close — prevents gap between button & panel from flickering
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  // Get locale, setLocale and translator from i18n Context
  const { locale, setLocale, t } = useTranslation();

  // Apply font size stylesheet rule on root element
  const applyFontSize = (size: 'small' | 'normal' | 'large') => {
    if (typeof window === 'undefined') return;
    if (size === 'small') {
      document.documentElement.style.fontSize = '90%';
    } else if (size === 'large') {
      document.documentElement.style.fontSize = '110%';
    } else {
      document.documentElement.style.fontSize = '100%';
    }
  };

  React.useEffect(() => {
    const saved = localStorage.getItem('csmc-font-size') as 'small' | 'normal' | 'large';
    if (saved) {
      setFontSize(saved);
      applyFontSize(saved);
    }
  }, []);

  const changeFontSize = (size: 'small' | 'normal' | 'large') => {
    setFontSize(size);
    localStorage.setItem('csmc-font-size', size);
    applyFontSize(size);
  };

  const toggleLanguage = () => {
    setLocale(locale === 'mr' ? 'en' : 'mr');
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenMobileSections({});
  };

  React.useEffect(() => {
    if (!isMobileMenuOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isMobileMenuOpen]);

  React.useEffect(() => {
    setOpenDesktopMenu(null);
    setIsMobileMenuOpen(false);
    setOpenMobileSections({});
  }, [pathname]);

  React.useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!desktopNavRef.current) return;
      if (!desktopNavRef.current.contains(event.target as Node)) {
        setOpenDesktopMenu(null);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const isActiveLink = (href: string) => {
    if (href === '/' && pathname !== '/') return false;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const isGroupActive = (group: NavGroup) => {
    if (group.href && isActiveLink(group.href)) return true;
    if (group.items) {
      return group.items.some((item) => isActiveLink(item.href));
    }
    return false;
  };

  const toggleMobileSection = (labelKey: string) => {
    setOpenMobileSections((prev) => ({
      ...prev,
      [labelKey]: !prev[labelKey],
    }));
  };

  return (
    <>
      {/* Keyboard Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:m-2 focus:bg-amber-600 focus:text-white focus:px-4 focus:py-2.5 focus:rounded-lg focus:font-bold focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
      >
        {locale === 'mr' ? 'मुख्य मजकुराकडे जा (Skip to Content)' : 'Skip to main content'}
      </a>

      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-xl">
        {/* Top bar — Font Controls & Language */}
        <div className="border-b border-slate-200 bg-slate-950">
          <div className="container-custom flex items-center justify-end gap-3 py-1.5 text-xs">
            {/* Font controls (A- / A / A+) */}
            <div className="flex items-center gap-0.5">
              <button
                type="button"
                onClick={() => changeFontSize('small')}
                className={`px-2 py-1 text-xs font-semibold transition min-w-[28px] ${fontSize === 'small' ? 'text-white' : 'text-gray-300 hover:text-white'}`}
                aria-label="A-"
              >
                A-
              </button>
              <span className="text-gray-500">|</span>
              <button
                type="button"
                onClick={() => changeFontSize('normal')}
                className={`px-2 py-1 text-xs font-semibold transition min-w-[28px] ${fontSize === 'normal' ? 'text-white' : 'text-gray-300 hover:text-white'}`}
                aria-label="A"
              >
                A
              </button>
              <span className="text-gray-500">|</span>
              <button
                type="button"
                onClick={() => changeFontSize('large')}
                className={`px-2 py-1 text-xs font-semibold transition min-w-[28px] ${fontSize === 'large' ? 'text-white' : 'text-gray-300 hover:text-white'}`}
                aria-label="A+"
              >
                A+
              </button>
            </div>

            <span className="text-gray-500">|</span>

            {/* Language switcher */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="px-3 py-1 text-xs font-semibold text-white hover:text-gray-200 transition"
              aria-label={locale === 'mr' ? 'Switch to English' : 'मराठीत भाषा बदला'}
            >
              {locale === 'mr' ? 'English' : 'मराठी'}
            </button>
          </div>
        </div>

        {/* Main Header with Logo and Search */}
        <div className="bg-white">
          <div className="container-custom flex items-center justify-between gap-4 py-3">
            {/* Logo and Title */}
            <div className="flex items-center gap-4 min-w-0">
              {/* Logo */}
              <div className="flex-shrink-0 w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center ring-1 ring-orange-100">
                <div className="w-9 h-9 bg-orange-600 rounded-md flex items-center justify-center shadow-sm">
                  <Home className="w-5 h-5 text-white" />
                </div>
              </div>
              
              {/* Title */}
              <div className="min-w-0">
                <Link href={ROUTES.PUBLIC.HOME} className="block">
                  <h1 className="text-base sm:text-lg font-bold text-slate-950 leading-tight hover:text-orange-700 transition">
                    {t('home.hero.title')}
                  </h1>
                  <p className="hidden sm:block text-xs text-slate-500 font-medium">
                    {t('home.hero.subtitle')}
                  </p>
                </Link>
              </div>
            </div>

            {/* Search Box and Icons */}
            <div className="flex items-center gap-3">
              {/* Search Input */}
              <div className="hidden md:flex items-center bg-slate-50 rounded-lg overflow-hidden shadow-sm border border-slate-200 focus-within:border-orange-300 focus-within:ring-2 focus-within:ring-orange-100">
                <input
                  type="text"
                  placeholder="type here..."
                  className="px-3 py-2 text-sm text-slate-700 outline-none w-48 lg:w-64 bg-transparent border-0 focus:ring-0 placeholder:text-slate-400"
                />
                <button className="bg-orange-600 hover:bg-orange-700 px-4 py-2 text-white font-semibold text-sm transition">
                  Search
                </button>
              </div>

              {/* Icons */}
              <div className="flex items-center gap-2">
                <button className="w-10 h-10 bg-white rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition shadow-sm">
                  <svg className="w-5 h-5 text-slate-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                  </svg>
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-lg bg-white p-2 text-slate-700 lg:hidden min-h-[40px] min-w-[40px] hover:bg-slate-50 transition shadow-sm border border-slate-200"
                aria-label={t('nav.menu')}
                aria-expanded={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Bar (Desktop) */}
        <div className="bg-slate-900 border-t border-slate-800">
          <div className="container-custom hidden lg:block">
            <nav ref={desktopNavRef} className="flex items-center justify-start overflow-x-auto">
              {/* Home Icon Button */}
              <Link
                href={ROUTES.PUBLIC.HOME}
                className={`flex-shrink-0 flex items-center justify-center px-4 py-2.5 text-sm font-medium transition border-r border-white/10 ${
                  pathname === '/'
                    ? 'bg-orange-600 text-white'
                    : 'text-slate-200 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Home className="h-4 w-4" />
              </Link>

              {navGroups.map((group) => {
                const hasSubItems = Boolean(group.items && group.items.length > 0);
                const active = isGroupActive(group);

                if (!hasSubItems && group.labelKey !== 'nav.home') {
                  return (
                    <Link
                      key={group.labelKey}
                      href={group.href!}
                      className={`flex-shrink-0 px-3 py-2.5 text-xs font-medium transition border-r border-white/10 whitespace-nowrap ${
                        active
                          ? 'bg-orange-600 text-white'
                          : 'text-slate-200 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {locale === 'mr' ? group.labelMr : group.labelEn}
                    </Link>
                  );
                }

                if (group.labelKey === 'nav.home') return null;

                const isMenuOpen = openDesktopMenu === group.labelKey;

                return (
                  <div
                    key={group.labelKey}
                    className="relative flex-shrink-0 border-r border-white/10"
                    onMouseEnter={() => {
                      if (closeTimer.current) clearTimeout(closeTimer.current);
                      setOpenDesktopMenu(group.labelKey);
                    }}
                    onMouseLeave={() => {
                      closeTimer.current = setTimeout(() => setOpenDesktopMenu(null), 120);
                    }}
                  >
                    <button
                      type="button"
                      className={`group inline-flex items-center gap-1 px-3 py-2.5 text-xs font-medium transition whitespace-nowrap ${
                        active || isMenuOpen
                          ? 'bg-orange-600 text-white'
                          : 'text-slate-200 hover:bg-white/10 hover:text-white'
                      }`}
                      aria-expanded={isMenuOpen}
                      onClick={() => {
                        if (closeTimer.current) clearTimeout(closeTimer.current);
                        setOpenDesktopMenu((prev) => (prev === group.labelKey ? null : group.labelKey));
                      }}
                    >
                      <span>{locale === 'mr' ? group.labelMr : group.labelEn}</span>
                      <ChevronDown
                        className={`h-3 w-3 transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`}
                      />
                    </button>

                    {isMenuOpen && (
                      <div
                        className="absolute left-0 top-full w-[20rem] z-50"
                        onMouseEnter={() => {
                          if (closeTimer.current) clearTimeout(closeTimer.current);
                        }}
                        onMouseLeave={() => {
                          closeTimer.current = setTimeout(() => setOpenDesktopMenu(null), 120);
                        }}
                      >
                        <div className="h-2 w-full" />
                        <div className="rounded-lg border border-slate-200 bg-white p-2 shadow-xl animate-fade-in-down max-h-[70vh] overflow-y-auto">
                          <div className="space-y-1">
                            {group.items?.map((item) => (
                              <Link
                                key={item.labelKey}
                                href={item.href}
                                className={`block rounded-md px-3 py-2.5 text-sm transition-all ${
                                  isActiveLink(item.href)
                                    ? 'bg-orange-50 text-orange-800 font-semibold'
                                    : 'text-slate-700 hover:bg-slate-50 hover:text-slate-950'
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  <span>{locale === 'mr' ? item.labelMr : item.labelEn}</span>
                                  {item.requiresLogin && (
                                    <Lock size={10} className="text-orange-400" aria-label={locale === 'mr' ? 'लॉगिन आवश्यक' : 'Login Required'} />
                                  )}
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div
          className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${isMobileMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
          aria-hidden={!isMobileMenuOpen}
        >
          {/* Backdrop */}
          <button
            type="button"
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            aria-label="Close mobile menu overlay"
            onClick={closeMenu}
          />

          {/* Drawer Body */}
          <aside
            className={`absolute right-0 top-0 flex h-full w-[88%] max-w-sm flex-col bg-white text-slate-900 shadow-2xl transition-transform duration-300 ease-out ${
              isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-4">
              <div>
                <p className="text-xs font-bold tracking-wider text-orange-400 uppercase">CSMC Menu</p>
                <p className="text-sm text-slate-600 font-medium">{t('nav.menu')}</p>
              </div>
              <button
                type="button"
                className="rounded-lg border border-slate-200 bg-white p-2.5 text-slate-700 min-h-[44px] min-w-[44px] hover:bg-slate-100 transition"
                aria-label={t('nav.close')}
                onClick={closeMenu}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Nav content */}
            <nav className="flex-1 overflow-y-auto px-5 py-6 space-y-4 bg-white">
              <div className="space-y-3">
                <Link
                  href={ROUTES.PUBLIC.COMPLAINTS.NEW}
                  className="block rounded-lg bg-orange-600 py-3.5 text-center font-bold text-white transition hover:bg-orange-700 shadow-lg"
                  onClick={closeMenu}
                >
                  {t('common.guest_complaint')}
                </Link>
                <Link
                  href={ROUTES.LOGIN}
                  className="block rounded-lg bg-slate-900 border border-slate-800 py-3.5 text-center font-bold text-white transition hover:bg-slate-800 shadow-sm"
                  onClick={closeMenu}
                >
                  {t('common.login')}
                </Link>
              </div>

              {/* IA groups list */}
              <div className="space-y-3 pt-2">
                {navGroups.map((group) => {
                  const hasSubItems = Boolean(group.items && group.items.length > 0);
                  if (!hasSubItems) {
                    return (
                      <Link
                        key={group.labelKey}
                        href={group.href!}
                        className={`flex items-center gap-2 rounded-lg border bg-white px-4 py-3.5 text-sm font-bold ${
                          isActiveLink(group.href!)
                            ? 'bg-orange-50 text-orange-800 border-orange-200'
                            : 'text-slate-800 border-slate-200 hover:border-orange-200 hover:bg-orange-50'
                        }`}
                        onClick={closeMenu}
                      >
                        {group.labelKey === 'nav.home' ? (
                          <>
                            <Home className="h-4 w-4 text-orange-400" />
                            <span>{locale === 'mr' ? group.labelMr : group.labelEn}</span>
                          </>
                        ) : (
                          locale === 'mr' ? group.labelMr : group.labelEn
                        )}
                      </Link>
                    );
                  }

                  const isSectionOpen = Boolean(openMobileSections[group.labelKey]);

                  return (
                    <div key={group.labelKey} className="rounded-lg border border-slate-200 bg-white">
                      <button
                        type="button"
                        className="flex w-full items-center justify-between px-4 py-3.5 text-left text-sm font-bold text-slate-900 hover:bg-slate-50 rounded-t-lg transition"
                        onClick={() => toggleMobileSection(group.labelKey)}
                        aria-expanded={isSectionOpen}
                      >
                        <span>{locale === 'mr' ? group.labelMr : group.labelEn}</span>
                        <ChevronDown className={`h-4 w-4 text-orange-400 transition-transform duration-200 ${isSectionOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {isSectionOpen && (
                        <div className="space-y-1.5 border-t border-slate-200 bg-slate-50 px-3 py-3 max-h-60 overflow-y-auto">
                          {group.items?.map((item) => (
                            <Link
                              key={item.labelKey}
                              href={item.href}
                              className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm transition ${
                                isActiveLink(item.href)
                                  ? 'bg-white text-orange-800 font-semibold border border-orange-200'
                                  : 'text-slate-700 hover:bg-white font-medium'
                              }`}
                              onClick={closeMenu}
                            >
                              <span className="flex items-center gap-1.5">
                                {locale === 'mr' ? item.labelMr : item.labelEn}
                                {item.requiresLogin && (
                                  <Lock size={11} className="text-orange-400" aria-label={locale === 'mr' ? 'लॉगिन आवश्यक' : 'Login Required'} />
                                )}
                              </span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </nav>
          </aside>
        </div>
      </header>
    </>
  );
}
