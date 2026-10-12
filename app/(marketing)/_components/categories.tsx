import {
  LuCompass,
  LuBookOpen,
  LuClock,
  LuMonitor,
  LuLaptop,
  LuMessageSquare,
} from "react-icons/lu";

interface Category {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
}

const CATEGORIES: Category[] = [
  {
    id: "business-development",
    title: "Business\nDevelopment",
    icon: LuCompass,
  },
  {
    id: "marketing-communication",
    title: "Marketing &\nCommunication",
    icon: LuBookOpen,
  },
  {
    id: "project-management",
    title: "Project\nManagement",
    icon: LuClock,
  },
  {
    id: "software-engineering",
    title: "Software\nEngineering",
    icon: LuMonitor,
  },
  {
    id: "software-engineering-2",
    title: "Software\nEngineering",
    icon: LuLaptop,
  },
  {
    id: "customer-service",
    title: "Customer\nService",
    icon: LuMessageSquare,
  },
];

const Categories = () => {
  return (
    <section className="bg-lime/40 py-8 sm:py-12 lg:py-20 xl:py-24">
      <div className="container">
        {/* Section Header */}
        <div className="max-w-2xl mb-6 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-secondary text-forest tracking-tight">
            Popular Categories
          </h2>
          <p className="text-zinc-600 text-xs sm:text-sm md:text-base mt-2 sm:mt-3 leading-relaxed">
            Search all the open positions on the web. Get your own personalized salary
            estimate. Read reviews on over 30000+ companies worldwide.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-5">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;

            return (
              <div
                key={cat.id}
                className="group relative w-full h-44 sm:h-50 lg:h-55 rounded py-4 sm:py-5 px-3 sm:px-4 flex flex-col items-center justify-center gap-2.5 sm:gap-3 text-center bg-white text-zinc-900 border border-black/5 shadow-xs hover:bg-lime hover:border-lime/30 hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 ease-in-out cursor-pointer select-none"
              >
                {/* Top Icon Badge */}
                <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full flex items-center justify-center bg-[#EEF3ED] text-forest group-hover:bg-forest group-hover:text-white group-hover:scale-105 transition-all duration-300 ease-in-out shadow-xs">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.75]" />
                </div>

                {/* Bottom Category Title */}
                <span className="text-[11px] sm:text-xs md:text-sm font-semibold whitespace-pre-line leading-tight text-zinc-800 group-hover:text-forest group-hover:font-bold transition-all duration-300 ease-in-out">
                  {cat.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;