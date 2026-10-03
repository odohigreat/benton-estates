// Team shown on the About page, in display order. Photos live in /public/images/team/.
export interface TeamMember {
  name: string;
  role: string;
  photo?: string;     // e.g. '/images/team/jane-doe.jpg' — portrait, ideally 4:5
  bio?: string;       // one or two sentences
  email?: string;
  phone?: string;     // international format, e.g. '+2348030000000'
  linkedin?: string;  // full profile URL
}

export const team: TeamMember[] = [
  {
    name: 'Mr. Classics Oke Oteri',
    role: 'MD / CEO',
    photo: '/images/team/ceo_benton_estates.png',
  },
  {
    name: 'Dr. Barry Wonder',
    role: 'Non-Executive Director',
    photo: '/images/team/dr_barry_wonder.png',
  },
  {
    name: 'Eseoghene Emakunuya',
    role: 'Non-Executive Director',
    photo: '/images/team/eseoghene_emakunuya.png',
  },
  {
    name: 'Sheila Akporherhe',
    role: 'Customer Care Services Representative',
    photo: '/images/team/customer_service_rep.png',
  },
  {
    name: 'Samuel Ovie Ojogri',
    role: 'IT & Social Media Manager',
    photo: '/images/team/samuel_ovie.png',
  },
];
