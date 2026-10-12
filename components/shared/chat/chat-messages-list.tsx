"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { FiCheck, FiCheckCircle, FiFileText, FiDownload } from "react-icons/fi";
import { LuSparkles } from "react-icons/lu";
import type { ChatMessage, ChatParticipant } from "@/types/chat/chat.types";
import { useChatRole } from "./use-chat-role";

interface ChatMessagesListProps {
  messages: ChatMessage[];
  participant: ChatParticipant;
}

export default function ChatMessagesList({
  messages,
  participant,
}: ChatMessagesListProps) {
  const { role } = useChatRole();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-3.5 sm:p-5 space-y-4 min-h-0 bg-zinc-50/40">
      {/* Date Header Pill */}
      <div className="flex items-center justify-center my-2">
        <span className="px-3 py-0.5 rounded-full text-[10px] font-semibold bg-white border border-zinc-200/80 text-zinc-500 shadow-2xs">
          Conversation History
        </span>
      </div>

      {messages.map((msg, index) => {
        const isSelf = msg.senderRole === role;
        const showAvatar =
          !isSelf &&
          (index === 0 || messages[index - 1]?.senderRole !== msg.senderRole);

        return (
          <div
            key={msg.id}
            className={`flex items-end gap-2.5 ${
              isSelf ? "justify-end" : "justify-start"
            }`}
          >
            {/* Incoming Avatar */}
            {!isSelf && (
              <div className="size-7 rounded-full overflow-hidden bg-zinc-200 shrink-0 relative mb-0.5">
                {showAvatar ? (
                  <Image
                    src={participant.avatar}
                    alt={participant.name}
                    fill
                    sizes="28px"
                    className="object-cover"
                  />
                ) : (
                  <div className="size-full opacity-0" />
                )}
              </div>
            )}

            {/* Message Bubble Container */}
            <div
              className={`max-w-[85%] sm:max-w-[75%] lg:max-w-[65%] space-y-1 ${
                isSelf ? "items-end" : "items-start"
              } flex flex-col`}
            >
              {/* Sender Name if not self */}
              {!isSelf && showAvatar && (
                <span className="text-[11px] font-semibold text-zinc-500 pl-1">
                  {msg.senderName}
                </span>
              )}

              {/* Message Content Bubble */}
              <div
                className={`p-3 sm:p-3.5 text-xs sm:text-sm leading-relaxed shadow-2xs relative ${
                  isSelf
                    ? "bg-forest text-white rounded-2xl rounded-tr-xs"
                    : "bg-white border border-zinc-200/80 text-zinc-900 rounded-2xl rounded-tl-xs"
                }`}
              >
                {/* AI Polish Badge */}
                {msg.isAiAssisted && (
                  <div
                    className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold mb-1.5 ${
                      isSelf
                        ? "bg-emerald-900/40 text-emerald-200 border border-emerald-500/30"
                        : "bg-[#EDF6F1] text-forest border border-[#C2E4D2]"
                    }`}
                  >
                    <LuSparkles className="size-2.5" />
                    <span>Polished with AI</span>
                  </div>
                )}

                <p className="whitespace-pre-wrap break-words">{msg.content}</p>

                {/* Attachments if any */}
                {msg.attachments && msg.attachments.length > 0 && (
                  <div className="mt-2.5 space-y-1.5 pt-2 border-t border-zinc-200/30">
                    {msg.attachments.map((att) => (
                      <div
                        key={att.id}
                        className={`p-2 rounded flex items-center justify-between gap-2 text-xs ${
                          isSelf
                            ? "bg-forest-dark/50 text-white"
                            : "bg-zinc-50 border border-zinc-200 text-zinc-800"
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <FiFileText className="size-4 shrink-0" />
                          <div className="truncate">
                            <p className="font-semibold truncate">{att.name}</p>
                            <p className="text-[10px] opacity-75">{att.sizeFormatted}</p>
                          </div>
                        </div>
                        <a
                          href={att.url}
                          download
                          className="p-1 rounded hover:bg-black/10 transition-colors"
                          title="Download attachment"
                        >
                          <FiDownload className="size-3.5" />
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Timestamp & Delivery Status */}
              <div
                className={`flex items-center gap-1 text-[10px] px-1 ${
                  isSelf ? "text-zinc-400 justify-end" : "text-zinc-400 justify-start"
                }`}
              >
                <span>{msg.timestamp}</span>
                {isSelf && (
                  <span className="text-zinc-400">
                    {msg.status === "read" ? (
                      <span className="text-forest font-bold inline-flex items-center" title="Read">
                        ✓✓
                      </span>
                    ) : (
                      <FiCheck className="size-3 inline" title="Delivered" />
                    )}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}

      <div ref={bottomRef} />
    </div>
  );
}
