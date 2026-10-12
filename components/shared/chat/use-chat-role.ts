"use client";

import { usePathname } from "next/navigation";
import type { ChatRole } from "@/types/chat/chat.types";

export function useChatRole() {
  const pathname = usePathname();
  const isEmployer = pathname.includes("/employer");
  const role: ChatRole = isEmployer ? "employer" : "candidate";
  const basePath = isEmployer ? "/employer/chat" : "/candidate/chat";

  return {
    role,
    isEmployer,
    isCandidate: !isEmployer,
    basePath,
    pathname,
  };
}
