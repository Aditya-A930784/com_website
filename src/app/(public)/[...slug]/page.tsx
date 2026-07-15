'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  FileText, 
  Download, 
  Lock, 
  Search, 
  Calculator, 
  Send, 
  CheckCircle,
  HelpCircle,
  Phone,
  Mail,
  MapPin,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  ChevronRight
} from 'lucide-react';

import PageShell from '@/components/pages/page-shell';
import { useTranslation } from '@/lib/i18n/LanguageContext';
import { NAVIGATION_CONTENT, PageContent } from '@/lib/constants/navigation-content';
import { ROUTES } from '@/lib/constants/routes';

// Categories for Sidebar Navigation
const CATEGORY_MAP: Record<string, { mr: string; en: string; prefix: string; items: { path: string; mr: string; en: string }[] }> = {
  about: {
    mr: 'आमच्याविषयी',
    en: 'About Us',
    prefix: 'about',
    items: [
      { path: 'history', mr: 'इतिहास', en: 'History' },
      { path: 'mayor', mr: 'मा. महापौर', en: 'Hon. Mayor' },
      { path: 'commissioner', mr: 'मा. आयुक्त', en: 'Hon. Commissioner' },
      { path: 'structure', mr: 'प्रशासकीय रचना', en: 'Administrative Structure' },
      { path: 'charter', mr: 'नागरी सनद', en: 'Citizen Charter' },
    ]
  },
  organization: {
    mr: 'संघटना',
    en: 'Organization',
    prefix: 'organization',
    items: [
      { path: 'structure', mr: 'संघटनात्मक रचना', en: 'Organizational Structure' },
      { path: 'departments', mr: 'विभागांची यादी', en: 'List of Departments' },
      { path: 'committees', mr: 'समित्या', en: 'Committees' },
      { path: 'standing-committee', mr: 'स्थायी समिती', en: 'Standing Committee' },
    ]
  },
  departments: {
    mr: 'विभाग',
    en: 'Departments',
    prefix: 'departments',
    items: [
      { path: 'health', mr: 'आरोग्य विभाग', en: 'Health Department' },
      { path: 'water', mr: 'पाणीपुरवठा विभाग', en: 'Water Supply' },
      { path: 'waste', mr: 'घनकचरा व्यवस्थापन', en: 'Solid Waste Management' },
      { path: 'fire', mr: 'अग्निशमन विभाग', en: 'Fire Department' },
      { path: 'planning', mr: 'नगर रचना विभाग', en: 'Town Planning' },
      { path: 'engineering', mr: 'अभियांत्रिकी विभाग', en: 'Engineering' },
      { path: 'education', mr: 'शिक्षण विभाग', en: 'Education' },
      { path: 'garden', mr: 'उद्यान विभाग', en: 'Garden Department' },
      { path: 'tax', mr: 'कर विभाग', en: 'Tax Department' },
      { path: 'birth-death', mr: 'जन्म-मृत्यू नोंदणी', en: 'Birth & Death' },
      { path: 'accounts', mr: 'लेखा विभाग', en: 'Accounts Department' },
      { path: 'legal', mr: 'कायदेशीर विभाग', en: 'Legal Department' },
      { path: 'it', mr: 'आयटी विभाग', en: 'IT Department' },
    ]
  },
  zones: {
    mr: 'झोन / प्रभाग',
    en: 'Zones / Wards',
    prefix: 'zones',
    items: [
      { path: 'zone-1', mr: 'झोन १', en: 'Zone 1' },
      { path: 'zone-2', mr: 'झोन २', en: 'Zone 2' },
      { path: 'zone-3', mr: 'झोन ३', en: 'Zone 3' },
      { path: 'zone-4', mr: 'झोन ४', en: 'Zone 4' },
      { path: 'zone-5', mr: 'झोन ५', en: 'Zone 5' },
      { path: 'maps', mr: 'प्रभाग नकाशे', en: 'Ward Maps' },
      { path: 'officers', mr: 'प्रभाग अधिकारी यादी', en: 'Ward Officers' },
    ]
  },
  ncap: {
    mr: 'एनसीएपी',
    en: 'NCAP',
    prefix: 'ncap',
    items: [
      { path: 'air-quality', mr: 'हवा गुणवत्ता', en: 'Air Quality' },
      { path: 'projects', mr: 'एनसीएपी प्रकल्प', en: 'NCAP Projects' },
      { path: 'reports', mr: 'अहवाल', en: 'Reports' },
      { path: 'dashboard', mr: 'प्रगती डॅशबोर्ड', en: 'Progress Dashboard' },
    ]
  },
  rti: {
    mr: 'माहितीचा अधिकार',
    en: 'RTI Act',
    prefix: 'rti',
    items: [
      { path: 'information', mr: 'आरटीआय माहिती', en: 'RTI Information' },
      { path: 'officer', mr: 'माहिती अधिकारी', en: 'Public Information Officer' },
      { path: 'forms', mr: 'फॉर्म डाऊनलोड', en: 'Download Forms' },
      { path: 'manual', mr: 'आरटीआय मार्गदर्शक', en: 'RTI Manual' },
    ]
  },
  rts: {
    mr: 'सेवांचा अधिकार (RTS)',
    en: 'RTS Act',
    prefix: 'rts',
    items: [
      { path: 'services', mr: 'अधिसूचित सेवा', en: 'Services' },
      { path: 'process', mr: 'अर्ज प्रक्रिया', en: 'Application Process' },
      { path: 'time-limits', mr: 'वेळ मर्यादा', en: 'Time Limits' },
      { path: 'apply', mr: 'ऑनलाईन अर्ज', en: 'Online Application' },
    ]
  },
  census: {
    mr: 'जनगणना',
    en: 'Census',
    prefix: 'census',
    items: [
      { path: 'information', mr: 'जनगणना माहिती', en: 'Census Information' },
      { path: 'notifications', mr: 'सूचना व पत्रके', en: 'Notifications' },
      { path: 'reports', mr: 'अहवाल', en: 'Reports' },
      { path: 'statistics', mr: 'सांख्यिकी आकडेवारी', en: 'Statistics' },
    ]
  },
  recruitment: {
    mr: 'पदभरती',
    en: 'Recruitment',
    prefix: 'recruitment',
    items: [
      { path: 'vacancies', mr: 'रिक्त जागा', en: 'Current Vacancies' },
      { path: 'results', mr: 'परीक्षा निकाल', en: 'Results' },
      { path: 'admit-card', mr: 'प्रवेशपत्र', en: 'Admit Card' },
      { path: 'notifications', mr: 'सूचना व परिपत्रके', en: 'Notifications' },
      { path: 'apply', mr: 'ऑनलाईन अर्ज माहिती', en: 'Apply Online Info' },
    ]
  },
  election: {
    mr: 'सार्वत्रिक निवडणूक',
    en: 'General Election',
    prefix: 'election',
    items: [
      { path: 'information', mr: 'निवडणूक माहिती', en: 'Election Information' },
      { path: 'voter-list', mr: 'मतदार यादी', en: 'Voter List' },
      { path: 'polling', mr: 'मतदान केंद्रे', en: 'Polling Stations' },
      { path: 'results', mr: 'निकाल', en: 'Results' },
      { path: 'notifications', mr: 'अधिसूचना व नियम', en: 'Notifications' },
    ]
  },
  dp: {
    mr: 'डीपी योजना',
    en: 'DP Plan',
    prefix: 'dp',
    items: [
      { path: 'development', mr: 'विकास योजना', en: 'Development Plan' },
      { path: 'master', mr: 'मास्टर प्लॅन', en: 'Master Plan' },
      { path: 'gis', mr: 'जीआयएस नकाशे', en: 'GIS Maps' },
      { path: 'landuse', mr: 'भू-वापर नियम', en: 'Land Use' },
      { path: 'download', mr: 'नकाशे डाऊनलोड', en: 'Download Maps' },
    ]
  },
  contact: {
    mr: 'संपर्क',
    en: 'Contact Us',
    prefix: 'contact',
    items: [
      { path: 'phones', mr: 'दूरध्वनी निर्देशिका', en: 'Phone Numbers' },
      { path: 'email', mr: 'ईमेल निर्देशिका', en: 'Email Directory' },
      { path: 'feedback', mr: 'अभिप्राय फॉर्म', en: 'Feedback Form' },
    ]
  }
};

