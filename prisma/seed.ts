import "dotenv/config";
import prisma from "../lib/prisma";

const jobRoles = [
  { label: "Frontend Developer", value: "frontend-developer" },
  { label: "Backend Developer", value: "backend-developer" },
  { label: "Full Stack Engineer", value: "full-stack-engineer" },
  { label: "Mobile Developer (iOS/Android)", value: "mobile-developer" },
  { label: "DevOps & Cloud Engineer", value: "devops-cloud-engineer" },
  { label: "UI/UX Product Designer", value: "ui-ux-designer" },
  { label: "Product Manager", value: "product-manager" },
  { label: "Data Scientist / AI Engineer", value: "data-scientist-ai" },
  { label: "QA & Automation Engineer", value: "qa-automation-engineer" },
  { label: "Cybersecurity Specialist", value: "cybersecurity-specialist" },
];

const industries = [
  { label: "Technology & Software", value: "technology-software" },
  { label: "Fintech & Banking", value: "fintech-banking" },
  { label: "Healthcare & Biotech", value: "healthcare-biotech" },
  { label: "E-Commerce & Retail", value: "ecommerce-retail" },
  { label: "Education & EdTech", value: "education-edtech" },
  { label: "Media & Entertainment", value: "media-entertainment" },
];

const skills = [
  { label: "React", value: "react", isPopular: true },
  { label: "TypeScript", value: "typescript", isPopular: true },
  { label: "JavaScript", value: "javascript", isPopular: true },
  { label: "Node.js", value: "node-js", isPopular: true },
  { label: "Python", value: "python", isPopular: true },
  { label: "Next.js", value: "next-js", isPopular: true },
  { label: "Tailwind CSS", value: "tailwind-css", isPopular: true },
  { label: "PostgreSQL", value: "postgresql", isPopular: true },
  { label: "Docker", value: "docker", isPopular: true },
  { label: "AWS", value: "aws", isPopular: true },
  { label: "Git", value: "git", isPopular: true },
  { label: "GraphQL", value: "graphql", isPopular: true },
  { label: "MongoDB", value: "mongodb", isPopular: false },
  { label: "Java", value: "java", isPopular: false },
  { label: "Go", value: "go", isPopular: false },
  { label: "Express.js", value: "express-js", isPopular: false },
  { label: "Vue.js", value: "vue-js", isPopular: false },
  { label: "Angular", value: "angular", isPopular: false },
  { label: "Kubernetes", value: "kubernetes", isPopular: false },
  { label: "Redis", value: "redis", isPopular: false },
];

async function main() {
  console.log("Seeding Job Roles...");
  for (const role of jobRoles) {
    await prisma.jobRole.upsert({
      where: { value: role.value },
      update: { label: role.label },
      create: { label: role.label, value: role.value },
    });
  }

  console.log("Seeding Industries...");
  for (const industry of industries) {
    await prisma.industry.upsert({
      where: { value: industry.value },
      update: { label: industry.label },
      create: { label: industry.label, value: industry.value },
    });
  }

  console.log("Seeding Skills...");
  for (const skill of skills) {
    await prisma.skill.upsert({
      where: { value: skill.value },
      update: { label: skill.label, isPopular: skill.isPopular },
      create: { label: skill.label, value: skill.value, isPopular: skill.isPopular },
    });
  }

  console.log("✅ Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
