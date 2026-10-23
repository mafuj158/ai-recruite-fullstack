export * from "@/constants/query-keys";

export interface OptionItem {
  label: string;
  value: string;
}

export const JOB_ROLE_OPTIONS: OptionItem[] = [
  { label: "Frontend Developer", value: "Frontend Developer" },
  { label: "Backend Developer", value: "Backend Developer" },
  { label: "Full Stack Engineer", value: "Full Stack Engineer" },
  { label: "Mobile Developer (iOS/Android)", value: "Mobile Developer" },
  { label: "DevOps & Cloud Engineer", value: "DevOps & Cloud Engineer" },
  { label: "UI/UX Product Designer", value: "UI/UX Product Designer" },
  { label: "Product Manager", value: "Product Manager" },
  { label: "Data Scientist / AI Engineer", value: "Data Scientist / AI Engineer" },
  { label: "QA & Automation Engineer", value: "QA & Automation Engineer" },
  { label: "Cybersecurity Specialist", value: "Cybersecurity Specialist" },
];

export const EXPERIENCE_LEVEL_OPTIONS: OptionItem[] = [
  { label: "Entry Level (0-2 years)", value: "Entry Level (0-2 years)" },
  { label: "Mid-Level (3-5 years)", value: "Mid-Level (3-5 years)" },
  { label: "Senior Level (5-8 years)", value: "Senior Level (5-8 years)" },
  { label: "Lead / Principal (8+ years)", value: "Lead / Principal (8+ years)" },
];

export const INDUSTRY_OPTIONS: OptionItem[] = [
  { label: "Technology & Software", value: "Technology & Software" },
  { label: "Fintech & Banking", value: "Fintech & Banking" },
  { label: "Healthcare & Biotech", value: "Healthcare & Biotech" },
  { label: "E-Commerce & Retail", value: "E-Commerce & Retail" },
  { label: "Education & EdTech", value: "Education & EdTech" },
  { label: "Media & Entertainment", value: "Media & Entertainment" },
];

export const BUDGET_OPTIONS: OptionItem[] = [
  { label: "$40,000 - $70,000 / year", value: "$40,000 - $70,000" },
  { label: "$70,000 - $100,000 / year", value: "$70,000 - $100,000" },
  { label: "$100,000 - $140,000 / year", value: "$100,000 - $140,000" },
  { label: "$140,000 - $180,000 / year", value: "$140,000 - $180,000" },
  { label: "$180,000+ / year", value: "$180,000+" },
  { label: "Competitive / Negotiable", value: "Competitive / Negotiable" },
];

export const COMPANY_SIZE_OPTIONS: OptionItem[] = [
  { label: "1-10 employees (Startup)", value: "1-10" },
  { label: "11-50 employees (Early Stage)", value: "11-50" },
  { label: "51-200 employees (Growth)", value: "51-200" },
  { label: "201-500 employees (Mid-sized)", value: "201-500" },
  { label: "500+ employees (Enterprise)", value: "500+" },
];
