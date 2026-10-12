import type { NextConfig } from "next";

// Base remote patterns
const baseRemotePatterns = [
  {
    protocol: "https" as const,
    hostname: "i.pravatar.cc",
    port: "",
    pathname: "/**",
  },
  {
    protocol: "https" as const,
    hostname: "media-cldnry.s-nbcnews.com",
    port: "",
    pathname: "/**",
  },
  {
    protocol: "https" as const,
    hostname: "source.unsplash.com",
    port: "",
    pathname: "/**",
  },
  {
    protocol: "https" as const,
    hostname: "images.unsplash.com",
    port: "",
    pathname: "/**",
  },
  {
    protocol: "https" as const,
    hostname: "picsum.photos",
    port: "",
    pathname: "/**",
  },
  {
    protocol: "https" as const,
    hostname: "loremflickr.com",
    port: "",
    pathname: "/**",
  },
  {
    protocol: "https" as const,
    hostname: "assets.mixkit.co",
    port: "",
    pathname: "/**",
  },
  {
    protocol: "https" as const,
    hostname: "i.ytimg.com",
    port: "",
    pathname: "/**",
  },
  {
    protocol: "https" as const,
    hostname: "lh3.googleusercontent.com",
    port: "",
    pathname: "/**",
  },
  
];

// Dynamic backend pattern
const dynamicBackendPattern = process.env.NEXT_PUBLIC_API_URL
  ? [
      {
        protocol: "https" as const,
        hostname: new URL(process.env.NEXT_PUBLIC_API_URL).hostname,
        port: "",
        pathname: "/**",
      },
    ]
  : [];

const nextConfig: NextConfig = {
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },

  // 🔥 THIS is the magic
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
    // or:
    // removeConsole: { exclude: ["error", "warn"] },
  },

  images: {
    remotePatterns: [...baseRemotePatterns, ...dynamicBackendPattern],
  },

  transpilePackages: ["antd", "@ant-design/icons"],
};

export default nextConfig;