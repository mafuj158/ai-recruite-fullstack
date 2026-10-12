"use client";

import { useEffect, useRef, useState } from "react";
import {
  FiVideo,
  FiVideoOff,
  FiMic,
  FiMicOff,
  FiCheckCircle,
  FiVolume2,
} from "react-icons/fi";
import { LuFileText } from "react-icons/lu";
import type { AIInterviewAnswerMode } from "@/types/candidate/ai-interview.types";

interface DevicePreviewCardProps {
  answerMode: AIInterviewAnswerMode;
}

export default function DevicePreviewCard({ answerMode }: DevicePreviewCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [micEnabled, setMicEnabled] = useState(true);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [audioLevel, setAudioLevel] = useState<number>(45);

  // Initialize media devices preview safely
  useEffect(() => {
    let localStream: MediaStream | null = null;

    const initMedia = async () => {
      if (answerMode === "text") return;

      try {
        if (navigator?.mediaDevices?.getUserMedia) {
          const constraints: MediaStreamConstraints = {
            video: answerMode === "video" ? { width: 640, height: 360 } : false,
            audio: true,
          };

          localStream = await navigator.mediaDevices.getUserMedia(constraints);
          setStream(localStream);
          setHasCameraPermission(true);

          if (videoRef.current && answerMode === "video") {
            videoRef.current.srcObject = localStream;
          }
        } else {
          setHasCameraPermission(true);
        }
      } catch {
        // Permissions not granted or mock environment
        setHasCameraPermission(false);
      }
    };

    initMedia();

    return () => {
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [answerMode]);

  // Audio simulation oscillation when mic is active
  useEffect(() => {
    if (!micEnabled || answerMode === "text") {
      setAudioLevel(0);
      return;
    }

    const interval = setInterval(() => {
      const randomLevel = Math.floor(Math.random() * 45) + 30;
      setAudioLevel(randomLevel);
    }, 250);

    return () => clearInterval(interval);
  }, [micEnabled, answerMode]);

  const toggleCamera = () => {
    if (stream) {
      const videoTracks = stream.getVideoTracks();
      videoTracks.forEach((track) => {
        track.enabled = !cameraEnabled;
      });
    }
    setCameraEnabled((prev) => !prev);
  };

  const toggleMic = () => {
    if (stream) {
      const audioTracks = stream.getAudioTracks();
      audioTracks.forEach((track) => {
        track.enabled = !micEnabled;
      });
    }
    setMicEnabled((prev) => !prev);
  };

  if (answerMode === "text") {
    return (
      <div className="bg-white border border-zinc-200/80 rounded p-6 shadow-2xs text-center">
        <div className="size-12 rounded-full bg-[#F0F7F4] border border-[#D5E6DC] text-forest flex items-center justify-center mx-auto mb-3">
          <LuFileText className="size-6" />
        </div>
        <h4 className="text-sm font-bold text-zinc-900">
          Written Text Mode Active
        </h4>
        <p className="text-xs text-zinc-500 max-w-md mx-auto mt-1">
          Camera and microphone access are not required. You will read each question on screen and type your responses in a structured editor.
        </p>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-zinc-50 border border-zinc-200 text-xs text-zinc-600 mt-4">
          <FiCheckCircle className="size-3.5 text-emerald-600" />
          <span>Keyboard input ready • Spell-check enabled</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-zinc-200/80 rounded p-4 sm:p-5 shadow-2xs space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-zinc-900">
            Device & Audio Check
          </h3>
          <p className="text-xs text-zinc-500 mt-0.5">
            Check your camera framing and verify that your microphone detects sound.
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs">
          <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-zinc-600 font-medium">System Ready</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        {/* Video / Audio Preview Container */}
        <div className="lg:col-span-8 bg-zinc-900 rounded-lg overflow-hidden relative aspect-video flex items-center justify-center border border-zinc-800 shadow-inner">
          {answerMode === "video" ? (
            cameraEnabled ? (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className={`w-full h-full object-cover -scale-x-100 ${
                    hasCameraPermission ? "block" : "hidden"
                  }`}
                />
                {!hasCameraPermission && (
                  <div className="text-center p-6 space-y-2">
                    <div className="size-14 rounded-full bg-zinc-800/80 border border-zinc-700 text-zinc-400 flex items-center justify-center mx-auto">
                      <FiVideo className="size-6 text-zinc-300" />
                    </div>
                    <p className="text-xs font-semibold text-zinc-200">
                      Camera Preview Active
                    </p>
                    <p className="text-[11px] text-zinc-400 max-w-xs">
                      Simulated preview ready. Ensure your face is centered and well lit.
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center p-6 space-y-2">
                <div className="size-14 rounded-full bg-zinc-800 text-zinc-500 flex items-center justify-center mx-auto">
                  <FiVideoOff className="size-6" />
                </div>
                <p className="text-xs font-medium text-zinc-400">
                  Camera is turned off
                </p>
              </div>
            )
          ) : (
            /* Audio Only Preview */
            <div className="text-center p-6 space-y-3">
              <div className="size-16 rounded-full bg-forest/20 border border-forest/40 text-emerald-400 flex items-center justify-center mx-auto animate-pulse">
                <FiMic className="size-7" />
              </div>
              <div>
                <p className="text-xs font-semibold text-zinc-200">
                  Audio Mode Active
                </p>
                <p className="text-[11px] text-zinc-400 max-w-xs mt-0.5">
                  Microphone will capture your voice answers. No video will be saved.
                </p>
              </div>
            </div>
          )}

          {/* Media Floating Controls Overlay */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-zinc-900/80 backdrop-blur-sm border border-zinc-700/80 rounded-full px-3 py-1.5 shadow-lg">
            {answerMode === "video" && (
              <button
                type="button"
                onClick={toggleCamera}
                title={cameraEnabled ? "Turn off camera" : "Turn on camera"}
                className={`p-2 rounded-full transition-colors cursor-pointer ${
                  cameraEnabled
                    ? "bg-zinc-700 text-white hover:bg-zinc-600"
                    : "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                }`}
              >
                {cameraEnabled ? (
                  <FiVideo className="size-4" />
                ) : (
                  <FiVideoOff className="size-4" />
                )}
              </button>
            )}

            <button
              type="button"
              onClick={toggleMic}
              title={micEnabled ? "Mute microphone" : "Unmute microphone"}
              className={`p-2 rounded-full transition-colors cursor-pointer ${
                micEnabled
                  ? "bg-zinc-700 text-white hover:bg-zinc-600"
                  : "bg-red-500/20 text-red-400 hover:bg-red-500/30"
              }`}
            >
              {micEnabled ? (
                <FiMic className="size-4" />
              ) : (
                <FiMicOff className="size-4" />
              )}
            </button>
          </div>
        </div>

        {/* Device Diagnostics & Audio Meter */}
        <div className="lg:col-span-4 space-y-3.5 bg-zinc-50/70 border border-zinc-200/70 rounded p-4">
          <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
            Audio & Hardware Status
          </h4>

          {/* Microphone Live Level */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-600 flex items-center gap-1.5">
                <FiVolume2 className="size-3.5 text-forest" />
                <span>Mic Input Level</span>
              </span>
              <span className="text-[11px] font-semibold text-zinc-700">
                {micEnabled ? "Detecting sound" : "Muted"}
              </span>
            </div>

            {/* Audio Wave / Meter Bars */}
            <div className="flex items-center gap-1 h-5 bg-white border border-zinc-200 rounded px-2">
              {[15, 30, 45, 60, 75, 90].map((threshold, idx) => {
                const isActive = micEnabled && audioLevel >= threshold;
                return (
                  <div
                    key={idx}
                    className={`flex-1 h-3 rounded-xs transition-colors ${
                      isActive
                        ? threshold > 75
                          ? "bg-amber-500"
                          : "bg-forest"
                        : "bg-zinc-100"
                    }`}
                  />
                );
              })}
            </div>
            <p className="text-[10px] text-zinc-400">
              Speak into your mic to confirm the bars move smoothly.
            </p>
          </div>

          <div className="h-px bg-zinc-200" />

          {/* Checklist of hardware readiness */}
          <div className="space-y-2 text-xs">
            {answerMode === "video" && (
              <div className="flex items-center justify-between">
                <span className="text-zinc-600">Camera Feed</span>
                <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold text-[11px]">
                  <FiCheckCircle className="size-3" />
                  {cameraEnabled ? "Connected" : "Disabled"}
                </span>
              </div>
            )}

            <div className="flex items-center justify-between">
              <span className="text-zinc-600">Microphone</span>
              <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold text-[11px]">
                <FiCheckCircle className="size-3" />
                {micEnabled ? "Ready" : "Muted"}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-zinc-600">AI Speech Engine</span>
              <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold text-[11px]">
                <FiCheckCircle className="size-3" />
                Active
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
