"use client";
import { useToast } from "@/lib/store";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Toast() {
  const { toasts, dismissToast } = useToast();
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-20 left-0 right-0 z-[100] flex flex-col gap-2 px-4 max-w-md mx-auto pointer-events-none items-center">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={cn(
            "flex items-center gap-3 px-4 py-2.5 rounded-full shadow-lg pointer-events-auto",
            "animate-in slide-in-from-bottom-2 duration-200",
            t.type === "success" && "bg-[#1A1F2E]/90 text-white",
            t.type === "error"   && "bg-[#C62828]/90 text-white",
            t.type === "info"    && "bg-[#1A1F2E]/90 text-white"
          )}
          style={{ backdropFilter: "blur(12px)" }}
        >
          <span className="text-[0.75rem] font-medium whitespace-nowrap">{t.message}</span>
          <button onClick={() => dismissToast(t.id)} className="opacity-70 hover:opacity-100 shrink-0">
            <X size={13} />
          </button>
        </div>
      ))}
    </div>
  );
}
