"use client";
import { createContext, useContext, useState } from "react";

const SidebarCtx = createContext({ isOpen: false, toggle: () => {}, close: () => {} });

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <SidebarCtx.Provider value={{ isOpen, toggle: () => setIsOpen((o) => !o), close: () => setIsOpen(false) }}>
      {children}
    </SidebarCtx.Provider>
  );
}

export const useSidebar = () => useContext(SidebarCtx);
