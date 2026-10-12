import { CandidateProfileValues } from "@/types/candidate/profile.types";

export const DEFAULT_CANDIDATE_PROFILE: CandidateProfileValues = {
  avatarUrl: "",
  fullName: "Alex Morgan",
  headline: "Senior Full Stack Engineer & UI Architect",
  email: "alex.morgan@example.com",
  phone: "+1 (555) 234-5678",
  location: "San Francisco, CA (Open to Remote)",
  bio: "Passionate Full Stack Engineer with 5+ years of experience crafting high-performance, accessible web platforms. Deep expertise in React, Next.js, TypeScript, and distributed Node.js microservices. Proven track record in leading front-end architecture, optimizing web vitals, and mentoring engineering teams.",
  portfolioUrl: "https://alexmorgan.dev",
  githubUrl: "https://github.com/alexmorgan",
  linkedinUrl: "https://linkedin.com/in/alexmorgan-dev",

  jobSearchStatus: "open_to_offers",
  preferredRoles: [
    "Senior Frontend Engineer",
    "Lead Full Stack Developer",
    "UI/UX Architect",
  ],
  preferredWorkType: "Remote",
  preferredEmploymentType: "Full-time",
  expectedSalary: "$140,000 - $175,000",

  technicalSkills: [
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "PostgreSQL",
    "Tailwind CSS",
    "GraphQL",
    "Docker",
    "Redis",
    "Jest / Playwright",
  ],
  softSkills: [
    "System Architecture",
    "Cross-functional Leadership",
    "Agile Scrum",
    "Mentorship",
    "Code Quality & CI/CD",
  ],

  experiences: [
    {
      id: "exp-1",
      company: "Veloce Technologies",
      role: "Senior Full Stack Engineer",
      location: "San Francisco, CA (Remote)",
      startDate: "2023",
      endDate: "Present",
      isCurrent: true,
      description:
        "Architected enterprise real-time collaboration canvas reducing latency by 42%. Spearheaded Next.js 14 App Router migration, resulting in a 35% improvement in Core Web Vitals across 200k monthly active users.",
      technologies: ["React", "TypeScript", "Next.js", "Node.js", "PostgreSQL"],
    },
    {
      id: "exp-2",
      company: "Aura Cloud Systems",
      role: "Frontend Software Engineer",
      location: "Austin, TX (Hybrid)",
      startDate: "2021",
      endDate: "2023",
      isCurrent: false,
      description:
        "Developed custom design system components used across 5 core enterprise cloud management portals. Implemented WCAG 2.1 AA accessibility compliance and micro-frontend state sharing.",
      technologies: ["React", "Tailwind CSS", "GraphQL", "Jest", "Storybook"],
    },
    {
      id: "exp-3",
      company: "Nexis Digital Agency",
      role: "Junior Web Developer",
      location: "Boston, MA",
      startDate: "2019",
      endDate: "2021",
      isCurrent: false,
      description:
        "Engineered responsive web applications for fintech and healthcare clients. Built reusable RESTful API integrations and automated testing pipelines with GitHub Actions.",
      technologies: ["JavaScript", "React", "Node.js", "MySQL", "Docker"],
    },
  ],

  education: [
    {
      id: "edu-1",
      institution: "University of California, Berkeley",
      degree: "Bachelor of Science (B.S.)",
      fieldOfStudy: "Computer Science",
      startYear: "2015",
      endYear: "2019",
      grade: "3.8 GPA (Dean's Honor List)",
    },
  ],

  certifications: [
    {
      id: "cert-1",
      name: "AWS Certified Solutions Architect – Associate",
      issuingOrg: "Amazon Web Services (AWS)",
      issueDate: "2023",
      credentialUrl: "https://aws.amazon.com/verification",
    },
    {
      id: "cert-2",
      name: "Meta Front-End Developer Professional Certificate",
      issuingOrg: "Meta / Coursera",
      issueDate: "2022",
      credentialUrl: "https://coursera.org/verification",
    },
  ],

  activeResumeName: "Alex_Morgan_Senior_Engineer_CV.pdf",
  activeResumeAtsScore: 94,
  activeResumeUpdatedAt: "Sep 15, 2026",
};
