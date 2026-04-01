"use client";
import { useState } from "react";
import PositionItem from "@/components/PositionItem";
import { usePositions } from "@/lib/store";
import { cn } from "@/lib/utils";

type MainTab = "cumulative" | "detailed";
type SubTab = "open" | "closed";

export default function PositionsPage() {
  const { positions, exitPosition, partialExitPosition } = usePositions();
  const [mainTab, setMainTab] = useState<MainTab>("cumulative");
  const [subTab, setSubTab] = useState<SubTab>("open");

  const totalPnL = positions.reduce((sum, p) => sum + p.pnl, 0);
  const isProfit = totalPnL >= 0;

  function fmt(n: number) {
    const sign = n >= 0 ? "+" : "";
    return `${sign}₹${Math.abs(n).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;
  }

  return (
    <div className="flex flex-col min-h-full bg-white">
      {/* Page header */}
      <div className="px-5 pt-5 pb-3 border-b border-[#EEF2F8] flex justify-between items-center">
        <div>
          <h1 className="text-[20px] font-bold text-gray-900 flex items-center gap-2">
            Positions
          </h1>
          <p className="text-[11px] text-[#8B98A9] mt-1">Position Management · Real-time P&amp;L</p>
        </div>
        <button
          onClick={() => positions.forEach((p) => exitPosition(p.id))}
          disabled={positions.length === 0}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full text-white text-[12px] font-semibold transition-all",
            positions.length > 0
              ? "bg-[#B22234] active:scale-95 shadow-sm"
              : "bg-[#D1D5DB] cursor-not-allowed opacity-60"
          )}
        >
          Exit All
        </button>
      </div>

      {/* Main tabs */}
      <div className="mx-4 mt-3 flex bg-[#F8FAFE] rounded-full p-1">
        {(["cumulative", "detailed"] as MainTab[]).map((t) => (
          <button
            key={t}
            onClick={() => setMainTab(t)}
            className={cn(
              "flex-1 text-center py-2.5 text-[13px] font-semibold rounded-full transition-all",
              mainTab === t
                ? "bg-white text-[#B22234] shadow-sm"
                : "text-[#6B7280]"
            )}
          >
            {t === "cumulative" ? "Cumulative P&L" : "Detailed P&L"}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* P&L Summary Card */}
        <div className="bg-gradient-to-br from-[#F8FAFE] to-white rounded-[20px] px-4 py-3 border border-[#EDF2F7]">
          <div className="text-center mb-2 pb-1.5 border-b border-[#EEF2F8]">
            <span className="text-[11px] font-semibold text-[#374151] uppercase tracking-wide">
              Today&apos;s P&amp;L
            </span>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-left flex-1">
              <p className="text-[9px] font-medium text-[#8B98A9] uppercase tracking-wide mb-0.5">Realized</p>
              <p className="text-[14px] font-bold text-[#059669]">+₹0.00</p>
            </div>
            <div className="text-center flex-[1.2]">
              <p className={cn("text-[22px] font-extrabold", isProfit ? "text-[#059669]" : "text-[#B22234]")}>
                {fmt(totalPnL)}
              </p>
            </div>
            <div className="text-right flex-1">
              <p className="text-[9px] font-medium text-[#8B98A9] uppercase tracking-wide mb-0.5">Unrealized</p>
              <p className={cn("text-[14px] font-bold", isProfit ? "text-[#059669]" : "text-[#B22234]")}>
                {fmt(totalPnL)}
              </p>
            </div>
          </div>
        </div>

        {mainTab === "cumulative" && (
          <>
            {/* Sub tabs */}
            <div className="flex bg-[#F8FAFE] rounded-full p-0.5">
              {(["open", "closed"] as SubTab[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setSubTab(t)}
                  className={cn(
                    "flex-1 text-center py-2 text-[12px] font-medium rounded-full transition-all",
                    subTab === t
                      ? "bg-white text-[#B22234] shadow-sm font-semibold"
                      : "text-[#6B7280]"
                  )}
                >
                  {t === "open" ? "Open Positions" : "Closed Positions"}
                </button>
              ))}
            </div>

            {subTab === "open" && (
              <>
                {positions.length === 0 ? (
                  <div className="text-center py-10 bg-[#FAFCFE] rounded-[20px] mt-2">
                    <p className="text-[13px] text-[#9CA3AF]">No open positions</p>
                  </div>
                ) : (
                  positions.map((p) => (
                    <PositionItem
                      key={p.id}
                      position={p}
                      onExit={() => exitPosition(p.id)}
                      onPartialExit={(qty) => partialExitPosition(p.id, qty)}
                    />
                  ))
                )}
              </>
            )}

            {subTab === "closed" && (
              <div className="text-center py-10 bg-[#FAFCFE] rounded-[20px]">
                <p className="text-[13px] text-[#9CA3AF]">No closed positions</p>
              </div>
            )}
          </>
        )}

        {mainTab === "detailed" && (
          <>
            {positions.length === 0 ? (
              <div className="text-center py-10 bg-[#FAFCFE] rounded-[20px]">
                <p className="text-[13px] text-[#9CA3AF]">No positions today</p>
              </div>
            ) : (
              <>
                <p className="text-[12px] font-semibold text-[#374151] pb-1.5 border-b border-[#EEF2F8]">
                  Today&apos;s Positions
                </p>
                {positions.map((p) => {
                  const isP = p.pnl >= 0;
                  const pnlPct = ((p.ltp - p.avgPrice) / p.avgPrice * 100).toFixed(2);
                  return (
                    <div key={p.id} className="bg-white rounded-[12px] px-3 py-2.5 border border-[#EDF2F7] flex justify-between items-center">
                      <div className="flex-1">
                        <p className="font-bold text-[13px] text-gray-900 mb-1">
                          {p.symbol}{" "}
                          <span className="text-[10px] text-[#8B98A9] font-normal">{p.type}</span>
                        </p>
                        <div className="flex gap-3 text-[10px] text-[#6B7280] flex-wrap">
                          <span>Qty: <span className="font-semibold">{p.qty}</span></span>
                          <span>Entry: <span className="font-semibold">₹{p.avgPrice.toLocaleString("en-IN")}</span></span>
                          <span>LTP: <span className="font-semibold">₹{p.ltp.toLocaleString("en-IN")}</span></span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={cn("text-[14px] font-bold", isP ? "text-[#059669]" : "text-[#B22234]")}>
                          {isP ? "+" : ""}₹{Math.abs(p.pnl).toFixed(2)}
                        </p>
                        <p className="text-[10px] text-[#8B98A9]">{isP ? "+" : ""}{pnlPct}%</p>
                        <span className="text-[8px] font-semibold px-1.5 py-0.5 rounded-full bg-[#FEF2F2] text-[#B91C1C] mt-1 inline-block">
                          Active
                        </span>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
