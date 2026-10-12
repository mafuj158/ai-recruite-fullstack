"use client";

import { useState, useEffect } from "react";
import {
  FiPlay,
  FiPause,
  FiRefreshCw,
  FiCheckCircle,
  FiArrowRight,
  FiVideo,
  FiMic,
  FiEdit3,
} from "react-icons/fi";
import type {
  AIInterviewQuestion,
  AIInterviewAnswerMode,
} from "@/types/candidate/ai-interview.types";

interface StepQuestionRunnerProps {
  questions: AIInterviewQuestion[];
  answerMode: AIInterviewAnswerMode;
  onFinishAll: () => void;
}

export default function StepQuestionRunner({
  questions,
  answerMode: initialAnswerMode,
  onFinishAll,
}: StepQuestionRunnerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedMode, setSelectedMode] =
    useState<AIInterviewAnswerMode>(initialAnswerMode);
  const [isRecording, setIsRecording] = useState(false);
  const [recordSecondsLeft, setRecordSecondsLeft] = useState(90);
  const [textAnswer, setTextAnswer] = useState("");

  const currentQ = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  // Recording Timer Countdown
  useEffect(() => {
    if (!isRecording) return;

    const timer = setInterval(() => {
      setRecordSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsRecording(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRecording]);

  const handleToggleRecord = () => {
    setIsRecording((prev) => !prev);
  };

  const handleRerecord = () => {
    setIsRecording(true);
    setRecordSecondsLeft(currentQ.idealDurationSeconds || 90);
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      onFinishAll();
    } else {
      setCurrentIndex((prev) => prev + 1);
      setIsRecording(false);
      setRecordSecondsLeft(
        questions[currentIndex + 1].idealDurationSeconds || 90
      );
      setTextAnswer("");
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins}:${remainder < 10 ? "0" : ""}${remainder}`;
  };

  return (
    <div className="space-y-4">
      {/* 1. Header with Question Progress */}
      <div className="bg-white border border-zinc-200/80 rounded p-4 sm:p-5 shadow-2xs flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="text-xs font-bold text-forest bg-[#F0F7F4] border border-[#D5E6DC] px-2.5 py-1 rounded">
            Question {currentIndex + 1} of {questions.length}
          </span>
          <span className="text-xs text-zinc-500 font-medium">
            {currentQ.categoryLabel}
          </span>
        </div>

        <div className="flex items-center gap-1">
          {questions.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all ${
                idx < currentIndex
                  ? "w-5 bg-emerald-500"
                  : idx === currentIndex
                  ? "w-7 bg-forest"
                  : "w-3 bg-zinc-200"
              }`}
            />
          ))}
        </div>
      </div>

      {/* 2. Role-related Question Card */}
      <div className="bg-white border border-zinc-200/80 rounded p-4 sm:p-6 shadow-2xs space-y-3">
        <div className="space-y-1.5">
          <h2 className="text-base sm:text-lg font-bold text-zinc-900 leading-snug">
            {currentQ.question}
          </h2>
          {currentQ.context && (
            <p className="text-xs text-zinc-500 leading-relaxed">
              {currentQ.context}
            </p>
          )}
        </div>

        {/* Answer Mode Switcher: Record Video, Record Audio, or Type Answer */}
        <div className="pt-2 border-t border-zinc-100 flex items-center gap-2 flex-wrap">
          <span className="text-xs text-zinc-500 font-medium mr-1">
            Answer Format:
          </span>
          <button
            type="button"
            onClick={() => {
              setSelectedMode("video");
              setIsRecording(false);
            }}
            className={`h-7 px-3 rounded text-xs font-medium inline-flex items-center gap-1.5 cursor-pointer transition-colors ${
              selectedMode === "video"
                ? "bg-forest text-white shadow-2xs font-semibold"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
            }`}
          >
            <FiVideo className="size-3.5" />
            <span>Record Video</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setSelectedMode("audio");
              setIsRecording(false);
            }}
            className={`h-7 px-3 rounded text-xs font-medium inline-flex items-center gap-1.5 cursor-pointer transition-colors ${
              selectedMode === "audio"
                ? "bg-forest text-white shadow-2xs font-semibold"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
            }`}
          >
            <FiMic className="size-3.5" />
            <span>Record Audio</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setSelectedMode("text");
              setIsRecording(false);
            }}
            className={`h-7 px-3 rounded text-xs font-medium inline-flex items-center gap-1.5 cursor-pointer transition-colors ${
              selectedMode === "text"
                ? "bg-forest text-white shadow-2xs font-semibold"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
            }`}
          >
            <FiEdit3 className="size-3.5" />
            <span>Type Answer</span>
          </button>
        </div>
      </div>

      {/* 3. Answer Workspace */}
      <div className="bg-white border border-zinc-200/80 rounded p-4 sm:p-5 shadow-2xs space-y-4">
        {selectedMode === "video" && (
          /* Video Recording Interface */
          <div className="space-y-4">
            <div className="bg-zinc-900 rounded-lg aspect-video max-h-[340px] mx-auto overflow-hidden relative flex items-center justify-center border border-zinc-800 shadow-inner">
              <div className="text-center space-y-3">
                <div
                  className={`size-16 rounded-full flex items-center justify-center mx-auto transition-all ${
                    isRecording
                      ? "bg-red-500/20 border-2 border-red-500 text-red-400 animate-pulse"
                      : "bg-zinc-800 border border-zinc-700 text-zinc-400"
                  }`}
                >
                  <FiVideo className="size-7" />
                </div>
                <p className="text-xs font-semibold text-zinc-300">
                  {isRecording ? "Camera Recording in Progress" : "Camera Ready"}
                </p>
              </div>

              {/* Timer Pill */}
              <div className="absolute top-3 left-3 bg-zinc-900/80 backdrop-blur-sm border border-zinc-700/80 rounded px-2.5 py-1 flex items-center gap-1.5 text-xs text-white">
                <span
                  className={`size-2 rounded-full ${
                    isRecording ? "bg-red-500 animate-pulse" : "bg-zinc-500"
                  }`}
                />
                <span className="font-mono font-bold">
                  {formatTime(recordSecondsLeft)}
                </span>
              </div>
            </div>

            {/* Recorder Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-zinc-100">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleToggleRecord}
                  className={`h-9 px-4 rounded text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer ${
                    isRecording
                      ? "bg-red-50 text-red-700 border border-red-200 hover:bg-red-100"
                      : "bg-zinc-900 text-white hover:bg-zinc-800"
                  }`}
                >
                  {isRecording ? (
                    <>
                      <FiPause className="size-3.5" />
                      <span>Pause Recording</span>
                    </>
                  ) : (
                    <>
                      <FiPlay className="size-3.5" />
                      <span>Start Recording</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleRerecord}
                  className="h-9 px-3.5 rounded border border-zinc-200 text-zinc-700 hover:bg-zinc-50 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <FiRefreshCw className="size-3.5" />
                  <span>Re-record</span>
                </button>
              </div>

              <button
                type="button"
                onClick={handleNextQuestion}
                className="h-9 px-5 rounded bg-forest hover:bg-[#1b3027] text-white text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
              >
                <span>
                  {isLastQuestion ? "Submit All Answers" : "Next Question"}
                </span>
                {isLastQuestion ? (
                  <FiCheckCircle className="size-3.5" />
                ) : (
                  <FiArrowRight className="size-3.5" />
                )}
              </button>
            </div>
          </div>
        )}

        {selectedMode === "audio" && (
          /* Audio Recording Interface */
          <div className="space-y-4">
            <div className="bg-zinc-900 rounded-lg p-8 sm:p-12 mx-auto overflow-hidden relative flex flex-col items-center justify-center border border-zinc-800 shadow-inner">
              <div
                className={`size-16 rounded-full flex items-center justify-center mx-auto transition-all ${
                  isRecording
                    ? "bg-red-500/20 border-2 border-red-500 text-red-400 animate-pulse"
                    : "bg-zinc-800 border border-zinc-700 text-zinc-400"
                }`}
              >
                <FiMic className="size-7" />
              </div>
              <p className="text-xs font-semibold text-zinc-300 mt-3">
                {isRecording
                  ? "Microphone Recording Active..."
                  : "Microphone Ready"}
              </p>

              {/* Timer Pill */}
              <div className="absolute top-3 left-3 bg-zinc-900/80 backdrop-blur-sm border border-zinc-700/80 rounded px-2.5 py-1 flex items-center gap-1.5 text-xs text-white">
                <span
                  className={`size-2 rounded-full ${
                    isRecording ? "bg-red-500 animate-pulse" : "bg-zinc-500"
                  }`}
                />
                <span className="font-mono font-bold">
                  {formatTime(recordSecondsLeft)}
                </span>
              </div>
            </div>

            {/* Recorder Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-zinc-100">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleToggleRecord}
                  className={`h-9 px-4 rounded text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer ${
                    isRecording
                      ? "bg-red-50 text-red-700 border border-red-200 hover:bg-red-100"
                      : "bg-zinc-900 text-white hover:bg-zinc-800"
                  }`}
                >
                  {isRecording ? (
                    <>
                      <FiPause className="size-3.5" />
                      <span>Pause Recording</span>
                    </>
                  ) : (
                    <>
                      <FiPlay className="size-3.5" />
                      <span>Start Recording</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleRerecord}
                  className="h-9 px-3.5 rounded border border-zinc-200 text-zinc-700 hover:bg-zinc-50 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <FiRefreshCw className="size-3.5" />
                  <span>Re-record</span>
                </button>
              </div>

              <button
                type="button"
                onClick={handleNextQuestion}
                className="h-9 px-5 rounded bg-forest hover:bg-[#1b3027] text-white text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
              >
                <span>
                  {isLastQuestion ? "Submit All Answers" : "Next Question"}
                </span>
                {isLastQuestion ? (
                  <FiCheckCircle className="size-3.5" />
                ) : (
                  <FiArrowRight className="size-3.5" />
                )}
              </button>
            </div>
          </div>
        )}

        {selectedMode === "text" && (
          /* Type Answer Interface */
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-zinc-500">
              <span>Type your answer:</span>
              <span>
                {textAnswer.trim().split(/\s+/).filter(Boolean).length} words
              </span>
            </div>
            <textarea
              value={textAnswer}
              onChange={(e) => setTextAnswer(e.target.value)}
              placeholder="Type your response here..."
              rows={7}
              className="w-full p-3.5 rounded border border-zinc-200 text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-forest focus:border-forest resize-y font-sans leading-relaxed"
            />
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-100">
              <button
                type="button"
                onClick={handleNextQuestion}
                className="h-9 px-5 rounded bg-forest hover:bg-[#1b3027] text-white text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
              >
                <span>
                  {isLastQuestion ? "Submit All Answers" : "Next Question"}
                </span>
                {isLastQuestion ? (
                  <FiCheckCircle className="size-3.5" />
                ) : (
                  <FiArrowRight className="size-3.5" />
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
