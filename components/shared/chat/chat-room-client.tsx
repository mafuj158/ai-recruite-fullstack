"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { FiMessageSquare, FiChevronLeft } from "react-icons/fi";
import type { ChatConversation, ChatMessage } from "@/types/chat/chat.types";
import { useChatRole } from "./use-chat-role";
import { getConversationById } from "./dummy";
import ChatHeader from "./chat-header";
import ChatMessagesList from "./chat-messages-list";
import ChatInputBar from "./chat-input-bar";
import ChatContextPanel from "./chat-context-panel";
import { useAppStore } from "@/store";

interface ChatRoomClientProps {
  roomId: string;
}

export default function ChatRoomClient({ roomId }: ChatRoomClientProps) {
  const { role, basePath } = useChatRole();
  const initialConversation = useMemo(
    () => getConversationById(roomId, role),
    [roomId, role]
  );

  const [conversation, setConversation] = useState<ChatConversation | undefined>(
    initialConversation
  );
  const [messages, setMessages] = useState<ChatMessage[]>(
    initialConversation?.messages || []
  );

  const isContextPanelOpen = useAppStore(
    (state) => state.isChatContextPanelOpen
  );

  const handleSendMessage = (content: string, isAiAssisted = false) => {
    if (!conversation) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: role === "candidate" ? "cand-alex" : "emp-user",
      senderName: role === "candidate" ? "Alex Morgan" : "Hiring Team",
      senderRole: role,
      content,
      timestamp: "Just now",
      status: "delivered",
      isAiAssisted,
    };

    setMessages((prev) => [...prev, newMsg]);

    // Optional simulated reply after 1.5s for interactive demo
    if (messages.length % 2 === 1) {
      setTimeout(() => {
        const replyMsg: ChatMessage = {
          id: `reply-${Date.now()}`,
          senderId: conversation.participant.id,
          senderName: conversation.participant.name,
          senderRole: role === "candidate" ? "employer" : "candidate",
          content:
            role === "candidate"
              ? "Thanks for confirming, Alex! I've shared this with our technical hiring lead and will keep you updated."
              : "Thank you for the prompt update! I have confirmed the invitation on my dashboard calendar.",
          timestamp: "Just now",
          status: "delivered",
        };
        setMessages((prev) => [...prev, replyMsg]);
      }, 1400);
    }
  };

  if (!conversation) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-center space-y-3 bg-zinc-50/50">
        <div className="size-12 rounded-full bg-zinc-100 text-zinc-400 flex items-center justify-center">
          <FiMessageSquare className="size-6" />
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-zinc-900">Conversation Not Found</h3>
          <p className="text-xs text-zinc-500 max-w-sm">
            This message thread could not be loaded or may have been archived.
          </p>
        </div>
        <Link
          href={basePath}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded text-xs font-semibold bg-forest text-white hover:bg-forest-dark transition-colors cursor-pointer shadow-2xs"
        >
          <FiChevronLeft className="size-4" />
          <span>Back to Messages</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col min-w-0 min-h-0 overflow-hidden bg-white">
      {/* 1. Header */}
      <ChatHeader conversation={conversation} />

      {/* 2. Main Area: Message Stream + Side Context Drawer */}
      <div className="flex-1 flex min-h-0 min-w-0 overflow-hidden relative">
        {/* Chat Stream & Composer Bar */}
        <div className="flex-1 flex flex-col min-w-0 min-h-0 overflow-hidden h-full">
          <ChatMessagesList
            messages={messages}
            participant={conversation.participant}
          />
          <ChatInputBar onSendMessage={handleSendMessage} />
        </div>

        {/* Context Panel Drawer (Desktop Side & Mobile Overlay) */}
        {isContextPanelOpen && (
          <div className="absolute right-0 top-0 bottom-0 z-20 md:static h-full shadow-lg md:shadow-none animate-slideLeft">
            <ChatContextPanel conversation={conversation} />
          </div>
        )}
      </div>
    </div>
  );
}
