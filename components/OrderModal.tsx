"use client";
import { useState } from "react";
import { ArrowLeft, ArrowUp, ArrowDown } from "lucide-react";
import { useOrderModal, useOrders } from "@/lib/store";
import { OrderSide, OrderType, type WatchlistItem } from "@/lib/types";
import { cn } from "@/lib/utils";

interface OrderModalProps {
  instrument: WatchlistItem;
  onClose: () => void;
}

const ORDER_TYPES = [
  { key: OrderType.MARKET, label: "MARKET" },
  { key: OrderType.LIMIT,  label: "LIMIT"  },
  { key: "SLM",            label: "SL-M"   },
  { key: "GTT",            label: "GTT"    },
] as const;

const PRODUCT_TYPES = [
  { key: "intraday", label: "INTRADAY" },
  { key: "carry",    label: "CARRY"    },
] as const;

export default function OrderModal({ instrument, onClose }: OrderModalProps) {
  const { placeOrder } = useOrders();
  const { orderSide, setOrderSide } = useOrderModal();
  const [orderType, setOrderType] = useState<string>(OrderType.MARKET);
  const [productType, setProductType] = useState("intraday");
  const [qty, setQty] = useState(1);
  const [useLots, setUseLots] = useState(false);
  const [limitPrice, setLimitPrice] = useState(instrument.price.toFixed(2));
  const [placed, setPlaced] = useState(false);

  const lotSize = 50;
  const totalQty = useLots ? qty * lotSize : qty;
  const requiredMargin = instrument.price * totalQty * (productType === "intraday" ? 0.12 : 0.24);
  const availableMargin = 125000;

  const handlePlace = () => {
    if (qty <= 0) return;
    placeOrder({
      symbol: instrument.symbol,
      type: orderSide,
      orderType: orderType as OrderType,
      qty: totalQty,
      price: orderType === OrderType.MARKET ? instrument.price : Number(limitPrice),
    });
    setPlaced(true);
    setTimeout(onClose, 900);
  };

  const isBuy = orderSide === OrderSide.BUY;
  const changePositive = instrument.change >= 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white flex flex-col overflow-y-auto"
        style={{ maxHeight: "92vh", borderRadius: "0" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky header */}
        <div className="sticky top-0 bg-white z-10 px-[18px] py-3.5 border-b border-[#F0F2F8] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-[#F0F2F5] flex items-center justify-center text-[#5B677E] shrink-0"
            >
              <ArrowLeft size={16} />
            </button>
            <div>
              <p className="text-[1.1rem] font-extrabold text-gray-900">{instrument.symbol}</p>
              <span className="text-[0.65rem] font-semibold text-[#C62828] bg-[#FEF0F0] px-2.5 py-0.5 rounded-full">
                NSE · {instrument.type}
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[1.2rem] font-extrabold text-gray-900">
              ₹{instrument.price.toLocaleString("en-IN")}
            </p>
            <span className={cn(
              "text-[0.65rem] font-semibold px-2 py-0.5 rounded-full inline-block mt-0.5",
              changePositive ? "bg-[#E9F6EF] text-[#2C8E5A]" : "bg-[#FEF0F0] text-[#C62828]"
            )}>
              {changePositive ? "+" : ""}{instrument.change.toFixed(2)}%
            </span>
            {/* Bid / Ask mini */}
            <div className="flex gap-2 justify-end mt-1.5">
              <span className="text-[0.6rem] bg-[#F8FAFF] px-2 py-0.5 rounded-full">
                <span className="text-[#8C94A8] mr-1">BID</span>
                <span className="text-[#2C8E5A] font-semibold">
                  {(instrument.price * 0.999).toFixed(2)}
                </span>
              </span>
              <span className="text-[0.6rem] bg-[#F8FAFF] px-2 py-0.5 rounded-full">
                <span className="text-[#8C94A8] mr-1">ASK</span>
                <span className="text-[#C62828] font-semibold">
                  {(instrument.price * 1.001).toFixed(2)}
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="px-[18px] py-4 space-y-3.5">
          {/* Qty / Lot toggle */}
          <div className="flex items-center justify-between bg-[#F8FAFF] px-3.5 py-2.5 rounded-[18px]">
            <span className="text-[0.8rem] font-semibold text-gray-800">Order Type</span>
            <div className="flex items-center gap-2">
              <span className="text-[0.7rem] text-[#5B677E]">Qty</span>
              <button
                onClick={() => setUseLots(!useLots)}
                className={cn(
                  "relative w-[52px] h-[26px] rounded-full transition-colors",
                  useLots ? "bg-[#C62828]" : "bg-[#E0E4EA]"
                )}
              >
                <span className={cn(
                  "absolute top-[3px] w-5 h-5 bg-white rounded-full shadow transition-transform",
                  useLots ? "translate-x-[29px]" : "translate-x-[3px]"
                )} />
              </button>
              <span className="text-[0.7rem] text-[#5B677E]">Lot</span>
            </div>
          </div>

          {/* Lot info row */}
          <div className="flex gap-2.5 bg-[#F8FAFF] px-3.5 py-2.5 rounded-[18px]">
            {[
              { label: "Lot Size",   value: lotSize },
              { label: "Max Lots",   value: 100 },
              { label: "Order Lots", value: useLots ? qty : Math.ceil(qty / lotSize) },
              { label: "Total Qty",  value: totalQty },
            ].map(({ label, value }) => (
              <div key={label} className="flex-1 text-center bg-white rounded-[14px] py-1.5 px-1">
                <span className="block text-[0.6rem] text-[#8C94A8]">{label}</span>
                <span className="block text-[0.8rem] font-bold text-gray-900">{value}</span>
              </div>
            ))}
          </div>

          {/* Quantity control */}
          <div className="bg-[#F8FAFF] px-3.5 py-2.5 rounded-[18px]">
            <p className="text-[0.7rem] font-medium text-[#8C94A8] mb-2">
              {useLots ? "LOTS" : "QUANTITY"}
            </p>
            <div className="flex items-center justify-between bg-white rounded-full px-1 py-0.5 border border-[#E8ECF0]">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="w-[38px] h-[38px] bg-[#F8F9FC] rounded-full text-[#C62828] font-bold text-lg flex items-center justify-center"
              >
                −
              </button>
              <input
                type="number"
                min="1"
                value={qty}
                onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
                className="flex-1 text-center text-[1rem] font-bold border-none outline-none bg-transparent"
              />
              <button
                onClick={() => setQty(qty + 1)}
                className="w-[38px] h-[38px] bg-[#F8F9FC] rounded-full text-[#C62828] font-bold text-lg flex items-center justify-center"
              >
                +
              </button>
            </div>
            <p className="text-[0.6rem] text-[#8C94A8] mt-1.5 text-right">
              Lot Size: {lotSize} | {useLots ? `${qty} Lot = ${totalQty} Units` : `${qty} Units = ${(qty / lotSize).toFixed(1)} Lot`}
            </p>
          </div>

          {/* Order type */}
          <div className="bg-[#F8FAFF] px-3.5 py-2.5 rounded-[18px]">
            <p className="text-[0.7rem] font-medium text-[#8C94A8] mb-2.5">ORDER TYPE</p>
            <div className="flex gap-2 flex-wrap">
              {ORDER_TYPES.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setOrderType(key)}
                  className={cn(
                    "flex-1 min-w-[60px] py-2 rounded-full text-[0.7rem] font-semibold border transition-colors",
                    orderType === key
                      ? "bg-[#C62828] text-white border-[#C62828]"
                      : "bg-white text-gray-600 border-[#E8ECF0]"
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
            {orderType === OrderType.LIMIT && (
              <input
                type="number"
                value={limitPrice}
                onChange={(e) => setLimitPrice(e.target.value)}
                placeholder="Limit Price (₹)"
                className="mt-2.5 w-full px-3 py-2.5 rounded-full border border-[#E8ECF0] text-[0.85rem] focus:outline-none focus:border-[#C62828]"
              />
            )}
          </div>

          {/* Product type */}
          <div className="bg-[#F8FAFF] px-3.5 py-2.5 rounded-[18px]">
            <p className="text-[0.7rem] font-medium text-[#8C94A8] mb-2.5">PRODUCT TYPE</p>
            <div className="flex gap-2">
              {PRODUCT_TYPES.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setProductType(key)}
                  className={cn(
                    "flex-1 py-2 rounded-full text-[0.7rem] font-semibold border transition-colors",
                    productType === key
                      ? "bg-[#C62828] text-white border-[#C62828]"
                      : "bg-white text-gray-600 border-[#E8ECF0]"
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Margin details */}
          <div className="bg-gradient-to-br from-[#F8FAFF] to-white px-3.5 py-3 rounded-[18px] border border-[#EEF2F8]">
            <p className="text-[0.7rem] font-bold text-[#C62828] mb-2.5">MARGIN</p>
            {[
              { label: "Available",        value: `₹${availableMargin.toLocaleString("en-IN")}`, green: true },
              { label: "Required",         value: `₹${requiredMargin.toLocaleString("en-IN", { maximumFractionDigits: 0 })}` },
              { label: "Carry (Overnight)",value: `₹${(requiredMargin * 2).toLocaleString("en-IN", { maximumFractionDigits: 0 })}` },
            ].map(({ label, value, green }) => (
              <div key={label} className="flex justify-between py-1.5 border-b border-[#EEF2F8] last:border-0">
                <span className="text-[0.65rem] text-[#8C94A8]">{label}</span>
                <span className={cn("text-[0.75rem] font-bold", green ? "text-[#2C8E5A]" : "text-gray-900")}>
                  {value}
                </span>
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 pb-2">
            <button
              onClick={() => { setOrderSide(OrderSide.BUY); handlePlace(); }}
              disabled={placed}
              className="flex-1 py-3 rounded-full bg-[#2C8E5A] text-white font-bold text-[0.85rem] flex items-center justify-center gap-1.5 active:scale-95 transition-transform disabled:opacity-50"
            >
              <ArrowUp size={15} /> {placed && isBuy ? "Placed ✓" : "BUY"}
            </button>
            <button
              onClick={() => { setOrderSide(OrderSide.SELL); handlePlace(); }}
              disabled={placed}
              className="flex-1 py-3 rounded-full bg-[#C62828] text-white font-bold text-[0.85rem] flex items-center justify-center gap-1.5 active:scale-95 transition-transform disabled:opacity-50"
            >
              <ArrowDown size={15} /> {placed && !isBuy ? "Placed ✓" : "SELL"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
