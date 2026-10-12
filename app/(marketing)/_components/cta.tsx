import employer_image from "@/public/employer.png";
import candidate_image from "@/public/candidate.png";
import employer_bg from "@/public/employer-card.png";
import candidate_bg from "@/public/candidate-card.png";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";

const CTA = () => {
  const cta = [
    {
      title: "For Employers",
      description: "Post jobs, automate screening, and hire top talent efficiently.",
      buttonText: "Sign Up as Employers",
      buttonLink: "/register/employer",
      bgImage: employer_bg,
      image: employer_image,
      type: "employer",
    },
    {
      title: "For Candidate",
      description: "Optimize your CV, get matched to jobs, and get hired fast.",
      buttonText: "Sign Up as Candidate",
      buttonLink: "/register/candidate",
      bgImage: candidate_bg,
      image: candidate_image,
      type: "candidate",
    },
  ];

  return (
    <section className="container grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 py-8 sm:py-12 lg:py-20">
      {cta.map((item, index) => {
        return (
          <div
            key={index}
            className="p-6 sm:p-8 lg:p-11 relative overflow-hidden rounded w-full flex justify-between items-center min-h-[250px] sm:min-h-[280px] shadow-sm"
            style={{
              backgroundImage: `url(${item.bgImage.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="w-full max-w-[210px] xs:max-w-[260px] sm:max-w-xs md:max-w-sm flex flex-col relative z-10">
              <h2
                className={cn(
                  "font-bold text-xl sm:text-2xl mb-1.5",
                  item.type === "employer" ? "text-[#111]" : "text-white"
                )}
              >
                {item.title}
              </h2>
              <p
                className={cn(
                  "text-xs sm:text-sm md:text-base leading-relaxed",
                  item.type === "employer" ? "text-[#444D5A]" : "text-white/90"
                )}
              >
                {item.description}
              </p>
              <Button
                isLink
                path={item.buttonLink}
                className="w-fit py-2.5 sm:py-3 px-5 sm:px-6 rounded mt-6 sm:mt-8 lg:mt-10 text-xs sm:text-sm font-semibold shadow-xs"
                variant={item.type === "employer" ? "primary" : "secondary"}
              >
                {item.buttonText}
              </Button>
            </div>

            <div className="w-36 h-36 xs:w-44 xs:h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-64 absolute -bottom-3 sm:-bottom-4 -right-2 sm:right-1 pointer-events-none">
              <Image
                src={item.image}
                alt={item.title}
                width={300}
                height={300}
                className="object-contain object-bottom w-full h-full"
              />
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default CTA;