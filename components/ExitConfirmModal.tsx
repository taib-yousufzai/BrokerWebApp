"use client";
import { useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { type Position } from "@/lib/types";

interface ExitConfirmModalProps {
  position: Pick<Position, "id" | "symbol" | "qty" | "ltp" | "pnl" | "type">;
  onConfirmExit: () => void;
  onConfirmPartial: (qty: number) => void;
  onClose: () => void;
}

export default function ExitConfirmModal({
  position,
  onConfirmExit,
  onConfirmPartial,
  onClose,
}: ExitConfirmModalProps) {
  const [mode, setMode] = useState<"full" | "partial">("full");
  const [partialQty, setPartialQty] = useState("1");
  const isProfit = position.pnl >= 0;

  const handleConfirm = () => {
    if (mode === "full") {
      onConfirmExit();
    } else {
      const qty = Math.min(Math.max(1, Number(partialQty)), position.qty - 1);
      onConfirmPartial(qty);
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white rounded-t-[32px] px-5 pb-8 pt-3 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="w-10 h-1 bg-[#E0E4EA] rounded-full mx-auto mb-4" />

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-[1rem] font-bold text-gray-900">Exit Position</h2>
            <p className="text-[0.75rem] text-[#8C94A8]">{position.symbol}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#F3F5F9] flex items-center justify-center text-[#5B677E]"
          >
            <X size={15} />
          </button>
        </div>

        {/* Position summary */}
        <div className="bg-[#F8FAFF] rounded-[18px] px-4 py-3 mb-4 flex items-center justify-between border border-[#EEF2F8]">
          <div>
            <p className="text-[0.7rem] text-[#8C94A8]">Qty · LTP</p>
            <p className="text-[0.9rem] font-semibold text-gray-800">
              {position.qty} · ₹{position.ltp.toLocaleString("en-IN")}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[0.7rem] text-[#8C94A8]">Unrealised P&amp;L</p>
            <p className={cn("text-[0.9rem] font-bold", isProfit ? "text-[#2C8E5A]" : "text-[#C62828]")}>
              {isProfit ? "+" : ""}₹{Math.abs(position.pnl).toLocaleString("en-IN")}
            </p>
          </div>
        </div>

        {/* Mode toggle */}
        <div className="flex rounded-full overflow-hidden border border-[#E2E6EC] mb-4">
          {(["full", "partial"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={cn(
                "flex-1 py-2.5 text-[0.8rem] font-semibold transition-colors capitalize",
                mode === m ? "bg-[#1A1A1A] text-white" : "bg-white text-[#5B677E]"
              )}
            >
              {m === "full" ? "Full Exit" : "Partial Exit"}
            </button>
          ))}
        </div>

        {mode === "partial" && (
          <div className="mb-4">
            <label className="text-[0.7rem] text-[#8C94A8] mb-1.5 block font-medium">
              Quantity to exit (max {position.qty - 1})
            </label>
            <input
              type="number"
              min="1"
              max={position.qty - 1}
              value={partialQty}
              onChange={(e) => setPartialQty(e.target.value)}
              className="w-full border border-[#E8ECF0] rounded-full px-4 py-2.5 text-[0.9rem] font-semibold focus:outline-none focus:border-[#C62828]"
            />
          </div>
        )}

        <button
          onClick={handleConfirm}
          className="w-full py-3.5 rounded-full bg-[#C62828] hover:bg-[#A82222] text-white text-[0.85rem] font-bold transition-colors active:scale-95"
        >
          Confirm {mode === "full" ? "Full" : "Partial"} Exit
        </button>
      </div>
    </div>
  );
}
