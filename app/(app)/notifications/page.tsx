"use client";
import { useNotifications } from "@/lib/store";
import { NotificationType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Info, AlertTriangle, CheckCircle, BellOff } from "lucide-react";

const iconMap: Record<NotificationType, React.ElementType> = {
  [NotificationType.INFO]:    Info,
  [NotificationType.WARNING]: AlertTriangle,
  [NotificationType.SUCCESS]: CheckCircle,
};

const colorMap: Record<NotificationType, string> = {
  [NotificationType.INFO]:    "bg-indigo-50 text-indigo-600",
  [NotificationType.WARNING]: "bg-amber-50 text-amber-600",
  [NotificationType.SUCCESS]: "bg-emerald-50 text-emerald-600",
};

export default function NotificationsPage() {
  const { notifications, unreadCount, markAllRead, markOneRead } = useNotifications();

  return (
    <div className="p-4 space-y-3">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
            Notifications
          </p>
          {unreadCount > 0 && (
            <p className="text-xs text-indigo-600 font-medium mt-0.5">
              {unreadCount} unread
            </p>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="text-xs font-semibold text-indigo-600 hover:underline"
          >
            Mark all read
          </button>
        )}
      </div>

      {/* List */}
      {notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <BellOff size={32} className="text-gray-300" />
          <p className="text-sm text-gray-400">No notifications</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {notifications.map((n) => {
            const Icon = iconMap[n.type] ?? Info;
            const color = colorMap[n.type] ?? "bg-gray-50 text-gray-500";
            return (
              <button
                key={n.id}
                onClick={() => markOneRead(n.id)}
                className={cn(
                  "w-full flex items-start gap-3 px-4 py-4 text-left transition-colors",
                  "border-b border-gray-50 last:border-0",
                  n.read ? "bg-white hover:bg-gray-50" : "bg-indigo-50/40 hover:bg-indigo-50/60"
                )}
              >
                <div className={cn("w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5", color)}>
                  <Icon size={15} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={cn("text-sm leading-snug", n.read ? "text-gray-600 font-normal" : "text-gray-900 font-semibold")}>
                    {n.message}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{n.timestamp}</p>
                </div>
                {!n.read && (
                  <span className="w-2 h-2 rounded-full bg-indigo-500 shrink-0 mt-1.5" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
