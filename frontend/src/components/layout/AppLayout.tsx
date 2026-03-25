import type { ReactNode } from "react";
import { Header } from "@/components/layout/Header";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="py-8">{children}</main>
    </div>
  );
}