"use client";

import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiSearch, FiMessageSquare, FiBriefcase, FiX } from "react-icons/fi";
import { LuSparkles } from "react-icons/lu";
import { useChatRole } from "./use-chat-role";
import { getConversationsByRole } from "./dummy";
import { useAppStore } from "@/store";

export default function ChatConversationsList() {
  const { role, basePath, pathname } = useChatRole();
  const conversations = useMemo(() => getConversationsByRole(role), [role]);

  const searchQuery = useAppStore((state) => state.chatSearchQuery);
  const setSearchQuery = useAppStore((state) => state.setChatSearchQuery);
  const tabFilter = useAppStore((state) => state.chatTabFilter);
  const setTabFilter = useAppStore((state) => state.setChatTabFilter);
  const setChatSidebarOpen = useAppStore((state) => state.setChatSidebarOpen);

  // Filter conversations
  const filteredConversations = useMemo(() => {
    return conversations.filter((conv) => {
      // Tab filter
      if (tabFilter === "unread" && conv.unreadCount === 0) return false;
      if (tabFilter === "archived") return false; // Static placeholder for archived

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = conv.participant.name.toLowerCase().includes(query);
        const matchesJob = conv.job.title.toLowerCase().includes(query);
        const matchesCompany = conv.job.companyName.toLowerCase().includes(query);
        const matchesMsg = conv.lastMessage.content.toLowerCase().includes(query);
        return matchesName || matchesJob || matchesCompany || matchesMsg;
      }
      return true;
    });
  }, [conversations, tabFilter, searchQuery]);

  const unreadTotal = useMemo(
    () => conversations.reduce((acc, c) => acc + (c.unreadCount > 0 ? 1 : 0), 0),
    [conversations]
  );

  return (
    <div className="h-full flex flex-col bg-white border-r border-zinc-200/80 min-w-0">
      {/* Top Header: Title, Role Badge, Mobile Close */}
      <div className="p-3.5 sm:p-4 border-b border-zinc-100 space-y-3 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded bg-forest/10 text-forest flex items-center justify-center shrink-0">
              <FiMessageSquare className="size-4" />
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-bold text-zinc-900 leading-tight">
                Messages
              </h1>
              <p className="text-[11px] text-zinc-400">
                {role === "employer" ? "Candidate Inquiries" : "Recruiter Conversations"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EDF6F1] text-forest border border-[#C2E4D2]">
              <LuSparkles className="size-2.5" />
              AI Assisted
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              role === "employer"
                ? "Search candidate, skill, job..."
                : "Search recruiter, company, message..."
            }
            className="w-full pl-9 pr-3 py-2.5 text-xs rounded bg-zinc-50 border border-zinc-200 focus:bg-white focus:border-lime focus:ring-0.5 focus:ring-lime outline-none transition-all placeholder:text-zinc-400"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 cursor-pointer"
            >
              <FiX className="size-3" />
            </button>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 pt-0.5">
          <button
            type="button"
            onClick={() => setTabFilter("all")}
            className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${tabFilter === "all"
              ? "bg-forest text-white shadow-2xs"
              : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200/70"
              }`}
          >
            All ({conversations.length})
          </button>

          <button
            type="button"
            onClick={() => setTabFilter("unread")}
            className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1 ${tabFilter === "unread"
              ? "bg-forest text-white shadow-2xs"
              : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200/70"
              }`}
          >
            <span>Unread</span>
            {unreadTotal > 0 && (
              <span
                className={`size-4 rounded-full text-[10px] flex items-center justify-center font-bold ${tabFilter === "unread"
                  ? "bg-white text-forest"
                  : "bg-emerald-600 text-white"
                  }`}
              >
                {unreadTotal}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setTabFilter("archived")}
            className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${tabFilter === "archived"
              ? "bg-forest text-white shadow-2xs"
              : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200/70"
              }`}
          >
            Archived
          </button>
        </div>
      </div>

      {/* Conversations List */}
      <div className={`flex-1 overflow-y-auto min-h-0 ${filteredConversations.length === 0 ? "flex flex-col items-center justify-center" : "divide-y divide-zinc-100"}`}>
        {filteredConversations.length === 0 ? (
          <div className="p-6 text-center space-y-2 my-auto">
            <div className="size-12 rounded-full bg-zinc-100/80 text-zinc-400 flex items-center justify-center mx-auto">
              <FiMessageSquare className="size-5" />
            </div>
            <div className="space-y-1">
              <p className="text-xs font-semibold text-zinc-700">No conversations found</p>
              <p className="text-[11px] text-zinc-400 max-w-50 mx-auto">
                {searchQuery ? "Try a different search query" : "New messages will appear here"}
              </p>
            </div>
          </div>
        ) : (
          filteredConversations.map((conv) => {
            const isActive = pathname.includes(conv.id);

            return (
              <Link
                key={conv.id}
                href={`${basePath}/${conv.id}`}
                onClick={() => setChatSidebarOpen(false)}
                className={`block p-3 sm:p-3.5 transition-all text-left relative group ${isActive
                  ? "bg-forest/5 border-l-3 border-forest"
                  : "hover:bg-zinc-50 border-l-3 border-transparent"
                  }`}
              >
                <div className="flex items-start gap-3">
                  {/* Avatar with Online Indicator */}
                  <div className="relative shrink-0 mt-0.5">
                    <div className="size-10 rounded-full overflow-hidden bg-zinc-100 border border-zinc-200 relative">
                      <Image
                        src={conv.participant.avatar}
                        alt={conv.participant.name}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                    {conv.participant.isOnline && (
                      <span
                        className="absolute bottom-0 right-0 size-2.5 rounded-full bg-emerald-500 ring-2 ring-white"
                        title="Online"
                      />
                    )}
                  </div>

                  {/* Conversation Details */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between gap-1">
                      <h3
                        className={`text-xs font-semibold truncate ${isActive ? "text-forest" : "text-zinc-900"
                          }`}
                      >
                        {conv.participant.name}
                      </h3>
                      <span className="text-[10px] text-zinc-400 shrink-0 font-medium">
                        {conv.lastMessage.timestamp}
                      </span>
                    </div>

                    {/* Subtitle: Job & Company or Role */}
                    <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 truncate">
                      <FiBriefcase className="size-3 text-zinc-400 shrink-0" />
                      <span className="truncate font-medium">{conv.job.title}</span>
                      {conv.job.matchScore && (
                        <span className="shrink-0 px-1 py-0.2 rounded text-[9px] font-bold bg-[#EDF6F1] text-forest border border-[#C2E4D2]">
                          {conv.job.matchScore}%
                        </span>
                      )}
                    </div>

                    {/* Last message snippet + Unread Badge */}
                    <div className="flex items-center justify-between gap-2 pt-0.5">
                      <p
                        className={`text-[11px] truncate leading-tight ${conv.unreadCount > 0
                          ? "font-semibold text-zinc-800"
                          : "text-zinc-500"
                          }`}
                      >
                        {conv.lastMessage.senderRole === role && (
                          <span className="text-zinc-400 font-normal">You: </span>
                        )}
                        {conv.lastMessage.content}
                      </p>

                      {conv.unreadCount > 0 && (
                        <span className="size-4.5 rounded-full bg-forest text-white text-[10px] font-bold flex items-center justify-center shrink-0 shadow-2xs">
                          {conv.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}
