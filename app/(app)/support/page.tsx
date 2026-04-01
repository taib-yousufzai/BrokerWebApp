"use client";
import { MessageCircle, Mail, Phone, ChevronRight, HelpCircle } from "lucide-react";

const faqs = [
  { q: "How do I place an order?", a: "Go to Watchlist, tap any instrument, then choose Buy or Sell in the order panel." },
  { q: "What is MIS and CNC?", a: "MIS (Margin Intraday Square-off) is for intraday trades. CNC (Cash and Carry) is for delivery-based equity trades." },
  { q: "How is margin calculated?", a: "Margin is calculated based on the instrument type and your selected product. Intraday requires ~20% of trade value." },
  { q: "Can I modify an open order?", a: "Currently you can cancel open orders. Order modification will be available in the next update." },
  { q: "How do I withdraw funds?", a: "Go to Funds page and tap Withdraw. Withdrawals are processed within 1 business day." },
  { q: "What are the brokerage charges?", a: "Flat ₹20 per executed order for F&O. Equity delivery is free. Intraday equity is ₹20 or 0.03%, whichever is lower." },
];

const contactOptions = [
  {
    icon: MessageCircle,
    label: "WhatsApp Support",
    sub: "Typically replies in minutes",
    color: "bg-green-50 text-green-600",
    action: () => window.open("https://wa.me/919876543210", "_blank"),
  },
  {
    icon: Mail,
    label: "Email Support",
    sub: "support@tradeapp.in",
    color: "bg-indigo-50 text-indigo-600",
    action: () => window.open("mailto:support@tradeapp.in"),
  },
  {
    icon: Phone,
    label: "Call Support",
    sub: "Mon–Fri, 9 AM – 6 PM",
    color: "bg-sky-50 text-sky-600",
    action: () => window.open("tel:+919876543210"),
  },
];

export default function SupportPage() {
  return (
    <div className="p-4 space-y-5">
      {/* Contact options */}
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2.5">Contact Us</p>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {contactOptions.map(({ icon: Icon, label, sub, color, action }) => (
            <button
              key={label}
              onClick={action}
              className="w-full flex items-center gap-3 px-4 py-4 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
                <Icon size={17} />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-semibold text-gray-800">{label}</p>
                <p className="text-xs text-gray-400">{sub}</p>
              </div>
              <ChevronRight size={15} className="text-gray-300" />
            </button>
          ))}
        </div>
      </div>

      {/* FAQs */}
      <div>
        <div className="flex items-center gap-2 mb-2.5">
          <HelpCircle size={14} className="text-gray-400" />
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">FAQs</p>
        </div>
        <div className="space-y-2">
          {faqs.map(({ q, a }) => (
            <details key={q} className="bg-white rounded-2xl shadow-sm border border-gray-100 group">
              <summary className="flex items-center justify-between px-4 py-3.5 cursor-pointer list-none">
                <span className="text-sm font-semibold text-gray-800 pr-4">{q}</span>
                <ChevronRight size={15} className="text-gray-300 shrink-0 group-open:rotate-90 transition-transform" />
              </summary>
              <div className="px-4 pb-3.5">
                <p className="text-xs text-gray-500 leading-relaxed">{a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
