import Image from "next/image";
import logo from "@/public/logo.png";

export default function RootLoading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F8FAFC] overflow-hidden select-none">
      {/* Background Subtle Dot Pattern with Radial Mask */}
      <div
        className="absolute inset-0 pointer-events-none opacity-80"
        style={{
          backgroundImage: "radial-gradient(#CBD5E1 1.5px, transparent 1.5px)",
          backgroundSize: "24px 24px",
          maskImage:
            "radial-gradient(ellipse 65% 65% at 50% 50%, #000 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 65% 65% at 50% 50%, #000 30%, transparent 100%)",
        }}
      />

      {/* Ambient Pulsing Glow behind Logo */}
      <div className="absolute size-56 rounded-full bg-linear-to-tr from-lime/30 via-emerald-100/40 to-forest/10 blur-3xl animate-pulse pointer-events-none" />

      {/* Main Center Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Animated Logo Container */}
        <div className="relative mb-5">
          {/* Subtle Outer Ping / Radar Ring */}
          <div className="absolute -inset-2.5 rounded bg-lime/25 blur-sm animate-ping [animation-duration:2.5s] pointer-events-none" />

          {/* Rotating Border Gradient Card */}
          <div className="relative size-16 rounded p-[1.5px] bg-linear-to-tr from-forest via-lime to-forest shadow-xl shadow-forest/10 flex items-center justify-center">
            <div className="w-full h-full rounded bg-white flex items-center justify-center">
              <Image
                src={logo}
                alt="AI Recruit Logo"
                width={40}
                height={40}
                className="size-10 object-contain drop-shadow-xs transition-transform duration-300 hover:scale-105"
                priority
              />
            </div>
          </div>
        </div>

        {/* Brand Name */}
        <div className="flex items-center gap-1.5 mb-3">
          <span className="text-xl font-bold tracking-tight text-zinc-900">
            AI Recruit
          </span>
          <span className="size-1.5 rounded-full bg-lime border border-forest/20 inline-block animate-pulse" />
        </div>

        {/* Loading Progress Bar */}
        <div className="w-44 h-1 bg-zinc-200/70 rounded-full overflow-hidden relative shadow-inner">
          <div className="absolute inset-y-0 h-full w-20 bg-linear-to-r from-forest via-[#3A6B53] to-lime rounded-full animate-loader" />
        </div>

        {/* Status Indicator */}
        <p className="text-[11px] font-medium tracking-widest text-zinc-500 uppercase mt-3">
          Loading workspace...
        </p>
      </div>

      {/* Keyframe animation for sliding loader bar */}
      <style>{`
        @keyframes loaderSlide {
          0% {
            transform: translateX(-120%);
          }
          50% {
            transform: translateX(60%);
          }
          100% {
            transform: translateX(240%);
          }
        }
        .animate-loader {
          animation: loaderSlide 1.4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}</style>
    </div>
  );
}