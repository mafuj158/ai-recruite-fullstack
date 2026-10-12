import { CandidateJobDetail } from "@/types/candidate/job-details.types";
import { DUMMY_FIND_JOBS } from "../dummy";

const DEFAULT_JOB_DETAILS: Omit<
  CandidateJobDetail,
  | "id"
  | "slug"
  | "title"
  | "company"
  | "companyInitial"
  | "location"
  | "workType"
  | "employmentType"
  | "experienceLevel"
  | "department"
  | "salaryRange"
  | "salaryMin"
  | "salaryMax"
  | "matchScore"
  | "skills"
  | "description"
  | "postedAt"
  | "isSaved"
  | "status"
> = {
  responsibilities: [
    "Architect, build, and maintain scalable web applications and intuitive user interfaces using modern frontend and full-stack frameworks.",
    "Collaborate closely with product managers, UX designers, and backend architects to translate business goals into high-impact software.",
    "Optimize client-side performance, ensure WCAG 2.1 AA accessibility standards, and implement seamless responsive layouts across devices.",
    "Participate in code reviews, technical design discussions, and mentor junior engineers on engineering best practices.",
    "Implement comprehensive test suites (unit, integration, and E2E) to maintain high system reliability.",
  ],
  requirements: [
    "4+ years of professional full-stack or frontend development experience in high-growth or enterprise environments.",
    "Strong proficiency in TypeScript, React, Next.js, modern CSS/Tailwind, and state management patterns.",
    "Experience building and consuming RESTful and GraphQL APIs with Node.js, Python, or Go.",
    "Solid understanding of relational databases (PostgreSQL, MySQL) and cache layers (Redis).",
    "Familiarity with cloud platforms (AWS, GCP) and containerization tools (Docker, Kubernetes).",
    "Excellent communication and problem-solving skills with a bias for shipping high-quality code.",
  ],
  niceToHaves: [
    "Experience with AI agent architectures, vector embeddings, or LLM integrations.",
    "Prior contributions to open-source software or public design systems.",
    "Familiarity with SOC2, GDPR, or security compliance workflows.",
  ],
  benefits: [
    "Comprehensive health, dental, and vision insurance with 100% premium coverage for employees.",
    "Competitive equity compensation package and 401(k) retirement match up to 4%.",
    "Flexible remote-first work culture with $2,000 home office setup stipend.",
    "Unlimited Paid Time Off (PTO) with a mandatory 3-week minimum per year.",
    "$1,500 annual personal learning and continuous professional development budget.",
  ],
  companyOverview:
    "We are a high-growth technology company on a mission to empower organizations worldwide with intelligent, automated workforce platforms. Backed by top-tier venture capital, our distributed team values craftsmanship, empathy, and transparent collaboration.",
  companySize: "120 - 250 employees",
  companyWebsite: "https://example.com",
  aiMatchInsights: {
    compatibilityScore: 96,
    matchReasons: [
      "Your verified experience in React, TypeScript, and Next.js directly aligns with the core tech stack requirements.",
      "Demonstrated history in high-performance web architecture matches the seniority level needed for this role.",
      "Salary expectation ($135k - $160k) falls comfortably within the advertised range ($130k - $165k).",
      "Preferred remote work arrangement perfectly matches the company's remote-first policy.",
    ],
    gapAreas: [
      "Role mentions Kubernetes and Terraform — highlighting your containerization projects in your cover letter will boost fit.",
    ],
    verifiedSkills: [
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "Tailwind CSS",
    ],
  },
};

export function getCandidateJobDetailBySlug(
  slug: string
): CandidateJobDetail {
  const baseJob =
    DUMMY_FIND_JOBS.find((j) => j.slug === slug) || DUMMY_FIND_JOBS[0];

  return {
    ...baseJob,
    ...DEFAULT_JOB_DETAILS,
    aiMatchInsights: {
      ...DEFAULT_JOB_DETAILS.aiMatchInsights,
      compatibilityScore: baseJob.matchScore,
      verifiedSkills: baseJob.skills,
    },
  };
}
