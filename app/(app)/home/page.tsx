"use client";
import Link from "next/link";
import { MessageCircle, ChevronRight, Calendar, RefreshCw, TrendingUp, Brain, BarChart2, Video, Users, BookOpen, ArrowRight, Settings } from "lucide-react";
import NotificationBanner from "@/components/NotificationBanner";
import { useFunds, useNotifications } from "@/lib/store";

const marketRow1 = [
  { name: "NIFTY 50",   price: "24,198.85", change: "+0.62%", positive: true },
  { name: "SENSEX",     price: "79,842.35", change: "+0.48%", positive: true },
  { name: "BANK NIFTY", price: "51,234.65", change: "+0.35%", positive: true },
  { name: "USD/INR",    price: "83.42",     change: "-0.18%", positive: false },
  { name: "EUR/USD",    price: "1.0875",    change: "+0.12%", positive: true  },
  { name: "GBP/USD",    price: "1.2640",    change: "-0.08%", positive: false },
];

const marketRow2 = [
  { name: "USD/JPY",   price: "151.42",    change: "-0.25%", positive: false },
  { name: "BTC/USD",   price: "71,892.40", change: "+2.85%", positive: true  },
  { name: "ETH/USD",   price: "3,820.15",  change: "+1.92%", positive: true  },
  { name: "XAU/USD",   price: "2,478.30",  change: "+0.95%", positive: true  },
  { name: "XAG/USD",   price: "28.90",     change: "+1.12%", positive: true  },
  { name: "CRUDEOIL",  price: "82.40",     change: "-0.45%", positive: false },
];

const equityInstruments = [
  { name: "NIFTY",     sub: "50 Stocks"  },
  { name: "SENSEX",    sub: "30 Stocks"  },
  { name: "BANKNIFTY", sub: "Banking"    },
  { name: "BANKEX",    sub: "Bank Index" },
  { name: "FINNIFTY",  sub: "Financial"  },
  { name: "MIDCAP",    sub: "Mid Cap"    },
];

const learningItems = [
  { name: "Try Algo",  badge: "Free",   Icon: TrendingUp, dark: true  },
  { name: "AI Trading",badge: "Beta",   Icon: Brain,      dark: true  },
  { name: "Indicator", badge: "Pro",    Icon: BarChart2,  dark: false },
  { name: "Course",    badge: "Enroll", Icon: Video,      dark: false },
  { name: "Classes",   badge: "Live",   Icon: Users,      dark: false },
  { name: "Books",     badge: "Free",   Icon: BookOpen,   dark: false },
];

