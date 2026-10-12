"use client";

import { useEffect, useState } from "react";
import DeleteAccountModal from "./delete-account-modal";
import LogoutModal from "./logout-modal";

export function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <DeleteAccountModal />
      <LogoutModal />
    </>
  );
}
