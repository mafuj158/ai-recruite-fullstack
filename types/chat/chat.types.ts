export type ChatRole = "candidate" | "employer";

export type MessageDeliveryStatus = "sent" | "delivered" | "read";

export interface ChatAttachment {
  id: string;
  name: string;
  sizeFormatted: string;
  type: "pdf" | "image" | "doc";
  url: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: ChatRole;
  content: string;
  timestamp: string;
  status: MessageDeliveryStatus;
  attachments?: ChatAttachment[];
  isAiAssisted?: boolean;
}

export interface ChatParticipant {
  id: string;
  name: string;
  role: string;
  companyName?: string;
  avatar: string;
  isOnline: boolean;
  lastSeen?: string;
  candidateTitle?: string;
  experienceYears?: number;
  atsScore?: number;
  skills?: string[];
  location?: string;
}

export interface ChatJobContext {
  id: string;
  title: string;
  jobSlug?: string;
  companyName: string;
  companyLogo: string;
  department: string;
  location: string;
  employmentType: string;
  salaryRange?: string;
  applicationStatus?: "Under Review" | "Shortlisted" | "AI Prescreened" | "Interview" | "Hired" | "Applied";
  matchScore?: number;
}

export interface ChatConversation {
  id: string;
  job: ChatJobContext;
  participant: ChatParticipant;
  lastMessage: {
    content: string;
    timestamp: string;
    senderRole: ChatRole;
  };
  unreadCount: number;
  messages: ChatMessage[];
  updatedAt: string;
}

export interface AISuggestionPrompt {
  id: string;
  label: string;
  promptText: string;
  toneCategory: "professional" | "friendly" | "followup" | "concise";
}
