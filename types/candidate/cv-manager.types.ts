export interface CVFileMetadata {
  id: string;
  fileName: string;
  fileSize: string;
  uploadedAt: string;
  fileUrl: string;
  isPrimary: boolean;
  version: string;
}

export interface ATSScoreMetrics {
  overallScore: number;
  formattingScore: number;
  keywordScore: number;
  impactScore: number;
  relevanceScore: number;
  strengths: string[];
  missingKeywords: string[];
  topKeywordsFound: string[];
}

export type CVSuggestionSection = "all" | "summary" | "experience" | "skills" | "projects";

export type CVSuggestionStatus = "pending" | "accepted" | "dismissed";

export interface CVImprovementSuggestion {
  id: string;
  section: "summary" | "experience" | "skills" | "projects";
  title: string;
  targetRoleContext?: string;
  originalText: string;
  improvedText: string;
  reasoning: string;
  status: CVSuggestionStatus;
  userEditedText?: string;
}

export interface CVManagerData {
  currentCV: CVFileMetadata;
  atsMetrics: ATSScoreMetrics;
  suggestions: CVImprovementSuggestion[];
}
