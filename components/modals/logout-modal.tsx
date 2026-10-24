"use client";

import { useRouter, usePathname } from "next/navigation";
import { Modal } from "antd";
import { useAppStore } from "@/store";
import { LuLogOut, LuX } from "react-icons/lu";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { useLogout } from "@/hooks/auth/use-logout";

export default function LogoutModal() {
  const router = useRouter();
  const pathname = usePathname();
  const isLogoutModalOpen = useAppStore((state) => state.isLogoutModalOpen);
  const toggleLogoutModal = useAppStore((state) => state.toggleLogoutModal);

  const { logoutAsync, isPending } = useLogout();

  const isEmployer = pathname.includes("/employer");
  const closeModal = () => toggleLogoutModal(false);

  const handleLogout = () => {
    logoutAsync(undefined, {
      onSuccess: (res) => {
        toast.success(res?.message || "Successfully logged out.");
        closeModal();
        router.replace("/login");
      },
      onError: (err) => {
        toast.error(err?.response?.data?.message || "Failed to sign out. Please try again.");
      },
    });
  };

  return (
    <Modal
      open={isLogoutModalOpen}
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
          <div className="size-11 rounded-full bg-[#EDF6F1] text-forest flex items-center justify-center shrink-0 ring-4 ring-forest/5">
            <LuLogOut className="size-5.5" />
          </div>
          <div className="space-y-1 pr-6">
            <h3 className="text-base sm:text-lg font-bold text-zinc-900 leading-snug">
              Sign Out
            </h3>
            <span className="inline-block text-[11px] font-medium text-zinc-600 bg-zinc-50 border border-zinc-200 px-2 py-0.5 rounded capitalize">
              {isEmployer ? "Employer Portal" : "Candidate Portal"}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
          Are you sure you want to sign out? You will need to log back in to access your{" "}
          {isEmployer ? "recruitment dashboard" : "candidate dashboard"}.
        </p>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-100">
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={closeModal}
            className="cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="danger"
            size="md"
            onClick={handleLogout}
            isLoading={isPending}
          >
            {isPending ? "Signing Out..." : "Sign Out"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
