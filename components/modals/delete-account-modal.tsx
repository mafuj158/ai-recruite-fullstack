"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Modal } from "antd";
import { useAppStore } from "@/store";
import { Button } from "@/components/ui/button";
import { LuTrash2, LuX } from "react-icons/lu";
import toast from "react-hot-toast";

export default function DeleteAccountModal() {
  const router = useRouter();
  const pathname = usePathname();
  const isDeleteAccountModalOpen = useAppStore(
    (state) => state.isDeleteAccountModalOpen
  );
  const toggleDeleteAccountModal = useAppStore(
    (state) => state.toggleDeleteAccountModal
  );
  const [isDeleting, setIsDeleting] = useState(false);

  const isEmployer = pathname.includes("/employer");
  const closeModal = () => toggleDeleteAccountModal(false);

  const handleDelete = async () => {
    if (isDeleting) return;

    setIsDeleting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      toast.success(
        isEmployer
          ? "Organization account deleted successfully."
          : "Candidate account deleted successfully."
      );
      closeModal();
      router.push("/login");
    } catch {
      toast.error("Failed to delete account. Please try again or contact support.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Modal
      open={isDeleteAccountModalOpen}
      onCancel={closeModal}
      footer={null}
      centered
      width={440}
      destroyOnHidden
      closeIcon={<LuX className="size-4.5 text-zinc-400 hover:text-zinc-700 transition-colors" />}
      className="[&_.ant-modal-content]:rounded! [&_.ant-modal-content]:p-6!"
    >
      <div className="space-y-4">
        {/* Header Icon & Title */}
        <div className="flex sm:flex-row flex-col items-start gap-3.5">
          <div className="size-11 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0 ring-4 ring-red-50/60">
            <LuTrash2 className="size-5.5" />
          </div>
          <div className="space-y-1 pr-6">
            <h3 className="text-base sm:text-lg font-bold text-zinc-900 leading-snug">
              Delete Account
            </h3>
            <span className="inline-block text-[11px] font-medium text-zinc-600 bg-zinc-50 border border-zinc-200 px-2 py-0.5 rounded capitalize">
              {isEmployer ? "Employer Portal" : "Candidate Portal"}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
          Are you sure you want to delete your account? You will permanently lose access to all your{" "}
          {isEmployer
            ? "job postings, applicant pipelines, and recruitment data"
            : "saved jobs, applications, and candidate profile"}
          .
        </p>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-100">
          <button
            type="button"
            onClick={closeModal}
            disabled={isDeleting}
            className="px-4 py-2 text-xs sm:text-sm font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 rounded transition-colors cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>
          <Button
            type="button"
            onClick={handleDelete}
            isLoading={isDeleting}
            className="px-5 py-2.5 text-xs sm:text-sm font-semibold rounded shadow-xs hover:shadow transition-all bg-red-600 hover:bg-red-700 text-white cursor-pointer"
          >
            {isDeleting ? "Deleting..." : "Delete Account"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
