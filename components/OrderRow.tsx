import { cn } from "@/lib/utils";
import { OrderSide, OrderStatus, type Order } from "@/lib/types";

const STATUS_COLORS: Record<string, string> = {
  [OrderStatus.EXECUTED]: "bg-emerald-50 text-emerald-700",
  [OrderStatus.OPEN]:     "bg-indigo-50 text-indigo-700",
  [OrderStatus.REJECTED]: "bg-red-50 text-red-600",
};

export default function OrderRow({ order }: { order: Order }) {
  return (
    <div className="flex items-center justify-between px-4 py-3.5 bg-white border-b border-gray-50 last:border-0">
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold",
            order.type === OrderSide.BUY ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"
          )}
        >
          {order.type === OrderSide.BUY ? "B" : "S"}
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900">{order.symbol}</p>
          <p className="text-xs text-gray-400">
            {order.orderType} · Qty {order.qty} · ₹{order.price.toLocaleString("en-IN")}
          </p>
        </div>
      </div>
      <div className="text-right">
        <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full", STATUS_COLORS[order.status] ?? "bg-gray-100 text-gray-500")}>
          {order.status}
        </span>
        <p className="text-xs text-gray-400 mt-1">{order.time}</p>
      </div>
    </div>
  );
}