export default function HomePage() {
  const { notifications } = useNotifications();
  const unreadBanners = notifications.filter((n) => !n.read);

  return (
    <div className="pb-4">
      {/* Unread notification banners */}
      {unreadBanners.length > 0 && (
        <div className="px-[18px] pt-3 space-y-2">
          {unreadBanners.map((n) => (
            <NotificationBanner key={n.id} message={n.message} type={n.type} />
          ))}
        </div>
      )}

      <div className="px-[18px] pt-3 space-y-5">
        {/* WhatsApp Community */}
        <Link
          href="/community"
          className="flex items-center gap-3.5 rounded-[32px] px-5 py-3.5 text-white active:scale-[0.98] transition-transform"
          style={{
            background: "linear-gradient(135deg, #25D366, #128C7E)",
            boxShadow: "0 8px 20px rgba(37,211,102,0.3)",
          }}
        >
          <div className="w-[52px] h-[52px] rounded-[28px] bg-white/20 flex items-center justify-center shrink-0">
            <MessageCircle size={26} />
          </div>
          <div className="flex-1">
            <p className="text-[0.95rem] font-extrabold leading-snug">FREE WHATSAPP COMMUNITY</p>
            <p className="text-[0.7rem] text-white/80 mt-0.5">You&apos;ll get FREE tips here — join now!</p>
          </div>
          <div className="w-[34px] h-[34px] rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <ChevronRight size={16} />
          </div>
        </Link>

        {/* Margin Settings Row */}
        <Link
          href="/funds"
          className="flex items-center justify-between bg-[#F8F9FB] rounded-[28px] px-[18px] py-3 border border-[#E2E6EA] active:scale-[0.99] transition-transform"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-[28px] bg-[#1A1A1A] flex items-center justify-center shrink-0">
              <TrendingUp size={18} className="text-[#E0C879]" />
            </div>
            <div>
              <p className="text-[0.85rem] font-extrabold text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                Margin Settings
              </p>
              <p className="text-[0.65rem] text-gray-500">Check requirements &amp; limits</p>
            </div>
          </div>
          <div className="w-[30px] h-[30px] rounded-full bg-[#F3F4F6] flex items-center justify-center">
            <ArrowRight size={14} className="text-gray-500" />
          </div>
        </Link>

        {/* Option Chain */}
        <div>
          <div className="flex justify-between items-baseline mb-3">
            <p className="text-[0.75rem] font-bold uppercase tracking-widest text-[#9CA3AF]">Option Chain</p>
            <span className="text-[0.6rem] text-[#9CA3AF]">Swipe →</span>
          </div>
          <div className="flex gap-3 mb-4">
            <button className="px-5 py-2 rounded-full text-[0.75rem] font-bold bg-[#1A1A1A] text-white border border-[#1A1A1A]">
              EQUITY
            </button>
            <button className="px-5 py-2 rounded-full text-[0.75rem] font-bold bg-[#F3F4F6] text-gray-800 border border-[#E2E6EA]">
              COMMODITY
            </button>
          </div>
          <div className="overflow-x-auto scrollbar-hide -mx-1 px-1">
            <div className="flex gap-4 pb-2">
              {equityInstruments.map((inst) => (
                <button key={inst.name} className="flex flex-col items-center gap-1.5 shrink-0 w-[70px] active:scale-95 transition-transform">
                  <div className="w-[60px] h-[60px] rounded-full border-2 border-[#C62828] flex items-center justify-center">
                    <TrendingUp size={22} className="text-[#C62828]" />
                  </div>
                  <span className="text-[0.65rem] font-bold text-gray-900 text-center">{inst.name}</span>
                  <span className="text-[0.55rem] text-gray-500 text-center">{inst.sub}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Expiry Today */}
        <button
          className="w-full flex items-center justify-between rounded-[28px] px-[18px] py-3 text-white active:scale-[0.98] transition-transform"
          style={{
            background: "linear-gradient(135deg, #C62828, #B71C1C)",
            boxShadow: "0 4px 12px rgba(198,40,40,0.25)",
          }}
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-[28px] bg-white/20 flex items-center justify-center shrink-0">
              <Calendar size={18} />
            </div>
            <div className="text-left">
              <p className="text-[0.85rem] font-extrabold" style={{ fontFamily: "'Playfair Display', serif" }}>
                EXPIRY TODAY
              </p>
              <p className="text-[0.65rem] text-white/80">Weekly &amp; Monthly contracts</p>
            </div>
          </div>
          <div className="w-[30px] h-[30px] rounded-full bg-white/20 flex items-center justify-center">
            <ArrowRight size={14} />
          </div>
        </button>

        {/* Market Overview */}
        <div className="bg-white rounded-[28px] p-[18px] border border-[#E8ECF0]">
          <div className="flex justify-between items-center mb-4">
            <p className="text-[0.85rem] font-semibold text-gray-900 flex items-center gap-1.5">
              <TrendingUp size={15} className="text-[#C62828]" /> Live Market Overview
            </p>
            <span className="text-[0.7rem] text-gray-400 flex items-center gap-1">
              <RefreshCw size={11} /> Live
            </span>
          </div>
          <div className="space-y-3">
            {[marketRow1, marketRow2].map((row, ri) => (
              <div key={ri} className="overflow-x-auto scrollbar-hide -mx-1 px-1">
                <div className="flex gap-3 pb-1">
                  {row.map((m) => (
                    <div
                      key={m.name}
                      className="shrink-0 flex flex-col bg-[#F8F9FB] rounded-[20px] px-3.5 py-2.5 min-w-[120px] border border-[#E2E6EA] cursor-pointer active:scale-95 transition-transform"
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="w-6 h-6 rounded-lg bg-[#F3F4F6] flex items-center justify-center">
                          <TrendingUp size={12} className="text-[#C62828]" />
                        </div>
                        <span className="text-[0.7rem] font-bold text-gray-900">{m.name}</span>
                      </div>
                      <span className="text-[0.9rem] font-extrabold text-gray-900 mb-1">{m.price}</span>
                      <span className={`text-[0.6rem] font-semibold px-1.5 py-0.5 rounded-full self-start ${
                        m.positive ? "bg-[#E6F4EA] text-[#2E7D32]" : "bg-[#FEE2E2] text-[#DC2626]"
                      }`}>
                        {m.change}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI & Learning */}
        <div>
          <p className="text-[0.75rem] font-bold uppercase tracking-widest text-[#9CA3AF] mb-2.5">
            AI &amp; Learning
          </p>
          <div className="grid grid-cols-3 gap-2.5">
            {learningItems.map(({ name, badge, Icon, dark }) => (
              <button
                key={name}
                className="flex flex-col items-center bg-white rounded-[20px] py-2.5 px-1.5 border border-[#E5E7EB] active:scale-95 transition-transform"
              >
                <div
                  className="w-9 h-9 rounded-[20px] flex items-center justify-center mb-1.5"
                  style={dark ? { background: "linear-gradient(135deg, #1A1A1A, #2D2D2D)" } : { background: "#F3F4F6" }}
                >
                  <Icon size={16} className={dark ? "text-white" : "text-[#C62828]"} />
                </div>
                <span className="text-[0.7rem] font-bold text-gray-900 mb-1">{name}</span>
                <span className="text-[0.55rem] font-semibold px-1.5 py-0.5 rounded-full bg-[#1A1A1A] text-white">
                  {badge}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