export default function CatchAllPublicPage({ params }: { params: { slug?: string[] } }) {
  const { t, locale } = useTranslation();
  const router = useRouter();
  const routeKey = (params.slug ?? []).join('/');
  
  // Safeguard redirects for complaint flows
  React.useEffect(() => {
    if (routeKey === 'services/complaint/new') {
      router.replace('/complaints/new');
    } else if (routeKey === 'services/complaint/track') {
      router.replace('/complaints/track');
    }
  }, [routeKey, router]);

  // Find current category for side-navigation
  const currentCategoryKey = params.slug?.[0] ?? '';
  const currentCategory = CATEGORY_MAP[currentCategoryKey];

  // Resolve content
  const pageContent = NAVIGATION_CONTENT[routeKey];

  // --- Interactive Widgets State ---
  // 1. Tax Calculator
  const [calcZone, setCalcZone] = useState('zone-1');
  const [calcType, setCalcType] = useState('rcc');
  const [calcArea, setCalcArea] = useState('');
  const [calcResult, setCalcResult] = useState<null | { general: number; water: number; education: number; total: number }>(null);

  // 2. Feedback Form
  const [feedbackName, setFeedbackName] = useState('');
  const [feedbackEmail, setFeedbackEmail] = useState('');
  const [feedbackPhone, setFeedbackPhone] = useState('');
  const [feedbackDept, setFeedbackDept] = useState('general');
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaValue] = useState(() => Math.floor(1000 + Math.random() * 9000).toString());
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  // 3. RTI Officers Search
  const [rtiSearch, setRtiSearch] = useState('');
  const rtiOfficers = useMemo(() => [
    { dept: 'सामान्य प्रशासन', deptEn: 'General Administration', officer: 'श्री. एम. पी. पाटील', officerEn: 'Mr. M. P. Patil', phone: '0240-2331105', authority: 'अतिरिक्त आयुक्त', authorityEn: 'Additional Commissioner' },
    { dept: 'पाणी पुरवठा विभाग', deptEn: 'Water Supply Department', officer: 'श्री. एस. व्ही. जाधव', officerEn: 'Mr. S. V. Jadhav', phone: '0240-2333501', authority: 'शहर अभियंता', authorityEn: 'City Engineer' },
    { dept: 'शहर रचना विभाग', deptEn: 'Town Planning Department', officer: 'श्रीमती. एस. पी. कुलकर्णी', officerEn: 'Mrs. S. P. Kulkarni', phone: '0240-2331572', authority: 'मुख्य नियोजक', authorityEn: 'Chief Town Planner' },
    { dept: 'आरोग्य व स्वच्छता', deptEn: 'Health & Sanitation', officer: 'डॉ. बी. आर. राठोड', officerEn: 'Dr. B. R. Rathod', phone: '0240-2331502', authority: 'वैद्यकीय आरोग्य अधिकारी', authorityEn: 'Medical Officer of Health' },
    { dept: 'कर व महसूल विभाग', deptEn: 'Tax & Revenue Department', officer: 'श्री. आर. डी. पवार', officerEn: 'Mr. R. D. Pawar', phone: '0240-2331590', authority: 'उपायुक्त (कर)', authorityEn: 'Deputy Commissioner (Tax)' }
  ], []);

  const filteredRtiOfficers = useMemo(() => {
    if (!rtiSearch) return rtiOfficers;
    const query = rtiSearch.toLowerCase();
    return rtiOfficers.filter(o => 
      o.dept.toLowerCase().includes(query) || 
      o.deptEn.toLowerCase().includes(query) ||
      o.officer.toLowerCase().includes(query) ||
      o.officerEn.toLowerCase().includes(query) ||
      o.authority.toLowerCase().includes(query) ||
      o.authorityEn.toLowerCase().includes(query)
    );
  }, [rtiSearch, rtiOfficers]);

  // --- Handlers ---
  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const area = parseFloat(calcArea);
    if (isNaN(area) || area <= 0) {
      alert(locale === 'mr' ? 'कृपया योग्य चटई क्षेत्रफळ टाका' : 'Please enter a valid built-up area');
      return;
    }

    // Rough rate multiplier based on construction type
    let rate = 12; // load bearing
    if (calcType === 'rcc') rate = 18;
    else if (calcType === 'open') rate = 6;

    // Zone multiplier
    let zoneMult = 1.0;
    if (calcZone === 'zone-1' || calcZone === 'zone-3') zoneMult = 1.2; // Premium zones

    const baseTax = area * rate * zoneMult;
    const general = Math.round(baseTax * 0.5);
    const water = Math.round(baseTax * 0.3);
    const education = Math.round(baseTax * 0.1);
    const total = general + water + education;

    setCalcResult({ general, water, education, total });
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackName || !feedbackMsg) {
      alert(locale === 'mr' ? 'नाव आणि संदेश अनिवार्य आहे' : 'Name and Message are required');
      return;
    }
    if (captchaInput !== captchaValue) {
      alert(locale === 'mr' ? 'चुकीचा कॅप्चा कोड टाकला आहे' : 'Invalid Captcha Code entered');
      return;
    }
    setFeedbackSubmitted(true);
  };

  // If page content is not found in our database, show a premium 404/not found layout
  if (!pageContent) {
    return (
      <PageShell
        eyebrow={locale === 'mr' ? 'माहिती उपलब्ध नाही' : 'Information Unavailable'}
        title={locale === 'mr' ? 'पृष्ठ सापडले नाही' : 'Page Not Found'}
        description={locale === 'mr' ? 'आम्ही या माहितीवर काम करत आहोत. कृपया नंतर तपासा.' : 'We are updating the content for this page. Please check back later.'}
      >
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <HelpCircle size={80} className="text-orange-500 mb-6 animate-bounce" />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            {locale === 'mr' ? 'माहिती लवकरच जोडली जाईल' : 'Content Coming Soon'}
          </h2>
          <p className="text-slate-600 max-w-md mb-8">
            {locale === 'mr' 
              ? 'छत्रपती संभाजीनगर महानगरपालिकेच्या नवीन नागरिक पोर्टलवर तुमचे स्वागत आहे. या पानाचे काम सध्या सुरू आहे.'
              : 'Welcome to the upgraded CSMC Portal. This section is currently being integrated.'}
          </p>
          <div className="flex gap-4">
            <Link 
              href={ROUTES.HOME}
              className="bg-orange-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-orange-700 transition"
            >
              {locale === 'mr' ? 'मुख्यपृष्ठावर जा' : 'Go to Homepage'}
            </Link>
            <button 
              onClick={() => router.back()}
              className="border border-slate-300 text-slate-700 px-6 py-2.5 rounded-xl font-semibold hover:bg-slate-50 transition"
            >
              {locale === 'mr' ? 'मागे जा' : 'Go Back'}
            </button>
          </div>
        </div>
      </PageShell>
    );
  }

  const title = locale === 'mr' ? pageContent.titleMr : pageContent.titleEn;
  const description = locale === 'mr' ? pageContent.descriptionMr : pageContent.descriptionEn;
  const eyebrow = locale === 'mr' ? pageContent.eyebrowMr : pageContent.eyebrowEn;

  return (
    <PageShell eyebrow={eyebrow} title={title} description={description}>
      <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-8 items-start">
        
        {/* --- Category Sidebar Navigation (Desktop only) --- */}
        {currentCategory && (
          <aside className="hidden lg:block sticky top-24 border border-slate-200 rounded-2xl bg-slate-50/50 p-4 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 px-2">
              {locale === 'mr' ? currentCategory.mr : currentCategory.en}
            </h3>
            <nav className="space-y-1">
              {currentCategory.items.map((item) => {
                const itemHref = `/${currentCategory.prefix}/${item.path}`;
                const isActive = routeKey === `${currentCategory.prefix}/${item.path}`;
                return (
                  <Link
                    key={item.path}
                    href={itemHref}
                    className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm transition-all duration-200 ${
                      isActive
                        ? 'bg-orange-600 text-white font-bold shadow-md shadow-orange-600/10'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <BookOpen size={14} className="shrink-0" />
                    <span className="truncate">{locale === 'mr' ? item.mr : item.en}</span>
                  </Link>
                );
              })}
            </nav>
          </aside>
        )}

        {/* --- Main Content Area --- */}
        <div className="space-y-8">
          
          {/* --- Citizen Authentication Gate --- */}
          {pageContent.requiresLogin && (
            <div className="rounded-3xl border border-orange-200 bg-orange-50/50 p-6 md:p-8 text-center shadow-sm">
              <div className="mx-auto w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center text-orange-700 mb-4">
                <Lock size={28} />
              </div>
              <h2 className="text-2xl font-bold text-slate-950 mb-3">
                {locale === 'mr' ? 'खाते लॉगिन आवश्यक आहे' : 'Citizen Login Required'}
              </h2>
              <p className="text-slate-600 max-w-lg mx-auto mb-6 text-sm md:text-base leading-relaxed">
                {locale === 'mr' 
                  ? 'या सुरक्षित सेवेचा लाभ घेण्यासाठी तुम्हाला तुमच्या अधिकृत नागरिक पोर्टल खात्यात लॉगिन करणे आवश्यक आहे. जर तुमचे खाते नसेल, तर तुम्ही नवीन नोंदणी करू शकता.'
                  : 'To access this secure portal service, you must log in to your registered citizen account. If you do not have an account, you can easily register online.'}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <Link
                  href={ROUTES.LOGIN}
                  className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-8 py-3 rounded-2xl transition shadow-md shadow-orange-600/10 flex items-center justify-center gap-2"
                >
                  {locale === 'mr' ? 'लॉगिन करा' : 'Log In'} <ArrowRight size={16} />
                </Link>
                <Link
                  href={ROUTES.REGISTER}
                  className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold px-8 py-3 rounded-2xl transition flex items-center justify-center"
                >
                  {locale === 'mr' ? 'नवीन नोंदणी' : 'Create Account'}
                </Link>
              </div>
            </div>
          )}

          {/* --- Render Standard Sections --- */}
          {pageContent.sections.map((section, idx) => (
            <section key={idx} className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900 border-b pb-3 flex items-center gap-2">
                <span className="h-5 w-1 bg-orange-600 rounded" />
                {locale === 'mr' ? section.headingMr : section.headingEn}
              </h2>
              <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                {locale === 'mr' ? section.contentMr : section.contentEn}
              </p>

              {/* Bullet Points */}
              {section.bulletPointsEn && section.bulletPointsMr && (
                <ul className="list-disc pl-6 space-y-2 text-sm md:text-base text-gray-700">
                  {(locale === 'mr' ? section.bulletPointsMr : section.bulletPointsEn).map((pt, pidx) => (
                    <li key={pidx}>{pt}</li>
                  ))}
                </ul>
              )}

              {/* Data Table */}
              {section.table && (
                <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm bg-white">
                  <table className="min-w-full divide-y divide-slate-200 text-sm">
                    <thead className="bg-slate-50">
                      <tr>
                        {(locale === 'mr' ? section.table.headersMr : section.table.headersEn).map((h, hidx) => (
                          <th key={hidx} className="px-4 py-3 text-left font-bold text-slate-900">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                      {(locale === 'mr' ? section.table.rowsMr : section.table.rowsEn).map((row, ridx) => (
                        <tr key={ridx} className="hover:bg-slate-50/50">
                          {row.map((cell, cidx) => (
                            <td key={cidx} className="px-4 py-3 text-slate-700 whitespace-nowrap">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Document Downloads */}
              {section.downloads && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {section.downloads.map((doc, didx) => (
                    <div 
                      key={didx}
                      className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:border-orange-200 transition"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="rounded-lg bg-orange-50 p-2.5 text-orange-600 shrink-0">
                          <FileText size={20} />
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-bold text-slate-900 text-xs md:text-sm truncate">
                            {locale === 'mr' ? doc.titleMr : doc.titleEn}
                          </h4>
                          <span className="text-[10px] text-slate-500 uppercase">{doc.size}</span>
                        </div>
                      </div>
                      <a 
                        href={doc.url}
                        className="bg-slate-100 hover:bg-orange-100 text-slate-700 hover:text-orange-700 p-2 rounded-lg transition shrink-0 ml-4"
                        aria-label="Download Document"
                      >
                        <Download size={16} />
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}

          {/* --- Render Interactive Widgets --- */}
          
          {/* A. Property Tax Calculator */}
          {pageContent.interactiveType === 'calculator' && (
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-md">
              <h2 className="text-xl font-bold text-slate-950 mb-4 flex items-center gap-2">
                <Calculator className="text-orange-600" />
                {locale === 'mr' ? 'कर आकारणी कॅल्क्युलेटर' : 'Tax Estimator Tool'}
              </h2>
              <form onSubmit={handleCalculate} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    {locale === 'mr' ? 'झोन निवडा' : 'Select Zone'}
                  </label>
                  <select 
                    value={calcZone}
                    onChange={(e) => setCalcZone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="zone-1">{locale === 'mr' ? 'झोन १' : 'Zone 1'}</option>
                    <option value="zone-2">{locale === 'mr' ? 'झोन २' : 'Zone 2'}</option>
                    <option value="zone-3">{locale === 'mr' ? 'झोन ३' : 'Zone 3'}</option>
                    <option value="zone-4">{locale === 'mr' ? 'झोन ४' : 'Zone 4'}</option>
                    <option value="zone-5">{locale === 'mr' ? 'झोन ५' : 'Zone 5'}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    {locale === 'mr' ? 'बांधकाम प्रकार' : 'Construction Type'}
                  </label>
                  <select 
                    value={calcType}
                    onChange={(e) => setCalcType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="rcc">{locale === 'mr' ? 'आरसीसी (RCC)' : 'RCC Structural'}</option>
                    <option value="load">{locale === 'mr' ? 'लोड बेअरिंग' : 'Load Bearing'}</option>
                    <option value="open">{locale === 'mr' ? 'मोकळी जागा' : 'Open Land Plot'}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    {locale === 'mr' ? 'चटई क्षेत्रफळ (चौ. फूट)' : 'Built-up Area (Sq. Ft.)'}
                  </label>
                  <div className="flex gap-2">
                    <input 
                      type="number"
                      placeholder="e.g. 1000"
                      value={calcArea}
                      onChange={(e) => setCalcArea(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <button 
                      type="submit"
                      className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-5 py-2 rounded-xl text-sm transition"
                    >
                      {locale === 'mr' ? 'गणन करा' : 'Calculate'}
                    </button>
                  </div>
                </div>
              </form>

              {calcResult && (
                <div className="mt-6 p-5 rounded-2xl bg-orange-50/50 border border-orange-100 space-y-3">
                  <h3 className="font-bold text-slate-900 text-sm">
                    {locale === 'mr' ? 'अंदाजे कर पत्रक तपशील' : 'Estimated Tax Summary Breakdown'}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs md:text-sm">
                    <div>
                      <p className="text-slate-500">{locale === 'mr' ? 'सामान्य कर (५०%)' : 'General Tax (50%)'}</p>
                      <p className="font-bold text-slate-900 mt-1">₹{calcResult.general}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">{locale === 'mr' ? 'पाणी कर (३०%)' : 'Water Cess (30%)'}</p>
                      <p className="font-bold text-slate-900 mt-1">₹{calcResult.water}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">{locale === 'mr' ? 'शिक्षण कर (१०%)' : 'Education Cess (10%)'}</p>
                      <p className="font-bold text-slate-900 mt-1">₹{calcResult.education}</p>
                    </div>
                    <div className="border-t sm:border-t-0 sm:border-l pt-2 sm:pt-0 sm:pl-4">
                      <p className="text-slate-950 font-bold">{locale === 'mr' ? 'एकूण वार्षिक कर' : 'Total Annual Tax'}</p>
                      <p className="font-extrabold text-orange-700 text-lg mt-1">₹{calcResult.total}</p>
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-500 italic mt-2">
                    {locale === 'mr' 
                      ? '*हा केवळ एक ढोबळ अंदाज आहे. अंतिम कर रक्कम मनपा कर निरीक्षकांच्या मूल्यमापनावर अवलंबून असेल.' 
                      : '*This is an approximate estimate. Final billing depends on actual valuation by tax inspectors.'}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* B. Feedback Form */}
          {pageContent.interactiveType === 'feedback' && (
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-md max-w-2xl">
              {feedbackSubmitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                    <CheckCircle size={28} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {locale === 'mr' ? 'अभिप्राय यशस्वीरित्या सबमिट केला!' : 'Feedback Submitted Successfully!'}
                  </h3>
                  <p className="text-slate-600 text-sm">
                    {locale === 'mr' 
                      ? 'महानगरपालिकेच्या सुधारणेसाठी तुमचा अभिप्राय महत्त्वपूर्ण आहे. धन्यवाद.' 
                      : 'Thank you for sharing your feedback. We appreciate your contribution to city improvement.'}
                  </p>
                  <button 
                    onClick={() => {
                      setFeedbackSubmitted(false);
                      setFeedbackName('');
                      setFeedbackEmail('');
                      setFeedbackPhone('');
                      setFeedbackMsg('');
                      setCaptchaInput('');
                    }}
                    className="bg-orange-600 text-white font-bold px-6 py-2 rounded-xl text-sm hover:bg-orange-700 transition"
                  >
                    {locale === 'mr' ? 'दुसरा अभिप्राय पाठवा' : 'Submit Another Feedback'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                  <h2 className="text-lg font-bold text-slate-900 border-b pb-2 flex items-center gap-2">
                    <Send className="text-orange-600" size={18} />
                    {locale === 'mr' ? 'अभिप्राय नोंदवा' : 'Submit Feedback'}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">{locale === 'mr' ? 'पूर्ण नाव' : 'Full Name'}</label>
                      <input 
                        type="text"
                        required
                        value={feedbackName}
                        onChange={(e) => setFeedbackName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="e.g. Rahul Patil"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">{locale === 'mr' ? 'ईमेल आयडी' : 'Email Address'}</label>
                      <input 
                        type="email"
                        value={feedbackEmail}
                        onChange={(e) => setFeedbackEmail(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">{locale === 'mr' ? 'मोबाईल नंबर' : 'Phone Number'}</label>
                      <input 
                        type="tel"
                        value={feedbackPhone}
                        onChange={(e) => setFeedbackPhone(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="e.g. 98xxxxxxxx"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">{locale === 'mr' ? 'विभाग' : 'Department'}</label>
                      <select 
                        value={feedbackDept}
                        onChange={(e) => setFeedbackDept(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                      >
                        <option value="general">{locale === 'mr' ? 'सामान्य प्रशासन' : 'General'}</option>
                        <option value="water">{locale === 'mr' ? 'पाणीपुरवठा' : 'Water Supply'}</option>
                        <option value="sanitation">{locale === 'mr' ? 'आरोग्य व स्वच्छता' : 'Sanitation'}</option>
                        <option value="tax">{locale === 'mr' ? 'कर विभाग' : 'Tax Cell'}</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">{locale === 'mr' ? 'अभिप्राय / सूचना संदेश' : 'Message'}</label>
                    <textarea 
                      required
                      rows={4}
                      value={feedbackMsg}
                      onChange={(e) => setFeedbackMsg(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder={locale === 'mr' ? 'इथे संदेश लिहा...' : 'Type your suggestions here...'}
                    />
                  </div>
                  
                  {/* Captcha */}
                  <div className="flex items-center gap-3 border-t pt-4">
                    <div className="bg-slate-100 text-slate-700 font-mono font-bold select-none tracking-widest px-4 py-2 rounded-xl text-lg border border-dashed border-slate-300">
                      {captchaValue}
                    </div>
                    <div className="flex-1">
                      <input 
                        type="text"
                        required
                        placeholder={locale === 'mr' ? 'बाजूचा कोड टाका' : 'Enter captcha code'}
                        value={captchaInput}
                        onChange={(e) => setCaptchaInput(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    <button 
                      type="submit"
                      className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition"
                    >
                      {locale === 'mr' ? 'सबमिट करा' : 'Submit'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* C. RTI Officers Directory */}
          {pageContent.interactiveType === 'rti-officers' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between border-b pb-4">
                <h3 className="font-bold text-slate-900 text-sm">
                  {locale === 'mr' ? 'जनमाहिती अधिकारी शोध सूची' : 'Search Directory'}
                </h3>
                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input 
                    type="text"
                    value={rtiSearch}
                    onChange={(e) => setRtiSearch(e.target.value)}
                    placeholder={locale === 'mr' ? 'शोध (उदा. पाणीपुरवठा, अधिकारी नाव)...' : 'Search (e.g. water, name)...'}
                    className="w-full bg-slate-100 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm bg-white">
                <table className="min-w-full divide-y divide-slate-200 text-xs md:text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-bold text-slate-900">{locale === 'mr' ? 'विभाग' : 'Department'}</th>
                      <th className="px-4 py-3 text-left font-bold text-slate-900">{locale === 'mr' ? 'जनमाहिती अधिकारी (PIO)' : 'Public Info Officer'}</th>
                      <th className="px-4 py-3 text-left font-bold text-slate-900">{locale === 'mr' ? 'दूरध्वनी' : 'Telephone'}</th>
                      <th className="px-4 py-3 text-left font-bold text-slate-900">{locale === 'mr' ? 'प्रथम अपिलीय अधिकारी' : 'Appellate Authority'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {filteredRtiOfficers.length > 0 ? (
                      filteredRtiOfficers.map((o, oidx) => (
                        <tr key={oidx} className="hover:bg-slate-50/50">
                          <td className="px-4 py-3 text-slate-900 font-semibold">{locale === 'mr' ? o.dept : o.deptEn}</td>
                          <td className="px-4 py-3 text-slate-700">{locale === 'mr' ? o.officer : o.officerEn}</td>
                          <td className="px-4 py-3 text-slate-500">{o.phone}</td>
                          <td className="px-4 py-3 text-slate-700 font-medium">{locale === 'mr' ? o.authority : o.authorityEn}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="px-4 py-8 text-center text-slate-500 italic">
                          {locale === 'mr' ? 'माहिती सापडली नाही' : 'No records found matching search query'}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* D. Sitemap */}
          {pageContent.interactiveType === 'sitemap' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(CATEGORY_MAP).map(([key, category]) => (
                <div key={key} className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5 space-y-3">
                  <h3 className="font-bold text-slate-950 border-b pb-2 text-sm flex items-center gap-1.5">
                    <span className="h-4 w-1 bg-orange-600 rounded" />
                    {locale === 'mr' ? category.mr : category.en}
                  </h3>
                  <ul className="space-y-2">
                    {category.items.map((item) => (
                      <li key={item.path}>
                        <Link 
                          href={`/${category.prefix}/${item.path}`}
                          className="text-xs text-slate-600 hover:text-orange-700 hover:underline flex items-center gap-1"
                        >
                          <ChevronRight size={10} className="text-orange-500" />
                          {locale === 'mr' ? item.mr : item.en}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </PageShell>
  );
}
