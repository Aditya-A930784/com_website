export type Official = {
  name: string;
  designation: string;
  department: string;
  group: 'State Leadership' | 'Civic Leadership' | 'Administration';
  image: string;
  profileUrl: string;
  email: string;
  phone: string;
  bio: string;
  focus: string[];
};

export const officials: Official[] = [
  {
    name: 'Shri Devendra Fadnavis',
    designation: 'Hon. Chief Minister of Maharashtra',
    department: 'Government of Maharashtra',
    group: 'State Leadership',
    image: 'https://chhsambhajinagarmc.org/assets/cdma/testimonials/DevendraFadnavis17.png',
    profileUrl: 'https://cmo.maharashtra.gov.in/',
    email: 'cmo@maharashtra.gov.in',
    phone: '+91-22-22025222',
    bio: 'Leads the state government and provides policy direction for urban development, public infrastructure, and citizen services.',
    focus: ['Urban policy', 'Infrastructure', 'Public services'],
  },
  {
    name: 'Shri Eknath Shinde',
    designation: 'Hon. Deputy Chief Minister of Maharashtra',
    department: 'Government of Maharashtra',
    group: 'State Leadership',
    image: 'https://chhsambhajinagarmc.org/assets/cdma/testimonials/Eknath_Shinde6.png',
    profileUrl: 'https://www.maharashtra.gov.in/',
    email: 'office@maharashtra.gov.in',
    phone: '+91-22-22025151',
    bio: 'Supports state-level civic development decisions and coordinates priorities for municipal transformation.',
    focus: ['Civic works', 'Coordination', 'Development'],
  },
  {
    name: 'Smt. Sunetra Ajit Pawar',
    designation: 'Hon. Deputy Chief Minister of Maharashtra',
    department: 'Government of Maharashtra',
    group: 'State Leadership',
    image: 'https://chhsambhajinagarmc.org/assets/cdma/testimonials/vahini-saheb5.png',
    profileUrl: 'https://www.maharashtra.gov.in/',
    email: 'office@maharashtra.gov.in',
    phone: '+91-22-22025353',
    bio: 'Guides development priorities connected to welfare, financial planning, and inclusive public delivery.',
    focus: ['Welfare', 'Finance', 'Governance'],
  },
  {
    name: 'Smt. Madhuri Misal',
    designation: 'Hon. Minister of State, Urban Development',
    department: 'Urban Development Department',
    group: 'State Leadership',
    image: 'https://chhsambhajinagarmc.org/assets/cdma/testimonials/madhuri_misal21.png',
    profileUrl: 'https://www.maharashtra.gov.in/',
    email: 'udd@maharashtra.gov.in',
    phone: '+91-22-22026666',
    bio: 'Works with the Urban Development Department on city planning, implementation, and service improvement.',
    focus: ['Urban development', 'Planning', 'Implementation'],
  },
  {
    name: 'Shri Sameer Rajurkar',
    designation: 'Hon. Mayor',
    department: 'Chhatrapati Sambhajinagar Municipal Corporation',
    group: 'Civic Leadership',
    image: 'https://chhsambhajinagarmc.org/assets/cdma/testimonials/samir-bhaiya-rajurkar4.png',
    profileUrl: 'https://chhsambhajinagarmc.org/institutional-structure',
    email: 'mayor@chhsambhajinagarmc.org',
    phone: '+91-240-2333536',
    bio: 'Represents the city council and leads public priorities across wards, local works, and civic initiatives.',
    focus: ['Ward priorities', 'Public works', 'Citizen outreach'],
  },
  {
    name: 'Shri Rajendra Janjal',
    designation: 'Hon. Deputy Mayor',
    department: 'Chhatrapati Sambhajinagar Municipal Corporation',
    group: 'Civic Leadership',
    image: 'https://chhsambhajinagarmc.org/assets/cdma/testimonials/raju-bhaiya-janjal5.png',
    profileUrl: 'https://chhsambhajinagarmc.org/institutional-structure',
    email: 'deputymayor@chhsambhajinagarmc.org',
    phone: '+91-240-2333536',
    bio: 'Assists civic leadership with city-level coordination, committee work, and ward-level public engagement.',
    focus: ['Council support', 'Ward coordination', 'Committees'],
  },
  {
    name: 'Shri Amol Yedge, IAS',
    designation: 'Municipal Commissioner',
    department: 'Chhatrapati Sambhajinagar Municipal Corporation',
    group: 'Administration',
    image: 'https://chhsambhajinagarmc.org/assets/cdma/testimonials/amol_sir_gem5.png',
    profileUrl: 'https://chhsambhajinagarmc.org/institutional-structure',
    email: 'commissioner@chhsambhajinagarmc.org',
    phone: '+91-240-2333536',
    bio: 'Heads municipal administration and supervises service delivery, civic projects, digital systems, and department operations.',
    focus: ['Administration', 'Digital services', 'Operations'],
  },
];

export const officialGroups: Official['group'][] = [
  'State Leadership',
  'Civic Leadership',
  'Administration',
];
