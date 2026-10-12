"use client";

import { useState } from "react";
import { Modal } from "antd";
import { useForm } from "react-hook-form";
import {
  FiBriefcase,
  FiPlus,
  FiTrash2,
  FiMapPin,
  FiCalendar,
} from "react-icons/fi";
import { LuX } from "react-icons/lu";
import CommonFieldset from "@/components/ui/fieldset";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import {
  CandidateProfileValues,
  WorkExperienceItem,
  WorkExperienceFormValues,
} from "@/types/candidate/profile.types";

interface CandidateExperienceSectionProps {
  experiences: WorkExperienceItem[];
  onChange: (field: keyof CandidateProfileValues, value: any) => void;
}

const DEFAULT_EXP_FORM: WorkExperienceFormValues = {
  company: "",
  role: "",
  location: "",
  startDate: "",
  endDate: "",
  isCurrent: false,
  description: "",
  technologies: "",
};

export default function CandidateExperienceSection({
  experiences,
  onChange,
}: CandidateExperienceSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<WorkExperienceFormValues>({
    defaultValues: DEFAULT_EXP_FORM,
  });

  const isCurrent = watch("isCurrent");

  const handleOpenModal = () => {
    reset(DEFAULT_EXP_FORM);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const onSubmitExperience = (data: WorkExperienceFormValues) => {
    const techList = data.technologies
      ? data.technologies.split(",").map((t) => t.trim()).filter(Boolean)
      : [];

    const newExp: WorkExperienceItem = {
      id: `exp-${Date.now()}`,
      company: data.company,
      role: data.role,
      location: data.location,
      startDate: data.startDate,
      endDate: data.isCurrent ? "Present" : data.endDate || "Present",
      isCurrent: data.isCurrent,
      description: data.description,
      technologies: techList,
    };

    onChange("experiences", [newExp, ...experiences]);
    setIsModalOpen(false);
    toast.success("Work experience added successfully!");
  };

  const handleDeleteExperience = (id: string) => {
    onChange(
      "experiences",
      experiences.filter((exp) => exp.id !== id)
    );
    toast.success("Experience removed.");
  };

  return (
    <section className="bg-white rounded p-4 sm:p-6 border border-zinc-200/80 shadow-xs space-y-4 sm:space-y-5">

      <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
        <div className="flex items-center gap-2">
          <FiBriefcase className="size-4 text-forest" />
          <h2 className="text-sm sm:text-base font-bold text-zinc-900">
            Work Experience
          </h2>
        </div>

        <Button
          size="sm"
          onClick={handleOpenModal}
          className="gap-1.5"
        >
          <FiPlus className="size-3.5" />
          <span>Add Role</span>
        </Button>
      </div>

      {/* Experience Timeline */}
      <div className="space-y-4">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="p-4 rounded-lg bg-zinc-50/60 border border-zinc-200/70 hover:border-zinc-300 transition-all space-y-2 relative group"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1.5">
              <div>
                <h3 className="text-sm font-bold text-zinc-900 leading-snug">
                  {exp.role}
                </h3>
                <p className="text-xs font-semibold text-forest mt-0.5">
                  {exp.company}
                </p>
              </div>

              <div className="flex items-center gap-3 self-start sm:self-auto">
                <span className="inline-flex items-center gap-1 text-xs text-zinc-500 font-medium">
                  <FiCalendar className="size-3 text-zinc-400" />
                  <span>
                    {exp.startDate} – {exp.endDate}
                  </span>
                </span>

                <button
                  type="button"
                  onClick={() => handleDeleteExperience(exp.id)}
                  className="p-1 rounded text-zinc-400 hover:text-rose-600 transition-colors cursor-pointer opacity-80 group-hover:opacity-100"
                  title="Delete experience"
                >
                  <FiTrash2 className="size-3.5" />
                </button>
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
                    className="px-2 py-0.5 rounded text-[11px] font-medium bg-white text-zinc-700 border border-zinc-200/80"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Ant Design Modal with react-hook-form & CommonFieldset */}
      <Modal
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
        centered
        width={580}
        destroyOnHidden
        closeIcon={<LuX className="size-4 text-zinc-400 hover:text-zinc-700 transition-colors" />}
        className="[&_.ant-modal-content]:rounded! [&_.ant-modal-content]:p-0! overflow-hidden"
      >
        <div className="p-4 sm:p-5 border-b border-zinc-100 bg-white">
          <h3 className="text-base font-bold text-zinc-900">Add Work Experience</h3>
          <p className="text-xs text-zinc-500 mt-0.5">Detail your employment history and impact</p>
        </div>

        <form onSubmit={handleSubmit(onSubmitExperience)} className="p-4 sm:p-5 space-y-3.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <CommonFieldset<WorkExperienceFormValues>
              control={control}
              register_as="role"
              label="Job Title"
              placeholder="e.g. Senior Frontend Engineer"
              isRequired={true}
              errors={errors}
              validationRules={{ required: "Job title is required" }}
            />

            <CommonFieldset<WorkExperienceFormValues>
              control={control}
              register_as="company"
              label="Company Name"
              placeholder="e.g. Stripe"
              isRequired={true}
              errors={errors}
              validationRules={{ required: "Company name is required" }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <CommonFieldset<WorkExperienceFormValues>
              control={control}
              register_as="startDate"
              label="Start Year / Date"
              placeholder="e.g. 2022"
              isRequired={true}
              errors={errors}
              validationRules={{ required: "Start date is required" }}
            />

            <CommonFieldset<WorkExperienceFormValues>
              control={control}
              register_as="endDate"
              label="End Year / Date"
              placeholder="e.g. 2024"
              disabled={isCurrent}
              errors={errors}
            />

            <div className="flex items-end pb-2">
              <label className="flex items-center gap-2 text-xs font-semibold text-zinc-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isCurrent}
                  onChange={(e) => setValue("isCurrent", e.target.checked)}
                  className="rounded text-forest focus:ring-forest"
                />
                <span>Currently Working</span>
              </label>
            </div>
          </div>

          <CommonFieldset<WorkExperienceFormValues>
            control={control}
            register_as="location"
            label="Location"
            placeholder="e.g. San Francisco, CA (Remote)"
            errors={errors}
          />

          <CommonFieldset<WorkExperienceFormValues>
            control={control}
            register_as="description"
            label="Responsibilities & Key Achievements"
            type="textarea"
            placeholder="Describe your core accomplishments, metrics, and leadership initiatives..."
            errors={errors}
          />

          <CommonFieldset<WorkExperienceFormValues>
            control={control}
            register_as="technologies"
            label="Technologies Used (comma separated)"
            placeholder="e.g. React, TypeScript, Next.js, GraphQL"
            errors={errors}
          />

          <div className="pt-3 border-t border-zinc-100 flex items-center justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleCloseModal}
              className="border border-zinc-200 text-zinc-700 hover:bg-zinc-50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
            >
              Save Experience
            </Button>
          </div>
        </form>
      </Modal>
    </section>
  );
}
