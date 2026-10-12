"use client";

import { useState, useRef } from "react";
import { Modal } from "antd";
import { FiUploadCloud, FiFile, FiX, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { Button } from "@/components/ui/button";

interface ReplaceCVModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: (newFileName: string, fileSize: string) => void;
}

export function ReplaceCVModal({
  isOpen,
  onClose,
  onUploadSuccess,
}: ReplaceCVModalProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetState = () => {
    setSelectedFile(null);
    setUploadProgress(0);
    setIsProcessing(false);
    setErrorMsg(null);
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const validateAndSelectFile = (file: File) => {
    setErrorMsg(null);
    const validTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
    ];

    if (!validTypes.includes(file.type) && !file.name.match(/\.(pdf|docx|doc)$/i)) {
      setErrorMsg("Please upload a PDF or Word document (.pdf, .docx)");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg("File size exceeds 10MB limit. Please upload a smaller file.");
      return;
    }

    setSelectedFile(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSelectFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSelectFile(e.target.files[0]);
    }
  };

  const handleUploadAndAnalyze = () => {
    if (!selectedFile) return;
    setIsProcessing(true);
    setUploadProgress(20);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          setTimeout(() => {
            const sizeStr = (selectedFile.size / (1024 * 1024)).toFixed(1) + " MB";
            onUploadSuccess(selectedFile.name, sizeStr);
            setIsProcessing(false);
            handleClose();
          }, 400);
          return 100;
        }
        return prev + 25;
      });
    }, 200);
  };

  return (
    <Modal
      open={isOpen}
      onCancel={handleClose}
      footer={null}
      destroyOnHidden
      centered
      width={520}
      closeIcon={
        <FiX className="size-4 text-zinc-400 hover:text-zinc-700 transition-colors" />
      }
      className="[&_.ant-modal-content]:rounded-xl! [&_.ant-modal-content]:p-0! overflow-hidden"
    >
      <div className="p-4 sm:p-5 space-y-4 bg-white">
        {/* Header */}
        <div className="border-b border-zinc-100 pb-3 pr-6">
          <h3 className="text-base sm:text-lg font-bold text-zinc-900">
            Replace Active Resume
          </h3>
          <p className="text-xs text-zinc-500 mt-0.5">
            Upload your updated resume to recalculate your ATS score and get new AI insights.
          </p>
        </div>

        {/* Dropzone */}
        {!selectedFile ? (
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-6 sm:p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-3 ${
              dragActive
                ? "border-forest bg-forest/5"
                : "border-zinc-300 hover:border-forest/60 bg-zinc-50/50 hover:bg-zinc-50"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx,.doc"
              onChange={handleFileInput}
              className="hidden"
            />
            <div className="size-12 rounded-xl bg-forest/10 text-forest flex items-center justify-center">
              <FiUploadCloud className="size-6" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-semibold text-zinc-800">
                Click to browse or drag and drop your file here
              </p>
              <p className="text-[11px] text-zinc-400 mt-1">
                Supports PDF, DOCX or DOC (Max file size: 10MB)
              </p>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-xl border border-zinc-200 bg-zinc-50 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="size-9 rounded-lg bg-forest text-lime flex items-center justify-center shrink-0">
                  <FiFile className="size-4.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-bold text-zinc-900 truncate">
                    {selectedFile.name}
                  </p>
                  <p className="text-[11px] text-zinc-500">
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              </div>

              {!isProcessing && (
                <button
                  type="button"
                  onClick={resetState}
                  className="text-xs text-rose-600 hover:text-rose-700 font-semibold cursor-pointer"
                >
                  Change
                </button>
              )}
            </div>

            {/* Progress Bar when uploading */}
            {isProcessing && (
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-[11px] text-zinc-600">
                  <span>Uploading & Parsing ATS Keywords...</span>
                  <span className="font-bold text-forest">{uploadProgress}%</span>
                </div>
                <div className="h-2 w-full bg-zinc-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-forest transition-all duration-200 rounded-full"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Error message */}
        {errorMsg && (
          <div className="p-3 rounded bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <FiAlertCircle className="size-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-zinc-100">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isProcessing}
            className="h-9 px-4 border border-[#DFE1E7] bg-white text-zinc-700 hover:bg-zinc-50 rounded text-xs font-semibold cursor-pointer"
          >
            Cancel
          </Button>

          <Button
            type="button"
            variant="primary"
            onClick={handleUploadAndAnalyze}
            disabled={!selectedFile || isProcessing}
            className="h-9 px-4 rounded bg-forest text-lime hover:bg-[#1b3027] text-xs font-semibold cursor-pointer"
          >
            {isProcessing ? "Analyzing Resume..." : "Upload & Analyze"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
