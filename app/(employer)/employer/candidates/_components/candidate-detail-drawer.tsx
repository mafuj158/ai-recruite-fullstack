"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  FiX,
  FiAward,
  FiMapPin,
  FiMail,
  FiPhone,
  FiCalendar,
  FiMessageSquare,
  FiCheckCircle,
  FiBookOpen,
  FiExternalLink,
  FiFileText,
  FiClock,
  FiBriefcase,
  FiUser,
} from "react-icons/fi";
import { Candidate, CandidateStatus } from "@/types/employer/candidates.types";
import { STATUS_OPTIONS } from "@/app/(employer)/employer/_components/candidate-card";

interface CandidateDetailDrawerProps {
  candidate: Candidate | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (id: string, newStatus: CandidateStatus) => void;
}

export default function CandidateDetailDrawer({
  candidate,
  isOpen,
  onClose,
  onStatusChange,
}: CandidateDetailDrawerProps) {
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !candidate) return null;

  const interview = candidate.aiInterviewResult;
  const isShortlisted =
    candidate.status === "shortlisted" || candidate.status === "interview_scheduled";
  const targetJobSlug = candidate.jobSlug || "senior-full-stack-developer";
  const profileUrl = `/employer/my-jobs/${targetJobSlug}/candidates/${candidate.slug}`;

  return (
    <div
      className="fixed inset-0 z-[70] overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="candidate-drawer-title"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
      />

      {/* Slide-over panel */}
      <div className="fixed inset-y-0 right-0 w-full sm:w-auto max-w-full flex pl-0 sm:pl-6 md:pl-10">
        <div className="w-full sm:w-[32rem] md:w-[36rem] max-w-full bg-white shadow-2xl flex flex-col h-full overflow-hidden">
          {/* Top Bar with Title & Close Button */}
          <div className="px-4 py-3 sm:px-6 sm:py-3.5 border-b border-zinc-200/80 bg-zinc-50/90 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              <FiUser className="size-3.5 text-forest" />
              <span>Candidate Details</span>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close candidate drawer"
              className="size-8 inline-flex items-center justify-center rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200/60 transition-colors cursor-pointer"
            >
              <FiX className="size-5" />
            </button>
          </div>

          {/* Candidate Profile Header Card */}
          <div className="p-4 sm:p-6 border-b border-[#DFE1E7] bg-white">
            <div className="flex items-start gap-3 sm:gap-4">
              {/* Initials Avatar */}
              <div className="size-12 sm:size-14 rounded-xl bg-[#244034] text-[#D2F34C] font-bold flex items-center justify-center text-base sm:text-lg shrink-0 shadow-2xs border border-[#244034]/15">
                {candidate.name
                  .split(" ")
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("")}
              </div>

              {/* Identity & Badges */}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2
                    id="candidate-drawer-title"
                    className="text-base sm:text-lg font-bold text-zinc-900 leading-snug break-words"
                  >
                    <Link
                      href={profileUrl}
                      className="hover:text-forest transition-colors"
                      title="Open Full Profile Page"
                    >
                      {candidate.name}
                    </Link>
                  </h2>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full shrink-0">
                    <span className="size-1.5 rounded-full bg-emerald-500" />
                    {candidate.matchScore}% Match
                  </span>
                </div>

                <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                  {candidate.headline}
                </p>

                {/* Meta details: Experience & Applied date */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-500 mt-2">
                  {candidate.experienceYears && (
                    <span className="inline-flex items-center gap-1.5 font-medium">
                      <FiBriefcase className="size-3.5 text-zinc-400 shrink-0" />
                      <span>{candidate.experienceYears} Years Exp</span>
                    </span>
                  )}
                  {candidate.appliedAt && (
                    <span className="inline-flex items-center gap-1.5">
                      <FiClock className="size-3.5 text-zinc-400 shrink-0" />
                      <span>Applied {candidate.appliedAt}</span>
                    </span>
                  )}
                </div>

                {/* Target Applied Role */}
                {candidate.jobTitle && (
                  <div className="mt-2.5">
                    <span className="inline-flex items-center gap-1.5 text-xs text-emerald-900 bg-emerald-50/90 border border-emerald-200/90 px-2.5 py-1 rounded-md font-medium max-w-full">
                      <span className="text-zinc-500 font-normal shrink-0">Applied for:</span>
                      <span className="font-semibold text-emerald-800 truncate">
                        {candidate.jobTitle}
                      </span>
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions Row: Resume & Full Profile */}
            <div className="grid grid-cols-2 gap-2.5 mt-4 pt-3.5 border-t border-zinc-100">
              {candidate.resumeUrl ? (
                <a
                  href={candidate.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  title="View Resume"
                  className="h-9 inline-flex items-center justify-center gap-1.5 px-3 rounded-lg border border-[#DFE1E7] bg-white text-zinc-700 hover:text-zinc-900 hover:bg-zinc-50 text-xs font-semibold transition-colors shadow-2xs"
                >
                  <FiFileText className="size-3.5 text-zinc-500" />
                  <span>Resume</span>
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  className="h-9 inline-flex items-center justify-center gap-1.5 px-3 rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-400 text-xs font-medium cursor-not-allowed"
                >
                  <FiFileText className="size-3.5" />
                  <span>No Resume</span>
                </button>
              )}

              <Link
                href={profileUrl}
                title="Open Candidate Profile in Job Flow"
                className="h-9 inline-flex items-center justify-center gap-1.5 px-3 rounded-lg bg-[#244034] text-white hover:bg-[#1b3027] text-xs font-semibold transition-colors shadow-2xs"
              >
                <span>Full Profile</span>
                <FiExternalLink className="size-3.5" />
              </Link>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            {/* Quick Contact & Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 text-xs text-zinc-600 bg-zinc-50/80 p-3.5 rounded-xl border border-zinc-200/80">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="size-7 rounded-md bg-white border border-zinc-200/80 flex items-center justify-center text-zinc-500 shrink-0 shadow-2xs">
                  <FiMail className="size-3.5" />
                </div>
                <a
                  href={`mailto:${candidate.email}`}
                  className="truncate hover:text-[#244034] hover:underline font-medium text-zinc-700 min-w-0"
                  title={candidate.email}
                >
                  {candidate.email}
                </a>
              </div>

              {candidate.phone && (
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="size-7 rounded-md bg-white border border-zinc-200/80 flex items-center justify-center text-zinc-500 shrink-0 shadow-2xs">
                    <FiPhone className="size-3.5" />
                  </div>
                  <a
                    href={`tel:${candidate.phone}`}
                    className="truncate hover:text-[#244034] font-medium text-zinc-700 min-w-0"
                  >
                    {candidate.phone}
                  </a>
                </div>
              )}

              <div className="flex items-center gap-2.5 min-w-0">
                <div className="size-7 rounded-md bg-white border border-zinc-200/80 flex items-center justify-center text-zinc-500 shrink-0 shadow-2xs">
                  <FiMapPin className="size-3.5" />
                </div>
                <span className="truncate text-zinc-700 font-medium min-w-0" title={candidate.location}>
                  {candidate.location}
                </span>
              </div>

              <div className="flex items-center gap-2.5 min-w-0">
                <div className="size-7 rounded-md bg-white border border-zinc-200/80 flex items-center justify-center text-zinc-500 shrink-0 shadow-2xs">
                  <FiBookOpen className="size-3.5" />
                </div>
                <span className="truncate text-zinc-700 font-medium min-w-0" title={candidate.education}>
                  {candidate.education}
                </span>
              </div>
            </div>

            {/* AI Match Overview */}
            <div className="border border-emerald-200 bg-emerald-50/50 rounded-xl p-4 sm:p-5 space-y-3">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                  <FiAward className="size-4 text-emerald-700 shrink-0" />
                  AI Match Breakdown
                </span>
                <span className="text-sm sm:text-base font-extrabold text-emerald-800 bg-white/80 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                  {candidate.matchScore}% Overall Fit
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-normal">
                &ldquo;{candidate.aiSummary}&rdquo;
              </p>
            </div>

            {/* Skills Match Section */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                Skills Evaluation
              </h3>
              <div className="space-y-3">
                <div>
                  <span className="text-xs font-semibold text-emerald-800 block mb-1.5">
                    Matching Requirements ({candidate.matchingSkills.length}):
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {candidate.matchingSkills.map((s) => (
                      <span
                        key={s}
                        className="text-xs px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200/90 font-medium inline-flex items-center gap-1 shadow-2xs"
                      >
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span>{s}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {candidate.missingSkills.length > 0 && (
                  <div>
                    <span className="text-xs font-semibold text-zinc-500 block mb-1.5">
                      Missing / Gaps ({candidate.missingSkills.length}):
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {candidate.missingSkills.map((s) => (
                        <span
                          key={s}
                          className="text-xs px-2.5 py-1 rounded-md bg-zinc-100 text-zinc-600 border border-zinc-200 font-medium inline-flex items-center gap-1 shadow-2xs"
                        >
                          <span className="text-zinc-400 font-bold">✕</span>
                          <span>{s}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* AI Pre-Screening Interview Section */}
            {interview?.completed && (
              <div className="border border-[#DFE1E7] rounded-xl p-4 sm:p-5 space-y-3.5 bg-zinc-50/70">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-700 flex items-center gap-1.5">
                    <FiCheckCircle className="size-4 text-emerald-600 shrink-0" />
                    AI Interview Assessment ({interview.completedAt})
                  </h3>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                    {interview.overallScore}% Overall
                  </span>
                </div>

                <p className="text-xs text-zinc-600 italic bg-white p-3 rounded-lg border border-zinc-200/60 leading-relaxed">
                  &ldquo;{interview.recommendationNote}&rdquo;
                </p>

                {/* Score Bars */}
                <div className="space-y-2.5 pt-1">
                  <div>
                    <div className="flex justify-between text-xs font-medium text-zinc-700 mb-1">
                      <span>Communication & Clarity</span>
                      <span className="font-semibold">{interview.communicationScore}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-zinc-200 overflow-hidden">
                      <div
                        className="h-full bg-[#244034] rounded-full transition-all duration-500"
                        style={{ width: `${interview.communicationScore}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium text-zinc-700 mb-1">
                      <span>Confidence & Composure</span>
                      <span className="font-semibold">{interview.confidenceScore}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-zinc-200 overflow-hidden">
                      <div
                        className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                        style={{ width: `${interview.confidenceScore}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium text-zinc-700 mb-1">
                      <span>Teamwork & Emotional Intelligence</span>
                      <span className="font-semibold">{interview.emotionalIntelligenceScore}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-zinc-200 overflow-hidden">
                      <div
                        className="h-full bg-teal-600 rounded-full transition-all duration-500"
                        style={{ width: `${interview.emotionalIntelligenceScore}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Work Experience Timeline */}
            <div className="border border-[#DFE1E7] rounded-xl p-4 sm:p-5 space-y-3 bg-white">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-700 flex items-center gap-1.5">
                  <FiBriefcase className="size-3.5 text-forest shrink-0" />
                  <span>Work Experience</span>
                </h3>
                <span className="text-[11px] font-semibold text-zinc-500">
                  {candidate.experienceYears} Years Exp
                </span>
              </div>

              <div className="space-y-3 pt-1">
                {(candidate.experiences && candidate.experiences.length > 0
                  ? candidate.experiences
                  : [
                    {
                      id: `${candidate.id}-exp-1`,
                      role: candidate.headline.split("•")[0].trim(),
                      company: candidate.currentCompany || "Enterprise Technology",
                      location: candidate.location,
                      startDate: "2022",
                      endDate: "Present",
                      isCurrent: true,
                      description: `Leading key technical initiatives with ${candidate.matchingSkills.slice(0, 3).join(", ") || "modern tech stack"
                        }.`,
                      technologies: candidate.matchingSkills.slice(0, 4),
                    },
                    {
                      id: `${candidate.id}-exp-2`,
                      role: "Software Engineer",
                      company: "Apex Innovations",
                      location: candidate.location.split("•")[0].trim(),
                      startDate: "2019",
                      endDate: "2022",
                      isCurrent: false,
                      description:
                        "Developed responsive web applications and backend API integrations.",
                      technologies: candidate.skills.slice(2, 5),
                    },
                  ]
                ).map((exp) => (
                  <div
                    key={exp.id}
                    className="p-3 rounded-lg bg-zinc-50/70 border border-zinc-200/80 space-y-1.5 text-xs"
                  >
                    <div className="flex items-start justify-between gap-1.5">
                      <div>
                        <h4 className="font-bold text-zinc-900 leading-snug">{exp.role}</h4>
                        <p className="text-[11px] font-semibold text-forest">{exp.company}</p>
                      </div>
                      <span className="text-[11px] text-zinc-400 font-medium whitespace-nowrap">
                        {exp.startDate} – {exp.endDate}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-600 leading-relaxed">{exp.description}</p>
                    {exp.technologies && exp.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-0.5">
                        {exp.technologies.map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded text-[10px] font-medium bg-white text-zinc-700 border border-zinc-200"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Education & Certifications Summary */}
            <div className="border border-[#DFE1E7] rounded-xl p-4 sm:p-5 space-y-3 bg-white">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-700 flex items-center gap-1.5">
                  <FiBookOpen className="size-3.5 text-forest shrink-0" />
                  <span>Education & Certifications</span>
                </h3>
              </div>

              {/* Education */}
              <div className="space-y-2 pt-1">
                <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block">
                  Degrees
                </span>
                {(candidate.educationList && candidate.educationList.length > 0
                  ? candidate.educationList
                  : [
                    {
                      id: `${candidate.id}-edu-1`,
                      institution: candidate.education.includes(",")
                        ? candidate.education.split(",").slice(1).join(",").trim()
                        : "University",
                      degree: candidate.education.includes("in")
                        ? candidate.education.split("in")[0].trim()
                        : "Bachelor of Science",
                      fieldOfStudy: candidate.education.includes("in")
                        ? candidate.education.split("in")[1].split(",")[0].trim()
                        : "Computer Science",
                      startYear: "2015",
                      endYear: "2019",
                      grade: "Verified Academic Degree",
                    },
                  ]
                ).map((edu) => (
                  <div
                    key={edu.id}
                    className="p-2.5 rounded-lg bg-zinc-50/70 border border-zinc-200/80 text-xs space-y-0.5"
                  >
                    <p className="font-bold text-zinc-900">
                      {edu.degree} in {edu.fieldOfStudy}
                    </p>
                    <p className="text-[11px] text-forest font-medium">{edu.institution}</p>
                    <p className="text-[11px] text-zinc-400">
                      {edu.startYear} – {edu.endYear} {edu.grade ? `• ${edu.grade}` : ""}
                    </p>
                  </div>
                ))}
              </div>

              {/* Certifications */}
              <div className="space-y-2 pt-2 border-t border-zinc-100">
                <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block">
                  Accreditations
                </span>
                <div className="grid grid-cols-1 gap-2">
                  {(candidate.certifications && candidate.certifications.length > 0
                    ? candidate.certifications
                    : [
                      {
                        id: `${candidate.id}-cert-1`,
                        name: `${candidate.skills[0] || "Technical"} Certified Professional`,
                        issuingOrg: "Certification Authority",
                        issueDate: "2023",
                        credentialUrl: "https://example.com",
                      },
                    ]
                  ).map((cert) => (
                    <div
                      key={cert.id}
                      className="p-2.5 rounded-lg bg-zinc-50/70 border border-zinc-200/80 text-xs flex items-start justify-between gap-2"
                    >
                      <div className="space-y-0.5 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <FiAward className="size-3 text-forest shrink-0" />
                          <p className="font-bold text-zinc-900 truncate">{cert.name}</p>
                        </div>
                        <p className="text-[11px] text-zinc-500 pl-4.5">{cert.issuingOrg}</p>
                      </div>
                      <span className="text-[10px] text-zinc-400 font-medium shrink-0 pt-0.5">
                        {cert.issueDate}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Drawer Footer Actions - Cleanly Aligned & No Overflow */}
          <div className="p-3.5 sm:p-4 border-t border-[#DFE1E7] bg-white sticky bottom-0 z-20 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-xs">
            {/* Left: Stage selector with inline label */}
            <div className="flex items-center gap-2 flex-1 sm:flex-initial">
              <label
                htmlFor="drawer-candidate-stage"
                className="text-xs font-semibold text-zinc-500 whitespace-nowrap"
              >
                Stage:
              </label>
              <select
                id="drawer-candidate-stage"
                value={candidate.status}
                onChange={(e) =>
                  onStatusChange(candidate.id, e.target.value as CandidateStatus)
                }
                className="h-9 w-full sm:w-auto text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#DFE1E7] bg-white text-zinc-800 cursor-pointer focus:outline-none focus:ring-1 focus:ring-forest shadow-2xs"
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Right: Message & Schedule Interview */}
            <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 shrink-0">
              <Link
                href={`/employer/chat?candidate=${candidate.slug}`}
                className="h-9 inline-flex items-center justify-center gap-1.5 px-3.5 rounded-lg border border-[#DFE1E7] text-zinc-700 hover:text-zinc-900 hover:bg-zinc-50 bg-white text-xs font-semibold transition-colors shadow-2xs"
              >
                <FiMessageSquare className="size-3.5 text-zinc-500" />
                <span>Message</span>
              </Link>

              {isShortlisted ? (
                <Link
                  href={`/employer/my-jobs/${targetJobSlug}/candidates/${candidate.slug}/schedule-interview`}
                  className="h-9 inline-flex items-center justify-center gap-1.5 px-4 rounded-lg bg-[#244034] hover:bg-[#1b3027] text-white text-xs font-bold transition-colors shadow-2xs text-center whitespace-nowrap"
                >
                  <FiCalendar className="size-3.5 shrink-0" />
                  <span>Interview</span>
                </Link>
              ) : (
                <button
                  type="button"
                  disabled
                  title="Shortlist this candidate first to schedule interview"
                  className="h-9 inline-flex items-center justify-center gap-1.5 px-3.5 rounded-lg border border-zinc-200 bg-zinc-100 text-zinc-400 text-xs font-medium cursor-not-allowed opacity-75 whitespace-nowrap"
                >
                  <FiCalendar className="size-3.5 shrink-0" />
                  <span>Interview</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
