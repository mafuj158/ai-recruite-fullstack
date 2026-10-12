"use client";

import { useState, useRef, useEffect } from "react";
import {
  FiSend,
  FiPaperclip,
  FiX,
  FiCheck,
  FiTrash2,
  FiCalendar,
  FiClock,
  FiZap,
} from "react-icons/fi";
import { LuSparkles, LuWand } from "react-icons/lu";
import toast from "react-hot-toast";
import { useChatRole } from "./use-chat-role";
import {
  CANDIDATE_AI_SUGGESTIONS,
  EMPLOYER_AI_SUGGESTIONS,
} from "./dummy";
import type { AISuggestionPrompt } from "@/types/chat/chat.types";

interface ChatInputBarProps {
  onSendMessage: (content: string, isAiAssisted?: boolean) => void;
}

export default function ChatInputBar({ onSendMessage }: ChatInputBarProps) {
  const { role } = useChatRole();
  const suggestions: AISuggestionPrompt[] =
    role === "employer" ? EMPLOYER_AI_SUGGESTIONS : CANDIDATE_AI_SUGGESTIONS;

  const [showPrompts, setShowPrompts] = useState(true);
  const [input, setInput] = useState("");
  const [isPolishing, setIsPolishing] = useState(false);
  const [activeTone, setActiveTone] = useState<"professional" | "friendly" | "concise">("professional");
  const [polishedPreview, setPolishedPreview] = useState<string | null>(null);
  const [attachedFile, setAttachedFile] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const newHeight = Math.min(
        Math.max(textareaRef.current.scrollHeight, 56),
        160
      );
      textareaRef.current.style.height = `${newHeight}px`;
    }
  }, [input]);

  const handleSend = () => {
    if (!input.trim()) return;
    const isAiAssisted = Boolean(polishedPreview);
    onSendMessage(input.trim(), isAiAssisted);
    setInput("");
    setPolishedPreview(null);
    setAttachedFile(null);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // AI Polish feature
  const handleAiPolish = (tone: "professional" | "friendly" | "concise" = activeTone) => {
    if (!input.trim()) {
      toast("Type a draft message first to polish with AI.", {
        icon: "💡",
      });
      return;
    }

    setActiveTone(tone);
    setIsPolishing(true);

    setTimeout(() => {
      let polished = "";
      const raw = input.trim();

      if (role === "candidate") {
        if (tone === "concise") {
          polished = `Thank you for the update. I confirm receipt and look forward to the next steps.`;
        } else if (tone === "friendly") {
          polished = `Hi there! Thank you so much for reaching out. ${raw} I'm really excited about the opportunity and look forward to connecting!`;
        } else {
          polished = `Dear Hiring Team,\n\nThank you for reaching out regarding the position. ${raw}\n\nLooking forward to speaking with the team.\n\nBest regards,\nAlex Morgan`;
        }
      } else {
        if (tone === "concise") {
          polished = `Thank you for your response. Your availability is confirmed and the calendar invitation has been sent.`;
        } else if (tone === "friendly") {
          polished = `Hi! Great hearing from you. ${raw} We're thrilled about your background and look forward to speaking soon!`;
        } else {
          polished = `Hello,\n\nThank you for following up with our recruitment team. ${raw}\n\nBest regards,\nTalent Acquisition Team`;
        }
      }

      setPolishedPreview(polished);
      setIsPolishing(false);
      toast.success("AI draft enhanced! Review before inserting.");
    }, 500);
  };

  const handleAcceptPolished = () => {
    if (polishedPreview) {
      setInput(polishedPreview);
      setPolishedPreview(null);
      toast.success("Polished version applied to message!");
    }
  };

  const handleSelectSuggestion = (promptText: string) => {
    setInput(promptText);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
    toast("Prompt loaded into message box.", {
      icon: "✨",
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachedFile(file.name);
      toast.success(`Attached: ${file.name}`);
    }
  };

  const getSuggestionIcon = (category?: string) => {
    switch (category) {
      case "availability":
        return <FiCalendar className="size-3 text-emerald-600 shrink-0" />;
      case "followup":
        return <FiClock className="size-3 text-amber-600 shrink-0" />;
      case "concise":
        return <FiZap className="size-3 text-blue-600 shrink-0" />;
      default:
        return <LuSparkles className="size-3 text-forest shrink-0" />;
    }
  };

  return (
    <div className="p-3 sm:p-4 border-t border-zinc-200/80 bg-white space-y-2.5 shrink-0">
      {/* 1. Quick AI Prompts Bar - Collapsible / Dismissible */}
      {showPrompts ? (
        <div className="flex flex-col gap-1.5 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-forest">
              <LuSparkles className="size-3.5 text-forest animate-pulse" />
              <span>Quick AI Prompts:</span>
            </div>
            <button
              type="button"
              onClick={() => setShowPrompts(false)}
              className="p-1 rounded-md text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 transition-colors cursor-pointer"
              title="Hide quick prompts"
            >
              <FiX className="size-3.5" />
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {suggestions.map((sug) => (
              <button
                key={sug.id}
                type="button"
                onClick={() => handleSelectSuggestion(sug.promptText)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-zinc-100/90 hover:bg-[#EDF6F1] text-zinc-700 hover:text-forest border border-zinc-200/90 hover:border-[#C2E4D2] transition-all cursor-pointer whitespace-nowrap shadow-2xs active:scale-95"
              >
                {getSuggestionIcon(sug.toneCategory)}
                <span>{sug.label}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-start">
          <button
            type="button"
            onClick={() => setShowPrompts(true)}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium text-zinc-500 hover:text-forest hover:bg-zinc-100/80 transition-colors cursor-pointer"
            title="Show quick AI prompts"
          >
            <LuSparkles className="size-3 text-forest" />
            <span>Show Quick Prompts</span>
          </button>
        </div>
      )}

      {/* 2. Inline AI Polish Preview Card */}
      {polishedPreview && (
        <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#EDF6F1] to-emerald-50/50 border border-[#BDE3CE] space-y-2.5 animate-fadeIn shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-forest">
              <LuWand className="size-3.5" />
              <span>AI Polished Suggestion</span>
            </div>

            {/* Tone Selector Pills */}
            <div className="flex items-center gap-1 bg-white/80 p-0.5 rounded-lg border border-[#C2E4D2]">
              {(["professional", "friendly", "concise"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => handleAiPolish(t)}
                  className={`px-2 py-0.5 rounded text-[10px] font-semibold capitalize transition-all cursor-pointer ${
                    activeTone === t
                      ? "bg-forest text-white shadow-2xs"
                      : "text-zinc-600 hover:text-zinc-900"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5 ml-auto">
              <button
                type="button"
                onClick={handleAcceptPolished}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold bg-forest text-white hover:bg-forest-dark transition-colors cursor-pointer shadow-2xs"
              >
                <FiCheck className="size-3" />
                <span>Apply to Message</span>
              </button>
              <button
                type="button"
                onClick={() => setPolishedPreview(null)}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 hover:bg-white/80 cursor-pointer"
                title="Discard suggestion"
              >
                <FiX className="size-3.5" />
              </button>
            </div>
          </div>

          <p className="text-xs text-zinc-800 whitespace-pre-wrap leading-relaxed bg-white/90 p-2.5 rounded-lg border border-[#C2E4D2]/80">
            {polishedPreview}
          </p>
        </div>
      )}

      {/* 3. Structured Modern Composer Box */}
      <div className="rounded-xl border border-zinc-200 bg-white focus-within:border-forest/80 focus-within:ring-2 focus-within:ring-forest/15 shadow-2xs transition-all flex flex-col overflow-hidden">
        {/* Attached File Pill Preview */}
        {attachedFile && (
          <div className="mx-3 mt-2.5 px-2.5 py-1 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-between text-xs text-zinc-700">
            <div className="flex items-center gap-1.5 truncate">
              <FiPaperclip className="size-3.5 text-zinc-500 shrink-0" />
              <span className="truncate font-medium">{attachedFile}</span>
            </div>
            <button
              type="button"
              onClick={() => setAttachedFile(null)}
              className="p-0.5 rounded text-zinc-400 hover:text-rose-600 hover:bg-zinc-200 cursor-pointer"
            >
              <FiX className="size-3" />
            </button>
          </div>
        )}

        {/* Multi-line Auto-sizing Textarea */}
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            role === "employer"
              ? "Type a message to candidate... (Press Enter to send, Shift + Enter for new line)"
              : "Type a message to recruiter... (Press Enter to send, Shift + Enter for new line)"
          }
          rows={2}
          className="w-full min-h-[56px] max-h-40 px-3.5 pt-3 pb-2 text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-400 bg-transparent border-0 outline-none resize-none leading-relaxed [scrollbar-width:thin]"
        />

        {/* Bottom Actions Toolbar */}
        <div className="flex items-center justify-between gap-2 px-3 py-2 bg-zinc-50/80 border-t border-zinc-100">
          {/* Left Actions: Attach File & Clear */}
          <div className="flex items-center gap-1">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/60 transition-colors cursor-pointer"
              title="Attach document (PDF/DOCX)"
            >
              <FiPaperclip className="size-3.5" />
              <span className="hidden xs:inline text-[11px]">Attach</span>
            </button>

            {input.trim() && (
              <button
                type="button"
                onClick={() => {
                  setInput("");
                  setPolishedPreview(null);
                }}
                className="p-1 rounded-lg text-zinc-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                title="Clear draft"
              >
                <FiTrash2 className="size-3.5" />
              </button>
            )}
          </div>

          {/* Right Actions: AI Polish & Send Buttons */}
          <div className="flex items-center gap-2">
            {/* AI Polish Button */}
            <button
              type="button"
              disabled={isPolishing || !input.trim()}
              onClick={() => handleAiPolish()}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                input.trim()
                  ? "bg-[#EDF6F1] text-forest border border-[#C2E4D2] hover:bg-[#DDF0E6] hover:border-forest/40 shadow-2xs active:scale-95"
                  : "text-zinc-400 bg-zinc-100/80 border border-zinc-200/60 cursor-not-allowed opacity-60"
              }`}
              title="Enhance tone and clarity with AI"
            >
              <LuSparkles className={`size-3.5 ${isPolishing ? "animate-spin" : ""}`} />
              <span className="whitespace-nowrap">{isPolishing ? "Polishing..." : "AI Polish"}</span>
            </button>

            {/* Send Button */}
            <button
              type="button"
              disabled={!input.trim()}
              onClick={handleSend}
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold transition-all shadow-2xs ${
                input.trim()
                  ? "bg-forest text-white hover:bg-forest-dark cursor-pointer shadow-xs active:scale-95"
                  : "bg-zinc-200 text-zinc-400 cursor-not-allowed opacity-60"
              }`}
              title="Send message"
            >
              <span>Send</span>
              <FiSend className="size-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
