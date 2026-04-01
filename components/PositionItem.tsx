"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import ExitConfirmModal from "@/components/ExitConfirmModal";
import { OrderSide, type Position } from "@/lib/types";

interface PositionItemProps {
  position: Position;
  onExit: () => void;
  onPartialExit: (qty: number) => void;
}

export default function PositionItem({ position, onExit, onPartialExit }: PositionItemProps) {
  const [showModal, setShowModal] = useState(false);
  const isProfit = position.pnl >= 0;
  const pnlPct = ((position.ltp - position.avgPrice) / position.avgPrice) * 100;
  const isLong = position.type === OrderSide.BUY;

  return (
    <>
      <div className="bg-white rounded-[14px] px-3.5 py-3 border border-[#E8EDF2] flex justify-between items-center shadow-sm">
        {/* Left */}
        <div className="flex-1">
          <p className="font-extrabold text-[15px] text-[#111827] mb-1.5">{position.symbol}</p>
          <div className="flex gap-4 text-[11px] text-[#6B7280]">
            <span>Avg Price: <span className="font-bold text-[#1F2937]">₹{position.avgPrice.toLocaleString("en-IN")}</span></span>
            <span>Qty: <span className="font-bold text-[#1F2937]">{position.qty}</span></span>
          </div>
        </div>

        {/* Right */}
        <div className="text-right shrink-0 ml-3">
          <span className={cn(
            "text-[10px] font-bold px-2.5 py-1 rounded-full inline-block mb-2",
            isLong ? "bg-[#FEF2F2] text-[#B91C1C]" : "bg-[#F3F4F6] text-[#374151]"
          )}>
            {isLong ? "LONG" : "SHORT"} · {position.product}
          </span>
          <p className={cn("text-[14px] font-bold mb-1", isProfit ? "text-[#059669]" : "text-[#B22234]")}>
            P&amp;L: {isProfit ? "+" : ""}₹{Math.abs(position.pnl).toFixed(2)}{" "}
            <span className="text-[11px]">({pnlPct >= 0 ? "+" : ""}{pnlPct.toFixed(2)}%)</span>
          </p>
          <p className="text-[11px] text-[#6B7280] mb-2">
            LTP: <span className="font-bold text-[#1F2937]">₹{position.ltp.toLocaleString("en-IN")}</span>
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="text-[11px] font-semibold px-4 py-1.5 rounded-full bg-[#B22234] text-white active:scale-95 transition-transform"
          >
            Exit
          </button>
        </div>
      </div>

      {showModal && (
        <ExitConfirmModal
          position={position}
          onConfirmExit={onExit}
          onConfirmPartial={onPartialExit}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
