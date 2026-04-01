"use client";
import { useState } from "react";
import { Search, X, ArrowUp, ArrowDown, CheckCircle, XCircle, Clock } from "lucide-react";
import { useOrders } from "@/lib/store";
import { OrderSide, OrderStatus, type Order } from "@/lib/types";
import { cn } from "@/lib/utils";

type Tab = "open" | "closed";

function formatTime(timeStr: string) {
  return timeStr;
}

function formatDate(timeStr: string) {
  return new Date().toLocaleDateString("en-IN", { month: "short", day: "numeric" });
}

function OrderCard({ order, onCancel }: { order: Order; onCancel?: () => void }) {
  const isBuy = order.type === OrderSide.BUY;
  const isOpen = order.status === OrderStatus.OPEN;
  const isExecuted = order.status === OrderStatus.EXECUTED;
  const isRejected = order.status === OrderStatus.REJECTED;

  return (
    <div className="bg-white rounded-[16px] px-3 py-2.5 mb-2 border border-[#EDF2F7]">
      {/* Header row */}
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold text-[14px] text-[#111827] tracking-tight">{order.symbol}</span>
        <span className={cn(
          "text-[10px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1",
          isBuy ? "bg-[#FEF2F2] text-[#B91C1C]" : "bg-[#F3F4F6] text-[#374151]"
        )}>
          {isBuy ? <ArrowUp size={9} /> : <ArrowDown size={9} />}
          {isBuy ? "LONG" : "SHORT"}
        </span>
      </div>

      {/* Price row */}
      <div className="flex justify-between items-baseline mb-1.5">
        <span className="text-[9px] font-medium text-[#8B98A9] uppercase tracking-wide">PRICE</span>
        <span className="text-[14px] font-bold text-[#B22234]">
          ₹{order.price.toLocaleString("en-IN")}
        </span>
      </div>

      {/* Info inline */}
      <div className="flex justify-between items-baseline mb-1.5 gap-2">
        <div className="flex gap-1 items-baseline">
          <span className="text-[9px] font-medium text-[#8B98A9] uppercase">QTY</span>
          <span className="text-[11px] font-semibold text-[#1F2937]">{order.qty}</span>
        </div>
        <div className="flex gap-1 items-baseline">
          <span className="text-[9px] font-medium text-[#8B98A9] uppercase">TYPE</span>
          <span className="text-[9px] font-medium px-1.5 py-0.5 rounded-full bg-[#F3F4F6] text-[#4B5563]">
            {order.orderType}
          </span>
        </div>
        <div className="flex gap-1 items-baseline">
          <span className="text-[9px] font-medium text-[#8B98A9] uppercase">TIME</span>
          <span className="text-[11px] font-semibold text-[#1F2937]">{formatTime(order.time)}</span>
        </div>
      </div>

      {/* Date row */}
      <div className="flex justify-between items-baseline mb-1.5">
        <span className="text-[9px] font-medium text-[#8B98A9] uppercase">DATE</span>
        <span className="text-[10px] font-medium text-[#8B98A9]">{formatDate(order.time)}</span>
      </div>

      {/* Rejection reason */}
      {isRejected && (
        <div className="mt-1.5 px-2 py-1 bg-[#FEF9E7] rounded-lg flex items-center gap-1.5 border-l-2 border-[#F59E0B]">
          <span className="text-[9px] font-medium text-[#D97706]">Insufficient Margin</span>
        </div>
      )}

      {/* Status row */}
      <div className="flex justify-between items-center mt-1.5 pt-1.5 border-t border-[#F0F4F9]">
        <div className={cn("flex items-center gap-1 text-[10px] font-semibold", {
          "text-[#B22234]": isOpen,
          "text-[#059669]": isExecuted,
          "text-[#D97706]": isRejected,
        })}>
          {isOpen && <Clock size={11} />}
          {isExecuted && <CheckCircle size={11} />}
          {isRejected && <XCircle size={11} />}
          {isOpen ? "OPEN" : isExecuted ? "COMPLETED" : "REJECTED"}
        </div>
        {isOpen && onCancel && (
          <button
            onClick={onCancel}
            className="flex items-center gap-1 text-[10px] font-medium text-[#6B7280] px-3.5 py-1 rounded-full border border-[#E5E9F0] active:bg-[#FEF2F2] active:border-[#FCA5A5] transition-colors"
          >
            <X size={9} /> Cancel
          </button>
        )}
      </div>
    </div>
  );
}

export default function OrdersPage() {
  const { orders } = useOrders();
  const [tab, setTab] = useState<Tab>("open");
  const [search, setSearch] = useState("");

  const openOrders = orders.filter((o) => o.status === OrderStatus.OPEN);
  const closedOrders = orders.filter((o) => o.status !== OrderStatus.OPEN);

  const displayed = (tab === "open" ? openOrders : closedOrders).filter((o) =>
    o.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-full bg-white">
      {/* Header */}
      <div className="px-[18px] pt-4 pb-2.5 bg-white border-b border-[#EEF2F8]">
        <div className="flex items-baseline gap-1.5 mb-0.5">
          <span className="font-bold text-[20px] text-gray-900">MARGIN</span>
          <span className="font-bold text-[20px] text-[#B22234]">APEX</span>
        </div>
        <p className="text-[10px] text-[#8B98A9] flex items-center gap-1">
          Open &amp; Closed Orders
        </p>
      </div>

      {/* Search */}
      <div className="px-4 py-2.5">
        <div className="flex items-center gap-2 bg-[#F8FAFE] rounded-full px-3.5 py-2 border border-[#E8EDF2] focus-within:border-[#B22234] focus-within:bg-white transition-colors">
          <Search size={13} className="text-[#9CA3AF] shrink-0" />
          <input
            type="text"
            placeholder="Search symbol..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 text-[12px] bg-transparent border-none outline-none text-[#1F2937] placeholder:text-[#B9C1CC]"
          />
          {search && (
            <button onClick={() => setSearch("")} className="text-[#9CA3AF]">
              <X size={12} />
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="mx-4 mb-2.5 flex bg-[#F8FAFE] rounded-full p-0.5">
        {(["open", "closed"] as Tab[]).map((t) => {
          const count = t === "open" ? openOrders.length : closedOrders.length;
          return (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "flex-1 text-center py-1.5 text-[12px] font-medium rounded-full transition-all flex items-center justify-center gap-1.5",
                tab === t ? "bg-white text-[#B22234] shadow-sm font-semibold" : "text-[#6B7280]"
              )}
            >
              {t.toUpperCase()}
              <span className={cn(
                "text-[9px] px-1.5 py-0.5 rounded-full",
                tab === t ? "bg-[#F0F4F9] text-[#B22234]" : "bg-[#F0F4F9] text-[#6B7280]"
              )}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Orders list */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {displayed.length === 0 ? (
          <div className="text-center py-8 bg-[#FAFCFE] rounded-[20px] mt-2">
            <p className="text-[12px] text-[#9CA3AF]">
              {search ? `No results for "${search}"` : `No ${tab} orders`}
            </p>
          </div>
        ) : (
          displayed.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))
        )}
      </div>
    </div>
  );
}
