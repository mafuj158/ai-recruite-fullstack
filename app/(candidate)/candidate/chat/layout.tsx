import type { Metadata } from "next";
import ChatShell from "@/components/shared/chat/chat-shell";

export const metadata: Metadata = {
  title: "Messages | AI Recruite",
  description:
    "Direct messaging with employers, hiring managers, and recruiters on AI-Recruite.",
};

export default function CandidateChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ChatShell>{children}</ChatShell>;
}