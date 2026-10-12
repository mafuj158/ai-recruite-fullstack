import type {
  AIInterviewListItem,
  AIInterviewJobContext,
  AIInterviewQuestion,
  AIInterviewEvaluationReport,
} from "@/types/candidate/ai-interview.types";

export const MOCK_INTERVIEW_LIST: AIInterviewListItem[] = [
  {
    id: "interview-1",
    applicationId: "app-84920",
    jobId: "job-techvision-01",
    jobTitle: "Senior Frontend Engineer",
    companyName: "TechVision Labs",
    companyLogo:
      "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=128&auto=format&fit=crop&q=80",
    department: "Product Engineering",
    experienceLevel: "Senior (5+ yrs)",
    status: "pending",
    deadline: "In 2 days",
    totalQuestions: 4,
    estimatedDurationMinutes: 8,
    appliedDate: "May 18, 2026",
  },
  {
    id: "interview-2",
    applicationId: "app-84915",
    jobId: "job-cloudscale-02",
    jobTitle: "Full Stack Next.js Developer",
    companyName: "CloudScale Systems",
    companyLogo:
      "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=128&auto=format&fit=crop&q=80",
    department: "Core Platform",
    experienceLevel: "Mid-Senior (4+ yrs)",
    status: "completed",
    totalQuestions: 4,
    estimatedDurationMinutes: 8,
    score: 88,
    verdict: "Strong Match",
    completedAt: "May 16, 2026",
    appliedDate: "May 14, 2026",
  },
  {
    id: "interview-3",
    applicationId: "app-84890",
    jobId: "job-nexagen-03",
    jobTitle: "Lead Frontend Architect",
    companyName: "NexaGen AI",
    companyLogo:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=128&auto=format&fit=crop&q=80",
    department: "AI User Interfaces",
    experienceLevel: "Lead (7+ yrs)",
    status: "completed",
    totalQuestions: 5,
    estimatedDurationMinutes: 10,
    score: 92,
    verdict: "Exceptional Fit",
    completedAt: "May 10, 2026",
    appliedDate: "May 08, 2026",
  },
];

export const getInterviewById = (
  id: string
): AIInterviewJobContext | undefined => {
  const item = MOCK_INTERVIEW_LIST.find((i) => i.id === id);
  if (!item) return undefined;
  return {
    id: item.id,
    applicationId: item.applicationId,
    jobId: item.jobId,
    jobTitle: item.jobTitle,
    companyName: item.companyName,
    companyLogo: item.companyLogo,
    department: item.department,
    experienceLevel: item.experienceLevel,
    totalQuestions: item.totalQuestions,
    estimatedDurationMinutes: item.estimatedDurationMinutes,
    status: item.status,
    deadline: item.deadline,
    appliedDate: item.appliedDate,
  };
};

