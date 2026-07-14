'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, ChevronDown, Home, Lock, Menu, Search, X } from 'lucide-react';

import { ROUTES } from '@/lib/constants/routes';
import { useTranslation } from '@/lib/i18n/LanguageContext';

type NavItem = {
  labelKey: string;
  labelEn: string;
  labelMr: string;
  href: string;
  requiresLogin?: boolean;
};

type NavGroup = {
  labelKey: string;
  labelEn: string;
  labelMr: string;
  href?: string;
  items?: NavItem[];
};

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
    labelKey: 'nav.citizen-services',
    labelEn: 'Citizen Services',
    labelMr: 'नागरी सेवा',
    items: [
      { labelKey: 'service.home', labelEn: 'All Services', labelMr: 'सर्व सेवा', href: ROUTES.PUBLIC.SERVICES.BASE },
      { labelKey: 'service.property-tax', labelEn: 'Property Tax', labelMr: 'मालमत्ता कर', href: ROUTES.PUBLIC.SERVICES.PROPERTY_TAX },
      { labelKey: 'service.water-bills', labelEn: 'Water Bills', labelMr: 'पाणीपट्टी', href: ROUTES.PUBLIC.SERVICES.WATER_BILLS },
      { labelKey: 'service.certificates', labelEn: 'Certificates', labelMr: 'प्रमाणपत्रे', href: ROUTES.PUBLIC.SERVICES.CERTIFICATES },
      { labelKey: 'service.complaint-new', labelEn: 'File Complaint', labelMr: 'तक्रार नोंदवा', href: ROUTES.PUBLIC.SERVICES.COMPLAINT_NEW },
      { labelKey: 'service.complaint-track', labelEn: 'Track Complaint', labelMr: 'तक्रार स्थिती', href: ROUTES.PUBLIC.SERVICES.COMPLAINT_TRACK },
      { labelKey: 'service.calculator', labelEn: 'Tax Calculator', labelMr: 'कर गणक', href: ROUTES.PUBLIC.SERVICES.CALCULATOR },
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
    labelKey: 'nav.contact',
    labelEn: 'Contact',
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
    labelEn: 'Census',
    labelMr: 'जनगणना',
    items: [
      { labelKey: 'census.info', labelEn: 'Census Information', labelMr: 'जनगणना माहिती', href: '/census/information' },
      { labelKey: 'census.notifications', labelEn: 'Notifications', labelMr: 'सूचना', href: '/census/notifications' },
      { labelKey: 'census.reports', labelEn: 'Reports', labelMr: 'अहवाल', href: '/census/reports' },
      { labelKey: 'census.statistics', labelEn: 'Statistics', labelMr: 'सांख्यिकी', href: '/census/statistics' },
    ],
  },
  {
    labelKey: 'nav.recruitment',
    labelEn: 'Recruitment',
    labelMr: 'भरती',
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
    labelEn: 'General Election',
    labelMr: 'सर्वसाधारण निवडणूक',
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
    labelKey: 'nav.sitemap',
    labelEn: 'Site Map',
    labelMr: 'साइट नकाशा',
    href: '/sitemap',
  },
];

const primaryOrder = [
  'nav.home',
  'nav.about',
  'nav.organization',
  'nav.departments',
  'nav.citizen-services',
  'nav.tenders',
  'nav.contact',
] as const;

const primaryNav = primaryOrder
  .map((key) => navGroups.find((group) => group.labelKey === key))
  .filter((group): group is NavGroup => Boolean(group));

const secondaryNav = navGroups.filter((group) => !primaryOrder.includes(group.labelKey as (typeof primaryOrder)[number]));

const morePriorityOrder = [
  'nav.ncap',
  'nav.rti',
  'nav.rts',
  'nav.census',
  'nav.recruitment',
  'nav.election',
  'nav.dp',
  'nav.portal',
  'nav.sitemap',
] as const;

const orderedSecondaryNav = [
  ...morePriorityOrder
    .map((key) => secondaryNav.find((group) => group.labelKey === key))
    .filter((group): group is NavGroup => Boolean(group)),
  ...secondaryNav.filter((group) => !morePriorityOrder.includes(group.labelKey as (typeof morePriorityOrder)[number])),
];

type SearchBarProps = {
  compact?: boolean;
};

