"use client";
import { useRouter } from "next/navigation";
import { FileText, Shield, ChevronRight, Scale, AlertTriangle } from "lucide-react";

const sections = [
  {
    icon: AlertTriangle,
    color: "bg-amber-50 text-amber-600",
    label: "Risk Disclaimer",
    sub: "Important risk disclosure for traders",
    href: "/disclaimer",
  },
  {
    icon: Shield,
    color: "bg-indigo-50 text-indigo-600",
    label: "Privacy Policy",
    sub: "How we collect and use your data",
    content: `We collect only the information necessary to provide our services. Your personal data is never sold to third parties. All data is encrypted in transit and at rest. You may request deletion of your account data at any time by contacting support.`,
  },
  {
    icon: FileText,
    color: "bg-sky-50 text-sky-600",
    label: "Terms of Service",
    sub: "Rules governing use of TradeApp",
    content: `By using TradeApp you agree to trade responsibly and acknowledge that all trading involves risk. The platform is provided as-is for informational and execution purposes. We are not responsible for trading losses. Misuse of the platform may result in account suspension.`,
  },
  {
    icon: Scale,
    color: "bg-purple-50 text-purple-600",
    label: "Regulatory Information",
    sub: "Compliance & licensing details",
    content: `TradeApp operates as a technology platform connecting traders to markets. All trades are executed through registered brokers. We comply with applicable financial regulations. This platform does not provide investment advice. Past performance is not indicative of future results.`,
  },
];

export default function LegalPage() {
  const router = useRouter();

  return (
    <div className="p-4 space-y-3">
      <p className="text-xs text-gray-400 leading-relaxed">
        Please read all legal documents carefully. By using TradeApp you agree to our terms and acknowledge the risks involved in trading.
      </p>

      <div className="space-y-2.5">
        {sections.map(({ icon: Icon, color, label, sub, href, content }) => (
          <details key={label} className="bg-white rounded-2xl shadow-sm border border-gray-100 group">
            <summary
              className="flex items-center gap-3 px-4 py-4 cursor-pointer list-none"
              onClick={href ? (e) => { e.preventDefault(); router.push(href); } : undefined}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
                <Icon size={17} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800">{label}</p>
                <p className="text-xs text-gray-400">{sub}</p>
              </div>
              <ChevronRight size={15} className="text-gray-300 shrink-0 group-open:rotate-90 transition-transform" />
            </summary>
            {content && (
              <div className="px-4 pb-4">
                <div className="bg-gray-50 rounded-xl p-3.5">
                  <p className="text-xs text-gray-500 leading-relaxed">{content}</p>
                </div>
              </div>
            )}
          </details>
        ))}
      </div>

      <p className="text-center text-[10px] text-gray-300 pt-2">
        TradeApp v1.0.0 · Last updated March 2026
      </p>
    </div>
  );
}
