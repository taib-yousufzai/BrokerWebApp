"use client";
import { useState } from "react";
import { Info, AlertTriangle, CheckCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NotificationType } from "@/lib/types";

interface NotificationBannerProps {
  message: string;
  type?: NotificationType | "info" | "warning" | "success";
}

const CONFIG: Record<string, { cls: string; Icon: React.ElementType }> = {
  [NotificationType.INFO]:    { cls: "bg-[#EFF6FF] text-[#1D4ED8] border-[#BFDBFE]",    Icon: Info          },
  [NotificationType.WARNING]: { cls: "bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]",    Icon: AlertTriangle },
  [NotificationType.SUCCESS]: { cls: "bg-[#F0FDF4] text-[#15803D] border-[#BBF7D0]",    Icon: CheckCircle   },
};

export default function NotificationBanner({ message, type = NotificationType.INFO }: NotificationBannerProps) {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  const { cls, Icon } = CONFIG[type] ?? CONFIG[NotificationType.INFO];

  return (
    <div className={cn("flex items-center gap-2.5 px-4 py-2.5 rounded-[18px] border text-[0.8rem] font-medium", cls)}>
      <Icon size={15} className="shrink-0" />
      <span className="flex-1">{message}</span>
      <button
        onClick={() => setVisible(false)}
        className="shrink-0 opacity-60 hover:opacity-100 transition-opacity"
        aria-label="Dismiss"
      >
        <X size={13} />
      </button>
    </div>
  );
}
