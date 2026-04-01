"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Coins, UserCog, Moon } from "lucide-react";
import { useNotifications } from "@/lib/store";
import { cn } from "@/lib/utils";

const ROUTE_TITLES: Record<string, string> = {
  "/home":          "MARGIN APEX",
  "/watchlist":     "Watchlist",
  "/orders":        "Orders",
  "/positions":     "Positions",
  "/funds":         "Funds",
  "/profile":       "Profile",
  "/notifications": "Notifications",
  "/activity":      "Trade History",
  "/community":     "Community",
  "/support":       "Support",
  "/legal":         "Legal",
};

export default function TopBar() {
  const pathname = usePathname();
  const { unreadCount } = useNotifications();
  const isHome = pathname === "/home";

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#E8ECF0] shadow-sm">
      <div className="flex items-center justify-between px-5 h-14 max-w-md mx-auto">
        {/* Left group */}
        <div className="flex items-center gap-3">
          <Link
            href="/notifications"
            className="relative w-10 h-10 rounded-full bg-[#F3F4F6] flex items-center justify-center text-[#6B7280] hover:bg-[#E5E7EB] transition-colors"
            aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ""}`}
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 min-w-[14px] h-[14px] bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-[9px] font-bold leading-none px-0.5">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              </span>
            )}
          </Link>
        </div>

        {/* Center: app name */}
        <div className="flex items-center">
          {isHome ? (
            <span
              className="font-black italic text-[0.95rem] tracking-wide"
              style={{
                fontFamily: "'Playfair Display', serif",
                background: "linear-gradient(135deg, #E8E8E8 0%, #D4AF37 30%, #FFD700 50%, #F0C040 70%, #C0C0C0 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              MARGIN APEX
            </span>
          ) : (
            <span className="font-bold text-gray-900 text-base">
              {ROUTE_TITLES[pathname] ?? "MARGIN APEX"}
            </span>
          )}
        </div>

        {/* Right group */}
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 rounded-full bg-[#F3F4F6] flex items-center justify-center text-[#6B7280] hover:bg-[#E5E7EB] transition-colors">
            <Moon size={16} />
          </button>
          <Link
            href="/funds"
            className="flex items-center gap-1.5 bg-[#1A1A1A] px-3.5 py-1.5 rounded-full hover:bg-[#2D2D2D] transition-colors"
          >
            <Coins size={13} className="text-[#E0C879]" />
            <span className="text-white text-xs font-bold">Funds</span>
          </Link>
          <Link
            href="/profile"
            className="w-10 h-10 rounded-full bg-[#F3F4F6] flex items-center justify-center text-[#6B7280] hover:bg-[#E5E7EB] transition-colors"
            aria-label="Profile"
          >
            <UserCog size={16} />
          </Link>
        </div>
      </div>
    </header>
  );
}
