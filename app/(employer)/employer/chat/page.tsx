import type { Metadata } from "next";
import ChatEmptyState from "@/components/shared/chat/chat-empty-state";

export const metadata: Metadata = {
  title: "Candidate Messages | AI Recruite",
  description:
    "Direct messaging with candidates and applicants in your recruitment pipeline.",
};

export default function EmployerMessagesPage() {
  return <ChatEmptyState />;
}
