"use client";
import { cn } from "@/lib/utils";

interface Instrument {
  id: number;
  symbol: string;
  price: number;
  change: number;
  changeAmt: number;
  type: string;
}

interface InstrumentRowProps {
  instrument: Instrument;
  onClick?: () => void;
  onBuy?: () => void;
  onSell?: () => void;
  onRemove?: () => void;
}

export default function InstrumentRow({ instrument, onClick, onBuy, onSell, onRemove }: InstrumentRowProps) {
  const isPositive = instrument.change >= 0;

  return (
    <div
      className="bg-white rounded-[20px] px-4 py-3.5 border border-[#EEF2F8] flex items-center gap-3 cursor-pointer active:bg-[#FFF5F5] transition-colors"
      onClick={onClick}
    >
      {/* Symbol info */}
      <div className="flex-1 min-w-0">
        <p className="font-bold text-[1rem] text-[#1A1E2B] mb-1">{instrument.symbol}</p>
        <p className="text-[0.7rem] text-[#8C94A8]">{instrument.type} · NSE</p>
      </div>

      {/* Price area */}
      <div className="text-right min-w-[85px]">
        <p className="font-bold text-[1rem] text-[#1F2937]">
          ₹{instrument.price.toLocaleString("en-IN")}
        </p>
        <span className={cn(
          "text-[0.7rem] font-semibold px-2 py-0.5 rounded-full mt-1 inline-block",
          isPositive ? "bg-[#E9F6EF] text-[#2C8E5A]" : "bg-[#FEF0F0] text-[#C62828]"
        )}>
          {isPositive ? "+" : ""}{instrument.change.toFixed(2)}%
        </span>
      </div>

      {/* Buy / Sell buttons */}
      <div className="flex flex-col gap-1.5 ml-1 shrink-0">
        <button
          onClick={(e) => { e.stopPropagation(); onBuy?.(); }}
          className="w-11 h-9 rounded-full bg-[#E9F6EF] text-[#2C8E5A] border border-[#2C8E5A] text-[0.85rem] font-bold active:bg-[#2C8E5A] active:text-white transition-colors"
        >
          B
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onSell?.(); }}
          className="w-11 h-9 rounded-full bg-[#FEF0F0] text-[#C62828] border border-[#C62828] text-[0.85rem] font-bold active:bg-[#C62828] active:text-white transition-colors"
        >
          S
        </button>
      </div>
    </div>
  );
}
