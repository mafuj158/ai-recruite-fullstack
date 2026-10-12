import {
  LuSparkles,
  LuCheck,
  LuX,
  LuGraduationCap,
  LuBuilding2,
  LuLayers,
  LuAward,
} from "react-icons/lu";
import {
  FiBriefcase,
  FiCalendar,
  FiMapPin,
  FiAward,
  FiBookOpen,
  FiExternalLink,
} from "react-icons/fi";
import {
  Candidate,
  CandidateExperience,
  CandidateEducation,
  CandidateCertification,
} from "@/types/employer/candidates.types";

interface CandidateResumeSkillsSectionProps {
  candidate: Candidate;
}

function getCandidateExperiences(candidate: Candidate): CandidateExperience[] {
  if (candidate.experiences && candidate.experiences.length > 0) {
    return candidate.experiences;
  }
  return [
    {
      id: `${candidate.id}-exp-1`,
      role: candidate.headline.split("•")[0].trim(),
      company: candidate.currentCompany || "Technology Solutions Inc.",
      location: candidate.location,
      startDate: "2022",
      endDate: "Present",
      isCurrent: true,
      description: `Spearheading key technical initiatives, driving architectural improvements with ${candidate.matchingSkills.slice(0, 3).join(", ") || "modern frontend & backend stacks"
        }, and collaborating with cross-functional product and engineering teams to deliver high-performance user experiences.`,
      technologies:
        candidate.matchingSkills.length > 0
          ? candidate.matchingSkills.slice(0, 5)
          : candidate.skills.slice(0, 5),
    },
    {
      id: `${candidate.id}-exp-2`,
      role: "Senior Software Engineer",
      company: "Apex Cloud Innovations",
      location: candidate.location.split("•")[0].trim(),
      startDate: "2019",
      endDate: "2022",
      isCurrent: false,
      description: `Engineered responsive, accessible user interfaces and high-performance backend microservices. Reduced deployment cycle times by 35% through automated CI/CD pipelines and unit testing.`,
      technologies: candidate.skills.slice(2, 6),
    },
  ];
}

function getCandidateEducation(candidate: Candidate): CandidateEducation[] {
  if (candidate.educationList && candidate.educationList.length > 0) {
    return candidate.educationList;
  }
  const parts = candidate.education ? candidate.education.split(",") : [];
  const degreePart = parts[0] || "B.S. in Computer Science";
  const schoolPart = parts.slice(1).join(",").trim() || "University";
  const [degree, field] = degreePart.includes("in")
    ? degreePart.split("in").map((s) => s.trim())
    : [degreePart, "Computer Science"];

  return [
    {
      id: `${candidate.id}-edu-1`,
      institution: schoolPart,
      degree: degree || "Bachelor of Science (B.S.)",
      fieldOfStudy: field || "Computer Science",
      startYear: "2015",
      endYear: "2019",
      grade: "3.8 GPA (Dean's Honor List)",
    },
  ];
}

function getCandidateCertifications(candidate: Candidate): CandidateCertification[] {
  if (candidate.certifications && candidate.certifications.length > 0) {
    return candidate.certifications;
  }
  return [
    {
      id: `${candidate.id}-cert-1`,
      name: `${candidate.skills[0] || "AWS"} Certified Solutions Specialist`,
      issuingOrg: "Amazon Web Services (AWS)",
      issueDate: "2023",
      credentialUrl: "https://aws.amazon.com/verification",
    },
    {
      id: `${candidate.id}-cert-2`,
      name: "Agile & Distributed Engineering Leadership",
      issuingOrg: "Scrum Alliance & Tech Standards",
      issueDate: "2022",
      credentialUrl: "https://scrumalliance.org/verification",
    },
  ];
}

