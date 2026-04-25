"use client";

import { ReactNode, useEffect } from "react";
import { Button } from "./Button";

type DrawerProps = {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
};

export function Drawer({ isOpen, title, onClose, children }: DrawerProps) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />
      <section
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-md bg-white p-5 shadow-2xl transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <header className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-[var(--ink-900)]">{title}</h3>
          <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close drawer">
            Close
          </Button>
        </header>
        {children}
      </section>
    </>
  );
}
