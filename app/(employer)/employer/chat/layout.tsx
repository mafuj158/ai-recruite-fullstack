import type { Metadata } from "next";
import ChatShell from "@/components/shared/chat/chat-shell";

export const metadata: Metadata = {
  title: "Candidate Messages | AI Recruite",
  description:
    "Direct messaging with candidates and applicants in your recruitment pipeline.",
};

export default function EmployerChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ChatShell>{children}</ChatShell>;
}