function SearchBar({ compact = false }: SearchBarProps) {
  return (
    <form
      role="search"
      aria-label="Site search"
      className={`flex items-center overflow-hidden rounded-lg border border-slate-200 bg-slate-50 shadow-sm focus-within:border-orange-300 focus-within:ring-2 focus-within:ring-orange-100 ${
        compact ? 'w-full md:w-[180px] lg:w-[220px] xl:w-[260px]' : 'w-full'
      }`}
    >
      <Search className="ml-3 h-4 w-4 text-slate-400" aria-hidden="true" />
      <input
        type="search"
        placeholder="Search..."
        className="w-full bg-transparent px-3 py-2 text-sm text-slate-700 outline-none placeholder:text-slate-400"
        aria-label="Search site"
      />
      <button
        type="submit"
        className="bg-orange-600 px-3 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-orange-700"
      >
        Go
      </button>
    </form>
  );
}

type LanguageSwitcherProps = {
  locale: string;
  toggleLanguage: () => void;
};

function LanguageSwitcher({ locale, toggleLanguage }: LanguageSwitcherProps) {
  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className="rounded-md px-2 py-1 text-xs font-semibold text-white transition-colors duration-200 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
      aria-label={locale === 'mr' ? 'Switch to English' : 'मराठीत भाषा बदला'}
    >
      {locale === 'mr' ? 'English' : 'मराठी'}
    </button>
  );
}

function NotificationButton() {
  return (
    <button
      type="button"
      className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors duration-200 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
      aria-label="Notifications"
    >
      <Bell className="h-5 w-5" />
    </button>
  );
}

type DropdownMenuProps = {
  id: string;
  open: boolean;
  group: NavGroup;
  locale: string;
  isActiveLink: (href: string) => boolean;
  closeMenu: () => void;
};

