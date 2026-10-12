"use client";

import { useEffect } from "react";
import { Modal } from "antd";
import { useForm } from "react-hook-form";
import { FiEdit3, FiX, FiCheck } from "react-icons/fi";
import CommonFieldset from "@/components/ui/fieldset";
import { Button } from "@/components/ui/button";
import type { CVImprovementSuggestion } from "@/types/candidate/cv-manager.types";

interface ManualEditFormValues {
  editedText: string;
}

interface ManualEditModalProps {
  suggestion: CVImprovementSuggestion | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (suggestionId: string, editedText: string) => void;
}

export function ManualEditModal({
  suggestion,
  isOpen,
  onClose,
  onSave,
}: ManualEditModalProps) {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ManualEditFormValues>({
    defaultValues: {
      editedText: "",
    },
  });

  useEffect(() => {
    if (suggestion) {
      setValue(
        "editedText",
        suggestion.userEditedText || suggestion.improvedText
      );
    }
  }, [suggestion, setValue]);

  if (!suggestion) return null;

  const onFormSubmit = (data: ManualEditFormValues) => {
    onSave(suggestion.id, data.editedText);
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      destroyOnHidden
      centered
      width={560}
      closeIcon={
        <FiX className="size-4 text-zinc-400 hover:text-zinc-700 transition-colors" />
      }
      className="[&_.ant-modal-content]:rounded-xl! [&_.ant-modal-content]:p-0! overflow-hidden"
    >
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-zinc-100 bg-white flex items-center gap-3">
        <div className="size-9 rounded-lg bg-forest/10 text-forest flex items-center justify-center shrink-0">
          <FiEdit3 className="size-4.5" />
        </div>
        <div className="min-w-0 pr-6">
          <h3 className="text-base font-bold text-zinc-900 leading-snug">
            Edit Bullet Point Manually
          </h3>
          <p className="text-xs text-zinc-500 mt-0.5 truncate">
            {suggestion.title}
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="p-4 sm:p-5 space-y-3.5 bg-white"
      >
        {/* Original Reference Box */}
        <div className="p-3 rounded-lg bg-rose-50/50 border border-rose-200/60 text-xs space-y-1">
          <span className="text-[10px] font-bold text-rose-700 uppercase tracking-wider block">
            Original Resume Text:
          </span>
          <p className="text-zinc-600 italic leading-relaxed">
            "{suggestion.originalText}"
          </p>
        </div>

        {/* Form Field using CommonFieldset */}
        <CommonFieldset<ManualEditFormValues>
          control={control}
          register_as="editedText"
          type="textarea"
          label="Customize AI Enhanced Text"
          placeholder="Edit the bullet point text..."
          isRequired={true}
          errors={errors}
          textareaClass="min-h-24 text-xs sm:text-sm"
          validationRules={{ required: "Text content cannot be empty" }}
        />

        {/* AI Reasoning Reminder */}
        <div className="p-2.5 rounded bg-zinc-50 border border-zinc-200/70 text-[11px] text-zinc-500 leading-relaxed">
          <span className="font-semibold text-zinc-700">AI Optimization Tip: </span>
          {suggestion.reasoning}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-zinc-100">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="h-9 px-4 border border-[#DFE1E7] bg-white text-zinc-700 hover:bg-zinc-50 rounded text-xs font-semibold cursor-pointer"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="primary"
            className="h-9 px-4 rounded bg-forest text-lime hover:bg-[#1b3027] text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
          >
            <FiCheck className="size-4" />
            <span>Apply Changes</span>
          </Button>
        </div>
      </form>
    </Modal>
  );
}