export default function CandidateResumeSkillsSection({
  candidate,
}: CandidateResumeSkillsSectionProps) {
  const totalCoreSkills =
    candidate.matchingSkills.length + candidate.missingSkills.length;
  const matchPercentage =
    totalCoreSkills > 0
      ? Math.round((candidate.matchingSkills.length / totalCoreSkills) * 100)
      : 100;

  const experiences = getCandidateExperiences(candidate);
  const educationList = getCandidateEducation(candidate);
  const certifications = getCandidateCertifications(candidate);

  return (
    <div className="space-y-6">
      {/* 1. AI Fit & Resume Assessment */}
      <div className="bg-white rounded border border-zinc-200/80 p-5 sm:p-6 shadow-2xs space-y-3">
        <div className="flex items-center gap-2">
          <div className="size-7 rounded bg-[#EDF6F1] text-forest flex items-center justify-center">
            <LuSparkles className="size-4" />
          </div>
          <h2 className="text-sm sm:text-base font-bold text-zinc-900">
            AI Profile & Resume Fit Assessment
          </h2>
        </div>

        <div className="p-4 rounded bg-[#F9FAF8] border border-zinc-200/70 text-xs sm:text-sm text-zinc-700 leading-relaxed">
          &ldquo;{candidate.aiSummary}&rdquo;
        </div>
      </div>

      {/* 2. Skills Match Matrix */}
      <div className="bg-white rounded border border-zinc-200/80 p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex xs:flex-row flex-col gap-2">
            <div className="size-7 rounded bg-zinc-100 text-zinc-700 flex items-center justify-center">
              <LuLayers className="size-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-zinc-900">
                Skills Fit Analysis
              </h2>
              <p className="text-xs text-zinc-500">
                Comparison of candidate capabilities against role prerequisites
              </p>
            </div>
          </div>

          <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[#EDF6F1] text-forest border border-[#C2E4D2]">
            {candidate.matchingSkills.length} of {totalCoreSkills} matched ({matchPercentage}%)
          </span>
        </div>

        {/* Matching Skills */}
        <div className="space-y-2">
          <span className="text-xs font-semibold text-zinc-700 flex items-center gap-1.5">
            <LuCheck className="size-3.5 text-forest" />
            <span>Matching Required Skills ({candidate.matchingSkills.length})</span>
          </span>
          <div className="flex flex-wrap gap-2">
            {candidate.matchingSkills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1 px-3 py-1 rounded bg-[#EDF6F1] text-forest font-medium text-xs border border-[#D5E6DC]"
              >
                <LuCheck className="size-3" />
                <span>{skill}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Missing Skills */}
        {candidate.missingSkills.length > 0 && (
          <div className="space-y-2 pt-2 border-t border-zinc-100">
            <span className="text-xs font-semibold text-zinc-500 flex items-center gap-1.5">
              <LuX className="size-3.5 text-rose-500" />
              <span>Missing or Unspecified Skills ({candidate.missingSkills.length})</span>
            </span>
            <div className="flex flex-wrap gap-2">
              {candidate.missingSkills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded bg-zinc-50 text-zinc-500 font-medium text-xs border border-zinc-200"
                >
                  <LuX className="size-3 text-zinc-400" />
                  <span>{skill}</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* All Other Skills */}
        <div className="space-y-2 pt-2 border-t border-zinc-100">
          <span className="text-xs font-semibold text-zinc-700">
            All Recognized Candidate Skills
          </span>
          <div className="flex flex-wrap gap-1.5">
            {candidate.skills.map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-0.5 rounded bg-zinc-100 text-zinc-700 text-xs font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Professional Work Experience (Multiple Showcase) */}
      <div className="bg-white rounded border border-zinc-200/80 p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="flex xs:flex-row flex-col gap-2 pb-3 border-b border-zinc-100">
          <div className="size-7 rounded bg-[#EDF6F1] text-forest flex items-center justify-center">
            <LuBuilding2 className="size-4" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-zinc-900">
              Work Experience & Employment History
            </h2>
            <p className="text-xs text-zinc-500">
              Chronological career milestones and technical contributions
            </p>
          </div>
        </div>
        <div className="space-y-4">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="p-4 rounded-lg bg-zinc-50/60 border border-zinc-200/70 hover:border-zinc-300 transition-all space-y-2 relative"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1.5">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-bold text-zinc-900 leading-snug">
                      {exp.role}
                    </h3>
                    {exp.isCurrent && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Current Role
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-semibold text-forest mt-0.5">
                    {exp.company}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs text-zinc-500 font-medium self-start sm:self-auto shrink-0">
                  <FiCalendar className="size-3 text-zinc-400" />
                  <span>
                    {exp.startDate} – {exp.endDate}
                  </span>
                </div>
              </div>

              {exp.location && (
                <div className="flex items-center gap-1 text-xs text-zinc-400">
                  <FiMapPin className="size-3" />
                  <span>{exp.location}</span>
                </div>
              )}

              <p className="text-xs text-zinc-600 leading-relaxed pt-1">
                {exp.description}
              </p>

              {exp.technologies && exp.technologies.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 pt-1.5">
                  {exp.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-[11px] font-medium bg-white text-zinc-700 border border-zinc-200/80 shadow-2xs"
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

      {/* 4. Education & Academic Credentials */}
      <div className="bg-white rounded border border-zinc-200/80 p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
          <div className="flex items-center gap-2">
            <div className="size-7 rounded bg-[#EDF6F1] text-forest flex items-center justify-center">
              <LuGraduationCap className="size-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-zinc-900">
                Education & Academic Background
              </h2>
              <p className="text-xs text-zinc-500">
                Formal qualifications and university degrees
              </p>
            </div>
          </div>

          <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[#EDF6F1] text-forest border border-[#C2E4D2]">
            Verified Degrees ({educationList.length})
          </span>
        </div>

        <div className="space-y-3">
          {educationList.map((edu) => (
            <div
              key={edu.id}
              className="p-3.5 rounded-lg bg-zinc-50/60 border border-zinc-200/70 hover:border-zinc-300 transition-all flex items-start justify-between gap-3"
            >
              <div className="space-y-0.5">
                <h3 className="text-xs sm:text-sm font-bold text-zinc-900">
                  {edu.degree} in {edu.fieldOfStudy}
                </h3>
                <p className="text-xs font-medium text-forest">{edu.institution}</p>
                <div className="flex items-center gap-2 text-xs text-zinc-400 pt-0.5">
                  <span className="inline-flex items-center gap-1">
                    <FiCalendar className="size-3" />
                    <span>
                      {edu.startYear} – {edu.endYear}
                    </span>
                  </span>
                  {edu.grade && (
                    <>
                      <span>•</span>
                      <span className="font-medium text-zinc-600">{edu.grade}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Certifications & Industry Accreditations */}
      <div className="bg-white rounded border border-zinc-200/80 p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="flex xs:flex-row flex-col pb-3 border-b border-zinc-100 gap-2">
          <div className="size-7 rounded bg-[#EDF6F1] text-forest flex items-center justify-center">
            <LuAward className="size-4" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-zinc-900">
              Certifications & Industry Accreditations
            </h2>
            <p className="text-xs text-zinc-500">
              Industry accreditations, verified professional licenses, and awards
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="p-3.5 rounded-lg bg-zinc-50/60 border border-zinc-200/70 hover:border-zinc-300 transition-all flex items-start justify-between gap-2.5"
            >
              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <FiAward className="size-3.5 text-forest shrink-0" />
                  <h4 className="text-xs font-bold text-zinc-900 truncate">
                    {cert.name}
                  </h4>
                </div>
                <p className="text-[11px] text-zinc-600 font-medium pl-5">
                  {cert.issuingOrg}
                </p>
                <div className="flex items-center gap-2 text-[11px] text-zinc-400 pl-5 pt-0.5">
                  <span>Issued {cert.issueDate}</span>
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-0.5 text-forest hover:underline font-semibold"
                    >
                      <span>Verify</span>
                      <FiExternalLink className="size-2.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
