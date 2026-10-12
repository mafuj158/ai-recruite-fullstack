import type { CVManagerData } from "@/types/candidate/cv-manager.types";

export const DUMMY_CV_DATA: CVManagerData = {
  currentCV: {
    id: "cv-alex-morgan-primary",
    fileName: "Alex_Morgan_Senior_FullStack_Engineer_2026.pdf",
    fileSize: "2.4 MB",
    uploadedAt: "Sep 19, 2026 at 4:15 PM",
    fileUrl: "/dummy/Alex_Morgan_Resume.pdf",
    isPrimary: true,
    version: "v3.2",
  },
  atsMetrics: {
    overallScore: 86,
    formattingScore: 94,
    keywordScore: 78,
    impactScore: 82,
    relevanceScore: 90,
    strengths: [
      "Clean single-column ATS layout without parse-blocking tables or text frames",
      "Strong chronological trajectory with consistent action-oriented verb stems",
      "High density of industry-standard tech stack keywords (Next.js, TypeScript, PostgreSQL)",
      "Clear contact section with accessible LinkedIn and GitHub portfolio links",
    ],
    missingKeywords: [
      "Distributed Tracing",
      "Kafka Event Streaming",
      "OpenTelemetry",
      "Terraform Cloud",
      "Redis Caching",
      "GraphQL Subscriptions",
    ],
    topKeywordsFound: [
      "Next.js (App Router)",
      "TypeScript",
      "REST & GraphQL",
      "Tailwind CSS",
      "Docker",
      "CI/CD Pipelines",
      "PostgreSQL",
      "Microservices",
      "System Design",
      "Agile/Scrum",
    ],
  },
  suggestions: [
    {
      id: "sug-1",
      section: "experience",
      title: "Quantify Latency & Throughput Gains in Core Microservices",
      targetRoleContext: "Senior Full Stack Engineer at Stripe / Fintech",
      originalText:
        "Rewrote backend services in Node.js and improved database query times for faster user experience.",
      improvedText:
        "Architected asynchronous event-driven microservices with Node.js and PostgreSQL, slashing p99 latency by 42% and sustaining 25,000+ peak requests/sec during high-traffic billing cycles.",
      reasoning:
        "Replaces vague statements ('faster user experience') with concrete, high-impact engineering metrics (42% latency cut, 25k req/sec) using the STAR methodology.",
      status: "pending",
    },
    {
      id: "sug-2",
      section: "experience",
      title: "Emphasize Cloud Infrastructure and Cost Stewardship",
      targetRoleContext: "Staff AI Fullstack Architect at Nexus Dynamics",
      originalText:
        "Helped maintain AWS infrastructure and container deployments using Docker and GitHub Actions.",
      improvedText:
        "Automated containerized CI/CD deployment pipelines on AWS ECS/Fargate, cutting cloud infrastructure spend by 28% ($4,200/mo) and reducing release turnaround from 45 to 8 minutes.",
      reasoning:
        "Highlights business impact, dollar-savings, and velocity improvements—signals that hiring managers look for in senior engineering candidates.",
      status: "pending",
    },
    {
      id: "sug-3",
      section: "summary",
      title: "Front-load Senior Technical Value Proposition",
      targetRoleContext: "Professional Profile Overview",
      originalText:
        "Passionate full-stack developer with 6+ years of experience looking for a senior developer position in high-growth tech companies.",
      improvedText:
        "Results-driven Senior Full-Stack Engineer with 6+ years spearheading distributed web systems, resilient Next.js architectures, and high-throughput microservices across fintech and enterprise SaaS platforms.",
      reasoning:
        "Removes passive job-seeker phrasing ('looking for a position') and establishes an authoritative, domain-specialized executive summary.",
      status: "pending",
    },
    {
      id: "sug-4",
      section: "skills",
      title: "Categorize Skills into Indexed ATS Competencies",
      targetRoleContext: "Technical Skills Matrix",
      originalText:
        "Skills: JavaScript, TypeScript, Next.js, Node.js, databases, git, cloud, agile.",
      improvedText:
        "Frontend & Core: TypeScript, Next.js (App Router), React 19, Tailwind CSS | Backend & Systems: Node.js, Go, PostgreSQL, Redis, GraphQL | DevOps & Cloud: AWS (ECS, S3, CloudFront), Docker, GitHub Actions, CI/CD.",
      reasoning:
        "Organizes flat keyword lists into categorized ATS-indexed competencies, dramatically improving automated ATS score weighting and recruiter scannability.",
      status: "pending",
    },
  ],
};
