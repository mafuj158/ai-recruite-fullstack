"use client";

import { useState } from "react";
import { FiSmartphone } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import type { CandidateSessionDevice } from "@/types/candidate/settings.types";

interface CandidateSessionsSectionProps {
  initialDevices: CandidateSessionDevice[];
}

export default function CandidateSessionsSection({
  initialDevices,
}: CandidateSessionsSectionProps) {
  const [devices, setDevices] = useState<CandidateSessionDevice[]>(initialDevices);

  const handleRevokeDevice = (id: string) => {
    setDevices((prev) => prev.filter((d) => d.id !== id));
    toast.success("Session revoked.");
  };

  return (
    <section className="bg-white rounded p-4 sm:p-6 lg:p-8 border border-zinc-200/80 shadow-xs space-y-4">
      <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-zinc-100">
        <div className="flex items-center gap-2">
          <div className="size-7 sm:size-8 rounded bg-forest/10 text-forest flex items-center justify-center shrink-0">
            <FiSmartphone className="size-3.5 sm:size-4" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base md:text-lg font-semibold text-zinc-900">
              Active Sessions & Signed-in Devices
            </h2>
            <p className="text-[11px] sm:text-xs text-zinc-500 mt-0.5 sm:mt-1">
              Devices currently authenticated and active in your candidate account
            </p>
          </div>
        </div>
        <span className="text-xs text-zinc-400 font-medium">
          {devices.length} active {devices.length === 1 ? "device" : "devices"}
        </span>
      </div>

      <div className="space-y-2.5 sm:space-y-3">
        {devices.map((device) => (
          <div
            key={device.id}
            className="p-3.5 sm:p-4 rounded border border-zinc-200/70 bg-zinc-50/60 flex items-center justify-between gap-3 text-xs"
          >
            <div className="space-y-0.5 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-zinc-900">{device.device}</span>
                {device.isCurrent && (
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#EDF6F1] text-forest border border-[#C2E4D2]">
                    Current Device
                  </span>
                )}
              </div>
              <p className="text-zinc-500">
                {device.browser} • {device.location} ({device.ipAddress})
              </p>
              <p className="text-[11px] text-zinc-400">{device.lastActive}</p>
            </div>

            {!device.isCurrent && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleRevokeDevice(device.id)}
                className="border border-zinc-200 text-zinc-600 hover:text-rose-600 hover:bg-rose-50/60 cursor-pointer"
              >
                Revoke
              </Button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
