"use client";

import { useChatRole } from "./use-chat-role";
import ChatConversationsList from "./chat-conversations-list";
import { useAppStore } from "@/store";

interface ChatShellProps {
  children: React.ReactNode;
}

export default function ChatShell({ children }: ChatShellProps) {
  const { basePath, pathname } = useChatRole();
  const isSidebarOpen = useAppStore((state) => state.isChatSidebarOpen);
  const isRoomSelected = pathname !== basePath && pathname.startsWith(basePath);

  return (
    <div className="w-full h-[calc(100dvh-6rem)] sm:h-[calc(100dvh-6.5rem)] lg:h-[calc(100dvh-7rem)] overflow-hidden bg-white border-y sm:border border-zinc-200/80 rounded-none sm:rounded shadow-2xs flex min-h-0 relative">
      {/* 1. Left Sidebar: Conversations List */}
      <div
        className={`shrink-0 h-full min-h-0 overflow-hidden ${isRoomSelected
            ? isSidebarOpen
              ? "absolute inset-0 z-30 md:static md:w-80 lg:w-96 md:block"
              : "hidden md:block md:w-80 lg:w-96"
            : "w-full md:w-80 lg:w-96 block"
          }`}
      >
        <ChatConversationsList />
      </div>

      {/* 2. Main Right Pane: Room View or Empty State */}
      <div
        className={`flex-1 h-full min-w-0 min-h-0 overflow-hidden flex flex-col ${!isRoomSelected ? "hidden md:flex" : "flex"
          }`}
      >
        {children}
      </div>
    </div>
  );
}
