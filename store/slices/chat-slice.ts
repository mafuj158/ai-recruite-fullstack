import { StateCreator } from "zustand";
import type { AppStore } from "../index";

export interface ChatSlice {
  // Chat Sidebar (mobile / responsive drawer & desktop collapse)
  isChatSidebarOpen: boolean;
  isChatContextPanelOpen: boolean;
  chatSearchQuery: string;
  chatTabFilter: "all" | "unread" | "archived";

  // Actions
  toggleChatSidebar: (isOpen?: boolean) => void;
  setChatSidebarOpen: (isOpen: boolean) => void;
  toggleChatContextPanel: (isOpen?: boolean) => void;
  setChatContextPanelOpen: (isOpen: boolean) => void;
  setChatSearchQuery: (query: string) => void;
  setChatTabFilter: (tab: "all" | "unread" | "archived") => void;
}

export const createChatSlice: StateCreator<
  AppStore,
  [["zustand/immer", never]],
  [],
  ChatSlice
> = (set) => ({
  isChatSidebarOpen: true,
  isChatContextPanelOpen: false,
  chatSearchQuery: "",
  chatTabFilter: "all",

  toggleChatSidebar: (isOpen) =>
    set((state) => {
      state.isChatSidebarOpen =
        isOpen !== undefined ? isOpen : !state.isChatSidebarOpen;
    }),

  setChatSidebarOpen: (isOpen) =>
    set((state) => {
      state.isChatSidebarOpen = isOpen;
    }),

  toggleChatContextPanel: (isOpen) =>
    set((state) => {
      state.isChatContextPanelOpen =
        isOpen !== undefined ? isOpen : !state.isChatContextPanelOpen;
    }),

  setChatContextPanelOpen: (isOpen) =>
    set((state) => {
      state.isChatContextPanelOpen = isOpen;
    }),

  setChatSearchQuery: (query) =>
    set((state) => {
      state.chatSearchQuery = query;
    }),

  setChatTabFilter: (tab) =>
    set((state) => {
      state.chatTabFilter = tab;
    }),
});
