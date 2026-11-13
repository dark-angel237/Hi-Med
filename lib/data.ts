// Central content store — edit here to update the site without touching components.

export const SITE = {
  name: "Hi-Med Prepas",
  phone: "676 741 258",
  phoneHref: "tel:+237676741258",
  whatsappHref: "https://wa.me/237676741258",
  email: "info@himedprepas.cm",
  hours: "Mon – Sat, 7:30 AM – 4:00 PM",
  since: 2015,
};

export const NAV_LINKS = [
  { label: "Why Us", href: "#why-us" },
  { label: "Programs", href: "#programs" },
  { label: "Centers", href: "#centers" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export const PROGRAMS = [
  {
    id: "medicine",
    title: "Medicine",
    description: "Prepare for the most competitive medical faculties in the country.",
    schools: ["FMBS", "FHS", "UDM", "ISTM", "CATUC"],
  },
  {
    id: "engineering",
    title: "Engineering & Tech",
    description: "Master maths, physics and logic for top engineering schools.",
    schools: ["Polytechnic", "Public Works", "SUPPTIC", "COLTECH", "EGEM & more"],
  },
  {
    id: "nursing",
    title: "Nursing",
    description: "Targeted coaching for nursing, midwifery and allied health.",
    schools: ["FHS", "IDE", "TMS", "MLS", "Midwifery", "State Registered Nursing"],
  },
  {
    id: "teaching",
    title: "Teaching & Others",
    description: "Gain entry into the leading teacher-training colleges.",
    schools: ["ENS", "ENSET", "HTTC", "and more"],
  },
] as const;

export type ProgramId = (typeof PROGRAMS)[number]["id"];

// Placeholder centers — add or edit entries freely; the grid adapts automatically.
export const CENTERS = [
  { name: "Abohbo Building", city: "Bamenda", region: "North West", address: "Commercial Avenue, Bamenda" },
  { name: "PCHS Mankon", city: "Bamenda", region: "North West", address: "Presbyterian Comprehensive High School, Mankon" },
  { name: "Molyko Campus", city: "Buea", region: "South West", address: "Molyko, near University of Buea" },
  { name: "Bonamoussadi Center", city: "Douala", region: "Littoral", address: "Bonamoussadi, Douala V" },
  { name: "Ngoa-Ekellé Center", city: "Yaoundé", region: "Centre", address: "Ngoa-Ekellé, near University of Yaoundé I" },
  { name: "Bafoussam Center", city: "Bafoussam", region: "West", address: "Tamdja, Bafoussam" },
];

export const TESTIMONIALS = [
  {
    name: "Brenda N.",
    school: "Admitted to FMBS, Yaoundé",
    quote:
      "The mock exams felt exactly like the real concours. By exam day I wasn't nervous anymore — I knew what to expect and how to manage my time.",
  },
  {
    name: "Kelvin T.",
    school: "Admitted to National Polytechnic",
    quote:
      "My tutors were former Polytechnic students themselves. They showed me shortcuts in maths and physics that I never learned in school.",
  },
  {
    name: "Gladys A.",
    school: "Admitted to FHS, Buea (Nursing)",
    quote:
      "The weekly program kept me disciplined. The mentorship sessions helped me believe I could make it, and I did on my first attempt.",
  },
  {
    name: "Samuel F.",
    school: "Admitted to ENS, Yaoundé",
    quote:
      "Hi-Med gave me structure, past questions and constant feedback. My parents saw the difference in my confidence within a month.",
  },
];
