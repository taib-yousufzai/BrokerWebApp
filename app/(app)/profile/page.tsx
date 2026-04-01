"use client";
import React from "react";
import { mockUser } from "@/lib/mockData";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/store";
import {
  MessageCircle, Settings, HelpCircle, LogOut,
  ChevronRight, FileText, Shield, Users, History,
} from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  type MenuItem = {
    icon: React.ElementType;
    label: string;
    sub: string;
    action: () => void;
    badge?: string;
    accent?: "green";
  };

  const menuSections: { title: string; items: MenuItem[] }[] = [
    {
      title: "Trading",
      items: [
        {
          icon: Settings,
          label: "Margin Settings",
          sub: "Configure leverage & risk limits",
          action: () => {},
          badge: "Soon",
        },
        {
          icon: History,
          label: "Trade History",
          sub: "View closed positions & P&L",
          action: () => router.push("/activity"),
        },
      ],
    },
    {
      title: "Community",
      items: [
        {
          icon: Users,
          label: "Join Community",
          sub: "Telegram & WhatsApp groups",
          action: () => router.push("/community"),
          accent: "green" as const,
        },
        {
          icon: MessageCircle,
          label: "WhatsApp Support",
          sub: "Chat with our support team",
          action: () => window.open("https://wa.me/919876543210", "_blank"),
          accent: "green" as const,
        },
        {
          icon: HelpCircle,
          label: "Help & FAQs",
          sub: "Common questions answered",
          action: () => router.push("/support"),
        },
      ],
    },
    {
      title: "Legal",
      items: [
        {
          icon: FileText,
          label: "Risk Disclaimer",
          sub: "Read our risk disclosure",
          action: () => router.push("/disclaimer"),
        },
        {
          icon: Shield,
          label: "Privacy & Legal",
          sub: "Terms, privacy policy & compliance",
          action: () => router.push("/legal"),
        },
      ],
    },
  ];

  const accentColors = {
    green: { bg: "bg-green-50", text: "text-green-600" },
  };

  return (
    <div className="p-4 space-y-4">
      {/* User card */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center shrink-0">
            <span className="text-xl font-bold text-indigo-600">{mockUser.avatar}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-gray-900">{mockUser.name}</p>
            <p className="text-xs text-gray-400 truncate">{mockUser.email}</p>
            <p className="text-xs text-gray-400">{mockUser.phone}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-50">
          <span className="text-[11px] font-semibold bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-full">
            ID: {mockUser.clientId}
          </span>
          <span className="text-[11px] font-semibold bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full">
            {mockUser.plan}
          </span>
        </div>
      </div>

      {/* Menu sections */}
      {menuSections.map(({ title, items }) => (
        <div key={title}>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-1 mb-2">{title}</p>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {items.map(({ icon: Icon, label, sub, action, badge, accent }) => {
              const colors = accent ? accentColors[accent] : { bg: "bg-gray-100", text: "text-gray-500" };
              return (
                <button
                  key={label}
                  onClick={action}
                  className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${colors.bg}`}>
                    <Icon size={17} className={colors.text} />
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <p className="text-sm font-semibold text-gray-800">{label}</p>
                    <p className="text-xs text-gray-400">{sub}</p>
                  </div>
                  {badge ? (
                    <span className="text-[10px] font-semibold bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full">
                      {badge}
                    </span>
                  ) : (
                    <ChevronRight size={15} className="text-gray-300 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border border-red-200 text-red-500 hover:bg-red-50 active:bg-red-100 transition-colors text-sm font-semibold"
      >
        <LogOut size={16} />
        Logout
      </button>

      <p className="text-center text-[11px] text-gray-300 pb-2">
        TradeApp v1.0.0 · Phase 1
      </p>
    </div>
  );
}
