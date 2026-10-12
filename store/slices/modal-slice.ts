import { StateCreator } from "zustand";
import type { AppStore } from "../index";

export interface ModalSlice {
  // Global modals
  isLogoutModalOpen: boolean;
  isDeleteAccountModalOpen: boolean;
  isMobileSidebarOpen: boolean;

  // Global toggle methods
  toggleLogoutModal: (isOpen?: boolean) => void;
  toggleDeleteAccountModal: (isOpen?: boolean) => void;
  toggleMobileSidebar: (isOpen?: boolean) => void;
}

export const createModalSlice: StateCreator<
  AppStore,
  [["zustand/immer", never]],
  [],
  ModalSlice
> = (set) => ({
  // Global modals
  isLogoutModalOpen: false,
  isDeleteAccountModalOpen: false,
  isMobileSidebarOpen: false,

  // Global toggle methods
  toggleLogoutModal: (isOpen) =>
    set((state) => {
      state.isLogoutModalOpen =
        isOpen !== undefined ? isOpen : !state.isLogoutModalOpen;
    }),

  toggleDeleteAccountModal: (isOpen) =>
    set((state) => {
      state.isDeleteAccountModalOpen =
        isOpen !== undefined ? isOpen : !state.isDeleteAccountModalOpen;
    }),

  toggleMobileSidebar: (isOpen) =>
    set((state) => {
      state.isMobileSidebarOpen =
        isOpen !== undefined ? isOpen : !state.isMobileSidebarOpen;
    }),
});
