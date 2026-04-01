"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Zap, TrendingUp } from "lucide-react";
import { useAuth } from "@/lib/store";

const DEMO_PHONE = "demo@marginapex.in";
const DEMO_PASSWORD = "demo1234";

export default function LoginPage() {
  const router = useRouter();
  const { login, disclaimerAccepted } = useAuth();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const doLogin = () => {
    login();
    router.push(disclaimerAccepted ? "/home" : "/disclaimer");
  };

  const handleLogin = () => {
    if (!phone || !password) { setError("Please enter your credentials."); return; }
    setError(""); setLoading(true); setTimeout(doLogin, 700);
  };

  const handleDemoLogin = () => {
    setPhone(DEMO_PHONE); setPassword(DEMO_PASSWORD);
    setError(""); setLoading(true); setTimeout(doLogin, 700);
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-[32px] shadow-2xl overflow-hidden">
        <div className="bg-[#1A1A1A] px-6 py-8 text-center">
          <div className="w-14 h-14 rounded-[20px] bg-white/10 flex items-center justify-center mx-auto mb-3">
            <TrendingUp size={26} className="text-[#E0C879]" />
          </div>
          <h1 className="text-[1.4rem] font-black italic mb-1" style={{ fontFamily: "serif", background: "linear-gradient(135deg,#E8E8E8,#D4AF37,#FFD700,#C0C0C0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            MARGIN APEX
          </h1>
          <p className="text-[0.75rem] text-white/60">Smart trading, simplified</p>
        </div>
        <div className="px-6 py-6 space-y-4">
          <div>
            <label className="text-[0.7rem] font-semibold text-[#6B7280] mb-1.5 block uppercase tracking-wide">Phone / Client ID</label>
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter your phone number" className="w-full border border-[#E8ECF0] rounded-full px-4 py-3 text-[0.9rem] bg-[#F8F9FC] focus:outline-none focus:border-[#C62828] focus:bg-white transition-colors" />
          </div>
          <div>
            <label className="text-[0.7rem] font-semibold text-[#6B7280] mb-1.5 block uppercase tracking-wide">Password</label>
            <div className="relative">
              <input type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleLogin()} placeholder="Enter your password" className="w-full border border-[#E8ECF0] rounded-full px-4 py-3 text-[0.9rem] bg-[#F8F9FC] focus:outline-none focus:border-[#C62828] focus:bg-white transition-colors pr-12" />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9AA4BF]">
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          {error && <p className="text-[0.75rem] text-[#C62828] font-medium">{error}</p>}
          <button onClick={handleLogin} disabled={loading} className="w-full bg-[#C62828] hover:bg-[#A82222] disabled:opacity-60 text-white font-bold py-3 rounded-full transition-colors text-[0.9rem]">
            {loading ? "Logging in..." : "Login"}
          </button>
          <p className="text-center text-[0.75rem] text-[#9AA4BF]">Forgot password? <span className="text-[#C62828] font-semibold cursor-pointer">Reset here</span></p>
          <div className="flex items-center gap-3 py-1"><div className="flex-1 h-px bg-[#E8ECF0]" /><span className="text-[0.7rem] text-[#9AA4BF] font-medium">or</span><div className="flex-1 h-px bg-[#E8ECF0]" /></div>
          <div className="bg-[#F8F9FC] border border-[#E2E6EC] rounded-[20px] p-4">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-8 h-8 rounded-[14px] bg-[#1A1A1A] flex items-center justify-center shrink-0"><Zap size={14} className="text-[#E0C879]" /></div>
              <div><p className="text-[0.85rem] font-bold text-gray-900">Try Demo Account</p><p className="text-[0.7rem] text-[#8C94A8] mt-0.5">Explore with pre-loaded mock data.</p></div>
            </div>
            <div className="bg-white rounded-[14px] px-3 py-2.5 mb-3 space-y-1 border border-[#E8ECF0]">
              <div className="flex justify-between text-[0.7rem]"><span className="text-[#9AA4BF] font-medium">ID</span><span className="text-gray-700 font-semibold">{DEMO_PHONE}</span></div>
              <div className="flex justify-between text-[0.7rem]"><span className="text-[#9AA4BF] font-medium">Password</span><span className="text-gray-700 font-semibold">{DEMO_PASSWORD}</span></div>
            </div>
            <button onClick={handleDemoLogin} disabled={loading} className="w-full bg-[#1A1A1A] hover:bg-[#2D2D2D] disabled:opacity-60 text-white font-bold py-2.5 rounded-full transition-colors text-[0.85rem] flex items-center justify-center gap-2">
              <Zap size={13} className="text-[#E0C879]" />{loading ? "Entering..." : "Enter Demo"}
            </button>
          </div>
        </div>
        <p className="text-center text-[0.65rem] text-[#C0C0C0] pb-5 px-6">Trading involves risk. Please read the disclaimer before proceeding.</p>
      </div>
    </div>
  );
}
