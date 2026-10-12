"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { FiBriefcase, FiPlusCircle } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/shared/page-header";
import { DUMMY_JOBS } from "../dummy";
import { JobFilterTab } from "@/types/employer/my-jobs.types";
import JobCard from "../../_components/job-card";
import JobFilterBar from "./job-filter-bar";
import EmptyJobsState from "./empty-jobs-state";

export default function MyJobsList() {
  const [currentTab, setCurrentTab] = useState<JobFilterTab>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const counts = useMemo(() => {
    return {
      all: DUMMY_JOBS.length,
      active: DUMMY_JOBS.filter((j) => j.status === "active").length,
      draft: DUMMY_JOBS.filter((j) => j.status === "draft").length,
      closed: DUMMY_JOBS.filter((j) => j.status === "closed").length,
    };
  }, []);

  const filteredJobs = useMemo(() => {
    return DUMMY_JOBS.filter((job) => {
      // Tab filter
      if (currentTab !== "all" && job.status !== currentTab) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = job.jobTitle.toLowerCase().includes(query);
        const matchesDept = job.department.toLowerCase().includes(query);
        const matchesLoc = job.location.toLowerCase().includes(query);
        const matchesSkill = (job.skills || []).some((s) =>
          s.toLowerCase().includes(query)
        );
        return matchesTitle || matchesDept || matchesLoc || matchesSkill;
      }
      return true;
    });
  }, [currentTab, searchQuery]);

  const hasFilter = currentTab !== "all" || searchQuery.trim().length > 0;

  const handleReset = () => {
    setCurrentTab("all");
    setSearchQuery("");
  };

  return (
    <div className="w-full flex flex-col gap-4 sm:gap-6">
      {/* Top Filter Bar */}
      <JobFilterBar
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        counts={counts}
      />
      {/* Jobs Grid or Empty State */}
      {filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-5 w-full">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <EmptyJobsState hasFilter={hasFilter} onReset={handleReset} />
      )}
    </div>
  );
}