export const MOCK_INTERVIEW_QUESTIONS: AIInterviewQuestion[] = [
  {
    id: "q-1",
    order: 1,
    category: "behavioral",
    categoryLabel: "Introduction & Motivation",
    question:
      "Please give a brief overview of your background in modern web engineering and explain what attracted you to TechVision Labs.",
    context:
      "Help the hiring team understand your career progression and alignment with our product vision.",
    idealDurationSeconds: 90,
    preparationSeconds: 30,
    hints: [
      "Mention your primary tech stack (React, Next.js, TypeScript).",
      "Highlight 1 major accomplishment or project you led.",
      "Share why our engineering culture appeals to you.",
    ],
  },
  {
    id: "q-2",
    order: 2,
    category: "technical",
    categoryLabel: "Architecture & Performance",
    question:
      "Can you describe a challenging frontend performance issue you diagnosed and resolved? What tools did you use and what was the measurable outcome?",
    context:
      "We value engineering rigor in Core Web Vitals, memory management, and network optimization.",
    idealDurationSeconds: 120,
    preparationSeconds: 30,
    hints: [
      "Use the STAR method (Situation, Task, Action, Result).",
      "Include quantifiable metrics (e.g. Lighthouse score +30%, bundle size reduced by 40%).",
      "Mention specific debugging tools like Chrome DevTools Profiler or WebPageTest.",
    ],
  },
  {
    id: "q-3",
    order: 3,
    category: "situational",
    categoryLabel: "Cross-Functional Collaboration",
    question:
      "Describe a time when you strongly disagreed with a product manager or designer on a feature's scope or technical approach. How did you resolve it?",
    context:
      "We operate in fast-paced cross-functional squads where constructive debate is encouraged.",
    idealDurationSeconds: 90,
    preparationSeconds: 30,
    hints: [
      "Focus on empathy and user-centric problem solving.",
      "Explain how you presented technical trade-offs objectively.",
      "Highlight the shared successful outcome.",
    ],
  },
  {
    id: "q-4",
    order: 4,
    category: "culture",
    categoryLabel: "Mentorship & Culture",
    question:
      "How do you approach code reviews and fostering technical growth for junior or mid-level team members?",
    context:
      "Senior engineers at TechVision Labs are culture carriers who elevate the entire team.",
    idealDurationSeconds: 90,
    preparationSeconds: 30,
    hints: [
      "Mention constructive feedback principles.",
      "Explain how you balance delivery speed with architectural quality.",
      "Share an example of a mentee's growth under your guidance.",
    ],
  },
];

export const MOCK_INTERVIEW_REPORT: AIInterviewEvaluationReport = {
  id: "rep-98214",
  jobTitle: "Senior Frontend Engineer",
  companyName: "TechVision Labs",
  overallScore: 89,
  verdict: "Strong Hire",
  completedAt: "Just now",
  durationFormatted: "7m 45s",
  competencies: [
    {
      name: "Communication",
      score: 92,
      weight: "25%",
      assessment: "Articulate, structured responses with clear verbal delivery and concise pacing.",
      iconName: "message",
    },
    {
      name: "Confidence",
      score: 88,
      weight: "25%",
      assessment:
        "High composure, clear tone, steady eye contact, and decisive explanation of decisions.",
      iconName: "award",
    },
    {
      name: "Problem Solving",
      score: 90,
      weight: "25%",
      assessment:
        "Logical breakdown of technical challenges with structured cause-and-effect reasoning.",
      iconName: "cpu",
    },
    {
      name: "Teamwork",
      score: 86,
      weight: "25%",
      assessment:
        "Strong emphasis on cross-functional collaboration, mentorship, and constructive alignment.",
      iconName: "users",
    },
  ],
  strengths: [
    "Exceptional ability to quantify engineering impact with concrete percentages and telemetry metrics.",
    "Concise and structured communication using the STAR framework across all questions.",
    "Proactive attitude toward cross-functional collaboration and user-centered design.",
  ],
  growthAreas: [
    "Elaborate more on automated test coverage strategies when refactoring legacy modules.",
    "Briefly mention CI/CD rollout strategies (canary, feature flags) alongside performance optimizations.",
  ],
  transcripts: [
    {
      questionId: "q-1",
      question:
        "Please give a brief overview of your background in modern web engineering...",
      duration: "1m 18s",
      answerSummary:
        "Outlined 6 years of React and Next.js experience, leading design system migrations and micro-frontends.",
      keyHighlights: [
        "6+ years fullstack frontend",
        "Next.js SSR/ISR",
        "TechVision Labs mission fit",
      ],
      sentiment: "confident",
    },
    {
      questionId: "q-2",
      question:
        "Can you describe a challenging frontend performance issue you diagnosed...",
      duration: "1m 55s",
      answerSummary:
        "Detailed fixing memory leaks caused by unbounded canvas listeners, boosting Lighthouse from 54 to 94.",
      keyHighlights: [
        "Chrome Profiler flamegraphs",
        "Canvas memory cleanup",
        "40% frame rate improvement",
      ],
      sentiment: "positive",
    },
  ],
};
