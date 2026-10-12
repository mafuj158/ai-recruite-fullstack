import Breadcrumb from "@/components/ui/breadcrumb";
import type { BreadcrumbItem } from "@/types/global.types";

export interface JobFlowBreadcrumbProps {
  job: {
    slug: string;
    jobTitle: string;
    status?: string;
  };
  candidate?: {
    slug: string;
    name: string;
  };
  step: "job" | "candidates" | "candidate" | "interview";
  interviewLabel?: string;
  className?: string;
}

export function JobFlowBreadcrumb({
  job,
  candidate,
  step,
  interviewLabel = "Schedule Interview",
  className,
}: JobFlowBreadcrumbProps) {
  const items: BreadcrumbItem[] = [
    { label: "Dashboard", href: "/employer/dashboard" },
    { label: "My Jobs", href: "/employer/my-jobs" },
    {
      label: job.jobTitle,
      href: step !== "job" ? `/employer/my-jobs/${job.slug}` : undefined,
      maxWidth: "max-w-[140px] sm:max-w-xs",
    },
  ];

  if (step === "candidates") {
    items.push({ label: "Candidates" });
  } else if (step === "candidate" || step === "interview") {
    items.push({
      label: "Candidates",
      href: `/employer/my-jobs/${job.slug}/candidates`,
    });

    if (candidate) {
      items.push({
        label: candidate.name,
        href:
          step === "interview"
            ? `/employer/my-jobs/${job.slug}/candidates/${candidate.slug}`
            : undefined,
        maxWidth: "max-w-[160px]",
      });
    }

    if (step === "interview") {
      items.push({ label: interviewLabel });
    }
  }

  return <Breadcrumb items={items} className={className} />;
}

export default JobFlowBreadcrumb;
