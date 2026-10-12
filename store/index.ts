import { create } from "zustand";
import { devtools, persist, type PersistStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import toast from "react-hot-toast";
import { createModalSlice, type ModalSlice } from "./slices/modal-slice";
import { createChatSlice, type ChatSlice } from "./slices/chat-slice";

export type AppStore = ModalSlice & ChatSlice;

const ACCESS_TOKEN_KEY =
  (typeof process !== "undefined" &&
    process.env?.NEXT_PUBLIC_ACCESS_TOKEN_KEY) ||
  "ai_recruite_session_v1";

// ── Base64-encoded storage ─────────────────────────────────────────
// Encodes the persist blob with base64 so the raw localStorage value
// is not human-readable (e.g. "eyJzdGF0ZSI6eyJ0..." instead of plain JSON).
const encodedStorage: PersistStorage<any> = {
  getItem: async (name: string) => {
    try {
      if (typeof window === "undefined") return null;
      const raw = localStorage.getItem(name);
      if (!raw) return null;
      return JSON.parse(atob(raw));
    } catch {
      return null;
    }
  },
  setItem: async (name: string, value: any) => {
    try {
      if (typeof window === "undefined") return;
      localStorage.setItem(name, btoa(JSON.stringify(value)));
    } catch {
      // localStorage may be unavailable (e.g. Safari private mode)
    }
  },
  removeItem: async (name: string) => {
    try {
      if (typeof window === "undefined") return;
      localStorage.removeItem(name);
    } catch {
      // localStorage may be unavailable (e.g. Safari private mode)
    }
  },
};

// Centralized store using the Slice Pattern
export const useAppStore = create<AppStore>()(
  devtools(
    persist(
      immer((...a) => ({
        ...createModalSlice(...a),
        ...createChatSlice(...a),
      })),
      {
        name: ACCESS_TOKEN_KEY,
        storage: encodedStorage,
        // Modal states are transient by default; future persisted slice keys go here
        partialize: () => ({}),
        onRehydrateStorage: () => {
          return (_state, error) => {
            if (error) {
              toast.error("Failed to restore session");
            }
          };
        },
      }
    )
  )
);
