import Image from "next/image";
import Img from "@/public/ai-tools-section.png";
import {
  LuSparkles,
  LuFileText,
  LuCheckCheck,
  LuVideo,
  LuChartBar,
  LuBriefcase,
  LuChartPie,
} from "react-icons/lu";

interface ToolItem {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const TOOLS: ToolItem[] = [
  {
    id: "resume-parsing",
    title: "Resume Parsing",
    description: "Extract skills, experience, and education automatically",
    icon: LuFileText,
  },
  {
    id: "skill-matching",
    title: "Skill Matching",
    description: "Match candidates to jobs with 95% accuracy",
    icon: LuCheckCheck,
  },
  {
    id: "interview-assistant",
    title: "Interview Assistant",
    description: "AI conducts and evaluates video interviews",
    icon: LuVideo,
  },
  {
    id: "candidate-ranking",
    title: "Candidate Ranking",
    description: "Automatic scoring and shortlisting",
    icon: LuChartBar,
  },
  {
    id: "job-recommendations",
    title: "Job Recommendations",
    description: "Personalized job suggestions for candidates",
    icon: LuBriefcase,
  },
  {
    id: "analytics-dashboard",
    title: "Analytics Dashboard",
    description: "Real-time insights and hiring metrics",
    icon: LuChartPie,
  },
];

// Pre-computed mathematical starburst polygon coordinates for sharp SVG rendering
const SCALLOP_POINTS = Array.from({ length: 24 }, (_, i) => {
  const angle = (i * Math.PI) / 12;
  const r = i % 2 === 0 ? 46 : 38;
  const x = (50 + r * Math.sin(angle)).toFixed(1);
  const y = (50 - r * Math.cos(angle)).toFixed(1);
  return `${x},${y}`;
}).join(" ");

const SUNBURST_POINTS = Array.from({ length: 32 }, (_, i) => {
  const angle = (i * Math.PI) / 16;
  const r = i % 2 === 0 ? 48 : 22;
  const x = (50 + r * Math.sin(angle)).toFixed(1);
  const y = (50 - r * Math.cos(angle)).toFixed(1);
  return `${x},${y}`;
}).join(" ");

const AiTools = () => {
  return (
    <section className="py-8 sm:py-12 lg:py-20 xl:py-24 bg-white overflow-hidden">
      <div className="container flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-10 lg:gap-14">
        {/* Left Column: Content & Feature Grid */}
        <div className="w-full lg:w-[55%] flex flex-col">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 bg-[#F0F4F1] border border-[#E0EAE2] px-3.5 py-1.5 rounded-full w-fit mb-4 sm:mb-6">
            <div className="size-6 rounded-full bg-forest text-white flex items-center justify-center">
              <LuSparkles className="size-3.5" />
            </div>
            <span className="text-xs font-semibold text-forest">
              AI-Powered Tools
            </span>
          </div>

          {/* Section Title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-bold font-secondary text-forest tracking-tight leading-[1.18] mb-6 sm:mb-8">
            Advanced technology that <br className="hidden sm:inline" />
            makes recruitment effortless
          </h2>

          {/* 6 AI Tool Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-4">
            {TOOLS.map((tool) => {
              const Icon = tool.icon;
              return (
                <div
                  key={tool.id}
                  className="group bg-[#EFF3EF] rounded p-4 sm:p-5 flex flex-col justify-start border border-transparent hover:border-forest/15 hover:bg-white hover:shadow-md hover:-translate-y-1 transition-all duration-300 ease-in-out cursor-default"
                >
                  {/* Icon Badge */}
                  <div className="size-9 sm:size-10 rounded-full bg-forest text-white flex items-center justify-center mb-3 sm:mb-3.5 shadow-xs group-hover:scale-105 transition-transform duration-300">
                    <Icon className="size-4 sm:size-4.5 stroke-[2]" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xs sm:text-sm font-bold text-zinc-900 leading-snug group-hover:text-forest transition-colors">
                    {tool.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[11px] sm:text-xs text-zinc-500 mt-1 sm:mt-1.5 leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Hero Image with Starburst Accent */}
        <div className="w-full lg:w-[45%] relative mt-6 lg:mt-0">
          {/* Overlapping Starburst Accent Stickers */}
          <div className="absolute -top-4 -left-4 sm:-top-7 sm:-left-7 z-20 flex items-center pointer-events-none drop-shadow-sm">
            {/* Dark Forest Starburst */}
            <svg
              viewBox="0 0 100 100"
              className="size-12 sm:size-16 lg:size-20 text-forest fill-current transform -rotate-12"
            >
              <polygon points={SCALLOP_POINTS} />
            </svg>

            {/* Bright Lime Sunburst */}
            <svg
              viewBox="0 0 100 100"
              className="size-12 sm:size-16 lg:size-20 text-lime fill-current -ml-5 sm:-ml-7 -mt-1 sm:-mt-2 transform rotate-12"
            >
              <polygon points={SUNBURST_POINTS} />
            </svg>
          </div>

          {/* Image Frame */}
          <div className="relative w-full h-72 sm:h-96 md:h-110 lg:h-130 rounded overflow-hidden shadow-lg border border-black/5">
            <Image
              src={Img}
              alt="AI Recruitment Professional"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover w-full h-full"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiTools;