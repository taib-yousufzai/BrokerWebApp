"use client";
import { Search, Folder, ChevronRight, X } from "lucide-react";
import InstrumentRow from "@/components/InstrumentRow";
import OrderModal from "@/components/OrderModal";
import { useOrderModal, useWatchlist } from "@/lib/store";
import { OrderSide } from "@/lib/types";

export default function WatchlistPage() {
  const { watchlist, watchlistQuery, setWatchlistQuery, removeFromWatchlist } = useWatchlist();
  const { selectedSymbol, orderModalOpen, openOrderModal, closeOrderModal } = useOrderModal();

  const filtered = watchlist.filter((i) =>
    i.symbol.toLowerCase().includes(watchlistQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-white px-4 pt-3.5 pb-3 border-b border-[#E8ECF0] flex-shrink-0">
        <div className="flex items-center justify-between mb-3">
          <span className="font-bold text-[1.2rem] text-[#1A1E2B]">Watchlist</span>
          <button className="flex items-center gap-1.5 bg-[#F8F9FC] border border-[#E2E6EC] rounded-full px-3.5 py-1.5 text-[#C62828] text-[0.75rem] font-semibold active:scale-95 transition-transform">
            <Folder size={13} />
            <span>Scripts Library</span>
            <ChevronRight size={12} />
          </button>
        </div>
        {/* Search */}
        <div className="relative">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9AA4BF]" />
          <input
            type="text"
            placeholder="Search stocks, futures, crypto from library..."
            value={watchlistQuery}
            onChange={(e) => setWatchlistQuery(e.target.value)}
            className="w-full pl-10 pr-9 py-3 bg-[#F8F9FC] border border-[#E8ECF0] rounded-full text-[0.9rem] font-normal text-gray-800 placeholder:text-[#9AA4BF] focus:outline-none focus:border-[#C62828] focus:bg-white transition-colors"
          />
          {watchlistQuery && (
            <button
              onClick={() => setWatchlistQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9AA4BF]"
            >
              <X size={15} />
            </button>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto bg-[#F8FAFF] px-4 py-4 space-y-4">
        {/* Watchlist section */}
        <div>
          <div className="flex items-center justify-between mb-2 px-1">
            <div className="flex items-baseline gap-3">
              <span className="text-[0.75rem] uppercase tracking-widest font-bold text-[#8E95A8]">
                MY WATCHLIST
              </span>
              <span className="text-[0.7rem] bg-[#F0F2F5] px-2.5 py-1 rounded-full text-[#C62828] font-semibold">
                {filtered.length} items
              </span>
            </div>
            <span className="text-[0.6rem] text-[#9AA4BF] bg-[#F8F9FC] px-3 py-1.5 rounded-full">
              Swipe | Hold to select | Tap to trade
            </span>
          </div>

          <div className="mb-3">
            <span className="text-[0.6rem] text-[#C62828] bg-[#FEF0F0] px-3 py-1 rounded-full font-medium">
              + Add scripts to watchlist from Scripts Library
            </span>
          </div>

          {/* Cards */}
          <div className="space-y-2.5">
            {filtered.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-[32px] border border-dashed border-[#DCE3EC]">
                <p className="text-sm text-[#9CA3B9]">
                  {watchlistQuery ? `No results for "${watchlistQuery}"` : "Your watchlist is empty"}
                </p>
              </div>
            ) : (
              filtered.map((instrument) => (
                <InstrumentRow
                  key={instrument.id}
                  instrument={instrument}
                  onClick={() => openOrderModal(instrument)}
                  onBuy={() => openOrderModal(instrument, OrderSide.BUY)}
                  onSell={() => openOrderModal(instrument, OrderSide.SELL)}
                  onRemove={() => removeFromWatchlist(instrument.id)}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {orderModalOpen && selectedSymbol && (
        <OrderModal instrument={selectedSymbol} onClose={closeOrderModal} />
      )}
    </div>
  );
}
