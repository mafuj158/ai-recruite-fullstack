import type { Metadata } from "next";
import Hero from "./_components/hero";
import CTA from "./_components/cta";
import Categories from "./_components/categories";
import AiTools from "./_components/ai-tools";
import Candidates from "./_components/candidates";
import Employers from "./_components/employers";

export const metadata: Metadata = {
  title: "AI-Powered Recruitment & Smart Mock Interviews",
  description:
    "Practice AI mock interviews, optimize your CV, and connect with top tech employers. Streamline hiring with automated candidate ranking and video assessments.",
  openGraph: {
    title: "AI-Powered Recruitment & Smart Mock Interviews | AI-Recruite",
    description:
      "Practice AI mock interviews, optimize your CV, and connect with top tech employers.",
  },
};

export default async function HomePage() {

  // for delay
  await new Promise((resolve) => setTimeout(resolve, 1000));


  return (
    <>
      <Hero />
      <CTA />
      <Categories />
      <AiTools />
      <Employers />
      <Candidates />
    </>
  );
}
