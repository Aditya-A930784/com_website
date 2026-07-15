export interface PageSection {
  headingEn: string;
  headingMr: string;
  contentEn: string;
  contentMr: string;
  bulletPointsEn?: string[];
  bulletPointsMr?: string[];
  table?: {
    headersEn: string[];
    headersMr: string[];
    rowsEn: string[][];
    rowsMr: string[][];
  };
  downloads?: {
    titleEn: string;
    titleMr: string;
    url: string;
    size: string;
  }[];
}

export interface PageContent {
  titleEn: string;
  titleMr: string;
  descriptionEn: string;
  descriptionMr: string;
  eyebrowEn: string;
  eyebrowMr: string;
  sections: PageSection[];
  requiresLogin?: boolean;
  interactiveType?: 'calculator' | 'feedback' | 'rti-officers' | 'sitemap';
}

export const NAVIGATION_CONTENT: Record<string, PageContent> = {
  // --- About Us ---
  'about/history': {
    eyebrowEn: 'About Us',
    eyebrowMr: 'आमच्याविषयी',
    titleEn: 'History of CSMC',
    titleMr: 'महानगरपालिकेचा इतिहास',
    descriptionEn: 'The rich historical background of the city and its administrative evolution.',
    descriptionMr: 'शहराचा समृद्ध ऐतिहासिक वारसा आणि प्रशासकीय उत्क्रांती.',
    sections: [
      {
        headingEn: 'Historical Roots',
        headingMr: 'ऐतिहासिक पाळेमुळे',
        contentEn: 'Chhatrapati Sambhajinagar (formerly Aurangabad) has a historical significance dating back to the 17th century. The municipal administration started as a municipal committee and gradually upgraded to a Municipal Corporation in 1982 to serve the growing population and urban needs.',
        contentMr: 'छत्रपती संभाजीनगर (पूर्वीचे औरंगाबाद) शहराला १७ व्या शतकापासूनचा ऐतिहासिक वारसा लाभला आहे. सुरुवातीला नगरपरिषद म्हणून कार्यरत असलेली ही संस्था, वाढत्या लोकसंख्येला व नागरी गरजांना पुरून उरण्यासाठी १९८२ मध्ये महानगरपालिकेत रूपांतरित करण्यात आली.',
        bulletPointsEn: [
          'Established as Municipal Committee during the British Raj.',
          'Upgraded to Municipal Council in post-independence era.',
          'Established as Municipal Corporation in December 1982.',
          'Renamed as Chhatrapati Sambhajinagar Municipal Corporation (CSMC).'
        ],
        bulletPointsMr: [
          'ब्रिटिश काळात नगरपरिषद म्हणून स्थापना.',
          'स्वातंत्र्योत्तर काळात नगरपालिकेत रुपांतर.',
          'डिसेंबर १९८२ मध्ये महानगरपालिका म्हणून मान्यता.',
          'छत्रपती संभाजीनगर महानगरपालिका (CSMC) म्हणून नामकरण.'
        ]
      }
    ]
  },
  'about/mayor': {
    eyebrowEn: 'Administration',
    eyebrowMr: 'प्रशासन',
    titleEn: 'Honorable Mayors of CSMC',
    titleMr: 'मा. महापौर यादी',
    descriptionEn: 'List of leadership that guided the municipal corporation through the years.',
    descriptionMr: 'महानगरपालिकेच्या प्रगतीचे नेतृत्व करणाऱ्या महापौरांची सूची.',
    sections: [
      {
        headingEn: 'Office of the Mayor',
        headingMr: 'महापौर कार्यालय',
        contentEn: 'The Mayor is the first citizen of the city. Here is the chronological list of Mayors who served Chhatrapati Sambhajinagar Municipal Corporation.',
        contentMr: 'महापौर हे शहराचे प्रथम नागरिक असतात. महानगरपालिकेमध्ये सेवा बजावलेल्या महापौरांची कालानुक्रम यादी खालीलप्रमाणे आहे.',
        table: {
          headersEn: ['Sr. No.', 'Name of Mayor', 'From Date', 'To Date'],
          headersMr: ['अ.क्र.', 'महापौरांचे नाव', 'पासून', 'पर्यंत'],
          rowsEn: [
            ['1', 'Shri Shantigiriji Maharaj', '1983-05-12', '1984-05-11'],
            ['2', 'Shri Kishanchand Tanwani', '1995-04-29', '1996-04-28'],
            ['3', 'Shri Bhagwan Ghadamode', '2016-12-14', '2017-10-28'],
            ['4', 'Shri Nandkumar Ghodele', '2017-10-29', '2020-04-28']
          ],
          rowsMr: [
            ['१', 'श्री शांतिगिरीजी महाराज', '१९८३-०५-१२', '१९८४-०५-११'],
            ['२', 'श्री किशनचंद तनवाणी', '१९९५-०४-२९', '१९९६-०४-२८'],
            ['३', 'श्री भगवान घडामोडे', '२०१६-१२-१४', '२०१७-१०-२८'],
            ['४', 'श्री नंदकुमार घोडेले', '२०१७-१०-२९', '२०२०-०४-२८']
          ]
        }
      }
    ]
  },
  'about/commissioner': {
    eyebrowEn: 'Administration',
    eyebrowMr: 'प्रशासन',
    titleEn: 'Municipal Commissioners',
    titleMr: 'मा. आयुक्त यादी',
    descriptionEn: 'The administrative heads who managed the municipal corporation.',
    descriptionMr: 'महानगरपालिकेच्या प्रशासनाचे नेतृत्व करणारे आयुक्त.',
    sections: [
      {
        headingEn: 'Office of the Commissioner',
        headingMr: 'आयुक्त कार्यालय',
        contentEn: 'The Commissioner is the chief executive authority of the corporation. Below is the list of IAS officers who have served as Municipal Commissioner.',
        contentMr: 'आयुक्त हे महानगरपालिकेचे मुख्य कार्यकारी अधिकारी असतात. औरंगाबाद/छत्रपती संभाजीनगर मनपाचे आयुक्त म्हणून काम पाहिलेल्या भा.प्र.से. अधिकाऱ्यांची यादी खालीलप्रमाणे आहे.',
        table: {
          headersEn: ['Sr. No.', 'Name of Commissioner', 'From Date', 'To Date'],
          headersMr: ['अ.क्र.', 'आयुक्तांचे नाव', 'पासून', 'पर्यंत'],
          rowsEn: [
            ['1', 'Shri D. M. Sukhthankar', '1982-12-10', '1983-08-15'],
            ['2', 'Shri Sunil Kendrekar', '2014-06-01', '2015-08-31'],
            ['3', 'Shri Astik Kumar Pandey', '2019-12-09', '2022-08-12'],
            ['4', 'Shri G. Srikanth', '2023-05-18', 'Present']
          ],
          rowsMr: [
            ['१', 'श्री डी. एम. सुखटणकर', '१९८२-१२-१०', '१९८३-०८-१५'],
            ['२', 'श्री सुनील केंद्रेकर', '२०१४-०६-०१', '२०१५-०८-३१'],
            ['३', 'श्री आस्तिक कुमार पाण्डेय', '२०१९-१२-०९', '२०२२-०८-१२'],
            ['४', 'श्री जी. श्रीकांत', '२०२३-०५-१८', 'सध्या कार्यरत']
          ]
        }
      }
    ]
  },
  'about/structure': {
    eyebrowEn: 'About Us',
    eyebrowMr: 'आमच्याविषयी',
    titleEn: 'Administrative Structure',
    titleMr: 'प्रशासकीय रचना',
    descriptionEn: 'Detailed hierarchy of CSMC administrative branches and reporting lines.',
    descriptionMr: 'महानगरपालिका प्रशासकीय विभाग आणि पदानुक्रमाची सविस्तर रचना.',
    sections: [
      {
        headingEn: 'Administrative Hierarchy',
        headingMr: 'प्रशासकीय रचना',
        contentEn: 'CSMC operates with a structured administrative hierarchy headed by the Municipal Commissioner, followed by Additional Commissioners, Deputy Commissioners, and Department Heads.',
        contentMr: 'महानगरपालिका आयुक्त हे मुख्य प्रमुख असून त्यांच्या नियंत्रणाखाली अतिरिक्त आयुक्त, उपायुक्त, सहायक आयुक्त आणि विविध विभागांचे प्रमुख कार्यरत आहेत.',
        bulletPointsEn: [
          'Municipal Commissioner (Chief Officer)',
          'Additional Commissioner (General Admin & Development)',
          'Deputy Commissioner (Tax, Sanitation, Elections)',
          'Assistant Commissioner (Zone Officers)',
          'City Engineer (Water, Roads, Planning)'
        ],
        bulletPointsMr: [
          'महानगरपालिका आयुक्त (मुख्य प्रमुख)',
          'अतिरिक्त आयुक्त (सामान्य प्रशासन आणि विकास)',
          'उपायुक्त (कर, स्वच्छता, निवडणूक)',
          'सहायक आयुक्त (झोनल प्रभाग प्रमुख)',
          'शहर अभियंता (पाणी पुरवठा, रस्ते, नियोजन)'
        ]
      }
    ]
  },
  'about/charter': {
    eyebrowEn: 'About Us',
    eyebrowMr: 'आमच्याविषयी',
    titleEn: 'Citizen Charter',
    titleMr: 'नागरी सनद',
    descriptionEn: 'Our commitment to time-bound public service delivery and citizen rights.',
    descriptionMr: 'वेळमर्यादेत सार्वजनिक सेवा देणे आणि नागरिकांच्या हक्कांची आमची वचनबद्धता.',
    sections: [
      {
        headingEn: 'Service Level Guarantees',
        headingMr: 'सेवा हमी कालावधी',
        contentEn: 'The Citizen Charter defines the time limits within which the corporation must provide basic services to citizens and grievance resolution windows.',
        contentMr: 'नागरी सनद ही नागरिकांना वेळेत नागरी सेवा देण्यासाठी व त्यांच्या तक्रारींचे निवारण करण्यासाठी बांधलेली सेवा हमी नियमावली आहे.',
        table: {
          headersEn: ['Service Name', 'Standard Processing Time', 'Authorized Officer'],
          headersMr: ['सेवेचे नाव', 'नियत कालावधी', 'सक्षम अधिकारी'],
          rowsEn: [
            ['Birth/Death Certificate', '3 Working Days', 'Registrar (Health)'],
            ['New Water Connection', '15 Working Days', 'Junior Engineer (Water)'],
            ['Zone Certificate (Zoning)', '7 Working Days', 'Town Planner'],
            ['Trade License Approval', '21 Working Days', 'Ward Officer']
          ],
          rowsMr: [
            ['जन्म / मृत्यू दाखला', '३ कामकाजाचे दिवस', 'निबंधक (आरोग्य विभाग)'],
            ['नवीन नळ जोडणी', '१५ कामकाजाचे दिवस', 'कनिष्ठ अभियंता (पाणीपुरवठा)'],
            ['झोन दाखला (शहर रचना)', '७ कामकाजाचे दिवस', 'शहर नियोजक'],
            ['व्यापार परवाना मंजूरी', '२१ कामकाजाचे दिवस', 'प्रभाग अधिकारी']
          ]
        }
      }
    ]
  },

  // --- Organization ---
  'organization/structure': {
    eyebrowEn: 'Organization',
    eyebrowMr: 'संघटना',
    titleEn: 'Organizational Structure',
    titleMr: 'संघटनात्मक रचना',
    descriptionEn: 'The structural division between the political wing and the administrative wing.',
    descriptionMr: 'राजकीय विंग आणि प्रशासकीय विंग मधील संघटनात्मक विभाजन.',
    sections: [
      {
        headingEn: 'Dual Structure of CSMC',
        headingMr: 'महानगरपालिकेची दुहेरी रचना',
        contentEn: 'The Municipal Corporation consists of two wings: the Deliberative (Political) Wing representing elected corporators headed by the Mayor, and the Executive (Administrative) Wing headed by the Municipal Commissioner.',
        contentMr: 'महानगरपालिका मुख्यत्वे दोन विंगमध्ये विभागलेली आहे: राजकीय विंग (निवडून आलेले लोकप्रतिनिधी व महापौर) आणि प्रशासकीय विंग (आयुक्त आणि मनपा नोकरशाही).',
        bulletPointsEn: [
          'General Body: Formulates policies, passes budgets, approved by Corporators.',
          'Standing Committee: Financial decision authority of the corporation.',
          'Administrative Executive: Implements policies approved by the General Body.'
        ],
        bulletPointsMr: [
          'सर्वसाधारण सभा: धोरणे निश्चित करते, नगरसेवकांद्वारे अर्थसंकल्प मंजूर केला जातो.',
          'स्थायी समिती: पालिकेचे वित्तीय निर्णय घेणारे अधिकार मंडळ.',
          'प्रशासकीय कार्यकारी: मंजूर झालेल्या धोरणांची व योजनांची प्रत्यक्ष अंमलबजावणी करते.'
        ]
      }
    ]
  },
  'organization/departments': {
    eyebrowEn: 'Organization',
    eyebrowMr: 'संघटना',
    titleEn: 'List of Departments',
    titleMr: 'विभागांची यादी',
    descriptionEn: 'The operational departments working to provide civic amenities.',
    descriptionMr: 'नागरिकांना सोयी-सुविधा पुरविणारे विविध विभाग.',
    sections: [
      {
        headingEn: 'Departments Directory',
        headingMr: 'विभागांची सूची',
        contentEn: 'Click on individual departments in the top menu to view detailed processes and forms. Here is an overview of the key offices.',
        contentMr: 'विविध विभागांची सविस्तर माहिती व अर्ज डाऊनलोड करण्यासाठी मुख्य नेव्हिगेशन विभागाचा वापर करा. प्रमुख विभागांची माहिती खालीलप्रमाणे आहे.',
        bulletPointsEn: [
          'Health & Sanitation - Vaccine drives, waste management, birth/death records.',
          'Water Supply - Pipelines, filtration plants, bill collection.',
          'Town Planning - Development plans, zone checking, building layout approvals.',
          'Accounts & Finance - Annual budget management and expenditures.'
        ],
        bulletPointsMr: [
          'आरोग्य आणि स्वच्छता - लसीकरण मोहीम, कचरा व्यवस्थापन, जन्म-मृत्यू नोंद.',
          'पाणी पुरवठा - मुख्य जलवाहिन्या, जलशुद्धीकरण प्रकल्प, पाणीपट्टी वसुली.',
          'नगर रचना - विकास आराखडा, झोन दाखला, बांधकाम परवानगी.',
          'लेखा व वित्त - वार्षिक अर्थसंकल्प नियोजन आणि खर्च नियंत्रण.'
        ]
      }
    ]
  },
  'organization/committees': {
    eyebrowEn: 'Organization',
    eyebrowMr: 'संघटना',
    titleEn: 'Municipal Committees',
    titleMr: 'समित्या',
    descriptionEn: 'Committees constituted under the Maharashtra Municipal Corporations Act.',
    descriptionMr: 'महाराष्ट्र महानगरपालिका कायद्यांतर्गत स्थापन केलेल्या विषय समित्या.',
    sections: [
      {
        headingEn: 'Constitutional Committees',
        headingMr: 'वैधानिक व विषय समित्या',
        contentEn: 'CSMC functions through committees that focus on specific areas of municipal welfare.',
        contentMr: 'महानगरपालिकेच्या विविध योजनांचे सुयोग्य नियोजन करण्यासाठी खालील समित्या कार्यरत असतात.',
        bulletPointsEn: [
          'Standing Committee (Financial authority)',
          'Women and Child Welfare Committee',
          'Ward Committees (Zone Level)',
          'Legal Committee',
          'Education Committee'
        ],
        bulletPointsMr: [
          'स्थायी समिती (आर्थिक मंजुरी प्राधिकरण)',
          'महिला व बाल कल्याण समिती',
          'प्रभाग समिती (झोन स्तर)',
          'विधी समिती',
          'शिक्षण समिती'
        ]
      }
    ]
  },
  'organization/standing-committee': {
    eyebrowEn: 'Organization',
    eyebrowMr: 'संघटना',
    titleEn: 'Standing Committee',
    titleMr: 'स्थायी समिती',
    descriptionEn: 'The premier financial committee of the municipal corporation.',
    descriptionMr: 'महानगरपालिकेचे महत्त्वाचे आर्थिक निर्णय घेणारी स्थायी समिती.',
    sections: [
      {
        headingEn: 'Role of Standing Committee',
        headingMr: 'स्थायी समितीची भूमिका',
        contentEn: 'The Standing Committee is responsible for reviewing and sanctioning large contracts, development work expenses, and municipal budgets.',
        contentMr: 'स्थायी समिती ही मुख्य वित्त समिती असून सर्व मोठे कंत्राट, नागरी विकास खर्च आणि वार्षिक अर्थसंकल्प तिच्या मंजुरीशिवाय अंमलात येऊ शकत नाहीत.',
        bulletPointsEn: [
          'Consists of 16 elected corporators.',
          'Rotational chairmanship elected annually.',
          'Reviews all tenders and audits prior to General Body approval.'
        ],
        bulletPointsMr: [
          'या समितीत १६ निवडून आलेले नगरसेवक असतात.',
          'वार्षिक निवड पद्धतीने फिरते सभापती पद निवडले जाते.',
          'सर्व निविदा व लेखापरीक्षण अहवाल अंतिम मंजुरीसाठी सर्वसाधारण सभेला पाठवते.'
        ]
      }
    ]
  },

  // --- Departments ---
  'departments/health': {
    eyebrowEn: 'Departments',
    eyebrowMr: 'विभाग',
    titleEn: 'Health Department',
    titleMr: 'आरोग्य विभाग',
    descriptionEn: 'Managing city sanitation, vector control, public hospitals, and immunization.',
    descriptionMr: 'शहर स्वच्छता, जंतू नियंत्रण, सार्वजनिक रुग्णालये आणि लसीकरण मोहीम व्यवस्थापन.',
    sections: [
      {
        headingEn: 'Key Functions',
        headingMr: 'प्रमुख कार्ये',
        contentEn: 'The Health Department is responsible for managing municipal hospitals, primary health centers (PHC), execution of national health schemes, solid waste disposal control, and control of epidemic diseases.',
        contentMr: 'आरोग्य विभाग महानगरपालिकेची रुग्णालये, प्राथमिक आरोग्य केंद्रे (PHC), राष्ट्रीय आरोग्य योजनांची अंमलबजावणी आणि संसर्गजन्य आजारांच्या प्रतिबंधात्मक उपायांचे नियोजन करतो.',
        bulletPointsEn: [
          'Operation of 5 major civic hospitals.',
          'Vector-borne disease monitoring (Dengue, Malaria).',
          'Managing Birth, Death, and Marriage registration counters.',
          'FOG/Disinfection spray scheduling.'
        ],
        bulletPointsMr: [
          '५ प्रमुख नागरी रुग्णालयांचे नियंत्रण.',
          'डास व कीटकजन्य आजार नियंत्रण (डेंग्यू, मलेरिया).',
          'जन्म, मृत्यू आणि विवाह नोंदणी प्रक्रिया नियंत्रण.',
          'जंतुनाशक धुरळणी नियोजन.'
        ]
      }
    ]
  },
  'departments/water': {
    eyebrowEn: 'Departments',
    eyebrowMr: 'विभाग',
    titleEn: 'Water Supply Department',
    titleMr: 'पाणीपुरवठा विभाग',
    descriptionEn: 'Ensuring safe drinking water distribution across all municipal zones.',
    descriptionMr: 'महानगरपालिका क्षेत्रातील सर्व प्रभाग व घरांमध्ये सुरक्षित पाणी पुरवठ्याचे नियोजन.',
    sections: [
      {
        headingEn: 'Distribution & Connection Services',
        headingMr: 'जलवितरण व जोडणी सेवा',
        contentEn: 'This department manages pumping stations at Jayakwadi Dam, water purification plants, water distribution lines, and resolves low-pressure issues.',
        contentMr: 'हा विभाग जायकवाडी धरणावरील पंपिंग स्टेशन, जलशुद्धीकरण केंद्र, जलवाहिन्या आणि कमी दाबाने होणाऱ्या पाणीपुरवठ्याच्या तक्रारींचे निवारण करतो.',
        bulletPointsEn: [
          'Process applications for new residential/commercial water connection.',
          'Supervise water tanker delivery services to deficit areas.',
          'Collect water tax/bills.'
        ],
        bulletPointsMr: [
          'नवीन घरगुती आणि व्यावसायिक नळ जोडणी अर्ज मंजुरी.',
          'पाणी टंचाईच्या भागात टँकरने पाणी पुरवठा करण्याचे नियंत्रण.',
          'पाणीपट्टी कर वसुली.'
        ]
      }
    ]
  },
  'departments/waste': {
    eyebrowEn: 'Departments',
    eyebrowMr: 'विभाग',
    titleEn: 'Solid Waste Management',
    titleMr: 'घनकचरा व्यवस्थापन विभाग',
    descriptionEn: 'Daily garbage collection, processing, and swachhata compliance.',
    descriptionMr: 'दैनंदिन कचरा संकलन, वर्गीकरण आणि स्वच्छ शहर अभियान.',
    sections: [
      {
        headingEn: 'Garbage Collection & Processing',
        headingMr: 'कचरा वेचक आणि प्रक्रिया प्रकल्प',
        contentEn: 'SWM department coordinates the door-to-door garbage collection, segregation (wet, dry, hazardous), compost generation plants, and maintains the city dry waste collection centres.',
        contentMr: 'हा विभाग घंटागाडीद्वारे ओला आणि सुका कचरा संकलन करणे, त्यांचे वर्गीकरण करणे आणि त्यावर प्रक्रिया प्रकल्पांच्या माध्यमातून खत तयार करणे या कामांचे नियोजन करतो.',
        bulletPointsEn: [
          'Door-to-door waste collection coverage in 115 wards.',
          'Monitoring GPS tracking on garbage collection vehicles.',
          'Citizen complaints lookup for uncleared spots.'
        ],
        bulletPointsMr: [
          '११५ प्रभागांमध्ये घंटागाड्यांद्वारे कचरा संकलन.',
          'कचरा वाहनांवर जीपीएस ट्रॅकिंगद्वारे देखरेख.',
          'कचरा उचलला न गेल्यास नागरिक ऑनलाईन तक्रार नोंदवू शकतात.'
        ]
      }
    ]
  },
  'departments/fire': {
    eyebrowEn: 'Departments',
    eyebrowMr: 'विभाग',
    titleEn: 'Fire Department',
    titleMr: 'अग्निशमन विभाग',
    descriptionEn: 'Emergency response, fire safety inspection, and issuance of Fire NOCs.',
    descriptionMr: 'आपत्कालीन प्रतिसाद, अग्निसुरक्षा तपासणी आणि अग्निशमन ना-हरकत प्रमाणपत्र (NOC) जारी करणे.',
    sections: [
      {
        headingEn: 'Emergency Response & Safety NOC',
        headingMr: 'आपत्कालीन प्रतिसाद व सुरक्षा परवाना',
        contentEn: 'The fire brigade operates 24/7 to counter fire hazards, rescue stranded citizens during heavy rain, and enforces building fire regulations.',
        contentMr: 'अग्निशमन विभाग आगीच्या दुर्घटनांचे नियंत्रण, नैसर्गिक आपत्तीमध्ये बचाव कार्य आणि इमारतींना अग्निशमन परवाना देण्याचे काम करतो.',
        bulletPointsEn: [
          'Emergency Hotline: 101 / 0240-2331500.',
          'Fire Safety Audit for multi-storied commercial complexes.',
          'Guidelines for obtaining building Fire NOC.'
        ],
        bulletPointsMr: [
          'आपत्कालीन हेल्पलाईन: १०१ / ०२४०-२३३१५००.',
          'बहुमजली व्यावसायिक इमारतींचे फायरसाठी ऑडिट.',
          'नवीन इमारतींसाठी अग्निशमन ना-हरकत प्रमाणपत्र प्रक्रिया.'
        ]
      }
    ]
  },
  'departments/planning': {
    eyebrowEn: 'Departments',
    eyebrowMr: 'विभाग',
    titleEn: 'Town Planning Department',
    titleMr: 'नगर रचना विभाग',
    descriptionEn: 'Regulating city zoning, building plan approval, and land use regulations.',
    descriptionMr: 'शहरातील झोनिंग नियमन, इमारत बांधकाम मंजुरी आणि भूवापर नियोजन.',
    sections: [
      {
        headingEn: 'Zoning & Building Permissions',
        headingMr: 'झोन दाखला व बांधकाम परवानग्या',
        contentEn: 'Town planning drafts the city development maps, issues Zoning Certificates, handles gunthewari regularisation, and processes building plan layouts.',
        contentMr: 'नगर रचना विभाग शहराच्या विकास योजनेचा आराखडा तयार करतो, झोन दाखले देतो आणि गुंठेवारी नियमानुकूलन प्रकरणांवर निर्णय घेतो.',
        bulletPointsEn: [
          'Zoning checks and land use verification.',
          'AutoDCR portal integration for building plan checks.',
          'Enforcement of Development Control Regulations (DCR).'
        ],
        bulletPointsMr: [
          'जमीन आरक्षण व झोन खात्री दाखला.',
          'ऑनलाइन इमारत नकाशा मंजुरी (AutoDCR).',
          'विकास नियंत्रण नियमावली (DCR) अंमलबजावणी.'
        ]
      }
    ]
  },
  'departments/engineering': {
    eyebrowEn: 'Departments',
    eyebrowMr: 'विभाग',
    titleEn: 'Engineering Department',
    titleMr: 'अभियांत्रिकी विभाग',
    descriptionEn: 'Civil infrastructure development including roads, bridges, storm water drains.',
    descriptionMr: 'रस्ते, उड्डाणपूल, गटारे आणि नागरी पायाभूत सुविधांचे बांधकाम व दुरुस्ती.',
    sections: [
      {
        headingEn: 'Infrastructure Execution',
        headingMr: 'पायाभूत सुविधा प्रकल्प',
        contentEn: 'This department supervises the construction of concrete roads, bridge repairs, construction of public buildings, and works closely with regional development authorities.',
        contentMr: 'हा विभाग डांबरी व सिमेंट रस्त्यांचे बांधकाम, उड्डाणपुलांची दुरुस्ती, महानगरपालिकेच्या इमारतींचे बांधकाम या प्रकल्पांवर देखरेख ठेवतो.',
        bulletPointsEn: [
          'Tendering road improvement programs.',
          'Monitoring storm-water drain cleaning projects.',
          'Quality assurance and test approvals.'
        ],
        bulletPointsMr: [
          'रस्ते सुधारणा प्रकल्पांच्या निविदा प्रक्रिया.',
          'पावसाळी गटार स्वच्छता मोहिमेवर नियंत्रण.',
          'कामांचा दर्जा नियंत्रण व प्रयोगशाळा तपासणी.'
        ]
      }
    ]
  },
  'departments/education': {
    eyebrowEn: 'Departments',
    eyebrowMr: 'विभाग',
    titleEn: 'Education Department',
    titleMr: 'शिक्षण विभाग',
    descriptionEn: 'Supervising municipal schools, student benefits, and literacy program.',
    descriptionMr: 'महानगरपालिका शाळांचे नियंत्रण, विद्यार्थी कल्याण योजना आणि साक्षरता उपक्रम.',
    sections: [
      {
        headingEn: 'Municipal School Management',
        headingMr: 'महानगरपालिका शाळा नियंत्रण',
        contentEn: 'Managing primary and high schools, providing free uniforms, books, and execution of Mid-Day Meal schemes to promote education among lower-income groups.',
        contentMr: 'महानगरपालिका प्राथमिक व माध्यमिक शाळांच्या माध्यमातून गरजू विद्यार्थ्यांना मोफत गणवेश, पुस्तके आणि माध्यान्ह भोजन (Mid-Day Meal) योजना राबविते.',
        bulletPointsEn: [
          'Managing 70+ primary schools and secondary high schools.',
          'Special scholarship distribution for backward class students.',
          'Teacher training programs and infrastructure maintenance.'
        ],
        bulletPointsMr: [
          '७० हून अधिक प्राथमिक व माध्यमिक शाळांचे नियंत्रण.',
          'मागासवर्गीय व गरजू विद्यार्थ्यांसाठी शिष्यवृत्ती वाटप.',
          'शिक्षक प्रशिक्षण उपक्रम आणि शाळा दुरुस्ती.'
        ]
      }
    ]
  },
  'departments/garden': {
    eyebrowEn: 'Departments',
    eyebrowMr: 'विभाग',
    titleEn: 'Garden Department',
    titleMr: 'उद्यान विभाग',
    descriptionEn: 'Maintenances of public parks, recreational areas, and urban forestry.',
    descriptionMr: 'सार्वजनिक उद्याने, करमणूक केंद्रे आणि शहर वृक्षारोपण योजना.',
    sections: [
      {
        headingEn: 'Green City Initiatives',
        headingMr: 'हरित शहर उपक्रम',
        contentEn: 'Maintains city gardens, children parks, divider greenery, tree plantation campaigns, and monitors cutting permissions under Tree Authority rules.',
        contentMr: 'हा विभाग शहरातील उद्याने, खेळपट्टी, रस्ते दुभाजकांवरील हरित पट्टे, वृक्षारोपण मोहीम आणि वृक्ष प्राधिकरण कायद्यानुसार झाडे तोडण्याच्या परवानगी अर्जांवर प्रक्रिया करतो.',
        bulletPointsEn: [
          'Maintenance of major parks (e.g., Siddharth Garden).',
          'Issuance of tree plantation & preservation guidelines.',
          'Tree trimming and removal requests resolution.'
        ],
        bulletPointsMr: [
          'प्रमुख उद्यानांचे व्यवस्थापन (उदा. सिद्धार्थ उद्यान व प्राणीसंग्रहालय).',
          'वृक्षारोपण आणि वृक्ष संरक्षण मार्गदर्शक तत्वे.',
          'धोकादायक झाडे छाटणी अर्जांवर प्रक्रिया.'
        ]
      }
    ]
  },
  'departments/tax': {
    eyebrowEn: 'Departments',
    eyebrowMr: 'विभाग',
    titleEn: 'Tax Department',
    titleMr: 'कर विभाग',
    descriptionEn: 'Assessment and recovery of property tax, professional tax, and other licensing fees.',
    descriptionMr: 'मालमत्ता कर आकारणी, परवाना शुल्क आणि कर वसुली नियंत्रण.',
    sections: [
      {
        headingEn: 'Revenue Collection and Property Valuation',
        headingMr: 'महसूल संकलन आणि मालमत्ता मूल्यांकन',
        contentEn: 'The Tax Department handles self-assessment of property tax, manages reassessment cycles, handles collection counters, and issues NOCs for property transfer.',
        contentMr: 'कर विभाग मालमत्ता कराची आकारणी करणे, नवीन मिळकतींची नोंद करणे, कर देयके तयार करणे व नूतनीकरण NOC देण्याचे काम करतो.',
        bulletPointsEn: [
          'Assessment of residential and commercial properties.',
          'Online payment gateway settlement configuration.',
          'Resolving bill double-charge grievances.'
        ],
        bulletPointsMr: [
          'निवासी व व्यावसायिक मालमत्ता कर आकारणी व मूल्यांकन.',
          'ऑनलाइन मालमत्ता कर वसुली प्रणाली नियंत्रण.',
          'दुबार कर आकारणी किंवा चुकीच्या बिल दुरुस्ती अर्जांचे निवारण.'
        ]
      }
    ]
  },
  'departments/birth-death': {
    eyebrowEn: 'Departments',
    eyebrowMr: 'विभाग',
    titleEn: 'Birth & Death Registration',
    titleMr: 'जन्म-मृत्यू नोंदणी विभाग',
    descriptionEn: 'Official civil registration services under the Birth & Death Registration Act.',
    descriptionMr: 'जन्म आणि मृत्यू नोंदणी कायद्यांतर्गत नागरी नोंदणी सेवा.',
    sections: [
      {
        headingEn: 'Civil Registry Operations',
        headingMr: 'नागरी नोंदणी प्रक्रिया',
        contentEn: 'CSMC records birth and death incidents within municipal boundaries. Certifications can be obtained from the Ward Offices or applied online.',
        contentMr: 'छत्रपती संभाजीनगर मनपा हद्दीतील सर्व जन्म-मृत्यूच्या नोंदी ठेवणारा हा महत्त्वाचा विभाग आहे. नागरिक प्रभाग कार्यालयातून किंवा ऑनलाईन पद्धतीने अर्ज करू शकतात.',
        bulletPointsEn: [
          'Registration within 21 days of occurrence is free.',
          'Late registration procedures require magistrate orders.',
          'Correction of spelling in birth certificates.'
        ],
        bulletPointsMr: [
          '२१ दिवसांच्या आत नोंदणी करणे विनामूल्य आहे.',
          'विलंब नोंदणीसाठी तहसीलदारांच्या आदेशाची आवश्यकता असते.',
          'दाखल्यामधील नाव दुरुस्ती किंवा नवीन नाव जोडणे प्रक्रिया.'
        ]
      }
    ]
  },
  'departments/accounts': {
    eyebrowEn: 'Departments',
    eyebrowMr: 'विभाग',
    titleEn: 'Accounts Department',
    titleMr: 'लेखा विभाग',
    descriptionEn: 'Budget formulation, payment disbursements, and municipal audit coordination.',
    descriptionMr: 'वार्षिक अर्थसंकल्प आराखडा, देयके मंजुरी आणि मनपा जमा-खर्च हिशेब.',
    sections: [
      {
        headingEn: 'Financial Controls & Audits',
        headingMr: 'वित्तीय नियंत्रण व लेखापरीक्षण',
        contentEn: 'Responsible for allocating budget codes, audits, processing contractor bills, preparing annual financial statements, and coordinating with state auditors.',
        contentMr: 'हा विभाग अर्थसंकल्पीय तरतुदींचे वाटप करणे, ठेकेदारांची देयके मंजूर करणे, वित्तीय तक्ता तयार करणे आणि राज्य लेखापरीक्षण विभागाशी समन्वय साधतो.',
        bulletPointsEn: [
          'Formulates the annual draft budget for standing committee.',
          'Handles pension disbursement of retired employees.',
          'Processes municipal bonds and external grant settlements.'
        ],
        bulletPointsMr: [
          'स्थायी समितीसाठी वार्षिक अर्थसंकल्प मसुदा तयार करतो.',
          'सेवानिवृत्त कर्मचाऱ्यांचे निवृत्तीवेतन वाटप नियंत्रण.',
          'शासकीय अनुदाने व विविध निधींचे नियोजन.'
        ]
      }
    ]
  },
  'departments/legal': {
    eyebrowEn: 'Departments',
    eyebrowMr: 'विभाग',
    titleEn: 'Legal Department',
    titleMr: 'कायदेशीर विभाग',
    descriptionEn: 'Representing the corporation in legal matters, court notices, and dispute resolution.',
    descriptionMr: 'न्यायालयीन प्रकरणांमध्ये महानगरपालिकेची बाजू मांडणे व सल्ला देणे.',
    sections: [
      {
        headingEn: 'Legal Advocacy & Drafts',
        headingMr: 'विधी सल्ला व न्यायालयात प्रतिनिधित्व',
        contentEn: 'Provides legal counsel to departments, prepares answers to notices, draft lease agreements, and coordinates panel advocates representing CSMC in High Court and District Court.',
        contentMr: 'हा विभाग विविध विभागांना कायदेशीर सल्ला देतो, करारांचे मसुदे तपासतो आणि उच्च व जिल्हा न्यायालयात मनपाची बाजू मांडणाऱ्या वकिलांचे नियंत्रण करतो.',
        bulletPointsEn: [
          'Vetting agreements, deeds, and land lease tenders.',
          'Managing responses to RTI second appeals.',
          'Arbitration and municipal court litigation.'
        ],
        bulletPointsMr: [
          'करारपत्रे, भाडेपट्टे व खरेदीखतांचे दस्तऐवज तपासणे.',
          'माहिती अधिकार अपीलांमधील विधी सल्ला.',
          'मनपा विरोधातील प्रकरणांमध्ये न्यायालयीन दावे हाताळणे.'
        ]
      }
    ]
  },
  'departments/it': {
    eyebrowEn: 'Departments',
    eyebrowMr: 'विभाग',
    titleEn: 'IT & Smart City Department',
    titleMr: 'आयटी आणि माहिती तंत्रज्ञान विभाग',
    descriptionEn: 'Driving digital transformation, e-governance portals, and Smart City projects.',
    descriptionMr: 'डिजिटल परिवर्तन, ई-गव्हर्नन्स प्रणाली आणि स्मार्ट सिटी योजना.',
    sections: [
      {
        headingEn: 'Digital Municipal Services',
        headingMr: 'ई-गव्हर्नन्स व डिजिटल सेवा',
        contentEn: 'Manages the citizen mobile app, municipal official website, online payment gateways, CCTV surveillance setups, and server infrastructure.',
        contentMr: 'हा विभाग नागरिकांचे ॲप, मनपाची अधिकृत वेबसाईट, ऑनलाईन पेमेंट गेटवे, सीसीटीव्ही नियंत्रण कक्ष आणि सर्व्हर सिस्टीम व्यवस्थापन करतो.',
        bulletPointsEn: [
          'Implementing single-window citizen service delivery systems.',
          'Enforcing cybersecurity protocols on municipal databases.',
          'Coordination with ASCDCL (Smart City) for IoT nodes (smart lights, sensors).'
        ],
        bulletPointsMr: [
          'नागरिकांसाठी एक खिडकी योजना व ऑनलाइन अर्ज सुविधा.',
          'मनपाच्या सर्व डेटाबेसवर सायबर सुरक्षा नियम लागू करणे.',
          'स्मार्ट सिटी प्रकल्पांतर्गत बसविलेले सेन्सर्स व स्मार्ट दिव्यांचे नियंत्रण.'
        ]
      }
    ]
  },

  // --- Citizen Services (Pay gates/Warning cards) ---
  'services/property-tax': {
    eyebrowEn: 'Citizen Services',
    eyebrowMr: 'नागरी सेवा',
    titleEn: 'Property Tax Payment',
    titleMr: 'मालमत्ता कर भरणा',
    descriptionEn: 'Pay your property tax online. Requires citizen account authentication.',
    descriptionMr: 'मालमत्ता कर ऑनलाईन भरा. यासाठी नागरिक खाते असणे आवश्यक आहे.',
    requiresLogin: true,
    sections: []
  },
  'services/water-bills': {
    eyebrowEn: 'Citizen Services',
    eyebrowMr: 'नागरी सेवा',
    titleEn: 'Water Bill Payment',
    titleMr: 'पाणीपट्टी देयक भरणा',
    descriptionEn: 'View and pay your pending water connection bills online. Requires citizen login.',
    descriptionMr: 'तुमचे पाणी बिल पहा आणि ऑनलाईन भरा. यासाठी नागरिक खात्यात लॉगिन करणे आवश्यक आहे.',
    requiresLogin: true,
    sections: []
  },
  'services/certificates': {
    eyebrowEn: 'Citizen Services',
    eyebrowMr: 'नागरी सेवा',
    titleEn: 'Apply for Digital Certificates',
    titleMr: 'डिजिटल प्रमाणपत्रे मिळवा',
    descriptionEn: 'Download verified birth, death, or marriage certificates from the portal. Requires citizen login.',
    descriptionMr: 'अधिकृत जन्म, मृत्यू किंवा विवाह प्रमाणपत्रे ऑनलाईन डाऊनलोड करा. यासाठी लॉगिन आवश्यक आहे.',
    requiresLogin: true,
    sections: []
  },
  'services/calculator': {
    eyebrowEn: 'Citizen Tools',
    eyebrowMr: 'नागरी साधने',
    titleEn: 'Property Tax Calculator',
    titleMr: 'मालमत्ता कर गणक',
    descriptionEn: 'Calculate estimated annual property tax based on your zone, build-up area, and construction type.',
    descriptionMr: 'तुमचे क्षेत्र, बांधकाम प्रकार आणि चटई क्षेत्रफळाच्या आधारे अंदाजे वार्षिक कराची गणना करा.',
    interactiveType: 'calculator',
    sections: []
  },

  // --- Tenders ---
  'tenders/archived': {
    eyebrowEn: 'Tenders',
    eyebrowMr: 'निविदा',
    titleEn: 'Archived Tenders',
    titleMr: 'जुन्या निविदा संग्रह',
    descriptionEn: 'Browse completed and archived municipal tenders and contract awards.',
    descriptionMr: 'पूर्ण झालेल्या आणि जुन्या निविदांची माहिती मिळवा.',
    sections: [
      {
        headingEn: 'Closed Contracts (2024-2025)',
        headingMr: 'बंद झालेल्या निविदा (२०२४-२०२५)',
        contentEn: 'Reference details of contracts that have expired or been successfully awarded to vendors.',
        contentMr: 'कालावधी संपलेल्या किंवा पात्र कंत्राटदारांना मंजूर करण्यात आलेल्या कामांची जुनी माहिती.',
        table: {
          headersEn: ['Tender ID', 'Work Description', 'Close Date', 'Status'],
          headersMr: ['निविदा क्र.', 'कामाचे वर्णन', 'बंद दिनांक', 'मंजूर दिनांक'],
          rowsEn: [
            ['TND-2025-019', 'Water Supply pipe installation Zone 3', '2025-02-15', 'Awarded'],
            ['TND-2025-004', 'Asphalt road repair Town Hall lane', '2025-01-10', 'Closed'],
            ['TND-2024-098', 'Smart City smart-light installation phase-2', '2024-11-30', 'Completed']
          ],
          rowsMr: [
            ['TND-2025-019', 'झोन ३ मध्ये पाणीपुरवठा वाहिनी टाकणे', '२०२५-०२-१५', 'मंजूर'],
            ['TND-2025-004', 'टाऊन हॉल रस्त्याची डांबरीकरण दुरुस्ती', '२०२५-०१-१०', 'बंद'],
            ['TND-2024-098', 'स्मार्ट सिटी स्मार्ट लाईट बसवणे टप्पा-२', '२०२४-११-३०', 'पूर्ण']
          ]
        }
      }
    ]
  },
  'tenders/documents': {
    eyebrowEn: 'Tenders',
    eyebrowMr: 'निविदा',
    titleEn: 'Download Tender Documents',
    titleMr: 'निविदा कागदपत्रे डाऊनलोड',
    descriptionEn: 'Download official bidding documents, schedule of rates, and application templates.',
    descriptionMr: 'निविदांचे अधिकृत अर्ज, अटी-शर्ती व संबंधित कागदपत्रे डाऊनलोड करा.',
    sections: [
      {
        headingEn: 'Standard Bidding Documents (SBD)',
        headingMr: 'प्रमाणित निविदा अर्ज संच',
        contentEn: 'Find blank application forms, annexures, and contractor registration guidelines.',
        contentMr: 'ठेकेदार नोंदणी अर्ज, विहित प्रतिज्ञापत्र आणि निविदा अर्ज संच खालील लिंकवरून डाऊनलोड करा.',
        downloads: [
          { titleEn: 'Contractor Registration Form - Class-A', titleMr: 'ठेकेदार नोंदणी अर्ज - वर्ग-अ', url: '#', size: '1.2 MB' },
          { titleEn: 'General Terms & Conditions Template', titleMr: 'सामान्य अटी व शर्ती नमुना', url: '#', size: '640 KB' },
          { titleEn: 'E-Tendering Registration Guide', titleMr: 'ई-निविदा नोंदणी मार्गदर्शिका', url: '#', size: '2.1 MB' }
        ]
      }
    ]
  },

  // --- Contact Us ---
  'contact/phones': {
    eyebrowEn: 'Contact Us',
    eyebrowMr: 'आमच्याशी संपर्क साधा',
    titleEn: 'Office Telephone Directory',
    titleMr: 'कार्यालय दूरध्वनी निर्देशिका',
    descriptionEn: 'Direct contact numbers for head office, ward offices, and emergency lines.',
    descriptionMr: 'मुख्य कार्यालय, प्रभाग कार्यालये आणि आपत्कालीन संपर्क क्रमांकांची यादी.',
    sections: [
      {
        headingEn: 'Administrative Contacts',
        headingMr: 'प्रशासकीय संपर्क क्रमांक',
        contentEn: 'Please contact the respective desk officers during working hours (10:00 AM to 5:45 PM).',
        contentMr: 'कृपया कार्यालयीन वेळेत (सकाळी १०:०० ते संध्याकाळी ५:४५) संबंधित अधिकाऱ्यांशी संपर्क साधावा.',
        table: {
          headersEn: ['Office / Department', 'Contact Person', 'Telephone No.'],
          headersMr: ['कार्यालय / विभाग', 'संपर्क अधिकारी', 'दूरध्वनी क्रमांक'],
          rowsEn: [
            ['Commissioner Office', 'P.A. to Commissioner', '0240-2331102'],
            ['Deputy Commissioner (Admin)', 'Desk Officer', '0240-2331105'],
            ['Water Supply Control Room', 'Duty Engineer', '0240-2333501'],
            ['Sanitation & Garbage Issues', 'SWM Control Room', '0240-2331502']
          ],
          rowsMr: [
            ['आयुक्त कार्यालय', 'आयुक्तांचे स्वीय सहाय्यक', '०२४०-२३३११०२'],
            ['उपायुक्त (सामान्य प्रशासन)', 'कक्षाधिकारी', '०२४०-२३३११०५'],
            ['पाणी पुरवठा नियंत्रण कक्ष', 'कर्तव्य बजावणारे अभियंता', '०२४०-२३३३५०१'],
            ['स्वच्छता व कचरा उचल तक्रार', 'घनकचरा नियंत्रण कक्ष', '०२४०-२३३१५०२']
          ]
        }
      }
    ]
  },
  'contact/email': {
    eyebrowEn: 'Contact Us',
    eyebrowMr: 'आमच्याशी संपर्क साधा',
    titleEn: 'Official Email Directory',
    titleMr: 'अधिकृत ईमेल निर्देशिका',
    descriptionEn: 'Submit your queries and applications to our official department inbox.',
    descriptionMr: 'तुमच्या शंका आणि अर्ज आमच्या अधिकृत ईमेलवर पाठवा.',
    sections: [
      {
        headingEn: 'Official Inboxes',
        headingMr: 'अधिकृत ईमेल पत्ते',
        contentEn: 'For general assistance, please write to our municipal inbox at support@chhsambhajinagarmc.org.',
        contentMr: 'सर्वसाधारण मदतीसाठी किंवा तक्रारींसाठी support@chhsambhajinagarmc.org या ईमेलवर संपर्क साधा.',
        table: {
          headersEn: ['Department', 'Official Email Address'],
          headersMr: ['विभाग', 'अधिकृत ईमेल पत्ता'],
          rowsEn: [
            ['Municipal Commissioner', 'commissioner@chhsambhajinagarmc.org'],
            ['Town Planning Office', 'townplanning@chhsambhajinagarmc.org'],
            ['Property Tax Cell', 'propertytax@chhsambhajinagarmc.org'],
            ['IT & Smart City', 'it@chhsambhajinagarmc.org']
          ],
          rowsMr: [
            ['महानगरपालिका आयुक्त', 'commissioner@chhsambhajinagarmc.org'],
            ['नगर रचना विभाग', 'townplanning@chhsambhajinagarmc.org'],
            ['मालमत्ता कर कक्ष', 'propertytax@chhsambhajinagarmc.org'],
            ['आयटी व स्मार्ट सिटी', 'it@chhsambhajinagarmc.org']
          ]
        }
      }
    ]
  },
  'contact/feedback': {
    eyebrowEn: 'Contact Us',
    eyebrowMr: 'आमच्याशी संपर्क साधा',
    titleEn: 'Citizen Feedback Form',
    titleMr: 'नागरिक अभिप्राय अर्ज',
    descriptionEn: 'Submit your feedback or suggestions to improve municipal services and facilities.',
    descriptionMr: 'महानगरपालिकेच्या सेवा आणि सुविधा सुधारण्यासाठी तुमचे अभिप्राय किंवा सूचना नोंदवा.',
    interactiveType: 'feedback',
    sections: []
  },

  // --- NCAP ---
  'ncap/air-quality': {
    eyebrowEn: 'NCAP',
    eyebrowMr: 'एनसीएपी',
    titleEn: 'National Clean Air Program - Air Quality Monitoring',
    titleMr: 'हवा गुणवत्ता संनियंत्रण (NCAP)',
    descriptionEn: 'Real-time Air Quality Index (AQI) reports and monitoring stations in the city.',
    descriptionMr: 'शहरातील रिअल-टाइम हवा गुणवत्ता निर्देशांक (AQI) अहवाल व हवा तपासणी केंद्रे.',
    sections: [
      {
        headingEn: 'Active Air Quality Indices (AQI)',
        headingMr: 'सध्याचा हवा गुणवत्ता निर्देशांक (AQI)',
        contentEn: 'Under NCAP, Continuous Ambient Air Quality Monitoring Stations (CAAQMS) are set up to capture PM2.5, PM10 and SO2 levels.',
        contentMr: 'एनसीएपी अंतर्गत शहरात हवा गुणवत्ता तपासणी केंद्रे स्थापन करण्यात आली आहेत. सद्यस्थिती खालीलप्रमाणे आहे.',
        table: {
          headersEn: ['Station Location', 'Primary Pollutant', 'AQI Value', 'Category'],
          headersMr: ['तपासणी केंद्र', 'मुख्य प्रदूषक घटक', 'हवा गुणवत्ता निर्देशांक', 'श्रेणी'],
          rowsEn: [
            ['Town Hall, Gate-1', 'PM10', '92', 'Satisfactory'],
            ['Kranti Chowk Circle', 'PM2.5', '118', 'Moderate'],
            ['CIDCO Bus Stand area', 'PM10', '104', 'Moderate'],
            ['Cantonment Garden', 'PM2.5', '64', 'Satisfactory']
          ],
          rowsMr: [
            ['टाऊन हॉल, गेट क्र. १', 'PM10', '९२', 'समाधानकारक'],
            ['क्रांती चौक परिसर', 'PM2.5', '११८', 'मध्यम'],
            ['सिडको बस स्थानक परिसर', 'PM10', '१०४', 'मध्यम'],
            ['कँटोन्मेंट बगीचा', 'PM2.5', '६४', 'समाधानकारक']
          ]
        }
      }
    ]
  },
  'ncap/projects': {
    eyebrowEn: 'NCAP',
    eyebrowMr: 'एनसीएपी',
    titleEn: 'Clean Air Initiatives & Projects',
    titleMr: 'एनसीएपी अंतर्गत राबविले जाणारे प्रकल्प',
    descriptionEn: 'Measures taken to reduce particulate matter pollution in the city.',
    descriptionMr: 'शहरातील धूळ व वायू प्रदूषण कमी करण्यासाठी राबविलेले विविध उपक्रम.',
    sections: [
      {
        headingEn: 'Active Projects',
        headingMr: 'चालू उपक्रम व विकास कामे',
        contentEn: 'Detailed list of projects funded under the central government grants for NCAP.',
        contentMr: 'केंद्र सरकारकडून राष्ट्रीय स्वच्छ हवा कार्यक्रमांतर्गत मिळालेल्या निधीतून सुरू असलेली विकास कामे.',
        bulletPointsEn: [
          'Procurement of Mechanical Street Sweeping Machines.',
          'Paving open soils and road shoulders to prevent dust re-suspension.',
          'Creation of tree barriers and urban forest pockets.',
          'Deployment of mist fountains at heavy traffic intersections.'
        ],
        bulletPointsMr: [
          'यांत्रिकी रस्ते स्वच्छता वाहने (Mechanical Sweeper) खरेदी.',
          'धूळ उडू नये म्हणून रस्त्यांच्या कडेला पेविंग ब्लॉक बसवणे.',
          'हरित पट्टे (Green Buffer Zone) आणि नागरी वन निर्मिती.',
          'प्रमुख चौक परिसरात पाणी फवारणारे कारंजे (Mist Fountains) उभारणे.'
        ]
      }
    ]
  },
  'ncap/reports': {
    eyebrowEn: 'NCAP',
    eyebrowMr: 'एनसीएपी',
    titleEn: 'NCAP Action Plans & Reports',
    titleMr: 'एनसीएपी अहवाल व कृती आराखडा',
    descriptionEn: 'Monthly air quality index charts and annual performance audits.',
    descriptionMr: 'हवा गुणवत्ता वाढीचे मासिक अहवाल आणि वार्षिक लेखापरीक्षण अहवाल.',
    sections: [
      {
        headingEn: 'Download Reports',
        headingMr: 'अहवाल डाऊनलोड',
        contentEn: 'Find and download past action plans submitted by CSMC to Central Pollution Control Board (CPCB).',
        contentMr: 'महानगरपालिकेने केंद्रीय प्रदूषण नियंत्रण मंडळाकडे सादर केलेले अधिकृत अहवाल खालील दुव्यांवरून डाऊनलोड करा.',
        downloads: [
          { titleEn: 'City Action Plan for Clean Air 2024-2025', titleMr: 'स्वच्छ हवेसाठी शहर कृती आराखडा २०२४-२०२५', url: '#', size: '3.4 MB' },
          { titleEn: 'Annual Source Apportionment Study Report', titleMr: 'वार्षिक प्रदूषण स्रोत शोध अभ्यास अहवाल', url: '#', size: '5.2 MB' },
          { titleEn: 'Monthly Performance Report - May 2026', titleMr: 'मासिक प्रगती अहवाल - मे २०२६', url: '#', size: '920 KB' }
        ]
      }
    ]
  },
  'ncap/dashboard': {
    eyebrowEn: 'NCAP',
    eyebrowMr: 'एनसीएपी',
    titleEn: 'NCAP Progress Dashboard',
    titleMr: 'प्रगती डॅशबोर्ड',
    descriptionEn: 'Visual statistics showing city-wide progress in particulate matter reduction.',
    descriptionMr: 'शहरातील हवेची गुणवत्ता आणि प्रदूषण कपात दर्शविणारा प्रगती आलेख.',
    sections: [
      {
        headingEn: 'Target vs. Achievement',
        headingMr: 'उद्दिष्ट विरुद्ध साध्य आकडेवारी',
        contentEn: 'The program aims for a 20% to 30% reduction in PM10 and PM2.5 concentrations by 2026 as compared to the base year 2017.',
        contentMr: 'या कार्यक्रमांतर्गत २०१७ च्या तुलनेत २०२६ पर्यंत हवेतील घातक कणांचे प्रमाण २०% ते ३०% ने कमी करण्याचे उद्दिष्ट आहे.',
        bulletPointsEn: [
          'Average PM10 concentration 2017: 124 µg/m³',
          'Average PM10 concentration 2025: 98 µg/m³',
          'Percentage reduction achieved: 20.9%',
          'Current rating: Moderate'
        ],
        bulletPointsMr: [
          '२०१७ मधील सरासरी PM10 प्रमाण: १२४ µg/m³',
          '२०२५ मधील सरासरी PM10 प्रमाण: ९८ µg/m³',
          'साध्य झालेली टक्केवारी: २०.९% कपात',
          'सध्याची हवेची गुणवत्ता श्रेणी: मध्यम'
        ]
      }
    ]
  },

  // --- RTI Act ---
  'rti/information': {
    eyebrowEn: 'RTI Act',
    eyebrowMr: 'माहितीचा अधिकार',
    titleEn: 'Right to Information (RTI) Guidelines',
    titleMr: 'माहिती अधिकार कायदा माहिती व नियम',
    descriptionEn: 'Citizen guidelines for filing RTI applications and seeking information.',
    descriptionMr: 'माहिती अधिकारांतर्गत अर्ज सादर करण्याची व माहिती मिळवण्याची नियमावली.',
    sections: [
      {
        headingEn: 'Right to Information Overview',
        headingMr: 'माहिती अधिकार कायदा परिचय',
        contentEn: 'Under the RTI Act 2005, citizens can request information from public authorities. CSMC has designated Public Information Officers in each department to process these requests.',
        contentMr: 'माहितीचा अधिकार अधिनियम २००५ अन्वये नागरिकांना सार्वजनिक प्राधिकरणांकडून माहिती मागवण्याचा हक्क आहे. यासाठी मनपाच्या प्रत्येक विभागात जनमाहिती अधिकारी नियुक्त केले आहेत.',
        bulletPointsEn: [
          'Application Fee: ₹10 (cash or court fee stamp).',
          'Required response period: 30 days from registration.',
          'First appeal can be filed if information is denied or incomplete.'
        ],
        bulletPointsMr: [
          'अर्ज शुल्क: ₹१० (रोख किंवा कोर्ट फी मुद्रांक).',
          'माहिती मिळण्याचा कालावधी: अर्ज केल्यापासून ३० दिवस.',
          'वेळेत माहिती न मिळाल्यास किंवा अयोग्य माहिती मिळाल्यास प्रथम अपील दाखल करता येते.'
        ]
      }
    ]
  },
  'rti/officer': {
    eyebrowEn: 'RTI Act',
    eyebrowMr: 'माहितीचा अधिकार',
    titleEn: 'Public Information Officers Directory',
    titleMr: 'माहिती अधिकाऱ्यांची यादी',
    descriptionEn: 'List of designated PIOs and Appellate Authorities across all departments.',
    descriptionMr: 'विविध विभागांचे जनमाहिती अधिकारी व प्रथम अपिलीय अधिकाऱ्यांची सूची.',
    interactiveType: 'rti-officers',
    sections: []
  },
  'rti/forms': {
    eyebrowEn: 'RTI Act',
    eyebrowMr: 'माहितीचा अधिकार',
    titleEn: 'RTI Application & Appeal Forms',
    titleMr: 'माहिती अधिकार अर्ज आणि नमुने',
    descriptionEn: 'Download standard formats for RTI application (Form-A) and Appeal (Form-D).',
    descriptionMr: 'माहिती अधिकार अर्ज (नमुना-क) आणि अपील अर्ज (नमुना-ड) डाऊनलोड करा.',
    sections: [
      {
        headingEn: 'Standard Forms',
        headingMr: 'अधिकृत अर्ज नमुने',
        contentEn: 'Please print and fill these forms to submit physically at the municipal facilitation counter.',
        contentMr: 'हे अर्ज डाऊनलोड करून, योग्य माहिती भरून मनपाच्या नागरी सुविधा केंद्रात प्रत्यक्ष सादर करू शकता.',
        downloads: [
          { titleEn: 'Form-A: Basic RTI Application Form', titleMr: 'नमुना-क: माहिती मिळवण्याचा मुख्य अर्ज', url: '#', size: '220 KB' },
          { titleEn: 'Form-D: First Appeal Application Form', titleMr: 'नमुना-ड: प्रथम अपिलाचा अर्ज', url: '#', size: '180 KB' },
          { titleEn: 'RTI Fee Rules and Copy Charges', titleMr: 'माहिती अधिकार शुल्क व झेरॉक्स प्रत शुल्क नियमावली', url: '#', size: '320 KB' }
        ]
      }
    ]
  },
  'rti/manual': {
    eyebrowEn: 'RTI Act',
    eyebrowMr: 'माहितीचा अधिकार',
    titleEn: 'RTI Section 4(1)(b) Proactive Disclosures',
    titleMr: 'माहिती अधिकार कलम ४ मार्गदर्शक नियमावली',
    descriptionEn: 'Proactive disclosure manuals containing organizational setup and duties.',
    descriptionMr: 'कलम ४(१)(ब) अन्वये स्वयंस्फूर्तीने घोषित केलेली माहिती व नियमावली पुस्तिका.',
    sections: [
      {
        headingEn: 'Disclosure Manuals',
        headingMr: 'कलम ४ नियमावली पुस्तिका',
        contentEn: 'Find below department-wise disclosure manuals outlining staff duties, registers maintained, and rules applied.',
        contentMr: 'विविध विभागांचे कामकाज, अधिकार आणि नोंदवह्यांबद्दलची कलमी माहितीपुस्तिका खालील दुव्यावरून डाऊनलोड करा.',
        downloads: [
          { titleEn: 'Manual 1: Powers and Duties of Officers', titleMr: 'पुस्तिका १: अधिकाऱ्यांचे अधिकार व कर्तव्ये', url: '#', size: '1.4 MB' },
          { titleEn: 'Manual 2: Rules, Regulations and Instructions', titleMr: 'पुस्तिका २: नियम, नियमावली व सूचना पुस्तिका', url: '#', size: '1.8 MB' },
          { titleEn: 'Manual 3: Directory of Officers & Staff', titleMr: 'पुस्तिका ३: अधिकारी व कर्मचाऱ्यांची संकलित सूची', url: '#', size: '2.5 MB' }
        ]
      }
    ]
  },

  // --- RTS Act ---
  'rts/services': {
    eyebrowEn: 'RTS Act',
    eyebrowMr: 'सेवांचा अधिकार (RTS)',
    titleEn: 'Right to Services (RTS) Covered List',
    titleMr: 'लोकसेवा हक्क अधिनियम - अधिसूचित सेवा यादी',
    descriptionEn: 'List of public services notified under the Maharashtra Right to Public Services Act.',
    descriptionMr: 'महाराष्ट्र लोकसेवा हक्क अभिनियमअंतर्गत अधिसूचित करण्यात आलेल्या सेवांची सूची.',
    sections: [
      {
        headingEn: 'Notified Citizen Services',
        headingMr: 'नागरिकांसाठी अधिसूचित लोकसेवा',
        contentEn: 'Under the RTS Act, CSMC has notified several online and offline citizen services with strict delivery windows.',
        contentMr: 'लोकसेवा हक्क अधिनियमांन्वये खालील सेवा नागरिकांना वेळेत देणे बंधनकारक असून सेवा देण्यास विलंब झाल्यास दाद मागता येते.',
        bulletPointsEn: [
          'Birth, Death, and Marriage Certificate issuance.',
          'Property Assessment and Name mutation.',
          'Water connection sanction and disconnection.',
          'Building permission and occupancy certificate.',
          'Trade License and Health License approval.'
        ],
        bulletPointsMr: [
          'जन्म, मृत्यू आणि विवाह दाखला वाटप.',
          'मालमत्ता कर आकारणी व नाव फेरफार नोंदणी.',
          'नळ जोडणी मंजुरी किंवा खंडित करणे.',
          'इमारत बांधकाम परवानगी आणि भोगवटा प्रमाणपत्र.',
          'व्यापार परवाना व आरोग्य परवाना मंजुरी.'
        ]
      }
    ]
  },
  'rts/process': {
    eyebrowEn: 'RTS Act',
    eyebrowMr: 'सेवांचा अधिकार (RTS)',
    titleEn: 'RTS Application Flow',
    titleMr: 'लोकसेवा अर्ज प्रक्रिया व पायऱ्या',
    descriptionEn: 'Step-by-step instructions to apply for notified services online or offline.',
    descriptionMr: 'लोकसेवा हक्क सेवांचा लाभ घेण्यासाठी अर्ज करण्याची सविस्तर पद्धत.',
    sections: [
      {
        headingEn: 'How to Apply',
        headingMr: 'अर्ज कसा करावा?',
        contentEn: 'Follow these steps to submit an application under the RTS Act.',
        contentMr: 'लोकसेवा हक्क कायद्यांतर्गत अर्ज सादर करण्यासाठी खालील पायऱ्यांचे अनुसरण करा.',
        bulletPointsEn: [
          'Step 1: Go to Aaple Sarkar portal or municipal citizen window.',
          'Step 2: Fill the online application and upload required proofs.',
          'Step 3: Pay the processing fee and obtain a unique Application ID.',
          'Step 4: Track the status using the Application ID.',
          'Step 5: Download the digitally signed certificate once approved.'
        ],
        bulletPointsMr: [
          'पायरी १: आपले सरकार ऑनलाईन सेवा पोर्टल किंवा मनपा सेवा खिडकीला भेट द्या.',
          'पायरी २: अर्ज भरा आणि आवश्यक कागदपत्रे जोडणी करा.',
          'पायरी ३: विहित प्रक्रिया शुल्क भरा आणि अर्ज क्रमांक (Application ID) मिळवा.',
          'पायरी ४: अर्ज क्रमांकाद्वारे सद्यस्थिती ऑनलाईन तपासा.',
          'पायरी ५: मंजुरीनंतर डिजिटल स्वाक्षरीचे प्रमाणपत्र डाऊनलोड करा.'
        ]
      }
    ]
  },
  'rts/time-limits': {
    eyebrowEn: 'RTS Act',
    eyebrowMr: 'सेवांचा अधिकार (RTS)',
    titleEn: 'RTS Time Limits & Designated Officers',
    titleMr: 'अधिसूचित सेवांचा कालमर्यादा तक्ता',
    descriptionEn: 'Delivery windows and appellate authorities for Right to Services.',
    descriptionMr: 'विविध सेवांचा मंजुरी कालावधी आणि अपिलीय अधिकाऱ्यांची माहिती.',
    sections: [
      {
        headingEn: 'Notified Time Limits',
        headingMr: 'सेवा हमी कालावधी तक्ता',
        contentEn: 'If services are not delivered within the time limit, citizens can file first appeal to the designated authority.',
        contentMr: 'नियत कालावधीत सेवा न मिळाल्यास संबंधित अपिलीय अधिकाऱ्यांकडे प्रथम अपील दाखल करता येते.',
        table: {
          headersEn: ['Service Description', 'Time Limit (Days)', 'Designated Officer', 'Appellate Authority'],
          headersMr: ['सेवेचे नाव', 'कालमर्यादा (दिवस)', 'पदनिर्देशित अधिकारी', 'प्रथम अपिलीय अधिकारी'],
          rowsEn: [
            ['Birth Certificate', '5 Days', 'Health Registrar', 'Medical Officer'],
            ['Marriage Registration', '15 Days', 'Ward Officer', 'Deputy Commissioner'],
            ['Property Name Mutation', '30 Days', 'Assessor (Tax)', 'Additional Commissioner'],
            ['New Connection Approval', '15 Days', 'Water Engineer', 'City Engineer']
          ],
          rowsMr: [
            ['जन्माचा दाखला', '५ दिवस', 'निबंधक (आरोग्य)', 'वैद्यकीय अधिकारी'],
            ['विवाह नोंदणी प्रमाणपत्र', '१५ दिवस', 'प्रभाग अधिकारी', 'उपायुक्त (सामान्य प्रशासन)'],
            ['मालमत्ता कर नाव फेरफार', '३० दिवस', 'कर निर्धारक अधिकारी', 'अतिरिक्त आयुक्त'],
            ['नवीन नळ जोडणी मंजुरी', '१५ दिवस', 'जल अभियंता', 'शहर अभियंता']
          ]
        }
      }
    ]
  },
  'rts/apply': {
    eyebrowEn: 'RTS Act',
    eyebrowMr: 'सेवांचा अधिकार (RTS)',
    titleEn: 'RTS Online Portals & Applications',
    titleMr: 'लोकसेवा ऑनलाईन अर्ज दुवे',
    descriptionEn: 'Apply online through Aaple Sarkar portal or localized service desk.',
    descriptionMr: 'आपले सरकार ऑनलाईन सेवा केंद्राद्वारे अर्ज करण्याचे थेट दुवे व माहिती.',
    sections: [
      {
        headingEn: 'Apply Online',
        headingMr: 'ऑनलाईन अर्ज प्रणाली',
        contentEn: 'Click the link below to redirect to Aaple Sarkar (Government of Maharashtra) online services portal.',
        contentMr: 'महाराष्ट्र शासनाच्या अधिकृत "आपले सरकार" ऑनलाईन सेवा पोर्टलवर जाण्यासाठी खालील दुव्यावर क्लिक करा.',
        downloads: [
          { titleEn: 'Aaple Sarkar Portal - RTS Services', titleMr: 'आपले सरकार पोर्टल - लोकसेवा हक्क विभाग', url: 'https://aaplesarkar.mahaonline.gov.in/', size: 'Link' }
        ]
      }
    ]
  },

  // --- Census ---
  'census/information': {
    eyebrowEn: 'Census',
    eyebrowMr: 'जनगणना',
    titleEn: 'Census Information & Guidelines',
    titleMr: 'जनगणना २०२६-२७ माहिती व नियमावली',
    descriptionEn: 'Details about the ongoing census data collection within the municipal corporation.',
    descriptionMr: 'महानगरपालिका क्षेत्रातील जनगणनेचे नियोजन व त्यासंबंधी नागरी माहिती.',
    sections: [
      {
        headingEn: 'Census Objectives',
        headingMr: 'जनगणनेचे उद्दिष्ट आणि महत्त्व',
        contentEn: 'The census provides essential demographic data to draft municipal ward borders, plan city development funds, and allocate health and water infrastructure resources.',
        contentMr: 'जनगणनेच्या आकडेवारीवरून महानगरपालिका क्षेत्रातील वॉर्ड रचनेची पुनर्रचना करणे, शहरासाठी विकास निधीचे नियोजन करणे आणि पायाभूत सुविधांचे वाटप करणे सोपे होते.',
        bulletPointsEn: [
          'Conducted in coordination with Census Authority of India.',
          'Enumerators visit door-to-door to register housing information.',
          'Confidentiality of citizen data is protected under law.'
        ],
        bulletPointsMr: [
          'भारतीय जनगणना विभागाच्या समन्वयाने अंमलबजावणी.',
          'मनपा कर्मचारी घरोघरी जाऊन माहिती संकलित करतात.',
          'नागरिकांच्या वैयक्तिक माहितीची सुरक्षा कायद्याने संरक्षित आहे.'
        ]
      }
    ]
  },
  'census/notifications': {
    eyebrowEn: 'Census',
    eyebrowMr: 'जनगणना',
    titleEn: 'Census Notifications & Forms',
    titleMr: 'जनगणना संबंधित सूचना आणि नमुने',
    descriptionEn: 'Official announcements and gazette copies regarding the municipal census block boundaries.',
    descriptionMr: 'महानगरपालिकेच्या वॉर्डवार जनगणना ब्लॉक सीमा व अधिकृत शासकीय सूचना.',
    sections: [
      {
        headingEn: 'Active Notifications',
        headingMr: 'अधिकृत सूचना',
        contentEn: 'Find and download notifications detailing active census operations and block assignments.',
        contentMr: 'सध्या सुरू असलेल्या जनगणना ब्लॉक रचनेची माहिती देणारे सरकारी परिपत्रक खालील दुव्यावरून डाऊनलोड करा.',
        downloads: [
          { titleEn: 'CSMC Ward Boundaries Census Allocation 2026', titleMr: 'छत्रपती संभाजीनगर वॉर्ड जनगणना विभागणी पत्रक २०२६', url: '#', size: '2.4 MB' },
          { titleEn: 'Enumerator Duty List and Contact Details', titleMr: 'जनगणना कर्मचाऱ्यांची यादी व प्रभाग वाटप तक्ता', url: '#', size: '1.5 MB' }
        ]
      }
    ]
  },
  'census/reports': {
    eyebrowEn: 'Census',
    eyebrowMr: 'जनगणना',
    titleEn: 'Census Reports Download',
    titleMr: 'जनगणना अहवाल डाऊनलोड',
    descriptionEn: 'Demographic profiles, population growth indices, and household statistics.',
    descriptionMr: 'शहरातील लोकसंख्या वाढीचा वेग, लिंगगुणोत्तर प्रमाण आणि प्रभागनिहाय लोकसंख्या अहवाल.',
    sections: [
      {
        headingEn: 'Statistical Reports',
        headingMr: 'लोकसंख्या सांख्यिकी अहवाल',
        contentEn: 'Download detailed data summaries of previous census surveys and draft estimates.',
        contentMr: 'मागील जनगणना अहवाल व सध्याच्या अंदाजे लोकसंख्येची सांख्यिकी आकडेवारी डाऊनलोड करा.',
        downloads: [
          { titleEn: 'Demographic Profile of Chhatrapati Sambhajinagar', titleMr: 'छत्रपती संभाजीनगर शहर लोकसंख्या व साक्षरता आलेख', url: '#', size: '4.2 MB' },
          { titleEn: 'Ward-wise Population Count Census 2011 (Reference)', titleMr: 'प्रभागनिहाय लोकसंख्या गणना २०११ (संदर्भ संच)', url: '#', size: '3.1 MB' }
        ]
      }
    ]
  },
  'census/statistics': {
    eyebrowEn: 'Census',
    eyebrowMr: 'जनगणना',
    titleEn: 'Demographic Statistics Summary',
    titleMr: 'लोकसंख्या सांख्यिकी आकडेवारी',
    descriptionEn: 'Quick census charts of population density, literacy rate, and growth.',
    descriptionMr: 'लोकसंख्या घनता, साक्षरता दर आणि लोकसंख्या वाढीचा वेग दर्शवणारी प्रमुख आकडेवारी.',
    sections: [
      {
        headingEn: 'Key Demographic Indicators',
        headingMr: 'प्रमुख लोकसंख्या निर्देशक',
        contentEn: 'Estimated demographic indicators based on draft census calculations for 2026.',
        contentMr: '२०२६ च्या प्राथमिक अंदाज पत्रकावर आधारित प्रमुख शहराची आकडेवारी.',
        table: {
          headersEn: ['Indicator Description', '2011 Census', '2026 Projection'],
          headersMr: ['निर्देशक', '२०११ जनगणना', '२०२६ अंदाज'],
          rowsEn: [
            ['Total Population', '1,175,116', '1,560,000'],
            ['Average Literacy Rate', '87.5%', '91.2%'],
            ['Sex Ratio (Females per 1000 Males)', '913', '924'],
            ['Population Density (per sq. km.)', '8,460', '11,200']
          ],
          rowsMr: [
            ['एकूण लोकसंख्या', '११,७५,११६', '१५,६०,०००'],
            ['सरासरी साक्षरता दर', '८७.५%', '९१.२%'],
            ['लिंगगुणोत्तर (प्रति १००० पुरुषांमागे स्त्रिया)', '९१३', '९२४'],
            ['लोकसंख्या घनता (प्रति चौ. किमी.)', '८,४६०', '११,२००']
          ]
        }
      }
    ]
  },

  // --- Recruitment ---
  'recruitment/vacancies': {
    eyebrowEn: 'Recruitment',
    eyebrowMr: 'पदभरती',
    titleEn: 'Current Vacancies (2026)',
    titleMr: 'सध्याच्या रिक्त जागा (२०२६)',
    descriptionEn: 'Apply online for active administrative, engineering, and support vacancies in CSMC.',
    descriptionMr: 'महानगरपालिकेमध्ये विविध प्रशासकीय, तांत्रिक आणि आरोग्य पदांच्या रिक्त जागांसाठी ऑनलाईन अर्ज करा.',
    sections: [
      {
        headingEn: 'Active Job Openings',
        headingMr: 'सध्या सुरू असलेले अर्ज',
        contentEn: 'CSMC invites online applications for competitive municipal exams. Read detailed PDF notifications for eligibility.',
        contentMr: 'महानगरपालिकेत सरळ सेवा भरतीद्वारे विविध पदे भरण्यासाठी ऑनलाइन अर्ज मागविण्यात येत आहेत.',
        table: {
          headersEn: ['Post Name', 'Total Vacancies', 'Last Date to Apply', 'Action / Advertisement'],
          headersMr: ['पदाचे नाव', 'एकूण जागा', 'अंतिम तारीख', 'तपशील / जाहिरात'],
          rowsEn: [
            ['Junior Engineer (Civil) - Class-3', '14', '2026-08-20', 'Download Ad / Apply Link'],
            ['Health Inspector - Class-3', '08', '2026-08-15', 'Download Ad / Apply Link'],
            ['Fireman & Driver', '22', '2026-08-30', 'Download Ad / Apply Link']
          ],
          rowsMr: [
            ['कनिष्ठ अभियंता (स्थापत्य) - श्रेणी-३', '१४', '२०२६-०८-२०', 'जाहिरात डाऊनलोड / अर्ज करा'],
            ['आरोग्य निरीक्षक - श्रेणी-३', '०८', '२०२६-०८-१५', 'जाहिरात डाऊनलोड / अर्ज करा'],
            ['अग्निशामक व चालक', '२२', '२०२६-०८-३०', 'जाहिरात डाऊनलोड / अर्ज करा']
          ]
        }
      }
    ]
  },
  'recruitment/results': {
    eyebrowEn: 'Recruitment',
    eyebrowMr: 'पदभरती',
    titleEn: 'Exam Results & Selection Lists',
    titleMr: 'परीक्षा निकाल व गुणवत्ता याद्या',
    descriptionEn: 'Check selection lists and final scorecards of recently conducted municipal exams.',
    descriptionMr: 'नुकत्याच घेण्यात आलेल्या परीक्षांचे निकाल व पात्र उमेदवारांच्या गुणवत्ता याद्या पहा.',
    sections: [
      {
        headingEn: 'Recently Announced Results',
        headingMr: 'अलीकडे घोषित निकाल',
        contentEn: 'Selection lists and waiting lists of qualified candidates. Click the link to download the PDF.',
        contentMr: 'निवड झालेल्या उमेदवारांची मूळ निवड यादी व प्रतीक्षा यादी खालील दुव्यांवर उपलब्ध आहे.',
        downloads: [
          { titleEn: 'Final Selection List - Assistant Town Planner (2025)', titleMr: 'अंतिम निवड यादी - सहाय्यक नगर रचनाकार (२०२५)', url: '#', size: '1.1 MB' },
          { titleEn: 'Clerk-Typist Typing Test Merit List', titleMr: 'लिपिक-टंकलेखक व्यावसायिक चाचणी गुणवत्ता यादी', url: '#', size: '980 KB' }
        ]
      }
    ]
  },
  'recruitment/admit-card': {
    eyebrowEn: 'Recruitment',
    eyebrowMr: 'पदभरती',
    titleEn: 'Download Admit Cards',
    titleMr: 'प्रवेशपत्र डाऊनलोड करा',
    descriptionEn: 'Enter your Application ID to download the hall ticket for competitive municipal exams.',
    descriptionMr: 'विविध मनपा परीक्षांसाठी तुमचा अर्ज क्रमांक टाकून प्रवेशपत्र डाऊनलोड करा.',
    sections: [
      {
        headingEn: 'Hall Ticket Portal Link',
        headingMr: 'प्रवेशपत्र थेट लिंक',
        contentEn: 'Exam admit cards are generally released 7 days prior to the schedule. Click below to go to the external portal link.',
        contentMr: 'प्रवेशपत्र सहसा परीक्षेच्या ७ दिवस आधी जाहीर केले जातात. हॉल तिकीट डाऊनलोड करण्यासाठी खालील लिंकचा वापर करा.',
        downloads: [
          { titleEn: 'Recruitment Portal Login - Hall Ticket Download', titleMr: 'भरती पोर्टल लॉगिन - प्रवेशपत्र डाऊनलोड', url: '#', size: 'External Portal' }
        ]
      }
    ]
  },
  'recruitment/notifications': {
    eyebrowEn: 'Recruitment',
    eyebrowMr: 'पदभरती',
    titleEn: 'Recruitment Circulars & Notifications',
    titleMr: 'भरती संबंधित परिपत्रके व सूचना',
    descriptionEn: 'Changes in age criteria, syllabus modifications, and exam rescheduling alerts.',
    descriptionMr: 'वयोमर्यादा सवलत, अभ्यासक्रमातील बदल व परीक्षा वेळापत्रकातील बदलांची परिपत्रके.',
    sections: [
      {
        headingEn: 'Official Notifications',
        headingMr: 'भरती प्रसिद्धीपत्रके',
        contentEn: 'Refer to these documents for official guidelines, corrigendums, and exam policies.',
        contentMr: 'भरती संदर्भातील सर्व अधिकृत सुधारणापत्रके आणि परीक्षा नियमावली डाऊनलोड करा.',
        downloads: [
          { titleEn: 'Corrigendum 1: Age Relaxation for Technical Posts', titleMr: 'शुद्धीपत्रक १: तांत्रिक पदांसाठीच्या वयोमर्यादेत सूट दुरुस्ती', url: '#', size: '420 KB' },
          { titleEn: 'Syllabus for Junior Engineer Competitive Exam 2026', titleMr: 'कनिष्ठ अभियंता स्पर्धा परीक्षा अभ्यासक्रम २०२६', url: '#', size: '1.3 MB' }
        ]
      }
    ]
  },
  'recruitment/apply': {
    eyebrowEn: 'Recruitment',
    eyebrowMr: 'पदभरती',
    titleEn: 'Online Application Instructions',
    titleMr: 'ऑनलाईन अर्ज मार्गदर्शक सूचना',
    descriptionEn: 'Step-by-step registration guide, photo specifications, and exam fee rules.',
    descriptionMr: 'ऑनलाईन अर्ज नोंदणी पद्धत, फोटो आकार मर्यादा आणि परीक्षा शुल्क भरण्याचे नियम.',
    sections: [
      {
        headingEn: 'Registration Steps',
        headingMr: 'नोंदणी करण्याची प्रक्रिया',
        contentEn: 'Follow these steps carefully before filling the online application form.',
        contentMr: 'ऑनलाईन अर्ज भरताना कोणतीही चूक होऊ नये म्हणून खालील सूचना काळजीपूर्वक वाचा.',
        bulletPointsEn: [
          'Keep scanned copies of Photo (size < 50KB) and Signature (size < 20KB) ready.',
          'Application Fee: ₹1000 for Open Category, ₹900 for Reserved Category.',
          'Pay fee online using UPI, Debit Card, or Net Banking.',
          'Save a copy of the printed application form for verification.'
        ],
        bulletPointsMr: [
          'स्कॅन केलेला फोटो (<५०KB) आणि सहीचे चित्र (<२०KB) तयार ठेवा.',
          'परीक्षा शुल्क: खुला प्रवर्ग ₹१०००, मागासवर्गीय प्रवर्ग ₹९००.',
          'परीक्षा शुल्क ऑनलाइन यूपीआय, डेबिट कार्ड किंवा नेट बँकिंगने भरा.',
          'भरलेल्या अर्जाची प्रत (Print Out) भविष्यातील पडताळणीसाठी जतन करा.'
        ]
      }
    ]
  },

  // --- General Election ---
  'election/information': {
    eyebrowEn: 'General Election',
    eyebrowMr: 'सर्वसाधारण निवडणूक',
    titleEn: 'CSMC General Elections 2025-2026',
    titleMr: 'महानगरपालिका सार्वत्रिक निवडणूक २०२५-२६',
    descriptionEn: 'General election insights, ward-wise voter distribution, and policies.',
    descriptionMr: 'सार्वत्रिक निवडणूक आराखडा, प्रभागवार मतदार रचना आणि निवडणूक नियमावली.',
    sections: [
      {
        headingEn: 'Elections Overview',
        headingMr: 'निवडणूक आढावा व माहिती',
        contentEn: 'CSMC general elections are conducted under the guidance of State Election Commission, Maharashtra. Total 115 ward boundaries have been restructured.',
        contentMr: 'महानगरपालिका सार्वत्रिक निवडणूक महाराष्ट्र राज्य निवडणूक आयोगाच्या देखरेखीखाली घेतली जाते. शहरात एकूण ११५ प्रभाग निश्चित करण्यात आले आहेत.',
        bulletPointsEn: [
          'Total Wards: 115 multi-member wards.',
          'Reservation: 50% reservation for women candidates.',
          'Voter base: Approximately 9.8 lakh eligible voters.'
        ],
        bulletPointsMr: [
          'एकूण वॉर्ड संख्या: ११५ प्रभाग.',
          'आरक्षण: महिला उमेदवारांसाठी ५०% जागा आरक्षित.',
          'एकूण मतदार: अंदाजे ९.८ लाख पात्र मतदार.'
        ]
      }
    ]
  },
  'election/voter-list': {
    eyebrowEn: 'General Election',
    eyebrowMr: 'सर्वसाधारण निवडणूक',
    titleEn: 'Download Ward-wise Voter Lists',
    titleMr: 'प्रभागनिहाय मतदार यादी डाऊनलोड',
    descriptionEn: 'Search your name in the municipal voter list and download ward PDFs.',
    descriptionMr: 'मतदार यादीत तुमचे नाव शोधा आणि प्रभागनिहाय यादी डाऊनलोड करा.',
    sections: [
      {
        headingEn: 'Draft & Final Voter Lists',
        headingMr: 'प्रारूप व अंतिम मतदार याद्या',
        contentEn: 'Find and download the finalized voter rolls by clicking the respective ward numbers.',
        contentMr: 'तुमच्या भागाच्या प्रभाग क्रमांकावर क्लिक करून अंतिम मतदार यादी डाऊनलोड करा.',
        downloads: [
          { titleEn: 'Ward 1 to 10 Compiled Voter List (PDF)', titleMr: 'प्रभाग १ ते १० एकत्रित मतदार यादी (PDF)', url: '#', size: '5.4 MB' },
          { titleEn: 'Ward 11 to 20 Compiled Voter List (PDF)', titleMr: 'प्रभाग ११ ते २० एकत्रित मतदार यादी (PDF)', url: '#', size: '4.8 MB' },
          { titleEn: 'Search Name in State Voter Portal', titleMr: 'राज्य निवडणूक आयोगाच्या संकेतस्थळावर नाव शोधा', url: 'https://voterportal.eci.gov.in/', size: 'Link' }
        ]
      }
    ]
  },
  'election/polling': {
    eyebrowEn: 'General Election',
    eyebrowMr: 'सर्वसाधारण निवडणूक',
    titleEn: 'List of Polling Stations',
    titleMr: 'मतदान केंद्रांची प्रभागनिहाय यादी',
    descriptionEn: 'Find your polling booth location, address, and officer in charge.',
    descriptionMr: 'तुमच्या राहत्या क्षेत्रातील मतदान केंद्राचे नाव, पत्ता आणि मतदान केंद्र प्रमुखाचा संपर्क.',
    sections: [
      {
        headingEn: 'Polling Booth Directory',
        headingMr: 'मतदान केंद्र सूची',
        contentEn: 'Search the database of primary school and municipal buildings designated as polling booths.',
        contentMr: 'मतदानासाठी निश्चित केलेल्या मनपा शाळा व इतर इमारतींची वॉर्डनिहाय यादी खालीलप्रमाणे आहे.',
        table: {
          headersEn: ['Ward No.', 'Polling Station Name & Address', 'Room No.', 'Sector Officer Contact'],
          headersMr: ['प्रभाग क्र.', 'मतदान केंद्राचे नाव व पत्ता', 'खोली क्रमांक', 'क्षेत्रीय अधिकारी संपर्क'],
          rowsEn: [
            ['Ward 1', 'Municipal Primary School, Town Hall lane', 'Room 1 & 2', '0240-2331501'],
            ['Ward 2', 'Saraswati High School near Kranti Chowk', 'Room 4', '0240-2331502'],
            ['Ward 5', 'Navbharat High School, CIDCO Sector-N5', 'Auditorium', '0240-2331505']
          ],
          rowsMr: [
            ['प्रभाग १', 'महानगरपालिका प्राथमिक शाळा, टाऊन हॉल गल्ली', 'खोली क्र. १ आणि २', '०२४०-२३३१५०१'],
            ['प्रभाग २', 'सरस्वती हायस्कूल, क्रांती चौकजवळ', 'खोली क्र. ४', '०२४०-२३३१५०२'],
            ['प्रभाग ५', 'नवभारत हायस्कूल, सिडको एन-५ प्रभाग', 'सभामंडळ', '०२४०-२३३१५०५']
          ]
        }
      }
    ]
  },
  'election/results': {
    eyebrowEn: 'General Election',
    eyebrowMr: 'सर्वसाधारण निवडणूक',
    titleEn: 'Election Result Dashboard',
    titleMr: 'निवडणूक निकाल डॅशबोर्ड',
    descriptionEn: 'Chronological ward-wise election winners and vote count summaries.',
    descriptionMr: 'प्रभागवार निवडून आलेल्या उमेदवारांची नावे व मतांची सांख्यिकी आकडेवारी.',
    sections: [
      {
        headingEn: 'Elected Members (Previous Reference)',
        headingMr: 'निवडून आलेले सदस्य (मागील संदर्भ)',
        contentEn: 'Winner details and margins for recently conducted general elections.',
        contentMr: 'मागील सार्वत्रिक निवडणुकीत निवडून आलेल्या नगरसेवकांची प्रभागनिहाय यादी.',
        table: {
          headersEn: ['Ward No.', 'Winning Candidate', 'Party Representation', 'Votes Secured', 'Margin'],
          headersMr: ['प्रभाग क्र.', 'निवडून आलेले उमेदवार', 'पक्ष पक्षीय चिन्ह', 'मिळालेली मते', 'फरक'],
          rowsEn: [
            ['Ward 1', 'Smt. Anjali Patil', 'Independent', '4,210', '412 votes'],
            ['Ward 2', 'Shri Rahul Shinde', 'Party-A', '5,820', '1,024 votes'],
            ['Ward 3', 'Shri Salim Khan', 'Party-B', '6,104', '980 votes']
          ],
          rowsMr: [
            ['प्रभाग १', 'श्रीमती अंजली पाटील', 'अपक्ष', '४,२१०', '४१२ मते'],
            ['प्रभाग २', 'श्री राहुल शिंदे', 'पक्ष-अ', '५,८२०', '१,०२४ मते'],
            ['प्रभाग ३', 'श्री सलीम खान', 'पक्ष-ब', '६,१०४', '९८० मते']
          ]
        }
      }
    ]
  },
  'election/notifications': {
    eyebrowEn: 'General Election',
    eyebrowMr: 'सर्वसाधारण निवडणूक',
    titleEn: 'Election Notifications & Code of Conduct',
    titleMr: 'निवडणूक अधिसूचना व आचारसंहिता नियम',
    descriptionEn: 'Official code of conduct rules, nomination forms guidelines, and schedule.',
    descriptionMr: 'उमेदवारी अर्ज भरणे, आचारसंहिता नियम व निवडणूक वेळापत्रक अधिसूचना.',
    sections: [
      {
        headingEn: 'Model Code of Conduct',
        headingMr: 'निवडणूक आदर्श आचारसंहिता',
        contentEn: 'Find and download notifications regarding strict implementation of election model code of conduct.',
        contentMr: 'निवडणूक काळात लागणाऱ्या आदर्श आचारसंहितेचे नियम व इतर प्रसिद्धीपत्रके खालील दुव्यावरून डाऊनलोड करा.',
        downloads: [
          { titleEn: 'Official Election Schedule Gazette 2025-26', titleMr: 'निवडणूक अधिकृत वेळापत्रक शासकीय राजपत्र', url: '#', size: '1.2 MB' },
          { titleEn: 'Nomination Form Guidelines for Candidates', titleMr: 'उमेदवारांसाठी उमेदवारी अर्ज भरण्याची नियमावली पुस्तिका', url: '#', size: '2.5 MB' },
          { titleEn: 'Code of Conduct Rules (SEC Maharashtra)', titleMr: 'आचारसंहिता मार्गदर्शक तत्वे (राज्य निवडणूक आयोग)', url: '#', size: '920 KB' }
        ]
      }
    ]
  },

  // --- DP Plan ---
  'dp/development': {
    eyebrowEn: 'DP Plan',
    eyebrowMr: 'डीपी योजना',
    titleEn: 'Development Plan Overview',
    titleMr: 'विकास योजना (DP Plan) आढावा',
    descriptionEn: 'The blueprint for zoning, public utilities, and infrastructure growth of the city.',
    descriptionMr: 'शहरातील झोनिंग नियोजन, आरक्षण आणि रस्त्यांच्या विस्ताराचा बृहत आराखडा.',
    sections: [
      {
        headingEn: 'Sanctioned Development Plan',
        headingMr: 'मंजूर विकास योजना',
        contentEn: 'The Development Plan (DP) regularizes commercial zones, residential areas, public green belts, and reservation plots for gardens and schools.',
        contentMr: 'डीपी प्लॅन हा शहराच्या पुढील २० वर्षांतील नियोजित वाढीचा आराखडा आहे. यात निवासी, व्यावसायिक व औद्योगिक झोन स्वतंत्रपणे विभागलेले आहेत.',
        bulletPointsEn: [
          'Delineates new ring-roads and arterial links.',
          'Reserve plots for solid waste centers, water plants, and hospitals.',
          'Allows zoning checks for residential layouts.'
        ],
        bulletPointsMr: [
          'नवीन वर्तुळाकार रस्ते (Ring Roads) व जोड रस्ते दर्शवतो.',
          'कचरा प्रक्रिया केंद्रे, जल शुद्धीकरण प्रकल्प व रुग्णालयांसाठी भूखंड आरक्षित करतो.',
          'निवासी रहिवासी परवानग्यांसाठी झोन तपासणीची परवानगी देतो.'
        ]
      }
    ]
  },
  'dp/master': {
    eyebrowEn: 'DP Plan',
    eyebrowMr: 'डीपी योजना',
    titleEn: 'City Master Plan 2042',
    titleMr: 'शहर मास्टर प्लॅन २०४२',
    descriptionEn: 'Long-term planning vision for water grid, sanitation lines, and transport.',
    descriptionMr: 'शहरातील पाणी पुरवठा ग्रीड, मलनिःसारण वाहिन्या व वाहतूक व्यवस्थेचा दीर्घकालीन आराखडा.',
    sections: [
      {
        headingEn: 'Vision 2042',
        headingMr: 'ध्येय २०४२',
        contentEn: 'Drafted in coordination with infrastructure experts, this plan envisions smart infrastructure implementation, high-speed transit rings, and smart sewage nets.',
        contentMr: 'शहराचा शाश्वत विकास करण्यासाठी पुढील २० वर्षांतील पायाभूत सुविधा, उड्डाणपूल व मलनिःसारण वाहिन्यांचे नियोजन यात समाविष्ट आहे.',
        bulletPointsEn: [
          'Interlinking city transport routes with Metro rails in future.',
          'Water supply capacity enhancement programs.',
          'Storm-water sewage modernization.'
        ],
        bulletPointsMr: [
          'भविष्यात नियोजित मेट्रो रेल्वेशी नागरी वाहतुकीचे साखळीकरण.',
          'पाणीपुरवठा क्षमता वृद्धी कार्यक्रम.',
          'पावसाळी गटारे व सांडपाणी व्यवस्था आधुनिकीकरण.'
        ]
      }
    ]
  },
  'dp/gis': {
    eyebrowEn: 'DP Plan',
    eyebrowMr: 'डीपी योजना',
    titleEn: 'GIS Mapping Portal Integration',
    titleMr: 'जीआयएस (GIS) नकाशा प्रणाली',
    descriptionEn: 'Interactive GIS maps with layers showing properties, ward boundaries, and reservations.',
    descriptionMr: 'शहरातील मिळकती, प्रभागांच्या सीमा व आरक्षणे दर्शवणारी भौगोलिक जीआयएस नकाशा प्रणाली.',
    sections: [
      {
        headingEn: 'GIS Portal Link',
        headingMr: 'जीआयएस थेट लिंक',
        contentEn: 'Click the link below to access the high-resolution GIS map portal to verify property boundaries and survey numbers.',
        contentMr: 'मालमत्तेची हद्द व गट क्रमांक खात्री करण्यासाठी मनपाच्या अधिकृत "जीआयएस" नकाशा पोर्टलला खालील दुव्यावरून भेट द्या.',
        downloads: [
          { titleEn: 'Access Interactive GIS Portal', titleMr: 'जीआयएस नकाशा पोर्टल उघडा', url: 'https://gis.chhsambhajinagarmc.org/', size: 'Interactive Map' }
        ]
      }
    ]
  },
  'dp/landuse': {
    eyebrowEn: 'DP Plan',
    eyebrowMr: 'डीपी योजना',
    titleEn: 'Land Use Classification',
    titleMr: 'भू-वापर वर्गीकरण नियमावली',
    descriptionEn: 'Permissible activities in residential, commercial, and industrial zones.',
    descriptionMr: 'निवासी, व्यावसायिक आणि औद्योगिक झोनमध्ये कोणत्या व्यवसायांना परवानगी आहे याची नियमावली.',
    sections: [
      {
        headingEn: 'Zone Permissible Index',
        headingMr: 'झोननिहाय परवानगी सूची',
        contentEn: 'Refer to these documents before purchasing land to verify if a specific commercial activity is allowed.',
        contentMr: 'कोणतेही व्यावसायिक काम किंवा दुकान सुरू करण्यापूर्वी ते ठिकाण योग्य झोनमध्ये मोडते का याची खात्री करा.',
        downloads: [
          { titleEn: 'Sanctioned Development Control Regulations (DCR)', titleMr: 'मंजूर विकास नियंत्रण नियमावली पुस्तक (DCR)', url: '#', size: '4.5 MB' },
          { titleEn: 'Residential to Commercial Land Conversion Guide', titleMr: 'निवासी जागेचे व्यावसायिक जागेत रूपांतरण मार्गदर्शिका', url: '#', size: '1.2 MB' }
        ]
      }
    ]
  },
  'dp/download': {
    eyebrowEn: 'DP Plan',
    eyebrowMr: 'डीपी योजना',
    titleEn: 'Download Development Plan Maps',
    titleMr: 'डीपी प्लॅन नकाशे डाऊनलोड',
    descriptionEn: 'Download high-definition PDF maps of sanctioned development plans and layouts.',
    descriptionMr: 'मंजूर विकास योजना व ले-आऊटचे हाय-डेफिनिशन पीडीएफ नकाशे डाऊनलोड करा.',
    sections: [
      {
        headingEn: 'High Resolution Maps',
        headingMr: 'नकाशा दालन',
        contentEn: 'Find sector-wise and ward-wise sanctioned layout sheets for download.',
        contentMr: 'शहराचे विविध सेक्टरनिहाय आणि विभागनिहाय मंजूर नकाशे खालील दुव्यांवर उपलब्ध आहेत.',
        downloads: [
          { titleEn: 'City Sanctioned DP Plan Map (Full resolution)', titleMr: 'शहराचा मंजूर संपूर्ण डीपी नकाशा (Full resolution)', url: '#', size: '14.5 MB' },
          { titleEn: 'Zonal Reservation Map Section-A (CIDCO/N-5)', titleMr: 'झोन आरक्षण नकाशा विभाग-अ (सिडको/एन-५)', url: '#', size: '8.2 MB' }
        ]
      }
    ]
  },

  // --- CSMC IMP Portal ---
  'portal/reports': {
    eyebrowEn: 'CSMC Portal',
    eyebrowMr: 'सीएसएमसी पोर्टल',
    titleEn: 'CSMC Publications & Performance Reports',
    titleMr: 'मनपा वार्षिक अहवाल व प्रकाशने',
    descriptionEn: 'Annual accounts, progress charts, and administrative updates.',
    descriptionMr: 'महानगरपालिकेचे जमा-खर्च ऑडिट रिपोर्ट आणि वार्षिक कार्यप्रगती अहवाल.',
    sections: [
      {
        headingEn: 'Annual Publications',
        headingMr: 'वार्षिक अहवाल प्रसिद्धीकरण',
        contentEn: 'Official audit reports and project progress sheets published by the accounts department.',
        contentMr: 'लेखा व विकास विभागाने नागरिकांच्या माहितीसाठी प्रसिद्ध केलेले वार्षिक लेखापरीक्षण अहवाल.',
        downloads: [
          { titleEn: 'Annual Financial Audit Report 2024-2025', titleMr: 'वार्षिक वित्तीय लेखापरीक्षण अहवाल २०२४-२०२५', url: '#', size: '4.6 MB' },
          { titleEn: 'Administrative Progress Report (2025)', titleMr: 'प्रशासकीय कार्यप्रगती अहवाल (२०२५)', url: '#', size: '3.8 MB' }
        ]
      }
    ]
  },

  // --- Zones / Wards ---
  'zones/zone-1': {
    eyebrowEn: 'Zones / Wards',
    eyebrowMr: 'झोन / प्रभाग',
    titleEn: 'Zone 1 Administrative Details',
    titleMr: 'झोन १ प्रशासकीय प्रभाग कार्यालय',
    descriptionEn: 'Covers wards 1 to 20. Zonal office address, contacts, and staff directory.',
    descriptionMr: 'प्रभाग क्रमांक १ ते २० चा समावेश. झोन कार्यालय पत्ता व संपर्क अधिकारी सूची.',
    sections: [
      {
        headingEn: 'Zone 1 Office Info',
        headingMr: 'झोन १ कार्यालय माहिती',
        contentEn: 'Zonal Office is located at Town Hall premises. Responsible for birth/death registers and sanitation in wards 1 to 20.',
        contentMr: 'झोन १ चे कार्यालय टाऊन हॉल इमारतीत आहे. प्रभाग १ ते २० मधील पाणी, कचरा व नागरी नोंदींचे काम येथून चालते.',
        table: {
          headersEn: ['Designation', 'Officer Name', 'Contact Number', 'Email Address'],
          headersMr: ['पद', 'अधिकारी नाव', 'दूरध्वनी क्रमांक', 'ईमेल पत्ता'],
          rowsEn: [
            ['Assistant Commissioner', 'Shri R. S. Mane', '0240-2331551', 'zone1@chhsambhajinagarmc.org'],
            ['Sanitation Inspector', 'Shri Amit Jadhav', '0240-2331552', 'sanitation1@chhsambhajinagarmc.org']
          ],
          rowsMr: [
            ['सहायक आयुक्त (झोन प्रमुख)', 'श्री आर. एस. माने', '०२४०-२३३१५५१', 'zone1@chhsambhajinagarmc.org'],
            ['स्वच्छता निरीक्षक', 'श्री अमित जाधव', '०२४०-२३३१५५२', 'sanitation1@chhsambhajinagarmc.org']
          ]
        }
      }
    ]
  },
  'zones/zone-2': {
    eyebrowEn: 'Zones / Wards',
    eyebrowMr: 'झोन / प्रभाग',
    titleEn: 'Zone 2 Administrative Details',
    titleMr: 'झोन २ प्रशासकीय प्रभाग कार्यालय',
    descriptionEn: 'Covers wards 21 to 40. Zonal office address, contacts, and staff directory.',
    descriptionMr: 'प्रभाग क्रमांक २१ ते ४० चा समावेश. झोन कार्यालय पत्ता व संपर्क अधिकारी सूची.',
    sections: [
      {
        headingEn: 'Zone 2 Office Info',
        headingMr: 'झोन २ कार्यालय माहिती',
        contentEn: 'Zonal Office is located at Kranti Chowk ward office. Responsible for sanitation and tax collection in wards 21 to 40.',
        contentMr: 'झोन २ चे कार्यालय क्रांती चौक प्रभाग कार्यालयात आहे. प्रभाग २१ ते ४० मधील कर वसुली व कचरा व्यवस्थापन येथून हाताळले जाते.',
        table: {
          headersEn: ['Designation', 'Officer Name', 'Contact Number', 'Email Address'],
          headersMr: ['पद', 'अधिकारी नाव', 'दूरध्वनी क्रमांक', 'ईमेल पत्ता'],
          rowsEn: [
            ['Assistant Commissioner', 'Shri Sunil Patil', '0240-2331561', 'zone2@chhsambhajinagarmc.org'],
            ['Tax Inspector', 'Shri Vinay Deshmukh', '0240-2331562', 'tax2@chhsambhajinagarmc.org']
          ],
          rowsMr: [
            ['सहायक आयुक्त', 'श्री सुनील पाटील', '०२४०-२३३१५६१', 'zone2@chhsambhajinagarmc.org'],
            ['कर निरीक्षक', 'श्री विनय देशमुख', '०२४०-२३३१५६२', 'tax2@chhsambhajinagarmc.org']
          ]
        }
      }
    ]
  },
  'zones/zone-3': {
    eyebrowEn: 'Zones / Wards',
    eyebrowMr: 'झोन / प्रभाग',
    titleEn: 'Zone 3 Administrative Details',
    titleMr: 'झोन ३ प्रशासकीय प्रभाग कार्यालय',
    descriptionEn: 'Covers wards 41 to 60. Zonal office address, contacts, and staff directory.',
    descriptionMr: 'प्रभाग क्रमांक ४१ ते ६० चा समावेश. झोन कार्यालय पत्ता व संपर्क अधिकारी सूची.',
    sections: [
      {
        headingEn: 'Zone 3 Office Info',
        headingMr: 'झोन ३ कार्यालय माहिती',
        contentEn: 'Zonal Office is located at CIDCO N-5 ward office. Responsible for water supply valves and road works in wards 41 to 60.',
        contentMr: 'झोन ३ चे कार्यालय सिडको एन-५ प्रभाग कार्यालयात आहे. प्रभाग ४१ ते ६० मधील पाणी पुरवठा व रस्ते दुरुस्ती कामांचे व्यवस्थापन येथून होते.',
        table: {
          headersEn: ['Designation', 'Officer Name', 'Contact Number', 'Email Address'],
          headersMr: ['पद', 'अधिकारी नाव', 'दूरध्वनी क्रमांक', 'ईमेल पत्ता'],
          rowsEn: [
            ['Assistant Commissioner', 'Smt. Rekha Joshi', '0240-2331571', 'zone3@chhsambhajinagarmc.org'],
            ['Water Engineer', 'Shri Pankaj Shinde', '0240-2331572', 'water3@chhsambhajinagarmc.org']
          ],
          rowsMr: [
            ['सहायक आयुक्त (झोन प्रमुख)', 'श्रीमती रेखा जोशी', '०२४०-२३३१५७१', 'zone3@chhsambhajinagarmc.org'],
            ['जल अभियंता (झोन ३)', 'श्री पंकज शिंदे', '०२४०-२३३१५७२', 'water3@chhsambhajinagarmc.org']
          ]
        }
      }
    ]
  },
  'zones/zone-4': {
    eyebrowEn: 'Zones / Wards',
    eyebrowMr: 'झोन / प्रभाग',
    titleEn: 'Zone 4 Administrative Details',
    titleMr: 'झोन ४ प्रशासकीय प्रभाग कार्यालय',
    descriptionEn: 'Covers wards 61 to 80. Zonal office address, contacts, and staff directory.',
    descriptionMr: 'प्रभाग क्रमांक ६१ ते ८० चा समावेश. झोन कार्यालय पत्ता व संपर्क अधिकारी सूची.',
    sections: [
      {
        headingEn: 'Zone 4 Office Info',
        headingMr: 'झोन ४ कार्यालय माहिती',
        contentEn: 'Zonal Office is located at Shahgunj ward office premises. Responsible for sanitation and licensing in wards 61 to 80.',
        contentMr: 'झोन ४ चे कार्यालय शहागंज प्रभाग कार्यालयात आहे. प्रभाग ६१ ते ८० मधील आरोग्य परवाने व स्वच्छता कामांचे नियंत्रण येथून होते.',
        table: {
          headersEn: ['Designation', 'Officer Name', 'Contact Number', 'Email Address'],
          headersMr: ['पद', 'अधिकारी नाव', 'दूरध्वनी क्रमांक', 'ईमेल पत्ता'],
          rowsEn: [
            ['Assistant Commissioner', 'Shri K. R. Khan', '0240-2331581', 'zone4@chhsambhajinagarmc.org'],
            ['Sanitation Inspector', 'Shri Sachin Kadam', '0240-2331582', 'sanitation4@chhsambhajinagarmc.org']
          ],
          rowsMr: [
            ['सहायक आयुक्त', 'श्री के. आर. खान', '०२४०-२३३१५८१', 'zone4@chhsambhajinagarmc.org'],
            ['स्वच्छता निरीक्षक', 'श्री सचिन कदम', '०२४०-२३३१५८२', 'sanitation4@chhsambhajinagarmc.org']
          ]
        }
      }
    ]
  },
  'zones/zone-5': {
    eyebrowEn: 'Zones / Wards',
    eyebrowMr: 'झोन / प्रभाग',
    titleEn: 'Zone 5 Administrative Details',
    titleMr: 'झोन ५ प्रशासकीय प्रभाग कार्यालय',
    descriptionEn: 'Covers wards 81 to 115. Zonal office address, contacts, and staff directory.',
    descriptionMr: 'प्रभाग क्रमांक ८१ ते ११५ चा समावेश. झोन कार्यालय पत्ता व संपर्क अधिकारी सूची.',
    sections: [
      {
        headingEn: 'Zone 5 Office Info',
        headingMr: 'झोन ५ कार्यालय माहिती',
        contentEn: 'Zonal Office is located at Cidco bus stand premises. Responsible for civil repairs and street lights in wards 81 to 115.',
        contentMr: 'झोन ५ चे कार्यालय सिडको बस स्थानक प्रभाग कार्यालयात आहे. प्रभाग ८१ ते ११५ मधील दिवाबत्ती व स्थापत्य दुरुस्ती कामे येथून नियंत्रित केली जातात.',
        table: {
          headersEn: ['Designation', 'Officer Name', 'Contact Number', 'Email Address'],
          headersMr: ['पद', 'अधिकारी नाव', 'दूरध्वनी क्रमांक', 'ईमेल पत्ता'],
          rowsEn: [
            ['Assistant Commissioner', 'Shri Vijay Patil', '0240-2331591', 'zone5@chhsambhajinagarmc.org'],
            ['Streetlight Engineer', 'Shri Kiran Thorat', '0240-2331592', 'lighting5@chhsambhajinagarmc.org']
          ],
          rowsMr: [
            ['सहायक आयुक्त', 'श्री विजय पाटील', '०२४०-२३३१५९१', 'zone5@chhsambhajinagarmc.org'],
            ['दिवाबत्ती अभियंता', 'श्री किरण थोरात', '०२४०-२३३१५९२', 'lighting5@chhsambhajinagarmc.org']
          ]
        }
      }
    ]
  },
  'zones/maps': {
    eyebrowEn: 'Zones / Wards',
    eyebrowMr: 'झोन / प्रभाग',
    titleEn: 'Ward Boundaries & Maps',
    titleMr: 'प्रभाग रचना नकाशे डाऊनलोड',
    descriptionEn: 'Download PDF maps of restructured ward boundaries (115 Wards).',
    descriptionMr: 'पुनर्रचित प्रभाग सीमा दर्शविणारे मनपाचे अधिकृत नकाशे (११५ प्रभाग) डाऊनलोड करा.',
    sections: [
      {
        headingEn: 'Ward Maps Gallery',
        headingMr: 'प्रभाग आराखडे',
        contentEn: 'High definition PDF maps outlining streets and borders of each of the 115 wards.',
        contentMr: 'तुमचा प्रभाग नेमका कुठपर्यंत विस्तारलेला आहे, हे जाणून घेण्यासाठी प्रभागनिहाय नकाशा फाईल्स डाऊनलोड करा.',
        downloads: [
          { titleEn: 'CSMC City Restructured Ward Boundaries Map 2026', titleMr: 'महानगरपालिका संपूर्ण प्रभाग रचना नकाशा २०२६ (PDF)', url: '#', size: '6.2 MB' },
          { titleEn: 'Ward 1 to 20 Boundary Layout Sheet', titleMr: 'प्रभाग १ ते २० सीमा नकाशा पत्रक', url: '#', size: '2.5 MB' },
          { titleEn: 'Ward 21 to 40 Boundary Layout Sheet', titleMr: 'प्रभाग २१ ते ४० सीमा नकाशा पत्रक', url: '#', size: '2.9 MB' }
        ]
      }
    ]
  },
  'zones/officers': {
    eyebrowEn: 'Zones / Wards',
    eyebrowMr: 'झोन / प्रभाग',
    titleEn: 'Zonal Officers Directory',
    titleMr: 'प्रभाग अधिकारी संपर्क यादी',
    descriptionEn: 'Contact telephone list of all 5 Assistant Commissioners (Zone Heads).',
    descriptionMr: 'सर्व ५ झोन प्रमुखांची (सहायक आयुक्त) संपर्क नावे व दूरध्वनी यादी.',
    sections: [
      {
        headingEn: 'Zonal Officers Contact details',
        headingMr: 'झोन प्रमुख संपर्क माहिती',
        contentEn: 'Find Zonal Heads phone numbers and reporting addresses.',
        contentMr: 'प्रभाग प्रमुखांशी थेट संपर्क साधण्यासाठी मोबाईल क्रमांक व पत्ता यादी खालीलप्रमाणे आहे.',
        table: {
          headersEn: ['Zone Name', 'Assistant Commissioner', 'Mobile Number', 'Office Address'],
          headersMr: ['झोनचे नाव', 'सहायक आयुक्त नाव', 'मोबाईल क्रमांक', 'कार्यालय पत्ता'],
          rowsEn: [
            ['Zone 1', 'Shri R. S. Mane', '9822011401', 'Town Hall ward office'],
            ['Zone 2', 'Shri Sunil Patil', '9822011402', 'Kranti Chowk office'],
            ['Zone 3', 'Smt. Rekha Joshi', '9822011403', 'CIDCO N-5 office'],
            ['Zone 4', 'Shri K. R. Khan', '9822011404', 'Shahgunj ward office'],
            ['Zone 5', 'Shri Vijay Patil', '9822011405', 'Cidco bus stand office']
          ],
          rowsMr: [
            ['झोन १', 'श्री आर. एस. माने', '९८२२०११४०१', 'टाऊन हॉल प्रभाग कार्यालय'],
            ['झोन २', 'श्री सुनील पाटील', '९८२२०११४०२', 'क्रांती चौक प्रभाग कार्यालय'],
            ['झोन ३', 'श्रीमती रेखा जोशी', '९८२२०११४०३', 'सिडको एन-५ प्रभाग कार्यालय'],
            ['झोन ४', 'श्री के. आर. खान', '९८२२०११४०४', 'शहागंज प्रभाग कार्यालय'],
            ['झोन ५', 'श्री विजय पाटील', '९८२२०११४०५', 'सिडको बस स्थानक प्रभाग कार्यालय']
          ]
        }
      }
    ]
  },

  // --- Sitemap ---
  sitemap: {
    eyebrowEn: 'CSMC Portal',
    eyebrowMr: 'सीएसएमसी पोर्टल',
    titleEn: 'Comprehensive Site Map',
    titleMr: 'साइट नकाशा',
    descriptionEn: 'The full directory index of pages and links in the Chhatrapati Sambhajinagar Municipal Corporation Portal.',
    descriptionMr: 'छत्रपती संभाजीनगर महानगरपालिका पोर्टलच्या सर्व पानांची आणि दुव्यांची एकत्रित सूची.',
    interactiveType: 'sitemap',
    sections: []
  }
};
