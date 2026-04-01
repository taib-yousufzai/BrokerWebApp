"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle } from "lucide-react";
import { useAuth } from "@/lib/store";

const points = [
  "Trading in financial markets involves substantial risk of loss.",
  "Past performance is not indicative of future results.",
  "You may lose more than your initial investment.",
  "This platform is for informational purposes only and does not constitute financial advice.",
  "Always trade with money you can afford to lose.",
  "Consult a qualified financial advisor before making investment decisions.",
];

export default function DisclaimerPage() {
  const router = useRouter();
  const { acceptDisclaimer } = useAuth();
  const [agreed, setAgreed] = useState(false);

  const handleContinue = () => {
    acceptDisclaimer();
    router.push("/home");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-md mx-auto px-6 py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
          <AlertTriangle size={20} className="text-amber-600" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-gray-900">Risk Disclaimer</h1>
          <p className="text-xs text-gray-400">Please read carefully before proceeding</p>
        </div>
      </div>

      <div className="flex-1 space-y-2.5 mb-6">
        {points.map((point, i) => (
          <div key={i} className="flex gap-3 bg-gray-50 rounded-xl p-3.5">
            <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
              {i + 1}
            </span>
            <p className="text-sm text-gray-600 leading-relaxed">{point}</p>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 w-4 h-4 accent-indigo-600 shrink-0"
          />
          <span className="text-sm text-gray-600">
            I have read and understood the risk disclaimer. I agree to proceed at my own risk.
          </span>
        </label>

        <button
          onClick={handleContinue}
          disabled={!agreed}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-bold py-3.5 rounded-2xl transition-colors text-sm"
        >
          I Agree, Continue
        </button>
      </div>
    </div>
  );
}
