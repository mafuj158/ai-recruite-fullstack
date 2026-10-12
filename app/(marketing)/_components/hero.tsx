import { Button } from "@/components/ui/button";
import Image from "next/image";
import heroImage from "@/public/hero-image.png";

const Hero = () => {
  return (
    <section className="bg-forest w-full overflow-hidden">
      <div className="container flex flex-col lg:flex-row items-center lg:items-stretch gap-8 sm:gap-12 lg:gap-16 xl:gap-24 pt-24 sm:pt-32 lg:pt-48 pb-8 sm:pb-12 lg:pb-0">
        {/* Content */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left items-center lg:items-start">
          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white font-bold mb-4 font-secondary leading-[1.1] tracking-tight">
            Start Your AI-Powered <br className="hidden sm:inline" />
            <span className="text-lime">Career Journey</span>
          </h1>

          {/* Subtitle */}
          <p className="text-white/90 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed">
            Match with the perfect opportunities using advanced AI technology.
            Optimize your CV, ace interviews, and land your dream job.
          </p>

          {/* Button */}
          <Button
            isLink
            path="/register"
            className="w-fit py-3 px-8 rounded mt-6 sm:mt-10 font-semibold text-sm sm:text-base shadow-sm"
            variant="secondary"
          >
            Get Started
          </Button>
        </div>

        {/* Image */}
        <div className="w-full lg:w-1/2 h-72 sm:h-96 md:h-120 lg:h-auto lg:min-h-140 xl:min-h-170 bg-lime pt-4 pl-4 sm:pt-6 sm:pl-6 lg:pt-8 lg:pl-8 rounded lg:rounded-none overflow-hidden relative">
          <Image
            src={heroImage}
            alt="Start Your AI-Powered Career Journey"
            width={600}
            height={600}
            priority
            className="object-cover w-full h-full object-top"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;