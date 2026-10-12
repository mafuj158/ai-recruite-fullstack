import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  LuSparkles,
  LuFileText,
  LuArrowRight,
  LuMic,
  LuCalendarCheck,
  LuMessageSquare,
} from "react-icons/lu";
import { Candidate, CandidateStatus } from "@/types/employer/candidates.types";
import { STATUS_CONFIG } from "../../../../_components/candidate-card";
import { cn } from "@/lib/utils";

interface CandidateTableProps {
  candidates: Candidate[];
  jobSlug: string;
  onStatusChange?: (candidateId: string, newStatus: CandidateStatus) => void;
}

export default function CandidateTable({
  candidates,
  jobSlug,
  onStatusChange,
}: CandidateTableProps) {
  const getMatchTheme = (score: number) => {
    if (score >= 90) return "bg-[#EDF6F1] text-forest border-[#C2E4D2]";
    if (score >= 80) return "bg-emerald-50 text-emerald-800 border-emerald-200";
    if (score >= 70) return "bg-amber-50 text-amber-800 border-amber-200";
    return "bg-zinc-100 text-zinc-600 border-zinc-200";
  };

  return (
    <div className="w-full bg-white rounded border border-zinc-200/80 shadow-2xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[850px]">
          <thead>
            <tr className="border-b border-zinc-200/80 bg-zinc-50/75 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
              <th scope="col" className="py-3.5 px-4 sm:px-6 whitespace-nowrap">Candidate</th>
              <th scope="col" className="py-3.5 px-4 text-center whitespace-nowrap">AI Match</th>
              <th scope="col" className="py-3.5 px-4 text-center hidden md:table-cell whitespace-nowrap">AI Interview</th>
              <th scope="col" className="py-3.5 px-4 whitespace-nowrap">Stage Status</th>
              <th scope="col" className="py-3.5 px-4 hidden md:table-cell whitespace-nowrap">Experience</th>
              <th scope="col" className="py-3.5 px-4 hidden lg:table-cell whitespace-nowrap">Matched Skills</th>
              <th scope="col" className="py-3.5 px-4 hidden sm:table-cell whitespace-nowrap">Applied</th>
              <th scope="col" className="py-3.5 px-4 text-right whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200/80 text-xs">
            {candidates.map((cand) => {
              const statusInfo = STATUS_CONFIG[cand.status];
              const StatusIcon = statusInfo.icon;
              const initials = cand.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase();

              return (
                <tr
                  key={cand.id}
                  className="hover:bg-zinc-50/60 transition-colors group"
                >
                  {/* Candidate Column */}
                  <td className="py-4 px-4 sm:px-6">
                    <div className="flex items-center gap-3">
                      <div className="size-9 rounded bg-forest text-lime font-bold text-xs flex items-center justify-center shrink-0">
                        {initials}
                      </div>
                      <div className="min-w-0 max-w-[180px] sm:max-w-xs">
                        <Link
                          href={`/employer/my-jobs/${jobSlug}/candidates/${cand.slug}`}
                          className="font-semibold text-zinc-900 hover:text-forest transition-colors truncate block"
                        >
                          {cand.name}
                        </Link>
                        <p className="text-[11px] text-zinc-500 truncate">
                          {cand.headline}
                        </p>
                        <p className="text-[10px] text-zinc-400 truncate">
                          {cand.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* AI Match Column */}
                  <td className="py-4 px-4 text-center">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-bold border",
                        getMatchTheme(cand.matchScore)
                      )}
                    >
                      <LuSparkles className="size-3 shrink-0" />
                      <span>{cand.matchScore}%</span>
                    </span>
                  </td>

                  {/* AI Interview Column */}
                  <td className="py-4 px-4 text-center hidden md:table-cell">
                    {cand.aiInterviewResult?.completed ? (
                      <div className="inline-flex flex-col items-center">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold bg-[#EDF6F1] text-forest border border-[#D5E6DC]">
                          <LuMic className="size-3 shrink-0" />
                          <span>{cand.aiInterviewResult.overallScore}%</span>
                        </span>
                        <span className="text-[10px] text-zinc-500 font-medium mt-0.5 truncate max-w-[110px]">
                          {cand.aiInterviewResult.recommendation}
                        </span>
                      </div>
                    ) : (
                      <span className="text-[11px] text-zinc-400 italic">Not taken</span>
                    )}
                  </td>

                  {/* Status Column with Stage Selector */}
                  <td className="py-4 px-4">
                    <div className="flex flex-col items-start gap-1">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-semibold border whitespace-nowrap",
                          statusInfo.badgeClass
                        )}
                      >
                        <StatusIcon className="size-3 shrink-0" />
                        <span>{statusInfo.label}</span>
                      </span>

                      {onStatusChange && (
                        <select
                          value={cand.status}
                          onChange={(e) =>
                            onStatusChange(cand.id, e.target.value as CandidateStatus)
                          }
                          className="text-[10px] text-zinc-400 hover:text-zinc-700 bg-transparent border-none cursor-pointer focus:outline-none"
                        >
                          <option value="under_review">Move: Under Review</option>
                          <option value="shortlisted">Move: Shortlisted</option>
                          <option value="hired">Move: Hired</option>
                          <option value="rejected">Move: Rejected</option>
                        </select>
                      )}
                    </div>
                  </td>

                  {/* Experience Column */}
                  <td className="py-4 px-4 hidden md:table-cell">
                    <div className="space-y-0.5">
                      <span className="font-medium text-zinc-800">
                        {cand.experienceYears} years
                      </span>
                      <p className="text-[11px] text-zinc-400 truncate max-w-[140px]">
                        {cand.location}
                      </p>
                    </div>
                  </td>

                  {/* Matched Skills */}
                  <td className="py-4 px-4 hidden lg:table-cell">
                    <div className="flex flex-wrap gap-1 max-w-[180px]">
                      {cand.matchingSkills.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 rounded bg-[#EDF6F1] text-forest font-medium text-[10px] border border-[#D5E6DC]"
                        >
                          {skill}
                        </span>
                      ))}
                      {cand.matchingSkills.length > 3 && (
                        <span className="text-[10px] text-zinc-400 font-medium self-center">
                          +{cand.matchingSkills.length - 3}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Applied Date */}
                  <td className="py-4 px-4 hidden sm:table-cell text-zinc-500 whitespace-nowrap">
                    {cand.appliedAt}
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-4 sm:px-6 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        isLink
                        href={`/employer/chat?candidate=${cand.slug}`}
                        variant="outline"
                        size="sm"
                        className="p-1.5 size-8 rounded border border-zinc-200 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-50"
                        title={`Message ${cand.name}`}
                      >
                        <LuMessageSquare className="size-3.5" />
                      </Button>
                      {cand.resumeUrl && (
                        <a
                          href={cand.resumeUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded border border-zinc-200 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-50 transition-colors inline-flex items-center justify-center size-8"
                          title="View Resume"
                        >
                          <LuFileText className="size-3.5" />
                        </a>
                      )}
                      {cand.status === "shortlisted" && (
                        <Button
                          isLink
                          href={`/employer/my-jobs/${jobSlug}/candidates/${cand.slug}/schedule-interview`}
                          variant="outline"
                          size="sm"
                          className="border border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100 text-xs font-semibold gap-1 rounded px-2.5 py-1.5 whitespace-nowrap"
                          title="Send Interview Invitation"
                        >
                          <LuCalendarCheck className="size-3" />
                          <span>Invite</span>
                        </Button>
                      )}
                      <Button
                        isLink
                        href={`/employer/my-jobs/${jobSlug}/candidates/${cand.slug}`}
                        variant="primary"
                        size="sm"
                        className="text-xs font-semibold gap-1 rounded px-2.5 py-1.5 whitespace-nowrap"
                      >
                        <span>Profile</span>
                        <LuArrowRight className="size-3" />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
