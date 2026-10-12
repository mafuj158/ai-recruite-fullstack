import Image from "next/image";
import img from "@/public/employers-section.png";
import { Button } from "@/components/ui/button";
import { LuCheck } from "react-icons/lu";

const FEATURES = [
  "Video interview analysis for soft skills",
  "Automated candidate ranking & sorting",
  "One-click interview scheduling",
];

const Employers = () => {
  return (
    <section className="py-8 sm:py-12 lg:py-20 bg-white overflow-hidden">
      <div className="container flex flex-col lg:flex-row justify-center items-center gap-6 lg:gap-12">
        {/* Left Column: Content */}
        <div className="w-full lg:w-[52%] flex flex-col items-start">
          {/* Eyebrow Tag */}
          <span className="text-forest font-semibold text-xs sm:text-sm md:text-base tracking-wide mb-2 sm:mb-3">
            For Employers
          </span>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[54px] font-bold font-secondary text-forest tracking-tight leading-[1.15] mb-3 sm:mb-4">
            Stop reading, start <br className="hidden sm:inline" />
            interviewing
          </h2>

          {/* Subtitle */}
          <p className="text-zinc-500 text-xs sm:text-sm md:text-base xl:text-lg leading-relaxed mb-6 sm:mb-8">
            Our AI ranks candidates by compatibility score, so you only spend time on
            the top 1% of matches.
          </p>

          {/* Features Checklist */}
          <ul className="flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-10 w-full">
            {FEATURES.map((feature, index) => (
              <li key={index} className="flex items-center gap-2.5 sm:gap-3">
                <div className="size-4.5 sm:size-5 rounded-full bg-forest text-white flex items-center justify-center shrink-0 shadow-xs">
                  <LuCheck className="size-2.5 sm:size-3 stroke-[3]" />
                </div>
                <span className="text-xs sm:text-sm md:text-base font-semibold text-zinc-900">
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          {/* Call-to-Action Button */}
          <Button
            isLink
            path="/register/employer"
            variant="primary"
            className="w-fit py-2.5 sm:py-3.5 px-6 sm:px-8 rounded font-semibold text-xs sm:text-sm md:text-base shadow-sm hover:opacity-90 transition-opacity"
          >
            Get Started as Employers
          </Button>
        </div>

        {/* Right Column: Illustration Image */}
        <div className="w-full lg:w-[48%] flex justify-center items-center mt-6 lg:mt-0">
          <div className="w-full h-64 sm:h-80 md:h-100 lg:h-120 xl:h-140 rounded drop-shadow-sm overflow-hidden">
            <Image
              src={img}
              alt="AI Recruitment Platform for Employers"
              width={650}
              height={650}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Employers;