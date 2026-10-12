import Link from "next/link";
import Logo from "@/components/ui/logo";
import {
  FaLinkedinIn,
  FaFacebookF,
  FaThreads,
  FaXTwitter,
  FaInstagram,
} from "react-icons/fa6";

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: FaLinkedinIn,
  },
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: FaFacebookF,
  },
  {
    name: "Threads",
    href: "https://threads.net",
    icon: FaThreads,
  },
  {
    name: "X",
    href: "https://x.com",
    icon: FaXTwitter,
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: FaInstagram,
  },
];

const MarketingFooter = () => {
  return (
    <footer className="bg-forest w-full text-white">
      <div className="container pt-10 sm:pt-16 pb-6 sm:pb-8">
        {/* Top Row - Logo */}
        <div className="flex items-center justify-between">
          <Link href="/" className="inline-block transition-opacity hover:opacity-90">
            <Logo />
          </Link>
        </div>

        {/* Divider */}
        <div className="border-t border-white/15 my-6 sm:my-8" />

        {/* Bottom Row - Copyright & Social Links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-zinc-400 text-center sm:text-left">
          {/* copyright inofrmation  */}
          <p>© {new Date().getFullYear()} AI Recruit All rights reserved</p>

          {/* Social Icons */}
          <div className="grid grid-cols-5 gap-2">
            {socialLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  className="size-8 rounded flex items-center justify-center border border-white/20 text-white/90 transition-all duration-200 hover:bg-lime hover:text-forest hover:border-lime hover:scale-105"
                >
                  <Icon className="size-4" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MarketingFooter;