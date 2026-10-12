"use client";

import { useState } from "react";
import { Modal } from "antd";
import { useForm } from "react-hook-form";
import {
  FiBookOpen,
  FiPlus,
  FiTrash2,
  FiCalendar,
} from "react-icons/fi";
import { LuX } from "react-icons/lu";
import CommonFieldset from "@/components/ui/fieldset";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import {
  CandidateProfileValues,
  EducationItem,
  EducationFormValues,
} from "@/types/candidate/profile.types";

interface CandidateEducationSectionProps {
  education: EducationItem[];
  onChange: (field: keyof CandidateProfileValues, value: any) => void;
}

const DEFAULT_EDU_FORM: EducationFormValues = {
  institution: "",
  degree: "",
  fieldOfStudy: "",
  startYear: "",
  endYear: "",
  grade: "",
};

export default function CandidateEducationSection({
  education,
  onChange,
}: CandidateEducationSectionProps) {
  const [isEduModalOpen, setIsEduModalOpen] = useState(false);

  // Education hook form
  const {
    control: eduControl,
    handleSubmit: handleEduSubmit,
    reset: resetEdu,
    formState: { errors: eduErrors },
  } = useForm<EducationFormValues>({
    defaultValues: DEFAULT_EDU_FORM,
  });

  const handleOpenEduModal = () => {
    resetEdu(DEFAULT_EDU_FORM);
    setIsEduModalOpen(true);
  };

  const onSubmitEducation = (data: EducationFormValues) => {
    const newEdu: EducationItem = {
      id: `edu-${Date.now()}`,
      ...data,
    };
    onChange("education", [newEdu, ...education]);
    setIsEduModalOpen(false);
    toast.success("Academic degree added!");
  };

  const handleDeleteEducation = (id: string) => {
    onChange(
      "education",
      education.filter((e) => e.id !== id)
    );
    toast.success("Education entry removed.");
  };

  return (
    <section className="bg-white rounded p-4 sm:p-6 border border-zinc-200/80 shadow-xs space-y-4 sm:space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
        <div className="flex items-center gap-2">
          <FiBookOpen className="size-4 text-forest" />
          <h2 className="text-sm sm:text-base font-bold text-zinc-900">
            Education & Academic Background
          </h2>
        </div>

        <Button
          size="sm"
          onClick={handleOpenEduModal}
          className="gap-1.5"
        >
          <FiPlus className="size-3.5" />
          <span>Add Degree</span>
        </Button>
      </div>

      <div className="space-y-3">
        {education.map((edu) => (
          <div
            key={edu.id}
            className="p-3.5 rounded-lg bg-zinc-50/60 border border-zinc-200/70 hover:border-zinc-300 transition-all flex items-start justify-between gap-3 group"
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
                    <span>{edu.grade}</span>
                  </>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleDeleteEducation(edu.id)}
              className="p-1 rounded text-zinc-400 hover:text-rose-600 transition-colors cursor-pointer opacity-80 group-hover:opacity-100"
              title="Remove education"
            >
              <FiTrash2 className="size-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Ant Design Modal for Adding Education with CommonFieldset */}
      <Modal
        open={isEduModalOpen}
        onCancel={() => setIsEduModalOpen(false)}
        footer={null}
        centered
        width={540}
        destroyOnHidden
        closeIcon={<LuX className="size-4 text-zinc-400 hover:text-zinc-700 transition-colors" />}
        className="[&_.ant-modal-content]:rounded! [&_.ant-modal-content]:p-0! overflow-hidden"
      >
        <div className="p-4 sm:p-5 border-b border-zinc-100 bg-white">
          <h3 className="text-base font-bold text-zinc-900">Add Academic Degree</h3>
          <p className="text-xs text-zinc-500 mt-0.5">University, college, or diploma</p>
        </div>

        <form onSubmit={handleEduSubmit(onSubmitEducation)} className="p-4 sm:p-5 space-y-3.5">
          <CommonFieldset<EducationFormValues>
            control={eduControl}
            register_as="institution"
            label="Institution / University"
            placeholder="e.g. UC Berkeley"
            isRequired={true}
            errors={eduErrors}
            validationRules={{ required: "Institution name is required" }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <CommonFieldset<EducationFormValues>
              control={eduControl}
              register_as="degree"
              label="Degree Level"
              placeholder="e.g. Bachelor of Science"
              isRequired={true}
              errors={eduErrors}
              validationRules={{ required: "Degree level is required" }}
            />

            <CommonFieldset<EducationFormValues>
              control={eduControl}
              register_as="fieldOfStudy"
              label="Field of Study"
              placeholder="e.g. Computer Science"
              isRequired={true}
              errors={eduErrors}
              validationRules={{ required: "Field of study is required" }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <CommonFieldset<EducationFormValues>
              control={eduControl}
              register_as="startYear"
              label="Start Year"
              placeholder="e.g. 2016"
              errors={eduErrors}
            />

            <CommonFieldset<EducationFormValues>
              control={eduControl}
              register_as="endYear"
              label="End Year"
              placeholder="e.g. 2020"
              errors={eduErrors}
            />

            <CommonFieldset<EducationFormValues>
              control={eduControl}
              register_as="grade"
              label="Grade / Honor"
              placeholder="e.g. 3.8 GPA"
              errors={eduErrors}
            />
          </div>

          <div className="pt-3 border-t border-zinc-100 flex items-center justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsEduModalOpen(false)}
              className="border border-zinc-200 text-zinc-700 hover:bg-zinc-50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
            >
              Save Degree
            </Button>
          </div>
        </form>
      </Modal>
    </section>
  );
}
