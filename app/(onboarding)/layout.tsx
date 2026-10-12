import React from "react";


export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] relative flex flex-col overflow-x-hidden">
      {/* Background Dots Pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#CBD5E1 1.5px, transparent 1.5px)",
          backgroundSize: "24px 24px",
          maskImage:
            "radial-gradient(ellipse 70% 70% at 50% 50%, #000 35%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 70% at 50% 50%, #000 35%, transparent 100%)",
        }}
      />
      {/* Main Form Center */}
      <main className="flex-1 flex flex-col items-center justify-center py-10 px-4 relative z-10">
        <div className="w-full max-w-2xl">{children}</div>
      </main>
    </div>
  );
}
