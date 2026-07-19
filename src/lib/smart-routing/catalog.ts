import { ROUTES } from '@/lib/constants/routes';

/**
 * Smart Routing — Service Catalog (MVP / Layer 1)
 *
 * The canonical list of services the router is ALLOWED to route to. Because
 * matches are drawn only from this list, the router can never send a citizen
 * to a non-existent page (unlike a free-form LLM that might hallucinate a route).
 *
 * `aliases` is the heart of the MVP: it captures how real Sambhajinagar
 * citizens actually express intent — Marathi, Hindi, romanized Marathi, English,
 * AND symptom phrases ("पाणी येत नाही" → File a Complaint), not bureaucratic
 * service names. Add to these freely; every alias you add widens coverage with
 * zero LLM cost and works fully offline.
 *
 * `stepsMr/stepsEn` seed the "guidance checklist" idea — a tiny preview of the
 * flow shown on the result card. The full stateful companion is a later phase.
 */
export interface ServiceEntry {
  id: string;
  route: string;
  iconKey: string;
  titleMr: string;
  titleEn: string;
  aliases: string[];
  stepsMr?: string[];
  stepsEn?: string[];
}

export const SERVICE_CATALOG: ServiceEntry[] = [
  {
    id: 'property-tax',
    route: ROUTES.CITIZEN.PROPERTY_TAX,
    iconKey: 'tax',
    titleMr: 'मालमत्ता कर भरा',
    titleEn: 'Pay Property Tax',
    aliases: [
      'मालमत्ता कर', 'घरपट्टी', 'कर भरा', 'कर भरायचा आहे', 'कराची पावती', 'कर पावती',
      'कर बिल', 'टॅक्स', 'property tax', 'house tax', 'ghar patti', 'gharpatti',
      'malmatta kar', 'kar', 'kar bharaycha aahe', 'tax invoice', 'tax receipt',
      'tax bill', 'pay tax',
    ],
    stepsMr: ['मालमत्ता क्रमांक टाका', 'रक्कम तपासा', 'ऑनलाइन भरा', 'पावती डाउनलोड करा'],
    stepsEn: ['Enter property number', 'Check the amount', 'Pay online', 'Download receipt'],
  },
  {
    id: 'water-bills',
    route: ROUTES.CITIZEN.WATER_BILLS,
    iconKey: 'water',
    titleMr: 'पाणीपट्टी भरा',
    titleEn: 'Pay Water Bill',
    aliases: [
      'पाणीपट्टी', 'पाणी बिल', 'पाणीपट्टी भरा', 'नळ बिल', 'पाणी कर', 'पाण्याचे बिल',
      'water bill', 'paani patti', 'panipatti', 'nal bill', 'water tax', 'pay water bill',
    ],
    stepsMr: ['ग्राहक क्रमांक टाका', 'बिल तपासा', 'ऑनलाइन भरा', 'पावती घ्या'],
    stepsEn: ['Enter consumer number', 'Check the bill', 'Pay online', 'Get receipt'],
  },
  {
    id: 'complaint-new',
    route: ROUTES.PUBLIC.COMPLAINTS.NEW,
    iconKey: 'complaint',
    titleMr: 'तक्रार नोंदवा',
    titleEn: 'File a Complaint',
    aliases: [
      'तक्रार', 'तक्रार नोंदवा', 'गाऱ्हाणे', 'समस्या', 'complaint', 'takrar',
      'takrar nondva', 'problem', 'file complaint',
      // symptom phrases — citizens describe the problem, not the service
      'पाणी येत नाही', 'नळाला पाणी नाही', 'पाणी नाही', 'कचरा', 'कचरा उचलला नाही',
      'रस्ता खराब', 'खड्डे', 'ड्रेनेज', 'गटार', 'स्ट्रीट लाइट', 'दिवा बंद', 'डास',
      'स्वच्छता', 'no water', 'garbage', 'road', 'pothole', 'drainage', 'street light',
      'sewage', 'mosquito',
    ],
    stepsMr: ['समस्या निवडा', 'स्थान टाका', 'फोटो जोडा', 'सबमिट करा — तक्रार क्रमांक मिळेल'],
    stepsEn: ['Pick the issue', 'Add location', 'Attach a photo', 'Submit — get a complaint ID'],
  },
  {
    id: 'complaint-track',
    route: ROUTES.PUBLIC.COMPLAINTS.TRACK,
    iconKey: 'track',
    titleMr: 'तक्रार स्थिती तपासा',
    titleEn: 'Track Complaint',
    aliases: [
      'तक्रार स्थिती', 'तक्रार ट्रॅक', 'स्थिती तपासा', 'तक्रार कुठे आहे', 'ट्रॅक',
      'complaint status', 'track complaint', 'takrar status', 'tracking', 'status',
    ],
    stepsMr: ['तक्रार क्रमांक टाका', 'मोबाईल क्रमांक टाका', 'स्थिती पहा'],
    stepsEn: ['Enter complaint number', 'Enter mobile number', 'View status'],
  },
  {
    id: 'certificate-birth',
    route: ROUTES.CITIZEN.CERTIFICATES.BIRTH,
    iconKey: 'certificate',
    titleMr: 'जन्म दाखला',
    titleEn: 'Birth Certificate',
    aliases: [
      'जन्म दाखला', 'जन्म प्रमाणपत्र', 'नवजात दाखला', 'birth certificate',
      'janma dakhla', 'janm praman patra', 'baby certificate',
    ],
    stepsMr: ['अर्ज भरा', 'कागदपत्रे जोडा', 'सबमिट करा', 'स्थिती तपासा'],
    stepsEn: ['Fill the form', 'Attach documents', 'Submit', 'Track status'],
  },
  {
    id: 'certificate-death',
    route: ROUTES.CITIZEN.CERTIFICATES.DEATH,
    iconKey: 'certificate',
    titleMr: 'मृत्यू दाखला',
    titleEn: 'Death Certificate',
    aliases: [
      'मृत्यू दाखला', 'मृत्यू प्रमाणपत्र', 'death certificate', 'mrutyu dakhla',
      'mrityu praman patra',
    ],
  },
  {
    id: 'certificate-marriage',
    route: ROUTES.CITIZEN.CERTIFICATES.MARRIAGE,
    iconKey: 'certificate',
    titleMr: 'विवाह दाखला',
    titleEn: 'Marriage Certificate',
    aliases: [
      'विवाह दाखला', 'लग्न दाखला', 'विवाह प्रमाणपत्र', 'marriage certificate',
      'vivah dakhla', 'lagna dakhla',
    ],
  },
  {
    id: 'certificates',
    route: ROUTES.CITIZEN.CERTIFICATES.BASE,
    iconKey: 'certificate',
    titleMr: 'सर्व प्रमाणपत्रे',
    titleEn: 'All Certificates',
    aliases: ['दाखला', 'प्रमाणपत्र', 'certificate', 'dakhla', 'praman patra'],
  },
  {
    id: 'license-trade',
    route: ROUTES.CITIZEN.LICENSES.TRADE,
    iconKey: 'license',
    titleMr: 'व्यापार परवाना',
    titleEn: 'Trade License',
    aliases: [
      'व्यापार परवाना', 'ट्रेड लायसन्स', 'दुकान परवाना', 'गुमास्ता', 'trade license',
      'vyapar parvana', 'shop license', 'gumasta',
    ],
  },
  {
    id: 'license-building',
    route: ROUTES.CITIZEN.LICENSES.BUILDING,
    iconKey: 'license',
    titleMr: 'बांधकाम परवानगी',
    titleEn: 'Building Permission',
    aliases: [
      'बांधकाम परवानगी', 'बांधकाम परवाना', 'नकाशा मंजुरी', 'building permission',
      'building license', 'bandhkam parvangi', 'construction permission',
    ],
  },
  {
    id: 'payments',
    route: ROUTES.CITIZEN.PAYMENTS,
    iconKey: 'payment',
    titleMr: 'पेमेंट व पावत्या',
    titleEn: 'Payments & Receipts',
    aliases: [
      'पेमेंट', 'पावती', 'पेमेंट इतिहास', 'माझी पेमेंट', 'भरलेले पैसे', 'payment history',
      'receipt', 'pavti', 'transaction',
    ],
  },
  {
    id: 'digital-locker',
    route: ROUTES.CITIZEN.DIGITAL_LOCKER,
    iconKey: 'locker',
    titleMr: 'डिजिटल लॉकर',
    titleEn: 'Digital Locker',
    aliases: [
      'डिजिटल लॉकर', 'कागदपत्रे', 'माझी कागदपत्रे', 'documents', 'digilocker',
      'locker', 'dastavej',
    ],
  },
  {
    id: 'tax-calculator',
    route: ROUTES.PUBLIC.SERVICES.CALCULATOR,
    iconKey: 'calculator',
    titleMr: 'कर गणना',
    titleEn: 'Tax Calculator',
    aliases: [
      'कर गणना', 'कर किती', 'कर कॅल्क्युलेटर', 'tax calculator', 'kar ganana',
      'calculate tax',
    ],
  },
  {
    id: 'documents',
    route: ROUTES.PUBLIC.DOCUMENTS,
    iconKey: 'documents',
    titleMr: 'कागदपत्रे व फॉर्म',
    titleEn: 'Documents & Forms',
    aliases: [
      'डाउनलोड', 'फॉर्म', 'अर्ज', 'download', 'form', 'application form', 'forms',
    ],
  },
  {
    id: 'officials',
    route: ROUTES.PUBLIC.ABOUT.OFFICIALS,
    iconKey: 'officials',
    titleMr: 'नगरसेवक व अधिकारी',
    titleEn: 'Officials',
    aliases: [
      'नगरसेवक', 'अधिकारी', 'प्रतिनिधी', 'नगरसेवक कोण', 'corporator', 'officials',
      'ward officer',
    ],
  },
  {
    id: 'tenders',
    route: ROUTES.PUBLIC.TENDERS,
    iconKey: 'tender',
    titleMr: 'निविदा व भरती',
    titleEn: 'Tenders & Recruitment',
    aliases: ['निविदा', 'भरती', 'नोकरी', 'tender', 'recruitment', 'jobs', 'bharti', 'vacancy'],
  },
  {
    id: 'notices',
    route: ROUTES.PUBLIC.NOTICES,
    iconKey: 'notice',
    titleMr: 'सूचना',
    titleEn: 'Notices',
    aliases: ['सूचना', 'नोटीस', 'घोषणा', 'notice', 'announcement'],
  },
  {
    id: 'contact',
    route: ROUTES.PUBLIC.CONTACT,
    iconKey: 'contact',
    titleMr: 'संपर्क',
    titleEn: 'Contact',
    aliases: ['संपर्क', 'फोन', 'पत्ता', 'हेल्पलाइन', 'contact', 'phone', 'address', 'helpline'],
  },
  {
    id: 'help-faq',
    route: ROUTES.PUBLIC.ABOUT.FAQS,
    iconKey: 'help',
    titleMr: 'मदत / प्रश्न',
    titleEn: 'Help & FAQs',
    aliases: ['मदत', 'प्रश्न', 'कसे करावे', 'faq', 'help', 'question', 'how to'],
  },
  {
    id: 'all-services',
    route: ROUTES.PUBLIC.SERVICES.BASE,
    iconKey: 'services',
    titleMr: 'सर्व सेवा',
    titleEn: 'All Services',
    aliases: ['सर्व सेवा', 'सेवा', 'all services', 'services', 'seva'],
  },
];
