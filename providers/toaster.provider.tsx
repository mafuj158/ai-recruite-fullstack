"use client";

import { Toaster } from "react-hot-toast";

export function ToasterProvider() {
  return (
    <Toaster
      position="top-center"
      gutter={8}
      containerStyle={{
        top: 24,
      }}
      toastOptions={{
        duration: 3500,
        style: {
          background: "#FFFFFF",
          color: "#0D0D12",
          fontSize: "13px",
          fontWeight: 500,
          fontFamily: "var(--font-inter), sans-serif",
          padding: "9px 14px",
          borderRadius: "8px",
          border: "1px solid #E2E8F0",
          boxShadow:
            "0 4px 16px -2px rgba(36, 64, 52, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)",
          maxWidth: "380px",
        },
        success: {
          duration: 3000,
          iconTheme: {
            primary: "#244034",
            secondary: "#EDF6F1",
          },
          style: {
            border: "1px solid #D5E6DC",
          },
        },
        error: {
          duration: 4000,
          iconTheme: {
            primary: "#DC2626",
            secondary: "#FEE2E2",
          },
          style: {
            border: "1px solid #FECACA",
          },
        },
        loading: {
          iconTheme: {
            primary: "#244034",
            secondary: "#EDF6F1",
          },
        },
      }}
    />
  );
}