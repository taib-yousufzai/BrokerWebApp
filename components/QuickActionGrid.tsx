import Link from "next/link";
import { BarChart2, Bot, BookOpen, Lightbulb, TrendingUp, Star } from "lucide-react";

const actions = [
  { label: "Watchlist", icon: Star,      color: "bg-[#F3F4F6] text-[#C62828]", href: "/watchlist" },
  { label: "Positions", icon: TrendingUp, color: "bg-[#F3F4F6] text-[#C62828]", href: "/positions" },
  { label: "Orders",    icon: BarChart2,  color: "bg-[#F3F4F6] text-[#C62828]", href: "/orders"    },
  { label: "History",   icon: BookOpen,   color: "bg-[#F3F4F6] text-[#C62828]", href: "/activity"  },
];

export default function QuickActionGrid() {
  return (
    <div className="grid grid-cols-4 gap-2.5">
      {actions.map(({ label, icon: Icon, color, href }) => (
        <Link
          key={label}
          href={href}
          className="flex flex-col items-center gap-2 py-3 px-1 bg-white rounded-[20px] border border-[#E5E7EB] active:scale-95 transition-transform"
        >
          <div className={`w-10 h-10 rounded-[20px] flex items-center justify-center ${color}`}>
            <Icon size={18} />
          </div>
          <span className="text-[0.7rem] font-bold text-gray-900">{label}</span>
        </Link>
      ))}
    </div>
  );
}
