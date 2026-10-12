"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiArrowLeft, FiHome, FiSearch, FiBriefcase } from "react-icons/fi";
import Logo from "@/components/ui/logo";

export default function NotFound() {
    const router = useRouter();

    return (
        <div className="min-h-screen container flex flex-col justify-between text-zinc-800 antialiased selection:bg-forest/10 selection:text-forest">
            {/* Top Minimal Bar */}
            <header className="w-full  mx-auto px-4 sm:px-6 py-6 flex items-center justify-between">

                <Link href="/" className="transition-transform duration-300 hover:opacity-90 active:scale-95">
                    <Logo
                        wrapperClass="cursor-pointer"
                        titleClass="!text-zinc-900 text-xl font-bold"
                        imageClass="!bg-forest"
                    />
                </Link>



                <Link
                    href="/"
                    className="text-xs font-semibold text-zinc-600 hover:text-forest transition-colors hidden sm:inline-flex items-center gap-1.5"
                >
                    <FiHome className="size-3.5" />
                    <span>Home</span>
                </Link>
            </header>

            {/* Main 404 Content */}
            <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-12">
                <div className="max-w-lg w-full text-center space-y-6">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest/5 border border-forest/15 text-forest text-xs font-semibold tracking-wide">
                        <span className="size-1.5 rounded-full bg-forest animate-pulse" />
                        404 Error
                    </div>

                    {/* 404 Headline */}
                    <div className="space-y-2">
                        <h1 className="text-6xl sm:text-7xl font-extrabold text-forest tracking-tight font-serif">
                            404
                        </h1>
                        <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight">
                            Page Not Found
                        </h2>
                        <p className="text-sm text-zinc-600 max-w-sm mx-auto leading-relaxed">
                            Sorry, we couldn&apos;t find the page you&apos;re looking for. It may have been moved, deleted, or does not exist.
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="w-full sm:w-auto h-10 px-5 rounded border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors shadow-2xs cursor-pointer"
                        >
                            <FiArrowLeft className="size-4" />
                            <span>Go Back</span>
                        </button>

                        <Link
                            href="/"
                            className="w-full sm:w-auto h-10 px-5 rounded bg-forest hover:bg-forest/90 text-white text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors shadow-2xs cursor-pointer"
                        >
                            <FiHome className="size-4" />
                            <span>Back to Home</span>
                        </Link>
                    </div>

                    {/* Quick Helpful Links */}
                    <div className="pt-6 border-t border-zinc-200/80">
                        <p className="text-xs text-zinc-400 font-medium mb-3">
                            Looking for something specific?
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
                            <Link
                                href="/candidate/find-jobs"
                                className="px-3 py-1.5 rounded bg-white hover:bg-zinc-50 border border-zinc-200 text-zinc-600 hover:text-forest transition-colors inline-flex items-center gap-1.5"
                            >
                                <FiSearch className="size-3 text-zinc-400" />
                                <span>Explore Jobs</span>
                            </Link>
                            <Link
                                href="/employer/dashboard"
                                className="px-3 py-1.5 rounded bg-white hover:bg-zinc-50 border border-zinc-200 text-zinc-600 hover:text-forest transition-colors inline-flex items-center gap-1.5"
                            >
                                <FiBriefcase className="size-3 text-zinc-400" />
                                <span>Employer Portal</span>
                            </Link>
                            <Link
                                href="/candidate/dashboard"
                                className="px-3 py-1.5 rounded bg-white hover:bg-zinc-50 border border-zinc-200 text-zinc-600 hover:text-forest transition-colors inline-flex items-center gap-1.5"
                            >
                                <FiBriefcase className="size-3 text-zinc-400" />
                                <span>Candidate Portal</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer Minimal */}
            <footer className="w-full  mx-auto px-4 sm:px-6 py-6 text-center text-xs text-zinc-400">
                &copy; {new Date().getFullYear()} AI-Recruite. All rights reserved.
            </footer>
        </div>
    );
}
