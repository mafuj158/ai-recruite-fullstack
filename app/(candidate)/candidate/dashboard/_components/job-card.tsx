"use client"
import { CandidateRecommendedJob } from '@/types/candidate/dashboard.types';
import Link from 'next/link'
import { FiArrowRight, FiBriefcase, FiDollarSign, FiMapPin } from 'react-icons/fi'
import { LuSparkles } from 'react-icons/lu'

interface CandidateRecommendedJobsProps {
    job: CandidateRecommendedJob;
}

const AiRecomendedJobCard = ({ job }: CandidateRecommendedJobsProps) => {
    return (
        <div className="group relative bg-white hover:bg-zinc-50/50 rounded p-4 sm:p-5 border border-zinc-200/80 shadow-xs hover:shadow-md hover:border-zinc-300 transition-all duration-200 flex flex-col justify-between">
            {/* Top row: Avatar, title, AI match pill */}
            <div>
                <div className="flex items-start justify-between gap-2.5 mb-3">
                    <div className="flex items-center gap-3 min-w-0">
                        <div className="size-10 rounded-lg bg-forest text-lime font-bold text-sm flex items-center justify-center shrink-0 shadow-2xs">
                            {job.companyInitial}
                        </div>
                        <div className="min-w-0">
                            <Link
                                href={`/candidate/find-jobs/${job.slug}`}
                                className="font-bold text-sm sm:text-base text-zinc-900 hover:text-forest transition-colors truncate block"
                            >
                                {job.title}
                            </Link>
                            <p className="text-xs text-zinc-500 truncate">{job.company}</p>
                        </div>
                    </div>

                    {/* AI Match Score Badge */}
                    <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-[#EDF6F1] text-forest border border-[#C2E4D2] shrink-0 shadow-2xs">
                        <LuSparkles className="size-3 text-forest" />
                        <span>{job.matchScore}%</span>
                    </div>
                </div>

                {/* Meta Chips */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-zinc-500 mb-3.5">
                    <span className="inline-flex items-center gap-1">
                        <FiMapPin className="size-3 text-zinc-400" />
                        <span>{job.location}</span>
                    </span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1">
                        <FiBriefcase className="size-3 text-zinc-400" />
                        <span>{job.workType}</span>
                    </span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1">
                        <FiDollarSign className="size-3 text-zinc-400" />
                        <span>{job.salaryRange}</span>
                    </span>
                </div>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                    {job.skills.slice(0, 4).map((skill) => (
                        <span
                            key={skill}
                            className="text-[11px] font-medium px-2 py-0.5 rounded bg-zinc-100 text-zinc-600 border border-zinc-200/60"
                        >
                            {skill}
                        </span>
                    ))}
                    {job.skills.length > 4 && (
                        <span className="text-[11px] font-medium px-1.5 py-0.5 text-zinc-400">
                            +{job.skills.length - 4}
                        </span>
                    )}
                </div>
            </div>
            {/* Bottom Actions */}
            <div className="pt-3 border-t border-zinc-100 flex items-center justify-between gap-2">
                <span className="text-[11px] text-zinc-400">Posted {job.postedAt}</span>

                <div className="flex items-center gap-2 shrink-0">
                    <Link
                        href={`/candidate/find-jobs/${job.slug}`}
                        className="px-3 py-1.5 text-xs font-semibold text-white bg-forest hover:bg-[#1b3027] rounded transition-colors shadow-2xs cursor-pointer inline-flex items-center gap-1"
                    >
                        <span>View Details</span>
                        <FiArrowRight className="size-3" />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default AiRecomendedJobCard