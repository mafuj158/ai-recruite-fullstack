"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { DUMMY_CV_DATA } from "../dummy";
import type {
  CVManagerData,
  CVImprovementSuggestion,
} from "@/types/candidate/cv-manager.types";
import { CVOverviewCard } from "./cv-overview-card";
import { ATSScoreCard } from "./ats-score-card";
import { AICVDiffEditor } from "./ai-cv-diff-editor";
import { ReplaceCVModal } from "./replace-cv-modal";
import { ManualEditModal } from "./manual-edit-modal";
import { AICVGeneratorModal } from "./ai-cv-generator-modal";

export function CVManagerClient() {
  const [cvData, setCvData] = useState<CVManagerData>(DUMMY_CV_DATA);
  const [isReplaceModalOpen, setIsReplaceModalOpen] = useState(false);
  const [isGeneratorModalOpen, setIsGeneratorModalOpen] = useState(false);
  const [activeEditingSuggestion, setActiveEditingSuggestion] =
    useState<CVImprovementSuggestion | null>(null);

  // 1. Accept Individual Suggestion
  const handleAcceptSuggestion = (suggestionId: string) => {
    setCvData((prev) => {
      const updatedSuggestions = prev.suggestions.map((s) =>
        s.id === suggestionId ? { ...s, status: "accepted" as const } : s
      );
      const newScore = Math.min(98, prev.atsMetrics.overallScore + 3);
      const newImpact = Math.min(100, prev.atsMetrics.impactScore + 4);

      return {
        ...prev,
        atsMetrics: {
          ...prev.atsMetrics,
          overallScore: newScore,
          impactScore: newImpact,
        },
        suggestions: updatedSuggestions,
      };
    });

    toast.success("AI improvement accepted and applied to your resume!");
  };

  // 2. Dismiss Suggestion
  const handleDismissSuggestion = (suggestionId: string) => {
    setCvData((prev) => ({
      ...prev,
      suggestions: prev.suggestions.map((s) =>
        s.id === suggestionId ? { ...s, status: "dismissed" as const } : s
      ),
    }));

    toast("Suggestion dismissed.");
  };

  // 3. Accept All Suggestions
  const handleAcceptAll = () => {
    setCvData((prev) => ({
      ...prev,
      atsMetrics: {
        ...prev.atsMetrics,
        overallScore: 98,
        formattingScore: 98,
        keywordScore: 92,
        impactScore: 96,
        relevanceScore: 98,
      },
      suggestions: prev.suggestions.map((s) => ({
        ...s,
        status: "accepted" as const,
      })),
    }));

    toast.success("All AI improvements applied! Your ATS score is now 98/100.");
  };

  // 4. Save Manual Edit
  const handleSaveManualEdit = (suggestionId: string, editedText: string) => {
    setCvData((prev) => {
      const updatedSuggestions = prev.suggestions.map((s) =>
        s.id === suggestionId
          ? {
              ...s,
              status: "accepted" as const,
              userEditedText: editedText,
            }
          : s
      );
      const newScore = Math.min(98, prev.atsMetrics.overallScore + 3);

      return {
        ...prev,
        atsMetrics: {
          ...prev.atsMetrics,
          overallScore: newScore,
        },
        suggestions: updatedSuggestions,
      };
    });

    toast.success("Customized bullet point saved and applied!");
  };

  // 5. Replace CV Success
  const handleReplaceSuccess = (fileName: string, fileSize: string) => {
    setCvData((prev) => ({
      ...prev,
      currentCV: {
        ...prev.currentCV,
        fileName,
        fileSize,
        uploadedAt: "Just now",
        version: "v3.3",
      },
      atsMetrics: {
        ...prev.atsMetrics,
        overallScore: 89,
        formattingScore: 96,
      },
    }));

    toast.success(`Resume replaced successfully with ${fileName}`);
  };

  // 6. Apply Generated AI Summary
  const handleApplyGenerated = (newSummary: string) => {
    setCvData((prev) => {
      const updatedSuggestions = prev.suggestions.map((s) =>
        s.section === "summary"
          ? {
              ...s,
              improvedText: newSummary,
              status: "accepted" as const,
            }
          : s
      );

      return {
        ...prev,
        atsMetrics: {
          ...prev.atsMetrics,
          overallScore: Math.min(98, prev.atsMetrics.overallScore + 4),
        },
        suggestions: updatedSuggestions,
      };
    });

    toast.success("AI generated summary committed to your active resume!");
  };

  // 7. Add Missing Keyword
  const handleAddMissingKeyword = (keyword: string) => {
    setCvData((prev) => ({
      ...prev,
      atsMetrics: {
        ...prev.atsMetrics,
        keywordScore: Math.min(100, prev.atsMetrics.keywordScore + 4),
        overallScore: Math.min(98, prev.atsMetrics.overallScore + 1),
        missingKeywords: prev.atsMetrics.missingKeywords.filter(
          (k) => k !== keyword
        ),
        topKeywordsFound: [keyword, ...prev.atsMetrics.topKeywordsFound],
      },
    }));

    toast.success(`Added "${keyword}" to your indexed resume keywords!`);
  };

  // 8. Download PDF Handler
  const handleDownload = () => {
    toast.success(`Downloading ${cvData.currentCV.fileName}...`);
  };

  return (
    <div className="space-y-6">
      {/* 1. Active Resume Overview Header */}
      <CVOverviewCard
        cv={cvData.currentCV}
        onOpenReplaceModal={() => setIsReplaceModalOpen(true)}
        onOpenGeneratorModal={() => setIsGeneratorModalOpen(true)}
        onDownload={handleDownload}
      />

      {/* 2. ATS Scorecard & Metrics Breakdown */}
      <ATSScoreCard
        metrics={cvData.atsMetrics}
        onAddMissingKeyword={handleAddMissingKeyword}
      />

      {/* 3. Side-by-Side AI Diff & Suggestions Editor */}
      <AICVDiffEditor
        suggestions={cvData.suggestions}
        onAccept={handleAcceptSuggestion}
        onDismiss={handleDismissSuggestion}
        onOpenManualEdit={(s) => setActiveEditingSuggestion(s)}
        onAcceptAll={handleAcceptAll}
      />

      {/* Replace CV Modal */}
      <ReplaceCVModal
        isOpen={isReplaceModalOpen}
        onClose={() => setIsReplaceModalOpen(false)}
        onUploadSuccess={handleReplaceSuccess}
      />

      {/* Manual Edit Suggestion Modal */}
      <ManualEditModal
        suggestion={activeEditingSuggestion}
        isOpen={activeEditingSuggestion !== null}
        onClose={() => setActiveEditingSuggestion(null)}
        onSave={handleSaveManualEdit}
      />

      {/* AI CV Generator Wizard Modal */}
      <AICVGeneratorModal
        isOpen={isGeneratorModalOpen}
        onClose={() => setIsGeneratorModalOpen(false)}
        onApplyGenerated={handleApplyGenerated}
      />
    </div>
  );
}
