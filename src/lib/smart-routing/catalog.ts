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
/**
 * A rich per-step definition for guided workflows.
 * When present on a ServiceEntry, GuidanceCompanion renders inline help + FAQs
 * per step. Backwards-compatible: services can still use plain `stepsMr/stepsEn`
 * string arrays for a simpler checklist experience.
 *
 * `sourceRef` is a placeholder for the future RAG citation layer — when Slice 3
 * ships, this becomes the anchor into the retrieved doc chunk.
 */
export interface WorkflowFAQ {
  qMr: string;
  qEn: string;
  aMr: string;
  aEn: string;
  sourceRef?: string; // e.g. 'property-tax-gr-2026.pdf#page=3'
}

export interface WorkflowStep {
  titleMr: string;
  titleEn: string;
  helpMr?: string;   // one-liner shown under the step title in the companion
  helpEn?: string;
  hintMr?: string;   // validation / format hint, e.g. "12-digit number"
  hintEn?: string;
  faqs?: WorkflowFAQ[];
}

export interface ServiceEntry {
  id: string;
  route: string;
  iconKey: string;
  titleMr: string;
  titleEn: string;
  aliases: string[];
  stepsMr?: string[];
  stepsEn?: string[];
  stepDetails?: WorkflowStep[]; // when present, overrides stepsMr/stepsEn in the companion UI
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
      // Hindi
      'संपत्ति कर', 'मकान कर', 'कर जमा', 'टैक्स भरो', 'हाउस टैक्स', 'संपत्ति टैक्स',
      // Dakhni/Urdu
      'مکان ٹیکس', 'tax bharo', 'ghar ka tax',
    ],
    stepsMr: ['मालमत्ता क्रमांक टाका', 'रक्कम तपासा', 'ऑनलाइन भरा', 'पावती डाउनलोड करा'],
    stepsEn: ['Enter property number', 'Check the amount', 'Pay online', 'Download receipt'],
    stepDetails: [
      {
        titleMr: 'मालमत्ता क्रमांक टाका',
        titleEn: 'Enter property number',
        helpMr: 'तुमच्या मागील कर पावतीवर १२-अंकी क्रमांक असतो.',
        helpEn: 'A 12-digit number on your last property tax receipt.',
        hintMr: 'फक्त अंक, कोणतेही स्पेस किंवा डॅश नाहीत',
        hintEn: 'Digits only — no spaces or dashes',
        faqs: [
          {
            qMr: 'मालमत्ता क्रमांक कसा शोधावा?',
            qEn: 'How do I find my property number?',
            aMr: 'तुमच्या मागील कर पावतीच्या वरच्या भागात १२-अंकी क्रमांक असतो. पावती हरवली असल्यास फोटो आयडी आणि पत्ता घेऊन प्रभाग कार्यालयात जा.',
            aEn: 'It\'s a 12-digit number at the top of your last property tax receipt. If lost, visit the ward office with photo ID and property address.',
          },
          {
            qMr: 'नुकतीच मालमत्ता विकत घेतली — काय क्रमांक वापरू?',
            qEn: 'I recently bought this property — which number to use?',
            aMr: 'नोंदणीनंतर ९० दिवसांपर्यंत जुन्या मालकाचा क्रमांक वापरू शकता. त्यानंतर सेल डीडसह प्रभाग कार्यालयात नाव हस्तांतरण करा.',
            aEn: 'For 90 days after registration, use the previous owner\'s number. After that, transfer ownership at ward office with sale deed.',
          },
          {
            qMr: 'क्रमांक स्वीकारला जात नाही?',
            qEn: 'Property number not accepted?',
            aMr: 'सामान्य कारणे: अतिरिक्त स्पेस किंवा डॅश. फक्त अंक टाका. तरीही चालत नसल्यास तुमची मालमत्ता अजून डिजिटलाइज्ड नसू शकते — प्रभाग कार्यालयाशी संपर्क साधा.',
            aEn: 'Common causes: extra spaces or dashes. Try just digits. If still failing, your property may not be digitised yet — contact ward office.',
          },
        ],
      },
      {
        titleMr: 'रक्कम तपासा',
        titleEn: 'Check the amount',
        helpMr: 'तुमचा कर कसा मोजला जातो हे पाहा आणि पुढे जा.',
        helpEn: 'Review how your tax was calculated before paying.',
        faqs: [
          {
            qMr: 'माझा कर कसा मोजला जातो?',
            qEn: 'How is my tax calculated?',
            aMr: 'कर = ARV (वार्षिक मूल्य) × कर दर. ARV = कार्पेट एरिया × नगरपालिका दर × १२ महिने. दर वापर (निवासी/व्यावसायिक) आणि क्षेत्रावर अवलंबून बदलतो. सविस्तर मोडणी "Breakdown" टॅबमध्ये पहा.',
            aEn: 'Tax = ARV (Annual Rateable Value) × tax rate. ARV = Carpet area × municipal rate × 12. Rate varies by usage (residential/commercial) and locality. See the "Breakdown" tab for line-by-line detail.',
          },
          {
            qMr: 'यंदा माझा कर वाढला — का?',
            qEn: 'Why is my tax higher this year?',
            aMr: 'सामान्यतः: (१) वार्षिक दर सुधारणा, (२) पुनर्वर्गीकरण (निवासी → व्यावसायिक), (३) क्षेत्रफळात बदल. "Breakdown" तपासा; चुकीचे वाटल्यास १५ दिवसांत आक्षेप घ्या.',
            aEn: 'Common reasons: (1) annual rate revision, (2) reclassification (residential → commercial), (3) area change. Check "Breakdown"; if incorrect, file objection within 15 days.',
          },
          {
            qMr: 'मी ज्येष्ठ नागरिक आहे — सूट मिळेल का?',
            qEn: 'I am a senior citizen — do I get a discount?',
            aMr: 'होय, स्व-कब्ज्यातील निवासी मालमत्तेसाठी ६०+ ज्येष्ठ नागरिकांना १०% सूट मिळते. वयाचा पुरावा एकदा प्रभाग कार्यालयात जमा करा — तो कायमस्वरूपी नोंदला जातो. (तुमच्या प्रभाग कार्यालयाकडून पुष्टी करा.)',
            aEn: 'Yes, 10% rebate for senior citizens (60+) on self-occupied residential property. Submit age proof once at ward office — it\'s recorded permanently. (Confirm with your ward office.)',
          },
          {
            qMr: 'हप्त्यांनी भरता येतो का?',
            qEn: 'Can I pay in installments?',
            aMr: 'होय, ४ त्रैमासिक हप्त्यांपर्यंत पर्याय आहे. ३० जूनपूर्वी संपूर्ण रक्कम एकरकमी भरल्यास सामान्यतः ~५% सूट मिळते.',
            aEn: 'Yes, up to 4 quarterly installments. Full lump-sum payment before June 30 usually earns ~5% early-payer discount.',
          },
        ],
      },
      {
        titleMr: 'ऑनलाइन भरा',
        titleEn: 'Pay online',
        helpMr: 'UPI, नेट बँकिंग, डेबिट/क्रेडिट कार्डसह पेमेंट करा.',
        helpEn: 'Pay via UPI, net banking, debit or credit card.',
        faqs: [
          {
            qMr: 'कोणत्या पद्धती स्वीकारल्या जातात?',
            qEn: 'Which payment methods are accepted?',
            aMr: 'UPI (सर्वात जलद), नेट बँकिंग, डेबिट कार्ड, क्रेडिट कार्ड. UPI साठी वेगळे शुल्क नाही.',
            aEn: 'UPI (fastest), net banking, debit card, credit card. UPI has no extra fees.',
          },
          {
            qMr: 'पेमेंट अयशस्वी झाले पण पैसे कापले — काय करू?',
            qEn: 'Payment failed but money debited — what now?',
            aMr: '२४ तास प्रतीक्षा करा — बहुतेक स्वयंचलितपणे परत केले जातात. न झाल्यास "पेमेंट समस्या" तक्रार आपल्या ट्रान्झॅक्शन आयडीसह नोंदवा.',
            aEn: 'Wait 24 hours — most auto-refund. If not, file a "Payment issue" complaint with your transaction ID.',
          },
        ],
      },
      {
        titleMr: 'पावती डाउनलोड करा',
        titleEn: 'Download receipt',
        helpMr: 'पावती PDF स्वरूपात मिळेल — भविष्यासाठी जतन करा.',
        helpEn: 'Receipt comes as PDF — save for future reference.',
        faqs: [
          {
            qMr: 'पावती हरवली — पुन्हा मिळेल का?',
            qEn: 'I lost my receipt — can I get it back?',
            aMr: 'होय. लॉगिन → पेमेंट व पावत्या → मालमत्ता क्रमांकाने शोधा. मागील ५ वर्षांच्या पावत्या उपलब्ध.',
            aEn: 'Yes. Log in → Payments & Receipts → search by property number. Last 5 years available.',
          },
          {
            qMr: 'पावतीत चुकीची रक्कम दिसते',
            qEn: 'Receipt shows the wrong amount',
            aMr: 'पेमेंट झाल्यापासून १५ दिवसांच्या आत आपल्या प्रभाग कार्यालयाशी ट्रान्झॅक्शन आयडी घेऊन संपर्क साधा.',
            aEn: 'Contact your ward office within 15 days of payment with the transaction ID.',
          },
        ],
      },
    ],
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
      // Hindi
      'पानी का बिल', 'पानी बिल', 'पानी भरो', 'नल का बिल', 'पेयजल शुल्क',
      // Dakhni
      'پانی بل', 'pani ka bill', 'nal bill bharo',
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
      // Hindi symptom phrases
      'पानी नहीं आता', 'नल में पानी नहीं', 'कचरा नहीं उठा', 'सड़क खराब', 'गड्ढे',
      'नाली', 'बत्ती बंद', 'मच्छर', 'शिकायत', 'शिकायत दर्ज', 'समस्या है',
      // Dakhni
      'پانی نئیں آتا', 'کوڑا', 'شکایت', 'problem hai', 'shikayat', 'kachra',
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
      // Hindi
      'जन्म प्रमाण पत्र', 'जन्म सर्टिफिकेट', 'जन्म दस्तावेज', 'बच्चे का जन्म प्रमाण पत्र',
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
    aliases: ['संपर्क', 'फोन', 'पत्ता', 'हेल्पलाइन', 'contact', 'phone', 'address', 'helpline',
      'संपर्क करें', 'फ़ोन नंबर', 'हेल्पलाइन नंबर', 'office address'],
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
