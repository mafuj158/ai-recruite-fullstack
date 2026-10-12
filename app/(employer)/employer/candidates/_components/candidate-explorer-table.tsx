import Link from "next/link";
import {
  FiMessageSquare,
  FiExternalLink,
  FiAward,
  FiEye,
} from "react-icons/fi";
import { Candidate, CandidateStatus } from "@/types/employer/candidates.types";
import { STATUS_OPTIONS } from "@/app/(employer)/employer/_components/candidate-card";

interface CandidateExplorerTableProps {
  candidates: Candidate[];
  onSelectCandidate: (candidate: Candidate) => void;
  onStatusChange: (id: string, newStatus: CandidateStatus) => void;
}

export default function CandidateExplorerTable({
  candidates,
  onSelectCandidate,
  onStatusChange,
}: CandidateExplorerTableProps) {
  return (
    <div className="bg-white border border-[#DFE1E7] rounded-lg shadow-2xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm min-w-[920px]">
          <thead className="bg-zinc-50 border-b border-[#DFE1E7] text-xs font-semibold uppercase tracking-wider text-zinc-500">
            <tr>
              <th className="px-5 py-3.5 whitespace-nowrap">Candidate</th>
              <th className="px-5 py-3.5 whitespace-nowrap">Applied Job</th>
              <th className="px-5 py-3.5 whitespace-nowrap">AI Match</th>
              <th className="px-5 py-3.5 whitespace-nowrap">AI Interview</th>
              <th className="px-5 py-3.5 whitespace-nowrap">Status</th>
              <th className="px-5 py-3.5 text-right whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {candidates.map((cand) => {
              const currentStatus =
                STATUS_OPTIONS.find((s) => s.value === cand.status) ||
                STATUS_OPTIONS[0];

              return (
                <tr
                  key={cand.id}
                  className="hover:bg-zinc-50/70 transition-colors"
                >
                  {/* Candidate Column */}
                  <td className="px-5 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="size-9 rounded bg-[#244034] text-white font-semibold text-xs flex items-center justify-center shrink-0 shadow-2xs">
                        {cand.name
                          .split(" ")
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join("")}
                      </div>
                      <div className="min-w-0">
                        <button
                          type="button"
                          onClick={() => onSelectCandidate(cand)}
                          className="font-semibold text-zinc-900 hover:text-forest text-sm text-left cursor-pointer transition-colors block whitespace-nowrap"
                        >
                          {cand.name}
                        </button>
                        <p className="text-xs text-zinc-500 whitespace-nowrap">
                          {cand.headline}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Applied Job Column - No wrap */}
                  <td className="px-5 py-4 whitespace-nowrap">
                    <p className="font-semibold text-zinc-800 text-xs sm:text-sm whitespace-nowrap">
                      {cand.jobTitle || "General Talent Pool"}
                    </p>
                    <p className="text-xs text-zinc-400 whitespace-nowrap mt-0.5">
                      {cand.jobDepartment}
                    </p>
                  </td>

                  {/* AI Match Score */}
                  <td className="px-5 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-bold ${cand.matchScore >= 85
                            ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                            : "bg-zinc-100 text-zinc-700 border border-zinc-200"
                          }`}
                      >
                        <FiAward className="size-3 text-emerald-600" />
                        {cand.matchScore}%
                      </div>
                    </div>
                  </td>

                  {/* AI Interview */}
                  <td className="px-5 py-4 whitespace-nowrap">
                    {cand.aiInterviewResult?.completed ? (
                      <div className="whitespace-nowrap">
                        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded inline-block whitespace-nowrap">
                          {cand.aiInterviewResult.overallScore}% Score
                        </span>
                        <p className="text-[11px] text-zinc-400 mt-0.5 whitespace-nowrap">
                          {cand.aiInterviewResult.recommendation}
                        </p>
                      </div>
                    ) : (
                      <span className="text-xs text-zinc-400 italic whitespace-nowrap">Pending</span>
                    )}
                  </td>

                  {/* Status Dropdown */}
                  <td className="px-5 py-4 whitespace-nowrap">
                    <select
                      value={cand.status}
                      onChange={(e) =>
                        onStatusChange(cand.id, e.target.value as CandidateStatus)
                      }
                      className={`text-xs font-medium px-2.5 py-1.5 rounded-lg border cursor-pointer focus:outline-none shadow-2xs whitespace-nowrap ${currentStatus.color}`}
                    >
                      {STATUS_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </td>

                  {/* Actions Column */}
                  <td className="px-5 py-4 text-right whitespace-nowrap">
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => onSelectCandidate(cand)}
                        className="p-1.5 rounded border border-[#DFE1E7] text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 transition-colors cursor-pointer"
                        title="Quick Preview"
                      >
                        <FiEye className="size-3.5" />
                      </button>
                      <Link
                        href={`/employer/my-jobs/${cand.jobSlug || "senior-full-stack-developer"}/candidates/${cand.slug}`}
                        className="p-1.5 rounded border border-[#DFE1E7] text-zinc-600 hover:text-forest hover:bg-emerald-50 transition-colors"
                        title="Full Details Page"
                      >
                        <FiExternalLink className="size-3.5" />
                      </Link>
                      <Link
                        href={`/employer/chat?candidate=${cand.slug}`}
                        className="p-1.5 rounded border border-[#DFE1E7] text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 transition-colors"
                        title="Chat with Candidate"
                      >
                        <FiMessageSquare className="size-3.5" />
                      </Link>
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
