import { Metadata } from "next";
import MyJobsList from "./_components/my-jobs-list";
import PageHeader from "@/components/shared/page-header";
import { FiBriefcase } from "react-icons/fi";
import Link from "next/link";
import { LuPlus } from "react-icons/lu";



export const metadata: Metadata = {
    title: "My Jobs | AI Recruite",
    description: "Manage all your job postings, track applications, review AI-ranked candidates, and monitor recruitment progress.",
};



const MyJobsPage = async () => {

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return (
        <div className="w-full space-y-3 xs:space-y-4 sm:space-y-6">
            <PageHeader
                title="My Jobs"
                description="Manage all your job postings, track applications, review AI-ranked candidates, and monitor recruitment progress."
                icon={FiBriefcase}
                actions={
                    <Link
                        href="/employer/post-job"
                        className="inline-flex items-center justify-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded text-xs sm:text-sm font-semibold text-white bg-forest hover:bg-forest/90 transition-all shadow-xs shrink-0 cursor-pointer"
                    >
                        <LuPlus className="size-3.5 sm:size-4" />
                        <span>Post a Job</span>
                    </Link>
                }
            />
            <MyJobsList />
        </div>
    )
}

export default MyJobsPage