import type { Metadata } from "next";
import ChatEmptyState from "@/components/shared/chat/chat-empty-state";

export const metadata: Metadata = {
  title: "Messages | AI Recruite",
  description:
    "Direct messaging with employers, hiring managers, and recruiters on AI-Recruite.",
};

export default function CandidateMessagesPage() {
  return <ChatEmptyState />;
}
