"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { DEFAULT_CANDIDATE_PROFILE } from "../dummy";
import { CandidateProfileValues } from "@/types/candidate/profile.types";
import CandidateProfileBanner from "./candidate-profile-banner";
import CandidateBasicInfoSection from "./candidate-basic-info-section";
import CandidatePreferencesSection from "./candidate-preferences-section";
import CandidateSkillsSection from "./candidate-skills-section";
import CandidateExperienceSection from "./candidate-experience-section";
import CandidateEducationSection from "./candidate-education-section";
import CandidateCertificationsSection from "./candidate-certifications-section";
import CandidateResumeCard from "./candidate-resume-card";
import { LuSparkles } from "react-icons/lu";

export default function CandidateProfileClient() {
  const [profile, setProfile] =
    useState<CandidateProfileValues>(DEFAULT_CANDIDATE_PROFILE);

  const handleFieldChange = (
    field: keyof CandidateProfileValues,
    value: any
  ) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveBasicInfo = (values: any) => {
    setProfile((prev) => ({
      ...prev,
      ...values,
    }));
  };

  const handleSavePreferences = (values: any) => {
    setProfile((prev) => ({
      ...prev,
      ...values,
    }));
  };

  const handleSaveSkills = (values: any) => {
    setProfile((prev) => ({
      ...prev,
      ...values,
    }));
  };

  const handleAvatarChange = (url: string) => {
    setProfile((prev) => ({
      ...prev,
      avatarUrl: url,
    }));
    toast.success("Profile photo updated successfully!");
  };

  return (
    <div className="w-full space-y-5 sm:space-y-6">
      {/* 1. Profile Banner with Common AvatarChange Component, Identity & ATS Score */}
      <CandidateProfileBanner
        avatarUrl={profile.avatarUrl}
        onAvatarChange={handleAvatarChange}
        fullName={profile.fullName}
        headline={profile.headline}
        location={profile.location}
        jobSearchStatus={profile.jobSearchStatus}
        atsScore={profile.activeResumeAtsScore}
      />

      {/* 2. Responsive 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
        {/* Left Column: Comprehensive Profile Sections (8 cols on lg) */}
        <div className="lg:col-span-8 min-w-0 space-y-5 sm:space-y-6">
          {/* Personal Information Form */}
          <CandidateBasicInfoSection
            initialValues={profile}
            onSave={handleSaveBasicInfo}
          />

          {/* Preferences & Availability Form */}
          <CandidatePreferencesSection
            initialValues={profile}
            onSave={handleSavePreferences}
          />

          {/* Technical & Soft Skills Form */}
          <CandidateSkillsSection
            initialValues={profile}
            onSave={handleSaveSkills}
          />

          {/* Work Experience */}
          <CandidateExperienceSection
            experiences={profile.experiences}
            onChange={handleFieldChange}
          />

          {/* Education */}
          <CandidateEducationSection
            education={profile.education}
            onChange={handleFieldChange}
          />

          {/* Certifications & Industry Accreditations */}
          <CandidateCertificationsSection
            certifications={profile.certifications}
            onChange={handleFieldChange}
          />
        </div>

        {/* Right Column: Resume Card & Profile Strength (4 cols on lg, sticky) */}
        <div className="lg:col-span-4 min-w-0 space-y-5 sm:space-y-6 lg:sticky lg:top-20">
          {/* Active Resume Card */}
          <CandidateResumeCard
            resumeName={profile.activeResumeName}
            atsScore={profile.activeResumeAtsScore}
            updatedAt={profile.activeResumeUpdatedAt}
          />

          {/* Profile Strength & Completeness Insights */}
          <div className="bg-white rounded p-4 sm:p-5 border border-zinc-200/80 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
              <span className="text-xs font-bold text-zinc-900 uppercase tracking-wider flex items-center gap-1.5">
                <LuSparkles className="size-3.5 text-forest" />
                <span>Profile Strength</span>
              </span>
              <span className="text-xs font-bold text-forest">95% Complete</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 rounded-full bg-zinc-100 overflow-hidden">
              <div
                className="h-full bg-forest rounded-full transition-all duration-500"
                style={{ width: "95%" }}
              />
            </div>

            <p className="text-xs text-zinc-500 leading-relaxed">
              Your profile is optimized for recruiter visibility and AI job matching.
            </p>

            <div className="space-y-2 pt-1 border-t border-zinc-100 text-xs">
              <div className="flex items-center gap-2 text-zinc-700">
                <span className="size-1.5 rounded-full bg-emerald-500 shrink-0" />
                <span>Verified technical stack</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-700">
                <span className="size-1.5 rounded-full bg-emerald-500 shrink-0" />
                <span>Active ATS-ready resume attached</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-700">
                <span className="size-1.5 rounded-full bg-emerald-500 shrink-0" />
                <span>Verified employment milestones</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
