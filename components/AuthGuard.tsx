"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/store";

/**
 * Wraps authenticated routes.
 * - Not logged in  → /login
 * - Logged in but disclaimer not accepted → /disclaimer
 * - Both satisfied → render children
 */
export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isLoggedIn, disclaimerAccepted } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login");
    } else if (!disclaimerAccepted) {
      router.replace("/disclaimer");
    }
  }, [isLoggedIn, disclaimerAccepted, router]);

  // Render nothing while redirecting to avoid flash
  if (!isLoggedIn || !disclaimerAccepted) return null;

  return <>{children}</>;
}
