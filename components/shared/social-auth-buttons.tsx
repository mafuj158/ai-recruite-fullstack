"use client";

import { FcGoogle } from "react-icons/fc";
import { FaLinkedin } from "react-icons/fa6";
import toast from "react-hot-toast";

interface SocialAuthButtonsProps {
  label?: string;
  role?: "candidate" | "employer";
}

export default function SocialAuthButtons({
  label = "Or continue with email",
  role = "candidate",
}: SocialAuthButtonsProps) {
  const handleSocialClick = (provider: "Google" | "LinkedIn") => {
    toast.success(`Redirecting to ${provider} authentication...`);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 w-full">
        {/* Google Button */}
        <button
          type="button"
          onClick={() => handleSocialClick("Google")}
          className="flex items-center justify-center gap-2.5 px-3 py-2.5 border border-zinc-200 rounded bg-white hover:bg-zinc-50 hover:border-zinc-300 text-zinc-700 text-xs sm:text-sm font-medium transition-colors shadow-2xs cursor-pointer"
        >
          <FcGoogle className="size-4 shrink-0" />
          <span>Google</span>
        </button>

        {/* LinkedIn Button */}
        <button
          type="button"
          onClick={() => handleSocialClick("LinkedIn")}
          className="flex items-center justify-center gap-2.5 px-3 py-2.5 border border-zinc-200 rounded bg-white hover:bg-zinc-50 hover:border-zinc-300 text-zinc-700 text-xs sm:text-sm font-medium transition-colors shadow-2xs cursor-pointer"
        >
          <FaLinkedin className="size-4 shrink-0 text-[#0A66C2]" />
          <span>LinkedIn</span>
        </button>
      </div>
      {/* Divider with symmetrical top and bottom spacing */}
      <div className="relative flex items-center justify-center my-5 sm:my-6">
        <div className="w-full border-t border-zinc-200/80" />
        <span className="bg-white px-3 text-[11px] font-medium text-zinc-400 uppercase tracking-wider absolute">
          {label}
        </span>
      </div>
    </div>
  );
}
