"use client";
import { useState } from "react";
import { mockTradeHistory } from "@/lib/mockData";
import { OrderSide } from "@/lib/types";
import { cn } from "@/lib/utils";

type HistoryTab = "position" | "order";

function fmt(n: number) {
  return `₹${Math.abs(n).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;
}

export default function ActivityPage() {
  const [tab, setTab] = useState<HistoryTab>("position");
  const [fromDate, setFromDate] = useState("2026-03-23");
  const [toDate, setToDate] = useState("2026-03-31");
  const [appliedFrom, setAppliedFrom] = useState("2026-03-23");
  const [appliedTo, setAppliedTo] = useState("2026-03-31");

  const filtered = mockTradeHistory.filter((t) => {
    if (appliedFrom && t.date < appliedFrom) return false;
    if (appliedTo && t.date > appliedTo) return false;
    return true;
  });

  const grossProfit = filtered.filter((t) => t.pnl > 0).reduce((s, t) => s + t.pnl, 0);
  const grossLoss = Math.abs(filtered.filter((t) => t.pnl < 0).reduce((s, t) => s + t.pnl, 0));
  const totalBrokerage = filtered.reduce((s, t) => s + t.brokerage, 0);
  const netPnL = grossProfit - grossLoss - totalBrokerage;

  return (
    <div className="flex flex-col min-h-full bg-white">
      {/* Header */}
      <div className="bg-white px-4 pt-3.5 pb-3 border-b border-[#E8ECF0] flex-shrink-0">
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <span className="font-bold text-[1.2rem] text-[#1A1E2B]">Trade History</span>
          <div className="flex gap-2">
            <button
              onClick={() => setTab("position")}
              className={cn(
                "px-3.5 py-1.5 rounded-full text-[0.7rem] font-semibold border transition-colors",
                tab === "position"
                  ? "bg-[#C62828] border-[#C62828] text-white"
                  : "bg-[#F8F9FC] border-[#E2E6EC] text-[#5B677E]"
              )}
            >
              Position History
            </button>
            <button
              onClick={() => setTab("order")}
              className={cn(
                "px-3.5 py-1.5 rounded-full text-[0.7rem] font-semibold border transition-colors",
                tab === "order"
                  ? "bg-[#C62828] border-[#C62828] text-white"
                  : "bg-[#F8F9FC] border-[#E2E6EC] text-[#5B677E]"
              )}
            >
              Order History
            </button>
          </div>
        </div>

        {/* Date filter row */}
        <div className="bg-white rounded-[20px] px-3 py-2.5 border border-[#EEF2F8] flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-1.5 bg-[#F8FAFF] px-3 py-1.5 rounded-full border border-[#E8ECF0]">
            <span className="text-[#9AA4BF] text-[0.7rem]">📅</span>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="border-none bg-transparent text-[0.7rem] font-medium text-gray-900 w-[100px] focus:outline-none"
            />
          </div>
          <span className="text-[#C62828] text-[0.7rem]">→</span>
          <div className="flex items-center gap-1.5 bg-[#F8FAFF] px-3 py-1.5 rounded-full border border-[#E8ECF0]">
            <span className="text-[#9AA4BF] text-[0.7rem]">📅</span>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="border-none bg-transparent text-[0.7rem] font-medium text-gray-900 w-[100px] focus:outline-none"
            />
          </div>
          <div className="flex gap-1.5">
            <button
              onClick={() => { setAppliedFrom(fromDate); setAppliedTo(toDate); }}
              className="px-3.5 py-1.5 rounded-full text-[0.65rem] font-semibold bg-[#2C8E5A] text-white active:scale-95 transition-transform"
            >
              Apply
            </button>
            <button
              onClick={() => { setFromDate(""); setToDate(""); setAppliedFrom(""); setAppliedTo(""); }}
              className="px-3.5 py-1.5 rounded-full text-[0.65rem] font-semibold bg-[#F0F2F5] text-[#5B677E] active:scale-95 transition-transform"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* History list */}
      <div className="flex-1 overflow-y-auto bg-[#F8FAFF] px-4 py-4 space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-[28px] border border-dashed border-[#DCE3EC]">
            <p className="text-[0.75rem] text-[#9CA3B9]">No history found</p>
          </div>
        ) : (
          filtered.map((trade) => {
            const isProfit = trade.pnl >= 0;
            const pnlPct = ((trade.pnl / (trade.entryPrice * trade.qty)) * 100).toFixed(2);
            const isBuy = trade.type === OrderSide.BUY;

            return (
              <div key={trade.id} className="bg-white rounded-[20px] px-3.5 py-3.5 border border-[#EEF2F8] shadow-sm">
                {/* Card header */}
                <div className="flex justify-between items-center mb-2.5 flex-wrap gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-[0.9rem] text-[#1A1E2B]">{trade.symbol}</span>
                    <span className={cn(
                      "text-[0.55rem] px-2.5 py-1 rounded-full font-semibold",
                      isBuy ? "bg-[#E9F6EF] text-[#2C8E5A]" : "bg-[#FEF0F0] text-[#C62828]"
                    )}>
                      {trade.type}
                    </span>
                    <span className="text-[0.55rem] text-[#9AA4BF]">{trade.orderType}</span>
                  </div>
                  {tab === "position" ? (
                    <span className={cn("font-bold text-[0.85rem]", isProfit ? "text-[#2C8E5A]" : "text-[#C62828]")}>
                      {isProfit ? "+" : ""}{fmt(trade.pnl)} ({isProfit ? "+" : ""}{pnlPct}%)
                    </span>
                  ) : (
                    <span className="font-bold text-[0.85rem] text-gray-800">
                      ₹{trade.entryPrice.toLocaleString("en-IN")}
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="flex justify-between text-[0.65rem] text-[#8C94A8] pt-2 border-t border-[#F0F2F8] flex-wrap gap-2">
                  <span className="flex items-center gap-1">Qty: {trade.qty}</span>
                  <span className="flex items-center gap-1">Entry: ₹{trade.entryPrice.toLocaleString("en-IN")}</span>
                  <span className="flex items-center gap-1">Exit: ₹{trade.exitPrice.toLocaleString("en-IN")}</span>
                  <span className="flex items-center gap-1">{trade.date}</span>
                </div>
                <div className="flex text-[0.65rem] text-[#8C94A8] mt-1.5 flex-wrap gap-2">
                  <span>Brokerage: ₹{trade.brokerage}</span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer summary */}
      <div className="bg-white border-t border-[#E8ECF0] px-4 py-3 flex-shrink-0">
        {[
          { label: "Gross Profit",  value: fmt(grossProfit),       green: true  },
          { label: "Gross Loss",    value: fmt(grossLoss),         red: true    },
          { label: "Brokerage",     value: `₹${totalBrokerage.toFixed(2)}` },
          { label: "Net P&L",       value: fmt(netPnL),            net: true, positive: netPnL >= 0 },
        ].map(({ label, value, green, red, net, positive }) => (
          <div key={label} className="flex justify-between items-center py-2 border-b border-[#F0F2F8] last:border-0">
            <span className="text-[0.75rem] font-medium text-[#6B728E]">{label}</span>
            <span className={cn(
              "font-bold text-[0.85rem]",
              green ? "text-[#2C8E5A]" : red ? "text-[#C62828]" : net ? (positive ? "text-[#2C8E5A]" : "text-[#C62828]") : "text-gray-800"
            )}>
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
