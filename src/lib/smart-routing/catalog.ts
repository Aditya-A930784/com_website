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
    stepDetails: [
      {
        titleMr: 'ग्राहक क्रमांक टाका',
        titleEn: 'Enter consumer number',
        helpMr: 'तुमच्या पाणी बिलावर छापलेला १०-१२ अंकी क्रमांक.',
        helpEn: 'The 10-12 digit number printed on your water bill.',
        hintMr: 'फक्त अंक — मीटर क्रमांक नाही, ग्राहक क्रमांक',
        hintEn: 'Digits only — this is the consumer number, not the meter number',
        faqs: [
          {
            qMr: 'ग्राहक क्रमांक कुठे मिळेल?',
            qEn: 'Where do I find my consumer number?',
            aMr: 'जुन्या पाणी बिलाच्या वरच्या डाव्या कोपऱ्यात दिसतो. बिल हरवले असल्यास मीटर रीडरची स्लिप तपासा किंवा प्रभाग कार्यालयात जा.',
            aEn: 'Top-left of any old water bill. If lost, check your meter reader\'s slip or visit the ward office.',
          },
          {
            qMr: 'नवीन कनेक्शन — अजून क्रमांक नाही',
            qEn: 'New connection — no number yet',
            aMr: 'प्रथम नवीन कनेक्शनसाठी अर्ज करा. मंजुरीनंतर SMS वर ग्राहक क्रमांक येईल.',
            aEn: 'Apply for a new connection first. After approval, you\'ll receive your consumer number by SMS.',
          },
          {
            qMr: 'ग्राहक व मीटर क्रमांक वेगळे आहेत का?',
            qEn: 'Are consumer and meter numbers different?',
            aMr: 'होय. ग्राहक क्रमांक तुमच्या खात्याचा आयडी आहे — मीटर क्रमांक हार्डवेअरचा आयडी. पेमेंटसाठी ग्राहक क्रमांक वापरा.',
            aEn: 'Yes. Consumer number = your account ID. Meter number = the hardware ID. Use consumer number for payment.',
          },
        ],
      },
      {
        titleMr: 'बिल तपासा',
        titleEn: 'Check the bill',
        helpMr: 'रीडिंग, दर व एकूण रक्कम पडताळून पहा.',
        helpEn: 'Verify the reading, unit rate, and total before paying.',
        faqs: [
          {
            qMr: 'पाणी बिल कसे मोजले जाते?',
            qEn: 'How is the water bill calculated?',
            aMr: 'बिल = (चालू रीडिंग − मागील रीडिंग) × प्रति-युनिट दर + स्थिर शुल्क (सिवरेज, देखभाल). निवासी दर < व्यावसायिक दर.',
            aEn: 'Bill = (current reading − previous reading) × per-unit rate + fixed charges (sewage, maintenance). Residential rate < commercial rate.',
          },
          {
            qMr: 'यंदा बिल खूपच जास्त — का?',
            qEn: 'Bill much higher this month — why?',
            aMr: 'सर्वात सामान्य कारण: गळती. चालू व मागील रीडिंग तुलना करा. मोठा फरक असल्यास तत्काळ प्लंबरला बोलावा आणि तक्रार नोंदवा (आंशिक माफी शक्य).',
            aEn: 'Most common cause: a leak. Compare current vs previous reading. Big jump → call a plumber and file a complaint (partial waiver possible).',
          },
          {
            qMr: 'गळतीसाठी माफी मिळते का?',
            qEn: 'Is there a waiver for leaks?',
            aMr: 'होय — गळती दुरुस्तीचा पुरावा (प्लंबर बिल) आणि जुन्या ३ महिन्यांच्या सरासरीच्या आधारे CSMC आंशिक माफी देऊ शकते. ३० दिवसांच्या आत अर्ज करा.',
            aEn: 'Yes — with proof of repair (plumber bill) and previous 3-month average, CSMC may grant partial waiver. Apply within 30 days.',
          },
          {
            qMr: 'हप्ते शक्य आहेत का?',
            qEn: 'Are installments possible?',
            aMr: 'सामान्यतः बिल ₹५,००० पेक्षा जास्त असल्यास पर्याय दिसतो. प्रभाग कार्यालयाकडून पुष्टी करा.',
            aEn: 'Option usually appears for bills above ₹5,000. Confirm with the ward office.',
          },
        ],
      },
      {
        titleMr: 'ऑनलाइन भरा',
        titleEn: 'Pay online',
        helpMr: 'UPI, नेट बँकिंग, कार्ड — कोणतीही पद्धत निवडा.',
        helpEn: 'Pick UPI, net banking, or card.',
        faqs: [
          {
            qMr: 'देय तारखेनंतर विलंब शुल्क किती?',
            qEn: 'What\'s the late fee after due date?',
            aMr: 'सामान्यतः दर महिना २% विलंब शुल्क. पेमेंटच्या वेळी अद्ययावत रक्कम दाखवली जाईल.',
            aEn: 'Typically 2% per month late fee. The updated amount will be shown at payment time.',
          },
          {
            qMr: 'माझ्या नावाचे नाही तरी दुसऱ्याने पेमेंट केले जाईल का?',
            qEn: 'Can someone else pay for my connection?',
            aMr: 'होय — ग्राहक क्रमांक बरोबर असेल तर कोणीही पेमेंट करू शकतो. पावती त्या क्रमांकावर नोंदली जाईल.',
            aEn: 'Yes — anyone can pay with the correct consumer number. The receipt logs against that number.',
          },
        ],
      },
      {
        titleMr: 'पावती घ्या',
        titleEn: 'Get receipt',
        helpMr: 'पेमेंट यशस्वी झाल्यावर PDF पावती डाउनलोड करा.',
        helpEn: 'Download the PDF receipt after successful payment.',
        faqs: [
          {
            qMr: 'पुढील बिलात पेमेंट दिसत नाही',
            qEn: 'Payment not showing in next bill',
            aMr: 'बहुधा सिस्टम सिंकिंगला ७ दिवस लागतात. त्यानंतरही दिसत नसल्यास तुमच्या ट्रान्झॅक्शन आयडीसह "पेमेंट सिंक समस्या" तक्रार नोंदवा.',
            aEn: 'System sync usually takes 7 days. If it still doesn\'t appear, file a "Payment sync issue" complaint with your transaction ID.',
          },
          {
            qMr: 'डुप्लिकेट पावती हवी आहे',
            qEn: 'I need a duplicate receipt',
            aMr: 'पेमेंट व पावत्या विभागात जा → ग्राहक क्रमांकाने शोधा → डाउनलोड. मागील ५ वर्षे उपलब्ध.',
            aEn: 'Payments & Receipts → search by consumer number → download. Last 5 years available.',
          },
        ],
      },
    ],
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
    stepDetails: [
      {
        titleMr: 'समस्या निवडा',
        titleEn: 'Pick the issue',
        helpMr: 'तुमची समस्या कोणत्या विभागाशी संबंधित आहे ते निवडा — यामुळे योग्य अधिकाऱ्याकडे लगेच जाते.',
        helpEn: 'Pick the category that matches your problem — it routes to the right officer instantly.',
        faqs: [
          {
            qMr: 'माझी समस्या कोणत्याही श्रेणीत बसत नाही',
            qEn: 'My issue doesn\'t fit any category',
            aMr: '"इतर" निवडा आणि सविस्तर वर्णन लिहा. वर्गीकरण करणारा अधिकारी योग्य विभागाकडे पाठवेल.',
            aEn: 'Pick "Other" and describe in detail. A triage officer will route it to the right department.',
          },
          {
            qMr: 'एकाच ठिकाणी अनेक समस्या आहेत',
            qEn: 'Multiple issues at the same place',
            aMr: 'प्रत्येक समस्या स्वतंत्रपणे नोंदवा — यामुळे प्रत्येकाचा ट्रॅकिंग वेगळा राहतो व निराकरणाची जबाबदारी स्पष्ट होते.',
            aEn: 'File each issue separately — this keeps tracking clean and accountability clear per issue.',
          },
          {
            qMr: 'आणीबाणी आहे (लीक पाईप, धोकादायक खड्डा)',
            qEn: 'It\'s an emergency (burst pipe, dangerous pothole)',
            aMr: 'ऑनलाइन तक्रार नोंदवण्याआधी १०७७ (CSMC हेल्पलाइन) वर कॉल करा. आणीबाणी SLA वेगळे आहेत.',
            aEn: 'Call 1077 (CSMC helpline) before filing online — emergencies have different SLAs.',
          },
        ],
      },
      {
        titleMr: 'स्थान टाका',
        titleEn: 'Add location',
        helpMr: 'GPS सुरू करा किंवा पत्ता + महत्त्वाची खूण लिहा.',
        helpEn: 'Enable GPS or type address + nearest landmark.',
        hintMr: 'अचूक स्थानामुळे निराकरण ३x जलद होते',
        hintEn: 'Accurate location makes resolution 3× faster',
        faqs: [
          {
            qMr: 'GPS काम करत नाही',
            qEn: 'GPS not working',
            aMr: 'ब्राउझरमध्ये स्थान परवानगी द्या. तरीही चालत नसल्यास प्रभाग + जवळची खूण (उदा. "जुबिली पार्क समोर") लिहा.',
            aEn: 'Grant location permission in your browser. If still not working, type ward + nearest landmark (e.g. "opposite Jubilee Park").',
          },
          {
            qMr: 'चुकीचा प्रभाग निवडला गेला',
            qEn: 'Wrong ward auto-selected',
            aMr: 'सबमिट करण्यापूर्वी मॅन्युअली दुरुस्त करा. चुकीचा प्रभाग = चुकीच्या अधिकाऱ्याकडे जाईल.',
            aEn: 'Adjust manually before submit. Wrong ward = wrong officer gets it.',
          },
          {
            qMr: 'माझी गोपनीयता?',
            qEn: 'My privacy?',
            aMr: 'फक्त CSMC कर्मचाऱ्यांना दिसते. सार्वजनिक तक्रार यादीत तुमचे नाव/फोन दिसत नाही.',
            aEn: 'Visible only to CSMC staff. Your name/phone never appears on the public complaint list.',
          },
        ],
      },
      {
        titleMr: 'फोटो जोडा',
        titleEn: 'Attach a photo',
        helpMr: 'फोटो पुरावा असतो — निराकरण जलद व निर्विवाद.',
        helpEn: 'A photo is evidence — makes resolution faster and undisputable.',
        hintMr: '५ फोटोंपर्यंत, प्रत्येक ५ MB खाली',
        hintEn: 'Up to 5 photos, each under 5 MB',
        faqs: [
          {
            qMr: 'फोटो आवश्यक आहे का?',
            qEn: 'Is a photo required?',
            aMr: 'सर्व श्रेणींसाठी नाही — पण फोटो असलेल्या तक्रारी सरासरी ३x वेगाने निकाली निघतात.',
            aEn: 'Not for all categories — but complaints with photos resolve ~3× faster on average.',
          },
          {
            qMr: 'फोन कॅमेरा वापरता येईल का?',
            qEn: 'Can I use my phone camera?',
            aMr: 'हो — मोबाइलवर सरळ कॅमेरा उघडण्याचे बटण असते. पोर्ट्रेट किंवा लँडस्केप दोन्ही चालते.',
            aEn: 'Yes — mobile shows an "Open camera" button directly. Portrait or landscape both work.',
          },
          {
            qMr: 'फोटो अपलोड होत नाही',
            qEn: 'Photo won\'t upload',
            aMr: 'सामान्य कारणे: फाइल ५ MB पेक्षा मोठी, HEIC फॉरमॅट (iPhone), कमी इंटरनेट. JPG मध्ये रूपांतरित करा किंवा कमी रिझोल्यूशनवर काढा.',
            aEn: 'Common causes: file over 5 MB, HEIC format (iPhone), slow internet. Convert to JPG or shoot at lower resolution.',
          },
        ],
      },
      {
        titleMr: 'सबमिट करा — तक्रार क्रमांक मिळेल',
        titleEn: 'Submit — get a complaint ID',
        helpMr: 'क्रमांक SMS वर देखील येईल. भविष्यातील स्थिती तपासण्यासाठी जतन करा.',
        helpEn: 'ID also arrives by SMS. Save it for future status checks.',
        faqs: [
          {
            qMr: 'निराकरणाची अपेक्षित वेळ?',
            qEn: 'How long to resolve?',
            aMr: 'श्रेणीनुसार ३–१५ कार्य दिवस. सबमिटनंतर तुम्हाला विशिष्ट SLA दाखवला जाईल.',
            aEn: '3–15 working days depending on category. You\'ll see the specific SLA after submit.',
          },
          {
            qMr: 'SLA मध्ये निराकरण झाले नाही तर?',
            qEn: 'What if it\'s not resolved within SLA?',
            aMr: 'ट्रॅकिंग पानावर "एस्केलेट" बटण सक्रिय होते — प्रभाग अधिकारी → उपायुक्त → आयुक्त अशी शिडी वर जाते.',
            aEn: 'An "Escalate" button activates on the tracking page — goes up the ladder: ward officer → deputy commissioner → commissioner.',
          },
          {
            qMr: 'खोटी तक्रार नोंदवली तर?',
            qEn: 'What if I file a fake complaint?',
            aMr: 'खोट्या तक्रारींसाठी दंडात्मक कारवाई शक्य आहे. सत्य आणि अचूक माहिती द्या.',
            aEn: 'False complaints can attract penalties. Provide truthful, accurate information.',
          },
        ],
      },
    ],
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
    stepDetails: [
      {
        titleMr: 'तक्रार क्रमांक टाका',
        titleEn: 'Enter complaint number',
        helpMr: 'तक्रार नोंदवल्यानंतर मिळालेला क्रमांक (SMS किंवा ईमेलमध्ये).',
        helpEn: 'The ID you received after filing (in SMS or email).',
        hintMr: 'फॉरमॅट: CMP-YYYY-NNNNNN',
        hintEn: 'Format: CMP-YYYY-NNNNNN',
        faqs: [
          {
            qMr: 'तक्रार क्रमांक हरवला',
            qEn: 'Lost my complaint number',
            aMr: 'SMS/ईमेल तपासा — बहुतेक फोनमध्ये अजून असतो. न सापडल्यास "मोबाईल क्रमांकाने शोधा" पर्याय वापरा.',
            aEn: 'Check SMS/email — usually still there. If not found, use the "Search by mobile" option instead.',
          },
          {
            qMr: 'माझ्याकडे अनेक तक्रारी आहेत',
            qEn: 'I have multiple complaints',
            aMr: 'प्रत्येकाचा वेगळा क्रमांक आहे. मोबाईलने लॉगिन करून सर्व तक्रारी एका यादीत पहा.',
            aEn: 'Each has its own ID. Log in via mobile to see all complaints in one list.',
          },
        ],
      },
      {
        titleMr: 'मोबाईल क्रमांक टाका',
        titleEn: 'Enter mobile number',
        helpMr: 'तक्रार नोंदवताना जो क्रमांक वापरला होता तोच.',
        helpEn: 'The same number you used when filing.',
        hintMr: '१० अंकी, +९१ शिवाय',
        hintEn: '10 digits, without +91',
        faqs: [
          {
            qMr: 'OTP येत नाही',
            qEn: 'OTP not arriving',
            aMr: '६० सेकंद प्रतीक्षा करा, नंतर "पुन्हा पाठवा". तरीही न आल्यास DND बंद करा किंवा वेगळा नंबर वापरा.',
            aEn: 'Wait 60 seconds then "Resend". If still not arriving, disable DND or try another number.',
          },
          {
            qMr: 'मूळ नंबर आता वापरात नाही',
            qEn: 'Original number no longer in use',
            aMr: 'प्रभाग कार्यालयात फोटो आयडीसह जा — तिथे तुमचा संपर्क क्रमांक अपडेट करता येईल.',
            aEn: 'Visit the ward office with photo ID — they can update your contact number on record.',
          },
        ],
      },
      {
        titleMr: 'स्थिती पहा',
        titleEn: 'View status',
        helpMr: 'सद्य स्थिती, नियुक्त अधिकारी, आणि टिप्पण्या दिसतील.',
        helpEn: 'Shows current status, assigned officer, and remarks.',
        faqs: [
          {
            qMr: 'स्थितींचा अर्थ काय?',
            qEn: 'What do the statuses mean?',
            aMr: 'प्राप्त → कार्यरत → नियुक्त → निराकरण → पडताळणी. प्रत्येकाचा वेळ SLA वर अवलंबून.',
            aEn: 'Received → In progress → Assigned → Resolved → Verified. Time on each depends on the SLA.',
          },
          {
            qMr: 'अजून माहिती जोडायची आहे',
            qEn: 'I want to add more information',
            aMr: 'स्थिती पानावर "टिप्पणी जोडा" — मजकूर आणि आणखी फोटो जोडता येतात.',
            aEn: 'Use "Add comment" on the status page — you can add text and more photos.',
          },
          {
            qMr: 'निराकरण झाले पण समस्या कायम आहे',
            qEn: 'Marked resolved but issue persists',
            aMr: '"पुन्हा उघडा" बटण १५ दिवसांपर्यंत उपलब्ध. फोटोसह पुरावा जोडा — त्याच अधिकाऱ्याकडे परत जाते.',
            aEn: 'A "Reopen" button is available for 15 days. Attach photo evidence — it returns to the same officer.',
          },
        ],
      },
    ],
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
    stepDetails: [
      {
        titleMr: 'अर्ज भरा',
        titleEn: 'Fill the form',
        helpMr: 'बाळाचे नाव, पालकांची नावे, जन्म तारीख, स्थळ, आणि रुग्णालय — मुख्य क्षेत्रे.',
        helpEn: 'Child name, parents\' names, date, place, and hospital — the main fields.',
        faqs: [
          {
            qMr: 'बाळाचे नाव अजून ठरले नाही',
            qEn: 'Baby\'s name not decided yet',
            aMr: 'त्वरित नोंदणी हवी असल्यास "नाव नंतर देईन" पर्याय निवडा. १ वर्षाच्या आत मोफत नाव जोडता येते.',
            aEn: 'Choose "Name later" for urgent registration. Name can be added free within 1 year.',
          },
          {
            qMr: 'सबमिटनंतर टंकनदोष सापडला',
            qEn: 'Found a typo after submit',
            aMr: '१५ दिवसांच्या आत रजिस्ट्रारशी संपर्क साधा — साधे बदल (शुद्धलेखन, तारीख) विनामूल्य दुरुस्त होतात. १ वर्षांनंतर कोर्टाची परवानगी लागते.',
            aEn: 'Contact registrar within 15 days — simple corrections (spelling, date) are free. After 1 year, court order needed.',
          },
          {
            qMr: 'उशीरा नोंदणी (>१ वर्ष जुनी)',
            qEn: 'Late registration (>1 year old)',
            aMr: 'अतिरिक्त अ‍ॅफिडेव्हिट, वैद्यकीय प्रमाणपत्र, आणि दंड (~₹१०) लागतो. प्रभाग रजिस्ट्रारकडे जावे लागते.',
            aEn: 'Requires additional affidavit, medical certificate, and a small fine (~₹10). Must be filed with the ward registrar.',
          },
        ],
      },
      {
        titleMr: 'कागदपत्रे जोडा',
        titleEn: 'Attach documents',
        helpMr: 'रुग्णालय डिस्चार्ज सारांश, पालक ओळखपत्रे, पत्ता पुरावा.',
        helpEn: 'Hospital discharge summary, parent IDs, address proof.',
        hintMr: 'PDF किंवा JPG, प्रत्येक २ MB पर्यंत',
        hintEn: 'PDF or JPG, each up to 2 MB',
        faqs: [
          {
            qMr: 'घरी जन्म झाला — डिस्चार्ज सारांश नाही',
            qEn: 'Home birth — no discharge summary',
            aMr: 'पर्याय: (१) दाई/डॉक्टरचे प्रमाणपत्र, (२) दोन शेजाऱ्यांचे अ‍ॅफिडेव्हिट, (३) मालमत्ता कर पावती (पत्ता पुरावा).',
            aEn: 'Alternatives: (1) midwife/doctor certificate, (2) affidavit from 2 neighbours, (3) property tax receipt (address proof).',
          },
          {
            qMr: 'दत्तक बाळ',
            qEn: 'Adopted child',
            aMr: 'दत्तक आदेशाची प्रत, मूळ जन्म प्रमाणपत्र (असल्यास), दत्तक पालकांचे ओळखपत्रे.',
            aEn: 'Adoption order copy, original birth certificate (if any), adoptive parents\' IDs.',
          },
          {
            qMr: 'दोन्ही पालकांची कागदपत्रे लागतात का?',
            qEn: 'Are both parents\' documents required?',
            aMr: 'हो — दोघांचे आधार/पॅन/पासपोर्ट यापैकी एक. वडिलांचा तपशील गहाळ असल्यास "एकल पालक" पर्याय + हलाफनामा.',
            aEn: 'Yes — one of Aadhaar/PAN/Passport for each. If father\'s details missing, use "single parent" option + affidavit.',
          },
        ],
      },
      {
        titleMr: 'सबमिट करा',
        titleEn: 'Submit',
        helpMr: 'शुल्क भरा आणि अर्ज पाठवा.',
        helpEn: 'Pay the fee and submit the application.',
        faqs: [
          {
            qMr: 'शुल्क किती?',
            qEn: 'How much is the fee?',
            aMr: 'सामान्यतः पहिली प्रत ₹३५, अतिरिक्त प्रत ₹१५. (शुल्क बदलू शकते — पुष्टीसाठी पेमेंट पानावर तपासा.)',
            aEn: 'Typically ₹35 for first copy, ₹15 per additional copy. (Fees may change — confirm on the payment page.)',
          },
          {
            qMr: 'नंतर दुरुस्ती करू शकतो का?',
            qEn: 'Can I correct it later?',
            aMr: '१ वर्षाच्या आत सोपे बदल कोर्ट आदेशाशिवाय शक्य. त्यानंतर कोर्ट आदेश आवश्यक.',
            aEn: 'Simple changes possible without court order within 1 year. After that, court order required.',
          },
        ],
      },
      {
        titleMr: 'स्थिती तपासा',
        titleEn: 'Track status',
        helpMr: 'नेहमीचा TAT: ७–१५ कार्य दिवस. डिजिटल PDF पहिले, नंतर हार्ड कॉपी.',
        helpEn: 'Usual TAT: 7–15 working days. Digital PDF first, hard copy later.',
        faqs: [
          {
            qMr: 'डिजिटल प्रत कायदेशीर वैध आहे का?',
            qEn: 'Is the digital copy legally valid?',
            aMr: 'हो — DigiLocker मध्ये देखील साठवली जाते. QR कोडसह सर्व सरकारी ठिकाणी स्वीकारली जाते.',
            aEn: 'Yes — also stored in DigiLocker. Accepted at all government offices with the embedded QR code.',
          },
          {
            qMr: 'हार्ड कॉपी कोठे मिळेल?',
            qEn: 'Where do I collect the hard copy?',
            aMr: 'तुमच्या प्रभाग कार्यालयात — SMS वर तयार असल्याचे कळेल. फोटो आयडी घेऊन जा.',
            aEn: 'At your ward office — SMS notifies when ready. Bring photo ID.',
          },
        ],
      },
    ],
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
    stepsMr: ['अर्ज भरा', 'कागदपत्रे जोडा', 'सबमिट करा', 'प्रमाणपत्र मिळवा'],
    stepsEn: ['Fill the form', 'Attach documents', 'Submit', 'Collect certificate'],
    stepDetails: [
      {
        titleMr: 'अर्ज भरा',
        titleEn: 'Fill the form',
        helpMr: 'मृताचे नाव, तारीख, स्थळ, मृत्यूचे कारण, आणि रुग्णालय (लागू असल्यास).',
        helpEn: 'Deceased\'s name, date, place, cause of death, and hospital (if applicable).',
        faqs: [
          {
            qMr: 'मृत्यूचे नेमके कारण माहीत नाही',
            qEn: 'Cause of death unknown',
            aMr: 'रुग्णालय मृत्यू प्रमाणपत्रावर लिहिले असते. घरी मृत्यूच्या बाबतीत डॉक्टरचे प्रमाणपत्र (पोस्ट-मार्टेम पर्यायी) आवश्यक.',
            aEn: 'It\'s on the hospital\'s death certificate. For home death, doctor\'s certificate (post-mortem optional) is required.',
          },
          {
            qMr: 'नोंदणीसाठी किती दिवस मिळतात?',
            qEn: 'How many days to register?',
            aMr: 'मृत्यूनंतर २१ दिवसांच्या आत मोफत. २१–३० दिवसांत लहान दंड. ३० दिवसांनंतर उशीरा नोंदणी शुल्क + अ‍ॅफिडेव्हिट.',
            aEn: 'Free within 21 days of death. Small fine between 21–30 days. After 30 days: late fee + affidavit required.',
          },
        ],
      },
      {
        titleMr: 'कागदपत्रे जोडा',
        titleEn: 'Attach documents',
        helpMr: 'रुग्णालयाचे मृत्यू प्रमाणपत्र, स्मशान/दफनभूमी पावती, अर्जदाराचे ओळखपत्र.',
        helpEn: 'Hospital death certificate, cremation/burial ground receipt, applicant\'s ID.',
        hintMr: 'PDF किंवा JPG, प्रत्येक २ MB पर्यंत',
        hintEn: 'PDF or JPG, each up to 2 MB',
        faqs: [
          {
            qMr: 'स्मशान पावती हरवली आहे',
            qEn: 'Cremation receipt lost',
            aMr: 'त्याच स्मशानाला भेट द्या — बहुधा वर्षभर रजिस्टर ठेवला जातो; डुप्लिकेट मिळू शकते.',
            aEn: 'Visit the same cremation ground — most keep a register for a year; a duplicate is usually available.',
          },
          {
            qMr: 'मृत व्यक्ती दुसऱ्या शहरातील होती',
            qEn: 'Deceased was from another city',
            aMr: 'मृत्यू जिथे झाला त्या नगरपालिकेत नोंदणी करावी लागते — CSMC मध्ये फक्त संभाजीनगरात झालेले मृत्यू.',
            aEn: 'Registration happens where the death occurred — CSMC handles only deaths in Sambhajinagar.',
          },
        ],
      },
      {
        titleMr: 'सबमिट करा',
        titleEn: 'Submit',
        helpMr: 'शुल्क भरा आणि अर्ज पाठवा.',
        helpEn: 'Pay the fee and submit.',
        faqs: [
          {
            qMr: 'शुल्क आणि किती प्रती मिळतात?',
            qEn: 'Fee and how many copies?',
            aMr: 'पहिली प्रत ~₹३५. अतिरिक्त प्रत ~₹१५. बँका, विमा, वारसा — बहुतांशी ३–५ प्रती लागतात.',
            aEn: 'First copy ~₹35. Extra copies ~₹15. For banks, insurance, inheritance you\'ll usually need 3–5 copies.',
          },
        ],
      },
      {
        titleMr: 'प्रमाणपत्र मिळवा',
        titleEn: 'Collect certificate',
        helpMr: 'डिजिटल PDF + हार्ड कॉपी उपलब्ध.',
        helpEn: 'Digital PDF + hard copy available.',
        faqs: [
          {
            qMr: 'सामान्य वेळ किती?',
            qEn: 'Usual turnaround?',
            aMr: '७–१५ कार्य दिवस. आणीबाणी (विमा, अंत्यसंस्कार) साठी "अर्जंट" पर्याय — २–३ दिवस.',
            aEn: '7–15 working days. Urgent option (for insurance, funeral) processes in 2–3 days.',
          },
          {
            qMr: 'विम्यासाठी वापरता येईल का?',
            qEn: 'Can I use it for insurance?',
            aMr: 'हो — QR कोड असलेली डिजिटल प्रत LIC व सर्व मुख्य विमा कंपन्यांकडून स्वीकारली जाते.',
            aEn: 'Yes — the QR-embedded digital copy is accepted by LIC and all major insurers.',
          },
        ],
      },
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
    stepsMr: ['अर्ज भरा', 'साक्षीदार व कागदपत्रे जोडा', 'भेट ठरवा', 'प्रमाणपत्र मिळवा'],
    stepsEn: ['Fill the form', 'Add witnesses & documents', 'Book appointment', 'Collect certificate'],
    stepDetails: [
      {
        titleMr: 'अर्ज भरा',
        titleEn: 'Fill the form',
        helpMr: 'दोन्ही जोडीदारांची पूर्ण नावे, जन्मतारखा, विवाहाची तारीख आणि स्थळ.',
        helpEn: 'Both spouses\' full names, dates of birth, marriage date and venue.',
        faqs: [
          {
            qMr: 'विवाह २० वर्षे जुना आहे — अजूनही नोंदवू शकतो का?',
            qEn: 'Marriage is 20 years old — can I still register?',
            aMr: 'हो — कधीही नोंदवता येते. जुन्या विवाहांसाठी अतिरिक्त अ‍ॅफिडेव्हिट आणि साक्षीदारांचे विधान लागते.',
            aEn: 'Yes — registration is available anytime. Old marriages require additional affidavit and witness statements.',
          },
          {
            qMr: 'दोन्ही जोडीदार वेगवेगळ्या धर्मांतील',
            qEn: 'Spouses from different religions',
            aMr: 'विशेष विवाह कायदा (Special Marriage Act) अंतर्गत नोंदवा — प्रक्रिया वेगळी, ३० दिवसांची सार्वजनिक सूचना.',
            aEn: 'Register under the Special Marriage Act — different process, requires 30-day public notice.',
          },
        ],
      },
      {
        titleMr: 'साक्षीदार व कागदपत्रे जोडा',
        titleEn: 'Add witnesses & documents',
        helpMr: 'दोन साक्षीदार + दोन्ही जोडीदारांचे ओळखपत्रे + विवाह पुरावा (फोटो/निमंत्रण).',
        helpEn: 'Two witnesses + both spouses\' IDs + marriage proof (photos/invitation).',
        hintMr: 'दोन्ही साक्षीदार २१+ वयाचे असावेत',
        hintEn: 'Both witnesses must be 21+',
        faqs: [
          {
            qMr: 'साक्षीदार भारताबाहेर आहेत',
            qEn: 'Witnesses are abroad',
            aMr: 'नोटरीकृत साक्षीदार विधान चालते — भारतीय दूतावासाकडून नोटरी करून पाठवा.',
            aEn: 'Notarized witness statements work — get them notarized at the Indian embassy and courier.',
          },
          {
            qMr: 'फोटो/निमंत्रण कार्ड नाही',
            qEn: 'No photos/invitation card',
            aMr: 'पुजारी/काझी यांचे प्रमाणपत्र किंवा पत्र्याचे विधान चालते. आर्य समाज विवाहासाठी त्यांचे प्रमाणपत्र.',
            aEn: 'Certificate from priest/kazi or the pandit\'s statement works. For Arya Samaj weddings, their certificate.',
          },
        ],
      },
      {
        titleMr: 'भेट ठरवा',
        titleEn: 'Book appointment',
        helpMr: 'दोन्ही जोडीदार + दोन साक्षीदार यांना प्रत्यक्ष यावे लागते.',
        helpEn: 'Both spouses + both witnesses must appear in person.',
        faqs: [
          {
            qMr: 'भेट किती लांब आहे?',
            qEn: 'How long is the appointment?',
            aMr: 'सामान्यतः २०–३० मिनिटे. फोटो आयडी मूळ प्रत सोबत आणा — फोटोकॉपी चालत नाहीत.',
            aEn: 'Typically 20–30 minutes. Bring original photo IDs — photocopies won\'t be accepted.',
          },
          {
            qMr: 'शनिवार/रविवारी भेट मिळेल का?',
            qEn: 'Weekend appointments available?',
            aMr: 'फक्त कार्यालयीन दिवस — सोम ते शुक्र. सार्वजनिक सुट्ट्या वगळून.',
            aEn: 'Working days only — Mon to Fri. Public holidays excluded.',
          },
        ],
      },
      {
        titleMr: 'प्रमाणपत्र मिळवा',
        titleEn: 'Collect certificate',
        helpMr: 'भेटीच्या दिवशी किंवा ३–७ दिवसांत तयार.',
        helpEn: 'Ready on the appointment day or within 3–7 days.',
        faqs: [
          {
            qMr: 'पासपोर्ट/व्हिसासाठी अपोस्टील हवे',
            qEn: 'Need apostille for passport/visa',
            aMr: 'MEA (परराष्ट्र मंत्रालय) कडून वेगळे अपोस्टील — नागरी सेवा उपसंचालक कार्यालयातून पाठवावे लागते.',
            aEn: 'Apostille from MEA (Ministry of External Affairs) — routed through the Directorate of Civic Services.',
          },
        ],
      },
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
    stepsMr: ['व्यवसाय तपशील टाका', 'कागदपत्रे अपलोड करा', 'शुल्क भरा', 'तात्पुरता परवाना मिळवा'],
    stepsEn: ['Enter business details', 'Upload documents', 'Pay fee', 'Get provisional license'],
    stepDetails: [
      {
        titleMr: 'व्यवसाय तपशील टाका',
        titleEn: 'Enter business details',
        helpMr: 'व्यवसायाचे नाव, प्रकार, पत्ता, मालक व सर्व भागीदारांची माहिती.',
        helpEn: 'Business name, type, address, owner and all partners\' details.',
        faqs: [
          {
            qMr: 'माझा व्यवसाय प्रकार यादीत नाही',
            qEn: 'My business type isn\'t in the list',
            aMr: '"इतर" निवडा आणि सविस्तर वर्णन लिहा. मान्यता ३–५ अतिरिक्त कार्य दिवस घेऊ शकते.',
            aEn: 'Pick "Other" and describe in detail. Approval may take 3–5 extra working days.',
          },
          {
            qMr: 'भागीदारी वि. एकल मालकी',
            qEn: 'Partnership vs sole proprietor',
            aMr: 'भागीदारीसाठी सर्व भागीदारांची ओळखपत्रे व भागीदारी करार अपलोड करा. एकल मालकीसाठी फक्त तुमचे.',
            aEn: 'Partnership needs all partners\' IDs + partnership deed. Sole proprietor needs only yours.',
          },
          {
            qMr: 'व्यवसाय अजून सुरू केला नाही',
            qEn: 'Business not started yet',
            aMr: 'चालेल — तात्पुरता परवाना आधी घेता येतो. व्यवसाय सुरू झाल्यानंतर ३० दिवसांच्या आत अंतिम रूपांतरण करा.',
            aEn: 'That\'s fine — provisional license can be issued in advance. Convert to final within 30 days of starting operations.',
          },
        ],
      },
      {
        titleMr: 'कागदपत्रे अपलोड करा',
        titleEn: 'Upload documents',
        helpMr: 'PAN, आधार, पत्ता पुरावा, भाड्याचा करार/मालकी कागदपत्रे, NOC (आवश्यक असल्यास).',
        helpEn: 'PAN, Aadhaar, address proof, rent agreement/ownership docs, NOC (if applicable).',
        hintMr: 'PDF, प्रत्येक ५ MB पर्यंत',
        hintEn: 'PDF, each up to 5 MB',
        faqs: [
          {
            qMr: 'NOC कोठून मिळेल?',
            qEn: 'Where do I get NOC?',
            aMr: 'भाडेकरू असल्यास मालकाकडून. काही व्यवसायांना (अन्न, रसायने) अतिरिक्त विभागांकडून (FSSAI, अग्नि) NOC लागते.',
            aEn: 'From landlord if renting. Certain businesses (food, chemicals) need extra NOCs from FSSAI, fire dept.',
          },
          {
            qMr: 'भाड्याच्या कराराशिवाय काहीच नाही',
            qEn: 'No rent agreement — informal arrangement',
            aMr: 'औपचारिक भाडेकरू पावती + मालकाचे स्व-घोषणापत्र नोटरीकृत. जोखीम: मान्यता विलंब होऊ शकते.',
            aEn: 'Formal rent receipt + notarized self-declaration from landlord. Risk: approval may be delayed.',
          },
        ],
      },
      {
        titleMr: 'शुल्क भरा',
        titleEn: 'Pay fee',
        helpMr: 'व्यवसायाचा प्रकार व क्षेत्रफळावर आधारित शुल्क.',
        helpEn: 'Fee is based on business type and area.',
        faqs: [
          {
            qMr: 'शुल्क किती?',
            qEn: 'How much is the fee?',
            aMr: 'लहान दुकान: ~₹५००–२,०००/वर्ष. मध्यम: ~₹२,०००–१०,०००. मोठे/जोखमीचे व्यवसाय: जास्त. पेमेंट पानावर तुमचे नेमके शुल्क दिसेल.',
            aEn: 'Small shop: ~₹500–2,000/yr. Medium: ~₹2,000–10,000. Large/high-risk businesses: higher. Payment page shows exact fee.',
          },
          {
            qMr: 'नूतनीकरण कधी करावे?',
            qEn: 'When to renew?',
            aMr: 'दरवर्षी ३१ मार्चपूर्वी. नूतनीकरण न केल्यास दंड — दुप्पट शुल्क + व्यवसाय स्थगिती जोखीम.',
            aEn: 'Every year before 31 March. Late renewal incurs penalty — double fee + risk of business suspension.',
          },
        ],
      },
      {
        titleMr: 'तात्पुरता परवाना मिळवा',
        titleEn: 'Get provisional license',
        helpMr: 'तात्पुरता परवाना २४ तासांत PDF मध्ये मिळेल. अंतिम परवाना — तपासणीनंतर १५ दिवस.',
        helpEn: 'Provisional license within 24 hours as PDF. Final license after inspection — usually 15 days.',
        faqs: [
          {
            qMr: 'तात्पुरता व अंतिम परवान्यात फरक?',
            qEn: 'Difference between provisional and final?',
            aMr: 'तात्पुरता = कागदपत्रे तपासले, व्यवसाय सुरू करू शकता. अंतिम = भौतिक तपासणीनंतर. दोन्ही कायदेशीर वैध.',
            aEn: 'Provisional = docs verified, you can start operating. Final = after physical inspection. Both are legally valid.',
          },
          {
            qMr: 'तपासणी कधी होते?',
            qEn: 'When does the inspection happen?',
            aMr: 'तक्रार नोंदवण्यापासून १५ दिवसांत निरीक्षक भेट देईल. वेळ SMS वर आधी कळवली जाईल.',
            aEn: 'An inspector visits within 15 days of filing. You\'ll get SMS notification of the appointment time.',
          },
        ],
      },
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
    stepsMr: ['मालकी व प्लॉट तपशील', 'नकाशा अपलोड करा', 'शुल्क भरा व सादर करा', 'साइट तपासणी व मंजुरी'],
    stepsEn: ['Ownership & plot details', 'Upload plan', 'Pay fee & submit', 'Site inspection & approval'],
    stepDetails: [
      {
        titleMr: 'मालकी व प्लॉट तपशील',
        titleEn: 'Ownership & plot details',
        helpMr: '७/१२, प्लॉट क्रमांक, क्षेत्रफळ, वापर (निवासी/व्यावसायिक/मिश्र).',
        helpEn: '7/12, plot number, area, and usage (residential/commercial/mixed).',
        faqs: [
          {
            qMr: 'माझ्याकडे ७/१२ नाही — अपार्टमेंट आहे',
            qEn: 'I don\'t have 7/12 — I own an apartment',
            aMr: 'अपार्टमेंटसाठी सोसायटी NOC + विक्री करार + मालमत्ता कर पावती पुरेशी. मूळ बांधकाम मंजुरी सोसायटीकडून घ्या.',
            aEn: 'For apartments: society NOC + sale deed + property tax receipt is enough. Get original building approval from society.',
          },
          {
            qMr: 'नुकतीच जमीन विकत घेतली — मालकी सिद्ध कशी करू?',
            qEn: 'Just bought land — how to prove ownership?',
            aMr: 'नोंदणीकृत विक्री करार + तलाठ्याकडून अद्ययावत ७/१२ (३० दिवसांच्या आत). नाव अद्याप बदलले नसल्यास फेरफार अर्ज सुरू आहे हे दाखवा.',
            aEn: 'Registered sale deed + updated 7/12 from talathi (within 30 days). If name not yet transferred, show mutation application in progress.',
          },
          {
            qMr: 'कोणत्या क्षेत्रांना बांधकाम परवानगी लागते?',
            qEn: 'Which areas need building permission?',
            aMr: 'सर्व नवीन बांधकाम, वाढ, मजला जोडणे, वापर बदल. फक्त अंतर्गत रंगकाम/डागडुजी वगळता.',
            aEn: 'All new construction, extension, floor addition, usage change. Only internal painting/repairs are exempt.',
          },
        ],
      },
      {
        titleMr: 'नकाशा अपलोड करा',
        titleEn: 'Upload plan',
        helpMr: 'नोंदणीकृत आर्किटेक्ट किंवा अभियंता यांनी तयार केलेला नकाशा.',
        helpEn: 'Plan prepared and signed by a registered architect or engineer.',
        hintMr: 'PDF, ५०० MB पर्यंत. अनोंदणीकृत नकाशा नाकारला जाईल.',
        hintEn: 'PDF, up to 500 MB. Unregistered architect plans will be rejected.',
        faqs: [
          {
            qMr: 'नोंदणीकृत आर्किटेक्ट कोठे मिळेल?',
            qEn: 'Where to find a registered architect?',
            aMr: 'महाराष्ट्र आर्किटेक्ट परिषदेच्या (Council of Architecture) वेबसाइटवर CSMC क्षेत्रातील यादी. सामान्य शुल्क: प्लॉट आकारावर आधारित ₹५,०००–५०,०००.',
            aEn: 'Check Council of Architecture Maharashtra site for CSMC-area list. Typical fee: ₹5,000–50,000 based on plot size.',
          },
          {
            qMr: 'नकाशा किती वेळा दुरुस्त होऊ शकतो?',
            qEn: 'How many revisions to the plan?',
            aMr: '३ मोफत दुरुस्त्या. त्यानंतर प्रत्येक दुरुस्तीसाठी नाममात्र शुल्क.',
            aEn: '3 free revisions. Nominal fee for each additional revision.',
          },
          {
            qMr: 'सेटबॅक व FSI म्हणजे काय?',
            qEn: 'What are setback and FSI?',
            aMr: 'सेटबॅक = प्लॉटच्या सीमेपासून बांधकामापर्यंत अनिवार्य मोकळी जागा. FSI = मंजुर बांधकाम क्षेत्र ÷ प्लॉट क्षेत्र. CSMC ने वेगवेगळ्या क्षेत्रांसाठी नियम ठरवले आहेत.',
            aEn: 'Setback = mandatory open space from plot boundary to construction. FSI = permitted built-up area ÷ plot area. CSMC sets zone-specific rules.',
          },
        ],
      },
      {
        titleMr: 'शुल्क भरा व सादर करा',
        titleEn: 'Pay fee & submit',
        helpMr: 'विकास शुल्क + परवाना शुल्क + आरक्षण शुल्क.',
        helpEn: 'Development fee + license fee + reservation fee.',
        faqs: [
          {
            qMr: 'एकूण शुल्क साधारण किती?',
            qEn: 'Approximate total fee?',
            aMr: 'लहान निवासी (~१०० चौ. मीटर): ~₹२०,०००–५०,०००. मोठे व्यावसायिक: लाखांत. अंदाजासाठी शुल्क कॅल्क्युलेटर वापरा.',
            aEn: 'Small residential (~100 sq m): ~₹20,000–50,000. Large commercial: in lakhs. Use fee calculator for estimate.',
          },
          {
            qMr: 'हप्त्यांनी भरता येते का?',
            qEn: 'Can I pay in installments?',
            aMr: 'फक्त मोठ्या रकमेसाठी (>₹१ लाख). अर्ज सबमिटसह हप्त्यांचा प्रस्ताव द्या.',
            aEn: 'Only for large amounts (>₹1 lakh). Submit an installment proposal along with the application.',
          },
        ],
      },
      {
        titleMr: 'साइट तपासणी व मंजुरी',
        titleEn: 'Site inspection & approval',
        helpMr: 'अभियंता साइटला भेट देईल. मंजुरी वेळ: ३०–९० दिवस प्लॉट आकारावर आधारित.',
        helpEn: 'An engineer visits the site. Approval time: 30–90 days based on plot size.',
        faqs: [
          {
            qMr: 'तपासणीत काय पाहतात?',
            qEn: 'What do they check during inspection?',
            aMr: 'प्लॉटची सीमा, प्रवेश रस्ता, आजूबाजूचे बांधकाम, नकाशाशी सुसंगती, नैसर्गिक प्रवाह/नाली.',
            aEn: 'Plot boundary, access road, adjacent constructions, alignment with plan, natural drainage paths.',
          },
          {
            qMr: 'नकार आला तर काय?',
            qEn: 'What if rejected?',
            aMr: 'तपशीलवार कारणे PDF मध्ये मिळतील. दुरुस्त नकाशासह पुन्हा सादर करता येते (३ प्रयत्नांपर्यंत मोफत). किंवा अपीलेट अधिकाऱ्याकडे अपील ३० दिवसांत.',
            aEn: 'Detailed reasons come as PDF. Resubmit with corrected plan (up to 3 attempts free). Or file appeal with appellate officer within 30 days.',
          },
          {
            qMr: 'मंजुरीनंतर कधी सुरू करू शकतो?',
            qEn: 'When can I start after approval?',
            aMr: 'लगेच. मंजुरी वैध ३ वर्षे (नूतनीकरण शक्य). बांधकाम पूर्ण झाल्यावर "पूर्णत्व प्रमाणपत्र" घेणे अनिवार्य.',
            aEn: 'Immediately. Approval valid for 3 years (renewable). "Completion certificate" is mandatory after construction.',
          },
        ],
      },
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
    stepsMr: ['आधार जोडा', 'कागदपत्रे पहा', 'शेअर किंवा डाउनलोड करा'],
    stepsEn: ['Link Aadhaar', 'View documents', 'Share or download'],
    stepDetails: [
      {
        titleMr: 'आधार जोडा',
        titleEn: 'Link Aadhaar',
        helpMr: 'आधारशी जोडून तुमची CSMC-नोंदणीकृत कागदपत्रे आपोआप उपलब्ध होतात.',
        helpEn: 'Linking Aadhaar auto-fetches all your CSMC-registered documents.',
        hintMr: 'OTP आधारशी नोंदणीकृत मोबाईलवर येईल',
        hintEn: 'OTP goes to the mobile linked to your Aadhaar',
        faqs: [
          {
            qMr: 'आधारशी मोबाईल जोडलेला नाही',
            qEn: 'My mobile isn\'t linked to Aadhaar',
            aMr: 'जवळच्या आधार सेवा केंद्रात जाऊन मोबाईल अपडेट करा — मोफत आणि २४ तासांत सक्रिय.',
            aEn: 'Visit the nearest Aadhaar seva kendra to update mobile — free, activates within 24 hours.',
          },
          {
            qMr: 'माझा आधार सुरक्षित राहील का?',
            qEn: 'Is my Aadhaar safe?',
            aMr: 'फक्त OTP-आधारित प्रमाणीकरण. आम्ही आधार नंबर साठवत नाही — फक्त इनक्रिप्टेड टोकन.',
            aEn: 'Only OTP-based auth. We don\'t store the Aadhaar number — only an encrypted token.',
          },
        ],
      },
      {
        titleMr: 'कागदपत्रे पहा',
        titleEn: 'View documents',
        helpMr: 'सर्व CSMC प्रमाणपत्रे, कर पावत्या, परवाने एका जागी.',
        helpEn: 'All CSMC certificates, tax receipts, licenses in one place.',
        faqs: [
          {
            qMr: 'माझा जुना कर पावती (५+ वर्षे) दिसत नाही',
            qEn: 'Old tax receipt (5+ years) not showing',
            aMr: 'फक्त शेवटच्या ५ वर्षांच्या पावत्या स्वयंचलितपणे उपलब्ध. जुन्यासाठी प्रभाग कार्यालयात मागणी करा.',
            aEn: 'Only last 5 years are auto-loaded. Request older ones from the ward office.',
          },
          {
            qMr: 'नुकतेच काही अपलोड केले — दिसत नाही',
            qEn: 'Something recently uploaded isn\'t showing',
            aMr: '२४ तासांच्या आत सिंक होते. न झाल्यास "रिफ्रेश" बटण दाबा किंवा लॉगआउट/लॉगिन करा.',
            aEn: 'Syncs within 24 hours. If not, tap the "Refresh" button or log out and back in.',
          },
        ],
      },
      {
        titleMr: 'शेअर किंवा डाउनलोड करा',
        titleEn: 'Share or download',
        helpMr: 'QR-सह डिजिटल प्रत सर्व सरकारी ठिकाणी स्वीकारली जाते.',
        helpEn: 'QR-verified digital copies are accepted at all government offices.',
        faqs: [
          {
            qMr: 'बँकेला कागदपत्र पाठवायचे आहे',
            qEn: 'I want to send a document to a bank',
            aMr: '"शेअर" → ईमेल किंवा लिंक. लिंक ४८ तासांनंतर संपते. QR कोड बँक कर्मचारी स्कॅन करून तत्काळ सत्यता तपासू शकतो.',
            aEn: '"Share" → email or link. Link expires in 48 hours. Bank staff can scan the QR to verify authenticity instantly.',
          },
          {
            qMr: 'DigiLocker (केंद्र सरकार) मध्ये कसे आणू?',
            qEn: 'How do I get these into central DigiLocker?',
            aMr: 'सर्व CSMC कागदपत्रे केंद्रीय DigiLocker वर देखील स्वयंचलितपणे पाठवली जातात — तिथे "जारी करणारा: CSMC" शोधा.',
            aEn: 'All CSMC docs are auto-pushed to central DigiLocker too — search for "Issuer: CSMC" there.',
          },
        ],
      },
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
    stepsMr: ['मालमत्ता तपशील टाका', 'वापर प्रकार निवडा', 'क्षेत्रफळ व दर तपासा', 'सविस्तर मोडणी पहा'],
    stepsEn: ['Enter property details', 'Choose usage type', 'Review area & rate', 'See breakdown'],
    stepDetails: [
      {
        titleMr: 'मालमत्ता तपशील टाका',
        titleEn: 'Enter property details',
        helpMr: 'पत्ता, प्रभाग, आणि प्रकार (स्वतंत्र घर / फ्लॅट / व्यावसायिक जागा).',
        helpEn: 'Address, ward, and type (independent house / flat / commercial space).',
        faqs: [
          {
            qMr: 'हे केवळ अंदाज आहे का, अधिकृत गणना?',
            qEn: 'Is this an estimate or the official calculation?',
            aMr: 'हे नागरिकांना समजण्यासाठी अंदाजित गणना आहे. अंतिम कर बिल तुमच्या नोंदणीकृत मालमत्तेवर CSMC च्या अधिकृत रेकॉर्डवर आधारित असतो.',
            aEn: 'This is an estimate for citizen understanding. Your final tax bill is based on CSMC\'s official records for your registered property.',
          },
          {
            qMr: 'मालमत्ता CSMC कडे नोंदलेली नाही',
            qEn: 'My property isn\'t registered with CSMC',
            aMr: 'कॅल्क्युलेटर तरीही अंदाज देईल. नोंदणीसाठी प्रभाग कार्यालयात ७/१२ किंवा विक्री कराराच्या प्रतीसह जा.',
            aEn: 'The calculator will still give an estimate. To register, visit ward office with 7/12 or sale deed copy.',
          },
        ],
      },
      {
        titleMr: 'वापर प्रकार निवडा',
        titleEn: 'Choose usage type',
        helpMr: 'निवासी, व्यावसायिक, औद्योगिक, मिश्र — दर वेगळे.',
        helpEn: 'Residential, commercial, industrial, mixed — rates differ.',
        faqs: [
          {
            qMr: 'घरातून व्यवसाय चालवतो — कोणता प्रकार?',
            qEn: 'Running a business from home — which type?',
            aMr: '"मिश्र वापर" निवडा — व्यावसायिक भागाचे क्षेत्रफळ वेगळे टाका. घर = निवासी दर, व्यवसाय भाग = व्यावसायिक दर.',
            aEn: 'Pick "mixed use" — enter the commercial portion\'s area separately. House = residential rate, business area = commercial rate.',
          },
          {
            qMr: 'भाड्याने दिले आहे — दर बदलतो का?',
            qEn: 'Rented out — does the rate change?',
            aMr: 'स्वयं-कब्जा वि. भाड्याने यांचे दर वेगळे. भाड्याने दिलेल्या निवासीचा दर स्वयं-कब्ज्यापेक्षा जास्त.',
            aEn: 'Self-occupied vs let-out have different rates. Rented residential is charged higher than self-occupied.',
          },
        ],
      },
      {
        titleMr: 'क्षेत्रफळ व दर तपासा',
        titleEn: 'Review area & rate',
        helpMr: 'कार्पेट क्षेत्रफळ (सुपर बिल्ट-अप नाही) आणि प्रभागाचा प्रति-चौ.फूट दर.',
        helpEn: 'Carpet area (not super built-up) and per-sqft rate for your ward.',
        hintMr: 'कार्पेट = आतील उपयोगी क्षेत्र, भिंतीच्या आतील',
        hintEn: 'Carpet = usable interior area, inside the walls',
        faqs: [
          {
            qMr: 'कार्पेट व बिल्ट-अप मध्ये फरक',
            qEn: 'Difference between carpet and built-up',
            aMr: 'कार्पेट = आतील मोकळे उपयोगी क्षेत्र. बिल्ट-अप = कार्पेट + भिंती. सुपर बिल्ट-अप = बिल्ट-अप + सामायिक क्षेत्रे. कर कार्पेटवर मोजला जातो.',
            aEn: 'Carpet = usable interior floor space. Built-up = carpet + walls. Super built-up = built-up + common areas. Tax is on carpet area.',
          },
          {
            qMr: 'दर कोठून घेतला जातो?',
            qEn: 'Where does the rate come from?',
            aMr: 'CSMC च्या दरवर्षी प्रकाशित होणाऱ्या GR मधून (Government Resolution). तुमच्या प्रभागाचा दर प्रभाग कार्यालयात व वेबसाइटवर उपलब्ध.',
            aEn: 'From CSMC\'s annually published GR (Government Resolution). Your ward\'s rate is available at the ward office and website.',
          },
        ],
      },
      {
        titleMr: 'सविस्तर मोडणी पहा',
        titleEn: 'See breakdown',
        helpMr: 'प्रत्येक घटक — मूळ कर, उपकर, सूट — वेगळे दाखवले जाते.',
        helpEn: 'Every component — base tax, cess, rebates — shown separately.',
        faqs: [
          {
            qMr: 'उपकर म्हणजे काय?',
            qEn: 'What are cesses?',
            aMr: 'शिक्षण उपकर, स्वच्छता उपकर, दिवाबत्ती उपकर — मूळ कराच्या टक्केवारीत जोडले जातात. दर बदलू शकतात.',
            aEn: 'Education cess, sanitation cess, street-light cess — added as a percentage of base tax. Rates may vary.',
          },
          {
            qMr: 'ही मोडणी प्रिंट करू शकतो का?',
            qEn: 'Can I print this breakdown?',
            aMr: 'हो — "PDF डाउनलोड" बटण वापरा. कर्ज अर्ज, नियोजनासाठी वापरता येते.',
            aEn: 'Yes — use the "Download PDF" button. Useful for loan applications and planning.',
          },
        ],
      },
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
