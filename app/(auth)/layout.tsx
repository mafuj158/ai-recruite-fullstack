import React from "react";
import Link from "next/link";
import Logo from "@/components/ui/logo";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  // fake loading for 3 second
  await new Promise((resolve) => setTimeout(resolve, 3000));



  return (
    <div className="min-h-screen bg-[#F8FAFC] relative flex flex-col justify-center items-center py-6 px-3.5 sm:py-10 sm:px-6 md:p-8 overflow-x-hidden">
      {/* Background Dots Pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#CBD5E1 1.5px, transparent 1.5px)",
          backgroundSize: "24px 24px",
          maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, #000 35%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, #000 35%, transparent 100%)",
        }}
      />

      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Brand Header */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <Link href="/" className="inline-block transition-opacity hover:opacity-90">
            <Logo titleClass="text-forest" imageClass="size-8 sm:size-9" />
          </Link>
        </div>

        <div className="w-full max-w-lg bg-white border border-zinc-200/80 rounded p-4 xs:p-6 sm:p-8 shadow-sm">
          {children}
        </div>

        {/* bottom text */}
        <p className="mt-4 sm:mt-6 md:mt-8 text-xs text-zinc-400 text-center">
          Secure Authentication for Job Seeker & Employer
        </p>
      </div>
    </div>
  );
}