function DropdownMenu({ id, open, group, locale, isActiveLink, closeMenu }: DropdownMenuProps) {
  if (!group.items) return null;

  return (
    <div
      id={id}
      className={`absolute left-0 top-full z-[1010] mt-2 w-[20rem] origin-top rounded-xl border border-slate-200 bg-white p-2 shadow-xl transition-all duration-200 ${
        open ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-1 opacity-0'
      }`}
      role="menu"
      aria-label={locale === 'mr' ? group.labelMr : group.labelEn}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          closeMenu();
        }
      }}
    >
      <div className="max-h-[68vh] space-y-1 overflow-y-auto">
        {group.items.map((item) => (
          <Link
            key={item.labelKey}
            href={item.href}
            role="menuitem"
            className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors duration-200 ${
              isActiveLink(item.href)
                ? 'bg-orange-50 font-semibold text-orange-800'
                : 'text-slate-700 hover:bg-slate-50 hover:text-slate-950'
            }`}
            onClick={closeMenu}
          >
            <span>{locale === 'mr' ? item.labelMr : item.labelEn}</span>
            {item.requiresLogin && <Lock className="h-3.5 w-3.5 text-orange-400" aria-label="Login required" />}
          </Link>
        ))}
      </div>
    </div>
  );
}

type MegaMenuProps = {
  id: string;
  open: boolean;
  sections: NavGroup[];
  locale: string;
  isActiveLink: (href: string) => boolean;
  closeMenu: () => void;
};

function MegaMenu({ id, open, sections, locale, isActiveLink, closeMenu }: MegaMenuProps) {
  return (
    <div
      id={id}
      className={`absolute right-0 top-full z-[1010] mt-2 w-[30rem] origin-top rounded-xl border border-slate-200 bg-white p-3 shadow-xl transition-all duration-200 xl:w-[34rem] ${
        open ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-1 opacity-0'
      }`}
      role="menu"
      aria-label="More navigation"
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          closeMenu();
        }
      }}
    >
      <div className="mb-2 border-b border-slate-100 pb-2">
        <p className="text-xs font-bold uppercase tracking-wide text-slate-900">{locale === 'mr' ? 'अधिक विभाग' : 'More Sections'}</p>
      </div>
      <div className="grid max-h-[70vh] grid-cols-1 gap-3 overflow-y-auto pr-1 xl:grid-cols-2">
        {sections.map((section) => {
          const sectionLabel = locale === 'mr' ? section.labelMr : section.labelEn;
          const sectionHref = section.href ?? section.items?.[0]?.href;

          return (
            <section key={section.labelKey} className="rounded-lg border border-slate-100 bg-slate-50/70 p-2.5">
              {sectionHref ? (
                <Link
                  href={sectionHref}
                  className="inline-flex text-xs font-bold uppercase tracking-wide text-slate-900 hover:text-orange-700"
                  onClick={closeMenu}
                >
                  {sectionLabel}
                </Link>
              ) : (
                <p className="text-xs font-bold uppercase tracking-wide text-slate-900">{sectionLabel}</p>
              )}

              <div className="mt-2 space-y-1">
                {section.items?.map((item) => (
                  <Link
                    key={item.labelKey}
                    href={item.href}
                    role="menuitem"
                    className={`block rounded-md px-2.5 py-1.5 text-sm transition-colors duration-200 ${
                      isActiveLink(item.href)
                        ? 'bg-orange-50 font-semibold text-orange-800'
                        : 'text-slate-700 hover:bg-white hover:text-slate-950'
                    }`}
                    onClick={closeMenu}
                  >
                    {locale === 'mr' ? item.labelMr : item.labelEn}
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

type NavItemProps = {
  group: NavGroup;
  locale: string;
  active: boolean;
  isOpen: boolean;
  isDropdown: boolean;
  menuId?: string;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
};

function NavItem({ group, locale, active, isOpen, isDropdown, menuId, onOpen, onClose, onToggle }: NavItemProps) {
  const label = locale === 'mr' ? group.labelMr : group.labelEn;
  const baseClass = `group relative inline-flex items-center gap-1 border-b-2 px-3 py-[10px] text-[13px] font-semibold transition-all duration-200 xl:px-[14px] xl:text-[14px] ${
    active || isOpen
      ? 'border-orange-500 bg-orange-600/10 text-white'
      : 'border-transparent text-slate-100 hover:border-orange-300 hover:bg-white/10 hover:text-white'
  }`;

  if (!isDropdown && group.href) {
    return (
      <Link href={group.href} className={baseClass}>
        {group.labelKey === 'nav.home' && <Home className="h-4 w-4" aria-hidden="true" />}
        <span>{label}</span>
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={baseClass}
      aria-expanded={isOpen}
      aria-haspopup="menu"
      aria-controls={menuId}
      onMouseEnter={onOpen}
      onClick={onToggle}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onToggle();
          return;
        }
        if (event.key === 'ArrowDown') {
          event.preventDefault();
          onOpen();
          return;
        }
        if (event.key === 'Escape') {
          onClose();
        }
      }}
    >
      <span>{label}</span>
      <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
    </button>
  );
}

type NavbarProps = {
  locale: string;
  pathname: string;
  openDesktopMenu: string | null;
  setOpenDesktopMenu: React.Dispatch<React.SetStateAction<string | null>>;
};

function Navbar({ locale, pathname, openDesktopMenu, setOpenDesktopMenu }: NavbarProps) {
  const navRef = React.useRef<HTMLDivElement | null>(null);
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const isActiveLink = React.useCallback(
    (href: string) => {
      if (href === '/' && pathname !== '/') return false;
      return pathname === href || pathname.startsWith(`${href}/`);
    },
    [pathname]
  );

  const isGroupActive = React.useCallback(
    (group: NavGroup) => {
      if (group.href && isActiveLink(group.href)) return true;
      return Boolean(group.items?.some((item) => isActiveLink(item.href)));
    },
    [isActiveLink]
  );

  React.useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!navRef.current) return;
      if (!navRef.current.contains(event.target as Node)) {
        setOpenDesktopMenu(null);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [setOpenDesktopMenu]);

  React.useEffect(() => {
    return () => {
      if (closeTimer.current) {
        clearTimeout(closeTimer.current);
      }
    };
  }, []);

  const closeMenu = () => setOpenDesktopMenu(null);

  return (
    <div className="hidden border-t border-slate-800 bg-slate-900 lg:block">
      <div className="container-custom">
        <nav
          ref={navRef}
          className="relative flex items-center gap-3 lg:gap-3 xl:gap-4"
          onMouseLeave={() => {
            closeTimer.current = setTimeout(() => setOpenDesktopMenu(null), 120);
          }}
        >
          {primaryNav.map((group) => {
            const isDropdown = Boolean(group.items && group.items.length > 0);
            const isOpen = openDesktopMenu === group.labelKey;
            const menuId = `${group.labelKey}-menu`;

            return (
              <div
                key={group.labelKey}
                className="relative"
                onMouseEnter={() => {
                  if (closeTimer.current) clearTimeout(closeTimer.current);
                  if (isDropdown) setOpenDesktopMenu(group.labelKey);
                }}
              >
                <NavItem
                  group={group}
                  locale={locale}
                  active={isGroupActive(group)}
                  isOpen={isOpen}
                  isDropdown={isDropdown}
                  menuId={isDropdown ? menuId : undefined}
                  onOpen={() => setOpenDesktopMenu(group.labelKey)}
                  onClose={closeMenu}
                  onToggle={() => setOpenDesktopMenu((prev) => (prev === group.labelKey ? null : group.labelKey))}
                />

                {isDropdown && (
                  <DropdownMenu
                    id={menuId}
                    open={isOpen}
                    group={group}
                    locale={locale}
                    isActiveLink={isActiveLink}
                    closeMenu={closeMenu}
                  />
                )}
              </div>
            );
          })}

          <div
            className="relative"
            onMouseEnter={() => {
              if (closeTimer.current) clearTimeout(closeTimer.current);
              setOpenDesktopMenu('more');
            }}
          >
            <NavItem
              group={{ labelKey: 'nav.more', labelEn: 'More', labelMr: 'अधिक' }}
              locale={locale}
              active={secondaryNav.some((group) => isGroupActive(group))}
              isOpen={openDesktopMenu === 'more'}
              isDropdown
              menuId="nav-more-menu"
              onOpen={() => setOpenDesktopMenu('more')}
              onClose={closeMenu}
              onToggle={() => setOpenDesktopMenu((prev) => (prev === 'more' ? null : 'more'))}
            />

            <MegaMenu
              id="nav-more-menu"
              open={openDesktopMenu === 'more'}
              sections={orderedSecondaryNav}
              locale={locale}
              isActiveLink={isActiveLink}
              closeMenu={closeMenu}
            />
          </div>
        </nav>
      </div>
    </div>
  );
}

type MobileDrawerProps = {
  isOpen: boolean;
  closeMenu: () => void;
  locale: string;
  toggleLanguage: () => void;
  pathname: string;
};

function MobileDrawer({ isOpen, closeMenu, locale, toggleLanguage, pathname }: MobileDrawerProps) {
  const [openSections, setOpenSections] = React.useState<Record<string, boolean>>({});

  React.useEffect(() => {
    if (!isOpen) {
      setOpenSections({});
    }
  }, [isOpen]);

  const isActiveLink = (href: string) => {
    if (href === '/' && pathname !== '/') return false;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <div
      className={`fixed inset-0 z-[1100] lg:hidden ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      aria-hidden={!isOpen}
    >
      <button
        type="button"
        className={`absolute inset-0 bg-slate-950/70 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={closeMenu}
        aria-label="Close navigation overlay"
      />

      <aside
        className={`absolute right-0 top-0 h-full w-full bg-white shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="border-b border-slate-200 bg-slate-50 px-4 py-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-bold text-slate-900">{locale === 'mr' ? 'नेव्हिगेशन मेनू' : 'Navigation Menu'}</p>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700"
                onClick={closeMenu}
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <SearchBar />

            <div className="mt-3 flex items-center justify-between">
              <LanguageSwitcher locale={locale} toggleLanguage={toggleLanguage} />
              <NotificationButton />
            </div>
          </div>

          <nav className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {navGroups.map((group) => {
              const hasChildren = Boolean(group.items && group.items.length > 0);
              const sectionOpen = Boolean(openSections[group.labelKey]);
              const label = locale === 'mr' ? group.labelMr : group.labelEn;

              if (!hasChildren && group.href) {
                return (
                  <Link
                    key={group.labelKey}
                    href={group.href}
                    onClick={closeMenu}
                    className={`block rounded-lg border px-4 py-3 text-sm font-semibold transition-colors duration-200 ${
                      isActiveLink(group.href)
                        ? 'border-orange-200 bg-orange-50 text-orange-800'
                        : 'border-slate-200 bg-white text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    {label}
                  </Link>
                );
              }

              return (
                <section key={group.labelKey} className="overflow-hidden rounded-lg border border-slate-200 bg-white">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-slate-900"
                    aria-expanded={sectionOpen}
                    onClick={() =>
                      setOpenSections((prev) => ({
                        ...prev,
                        [group.labelKey]: !prev[group.labelKey],
                      }))
                    }
                  >
                    <span>{label}</span>
                    <ChevronDown
                      className={`h-4 w-4 text-orange-500 transition-transform duration-200 ${sectionOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  <div
                    className={`grid transition-all duration-200 ${sectionOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                    aria-hidden={!sectionOpen}
                  >
                    <div className="overflow-hidden border-t border-slate-100 bg-slate-50 px-2 py-2">
                      <div className="max-h-64 space-y-1 overflow-y-auto">
                        {group.items?.map((item) => (
                          <Link
                            key={item.labelKey}
                            href={item.href}
                            onClick={closeMenu}
                            className={`flex items-center justify-between rounded-md px-3 py-2 text-sm transition-colors duration-200 ${
                              isActiveLink(item.href)
                                ? 'bg-white font-semibold text-orange-800'
                                : 'text-slate-700 hover:bg-white'
                            }`}
                          >
                            <span>{locale === 'mr' ? item.labelMr : item.labelEn}</span>
                            {item.requiresLogin && <Lock className="h-3.5 w-3.5 text-orange-400" aria-hidden="true" />}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              );
            })}
          </nav>
        </div>
      </aside>
    </div>
  );
}

export default function Header() {
  const pathname = usePathname();
  const { locale, setLocale, t } = useTranslation();

  const [fontSize, setFontSize] = React.useState<'small' | 'normal' | 'large'>('normal');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [openDesktopMenu, setOpenDesktopMenu] = React.useState<string | null>(null);

  const applyFontSize = React.useCallback((size: 'small' | 'normal' | 'large') => {
    if (typeof window === 'undefined') return;
    if (size === 'small') {
      document.documentElement.style.fontSize = '90%';
      return;
    }
    if (size === 'large') {
      document.documentElement.style.fontSize = '110%';
      return;
    }
    document.documentElement.style.fontSize = '100%';
  }, []);

  React.useEffect(() => {
    const saved = localStorage.getItem('csmc-font-size') as 'small' | 'normal' | 'large' | null;
    if (saved) {
      setFontSize(saved);
      applyFontSize(saved);
    }
  }, [applyFontSize]);

  React.useEffect(() => {
    setOpenDesktopMenu(null);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    if (!isMobileMenuOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isMobileMenuOpen]);

  const changeFontSize = (size: 'small' | 'normal' | 'large') => {
    setFontSize(size);
    localStorage.setItem('csmc-font-size', size);
    applyFontSize(size);
  };

  const toggleLanguage = () => {
    setLocale(locale === 'mr' ? 'en' : 'mr');
  };

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-[1200] focus:rounded-lg focus:bg-amber-600 focus:px-4 focus:py-2.5 focus:font-bold focus:text-white focus:shadow-xl focus:ring-2 focus:ring-amber-500"
      >
        {locale === 'mr' ? 'मुख्य मजकुराकडे जा (Skip to Content)' : 'Skip to main content'}
      </a>

      <header className="sticky top-0 z-[1000] border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-xl">
        <div className="border-b border-slate-200 bg-slate-950">
          <div className="container-custom flex items-center justify-end gap-2 py-1.5 text-xs">
            <div className="flex items-center gap-1 text-gray-100">
              <button
                type="button"
                className={`rounded px-2 py-1 transition-colors duration-200 ${fontSize === 'small' ? 'bg-white/15 text-white' : 'hover:bg-white/10'}`}
                onClick={() => changeFontSize('small')}
                aria-label="Decrease font size"
              >
                A-
              </button>
              <button
                type="button"
                className={`rounded px-2 py-1 transition-colors duration-200 ${fontSize === 'normal' ? 'bg-white/15 text-white' : 'hover:bg-white/10'}`}
                onClick={() => changeFontSize('normal')}
                aria-label="Normal font size"
              >
                A
              </button>
              <button
                type="button"
                className={`rounded px-2 py-1 transition-colors duration-200 ${fontSize === 'large' ? 'bg-white/15 text-white' : 'hover:bg-white/10'}`}
                onClick={() => changeFontSize('large')}
                aria-label="Increase font size"
              >
                A+
              </button>
            </div>
            <span className="text-slate-500">|</span>
            <LanguageSwitcher locale={locale} toggleLanguage={toggleLanguage} />
          </div>
        </div>

        <div className="bg-white">
          <div className="container-custom flex items-center justify-between gap-3 py-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-50 ring-1 ring-orange-100">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-orange-600 shadow-sm">
                  <Home className="h-5 w-5 text-white" />
                </div>
              </div>

              <div className="min-w-0">
                <Link href={ROUTES.PUBLIC.HOME} className="block">
                  <h1 className="truncate text-base font-bold leading-tight text-slate-950 transition-colors duration-200 hover:text-orange-700 sm:text-lg">
                    {t('home.hero.title')}
                  </h1>
                  <p className="hidden text-xs font-medium text-slate-500 sm:block">{t('home.hero.subtitle')}</p>
                </Link>
              </div>
            </div>

            <div className="hidden items-center gap-3 md:flex">
              <SearchBar compact />
              <NotificationButton />
            </div>

            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition-colors duration-200 hover:bg-slate-50 lg:hidden"
              aria-label={t('nav.menu')}
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        <Navbar
          locale={locale}
          pathname={pathname}
          openDesktopMenu={openDesktopMenu}
          setOpenDesktopMenu={setOpenDesktopMenu}
        />
      </header>

      <MobileDrawer
        isOpen={isMobileMenuOpen}
        closeMenu={() => setIsMobileMenuOpen(false)}
        locale={locale}
        toggleLanguage={toggleLanguage}
        pathname={pathname}
      />
    </>
  );
}
