"use client";
import { useFunds } from "@/lib/store";
import { ArrowDownToLine, ArrowUpFromLine, TrendingUp, TrendingDown, Shield, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FundsPage() {
  const f = useFunds();
  const pnlPositive = f.floatingPnL >= 0;
  const utilisationPct = (f.usedMargin / f.totalBalance) * 100;

  const cards = [
    {
      label: "Total Balance",
      value: f.totalBalance,
      description: "Your total account value including all positions",
      icon: Shield,
      iconColor: "bg-indigo-50 text-indigo-600",
    },
    {
      label: "Free Margin",
      value: f.freeMargin,
      description: "Available capital you can use to open new trades",
      icon: Activity,
      iconColor: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Used Margin",
      value: f.usedMargin,
      description: "Capital currently locked in open positions",
      icon: TrendingUp,
      iconColor: "bg-amber-50 text-amber-600",
    },
  ];

  return (
    <div className="p-4 space-y-3">
      {/* Hero card */}
      <div className="bg-indigo-600 rounded-2xl p-5 text-white shadow-md">
        <p className="text-xs font-medium opacity-70 mb-1">Total Balance</p>
        <p className="text-3xl font-bold tracking-tight">
          &#8377;{f.totalBalance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
        </p>
        <p className="text-xs opacity-60 mt-0.5">Your complete account value</p>
        <div className="flex gap-3 mt-4">
          <button className="flex-1 flex items-center justify-center gap-1.5 bg-white/20 hover:bg-white/30 active:bg-white/40 transition-colors rounded-xl py-2.5 text-xs font-semibold">
            <ArrowDownToLine size={14} /> Add Funds
          </button>
          <button className="flex-1 flex items-center justify-center gap-1.5 bg-white/20 hover:bg-white/30 active:bg-white/40 transition-colors rounded-xl py-2.5 text-xs font-semibold">
            <ArrowUpFromLine size={14} /> Withdraw
          </button>
        </div>
      </div>

      {/* Margin cards */}
      {cards.slice(1).map(({ label, value, description, icon: Icon, iconColor }) => (
        <div key={label} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-4">
          <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", iconColor)}>
            <Icon size={18} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500 font-medium">{label}</p>
            <p className="text-lg font-bold text-gray-900 leading-tight">
              &#8377;{value.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </p>
            <p className="text-[11px] text-gray-400 mt-0.5 leading-snug">{description}</p>
          </div>
        </div>
      ))}

      {/* Floating PnL */}
      <div className={cn(
        "rounded-2xl p-4 shadow-sm border flex items-center gap-4",
        pnlPositive ? "bg-emerald-50 border-emerald-100" : "bg-red-50 border-red-100"
      )}>
        <div className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
          pnlPositive ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-500"
        )}>
          {pnlPositive ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
        </div>
        <div className="flex-1">
          <p className="text-xs text-gray-500 font-medium">Floating P&L</p>
          <p className={cn("text-lg font-bold leading-tight", pnlPositive ? "text-emerald-600" : "text-red-500")}>
            {pnlPositive ? "+" : ""}&#8377;{f.floatingPnL.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </p>
          <p className="text-[11px] text-gray-400 mt-0.5">Unrealised profit or loss on open positions</p>
        </div>
      </div>

      {/* Utilisation bar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-2">
          <div>
            <p className="text-xs font-semibold text-gray-700">Margin Utilisation</p>
            <p className="text-[11px] text-gray-400">How much of your balance is in use</p>
          </div>
          <span className={cn(
            "text-sm font-bold",
            utilisationPct > 70 ? "text-red-500" : utilisationPct > 40 ? "text-amber-600" : "text-emerald-600"
          )}>
            {utilisationPct.toFixed(1)}%
          </span>
        </div>
        <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-500",
              utilisationPct > 70 ? "bg-red-400" : utilisationPct > 40 ? "bg-amber-400" : "bg-emerald-500"
            )}
            style={{ width: `${utilisationPct}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-gray-400 mt-1.5">
          <span>&#8377;0</span>
          <span>&#8377;{f.totalBalance.toLocaleString("en-IN")}</span>
        </div>
      </div>
    </div>
  );
}
