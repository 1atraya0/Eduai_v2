"use client";

import { useMemo } from "react";

type TabId =
  | "home"
  | "packages"
  | "payment"
  | "dashboard"
  | "about"
  | "terms"
  | "login";

const tabs: Array<{ id: TabId; label: string }> = [
  { id: "home", label: "Home" },
  { id: "packages", label: "Packages" },
  { id: "payment", label: "Payment" },
  { id: "dashboard", label: "Dashboard" },
  { id: "about", label: "About Us" },
  { id: "terms", label: "Terms" },
  { id: "login", label: "Login" },
];

export function TravelTabsApp() {
  const activeTabLabel = useMemo(() => tabs[0].label, []);

  return (
    <div className="h-screen w-full bg-white text-slate-900">
      <iframe title={`${activeTabLabel} mock`} src="/mock/spa" className="h-full w-full border-0" />
    </div>
  );
}
