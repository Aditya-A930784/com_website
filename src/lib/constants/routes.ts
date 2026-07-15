export const ROUTES = {
  HOME: '/',
  
  // Authentication
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  AI_ASSISTANT: '/assistant',
  
  // Citizen Routes
  CITIZEN: {
    DASHBOARD: '/citizen/dashboard',
    PROFILE: '/citizen/profile',
    PROPERTY_TAX: '/citizen/property-tax',
    WATER_BILLS: '/citizen/water-bills',
    CERTIFICATES: {
      BASE: '/citizen/certificates',
      BIRTH: '/citizen/certificates/birth',
      DEATH: '/citizen/certificates/death',
      MARRIAGE: '/citizen/certificates/marriage',
    },
    LICENSES: {
      BASE: '/citizen/licenses',
      TRADE: '/citizen/licenses/trade',
      BUILDING: '/citizen/licenses/building',
    },
    COMPLAINTS: {
      BASE: '/citizen/complaints',
      NEW: '/citizen/complaints/new',
      TRACK: '/citizen/complaints/track',
    },
    PAYMENTS: '/citizen/payments',
    NOTIFICATIONS: '/citizen/notifications',
    DIGITAL_LOCKER: '/citizen/digital-locker',
  },
  
  // Officer Routes
  OFFICER: {
    DASHBOARD: '/officer/dashboard',
    TASKS: '/officer/tasks',
    COMPLAINTS: '/officer/complaints',
  },
  
  // Admin Routes
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    USERS: '/admin/users',
    DEPARTMENTS: '/admin/departments',
    ANALYTICS: '/admin/analytics',
    REPORTS: '/admin/reports',
    AUDIT_LOGS: '/admin/audit-logs',
    GIS_MAP: '/admin/gis-map',
    SETTINGS: '/admin/settings',
  },
  
  // Public Pages (flat — legacy, kept for backward-compat during transition)
  ABOUT: '/about',
  CONTACT: '/contact',
  SERVICES: '/services',
  NEWS: '/news',
  RTI: '/rti',
  FAQ: '/faq',

  // Public route group — unauthenticated, 6-group IA (csmc-adaptation-instructions.md §1)
  PUBLIC: {
    HOME: '/',
    SERVICES: {
      BASE: '/services',
      PROPERTY_TAX: '/services/property-tax',
      WATER_BILLS: '/services/water-bills',
      COMPLAINT_NEW: '/services/complaint/new',
      COMPLAINT_TRACK: '/services/complaint/track',
      CERTIFICATES: '/services/certificates',
      CALCULATOR: '/services/calculator',
    },
    ABOUT: {
      BASE: '/about',
      MISSION: '/about/mission',
      OFFICIALS: '/about/officials',
      FAQS: '/about/faqs',
      EMERGENCY_PLAN: '/about/emergency-plan',
    },
    TENDERS: '/tenders',
    DOCUMENTS: '/documents',
    EVENTS: '/events',
    NOTICES: '/notices',
    GALLERY: '/gallery',
    MEMBERSHIP: '/membership',
    RESOURCES: '/resources',
    CONTACT: '/contact',
    COMPLAINTS: {
      NEW: '/complaints/new',
      TRACK: '/complaints/track',
    },
    ANNOUNCEMENTS: '/announcements',
  },
} as const;

/**
 * Human-readable breadcrumb labels per route.
 * Used by <Breadcrumb /> in Phase 2 shared components.
 * Both Marathi (primary) and English (secondary) labels are stored here
 * so components never hardcode route-to-label mappings.
 */
export const ROUTE_LABELS: Record<string, { mr: string; en: string }> = {
  '/': { mr: 'मुख्यपृष्ठ', en: 'Home' },
  '/services': { mr: 'नागरी सेवा', en: 'Citizen Services' },
  '/services/property-tax': { mr: 'मालमत्ता कर', en: 'Property Tax' },
  '/services/water-bills': { mr: 'पाणीपट्टी', en: 'Water Bills' },
  '/services/complaint/new': { mr: 'तक्रार नोंदवा', en: 'File Complaint' },
  '/services/complaint/track': { mr: 'तक्रार स्थिती', en: 'Track Complaint' },
  '/services/certificates': { mr: 'प्रमाणपत्रे', en: 'Certificates' },
  '/about': { mr: 'महानगरपालिकेविषयी', en: 'About CSMC' },
  '/about/mission': { mr: 'दृष्टी व ध्येय', en: 'Vision & Mission' },
  '/about/officials': { mr: 'निवडून आलेले प्रतिनिधी', en: 'Elected Officials' },
  '/about/faqs': { mr: 'वारंवार विचारले जाणारे प्रश्न', en: 'FAQs' },
  '/about/emergency-plan': { mr: 'आपत्कालीन योजना', en: 'Emergency Plan' },
  '/tenders': { mr: 'निविदा व भरती', en: 'Tenders & Recruitment' },
  '/documents': { mr: 'कागदपत्रे व माहिती', en: 'Documents & Information' },
  '/events': { mr: 'कार्यक्रम', en: 'Events' },
  '/notices': { mr: 'सूचना', en: 'Notices' },
  '/gallery': { mr: 'छायाचित्र दालन', en: 'Gallery' },
  '/membership': { mr: 'सदस्यत्व', en: 'Membership' },
  '/resources': { mr: 'संसाधने', en: 'Resources' },
  '/contact': { mr: 'संपर्क', en: 'Contact' },
  '/complaints/new': { mr: 'तक्रार नोंदवा', en: 'File Complaint' },
  '/complaints/track': { mr: 'तक्रार स्थिती तपासा', en: 'Track Complaint' },
  '/announcements': { mr: 'घोषणा', en: 'Announcements' },
};

