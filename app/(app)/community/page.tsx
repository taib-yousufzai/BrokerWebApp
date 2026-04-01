"use client";
import { MessageCircle, Send, Users, Zap, BookOpen, Bell } from "lucide-react";

const channels = [
  {
    icon: MessageCircle,
    color: "bg-green-500",
    label: "WhatsApp Community",
    sub: "Free daily tips & market alerts",
    badge: "Free",
    badgeColor: "bg-emerald-100 text-emerald-700",
    href: "https://wa.me/919876543210",
  },
  {
    icon: Send,
    color: "bg-sky-500",
    label: "Telegram Channel",
    sub: "Live signals & trade setups",
    badge: "Live",
    badgeColor: "bg-sky-100 text-sky-700",
    href: "https://t.me/tradeapp",
  },
  {
    icon: Users,
    color: "bg-indigo-500",
    label: "Telegram Group",
    sub: "Discuss trades with members",
    badge: "2.4k",
    badgeColor: "bg-indigo-100 text-indigo-700",
    href: "https://t.me/tradeappgroup",
  },
];

const features = [
  { icon: Zap,      label: "Daily Signals",    sub: "Pre-market & intraday calls" },
  { icon: BookOpen, label: "Weekly Analysis",  sub: "Market outlook every Monday"  },
  { icon: Bell,     label: "Expiry Alerts",    sub: "F&O expiry reminders"         },
  { icon: Users,    label: "Expert Q&A",       sub: "Ask our analysts directly"    },
];

export default function CommunityPage() {
  return (
    <div className="p-4 space-y-5">
      {/* Hero */}
      <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-5 text-white shadow-md">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <MessageCircle size={20} />
          </div>
          <div>
            <p className="font-bold text-base">Join Our Community</p>
            <p className="text-xs opacity-80">Free tips, signals & market updates</p>
          </div>
        </div>
        <div className="flex gap-4 text-center">
          {[["12k+", "Members"], ["Daily", "Signals"], ["Free", "Forever"]].map(([val, lbl]) => (
            <div key={lbl} className="flex-1 bg-white/15 rounded-xl py-2">
              <p className="text-sm font-bold">{val}</p>
              <p className="text-[10px] opacity-80">{lbl}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Channels */}
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2.5">Join a Channel</p>
        <div className="space-y-2.5">
          {channels.map(({ icon: Icon, color, label, sub, badge, badgeColor, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center shrink-0`}>
                <Icon size={18} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900">{label}</p>
                <p className="text-xs text-gray-400">{sub}</p>
              </div>
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0 ${badgeColor}`}>
                {badge}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* What you get */}
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2.5">What You Get</p>
        <div className="grid grid-cols-2 gap-2.5">
          {features.map(({ icon: Icon, label, sub }) => (
            <div key={label} className="bg-white rounded-2xl p-3.5 shadow-sm border border-gray-100">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center mb-2">
                <Icon size={15} className="text-indigo-600" />
              </div>
              <p className="text-xs font-semibold text-gray-800">{label}</p>
              <p className="text-[10px] text-gray-400 mt-0.5">{sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
