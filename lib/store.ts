import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useShallow } from "zustand/react/shallow";
import {
  OrderSide,
  OrderStatus,
  OrderType,
  ToastType,
  type AppNotification,
  type Funds,
  type Order,
  type Position,
  type Toast,
  type WatchlistItem,
} from "./types";
import {
  mockFunds,
  mockNotifications,
  mockOrders,
  mockPositions,
  mockWatchlist,
} from "./mockData";

// ─────────────────────────────────────────────────────────────────────────────
// Slice interfaces
// ─────────────────────────────────────────────────────────────────────────────

interface AuthSlice {
  isLoggedIn: boolean;
  disclaimerAccepted: boolean;
  login: () => void;
  logout: () => void;
  acceptDisclaimer: () => void;
}

interface WatchlistSlice {
  watchlist: WatchlistItem[];
  watchlistQuery: string;
  setWatchlistQuery: (q: string) => void;
  removeFromWatchlist: (id: number) => void;
}

interface OrderModalSlice {
  selectedSymbol: WatchlistItem | null;
  orderModalOpen: boolean;
  orderSide: OrderSide;
  openOrderModal: (symbol: WatchlistItem, side?: OrderSide) => void;
  closeOrderModal: () => void;
  setOrderSide: (side: OrderSide) => void;
}

interface OrdersSlice {
  orders: Order[];
  placeOrder: (order: Omit<Order, "id" | "time" | "status">) => void;
}

interface PositionsSlice {
  positions: Position[];
  exitPosition: (id: number) => void;
  partialExitPosition: (id: number, qty: number) => void;
}

interface FundsSlice {
  funds: Funds;
}

interface NotificationsSlice {
  notifications: AppNotification[];
  unreadCount: number;
  markAllRead: () => void;
  markOneRead: (id: number) => void;
}

interface ToastSlice {
  toasts: Toast[];
  showToast: (message: string, type?: ToastType) => void;
  dismissToast: (id: number) => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// Combined state
// ─────────────────────────────────────────────────────────────────────────────

export type AppState = AuthSlice &
  WatchlistSlice &
  OrderModalSlice &
  OrdersSlice &
  PositionsSlice &
  FundsSlice &
  NotificationsSlice &
  ToastSlice;

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function makeTimestamp() {
  return new Date().toLocaleTimeString("en-IN", { hour12: false });
}

function makeExitOrder(pos: Position, allOrders: Order[]): Order {
  return {
    id: allOrders.length + 1,
    symbol: pos.symbol,
    type: pos.type === OrderSide.BUY ? OrderSide.SELL : OrderSide.BUY,
    orderType: OrderType.MARKET,
    qty: pos.qty,
    price: pos.ltp,
    status: OrderStatus.EXECUTED,
    time: makeTimestamp(),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Store
// ─────────────────────────────────────────────────────────────────────────────

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // ── Auth ────────────────────────────────────────────────────────────────
      isLoggedIn: false,
      disclaimerAccepted: false,
      login: () => set({ isLoggedIn: true }),
      logout: () => set({ isLoggedIn: false, disclaimerAccepted: false }),
      acceptDisclaimer: () => set({ disclaimerAccepted: true }),

      // ── Watchlist ────────────────────────────────────────────────────────────
      watchlist: mockWatchlist,
      watchlistQuery: "",
      setWatchlistQuery: (q) => set({ watchlistQuery: q }),
      removeFromWatchlist: (id) =>
        set((s) => ({ watchlist: s.watchlist.filter((i) => i.id !== id) })),

      // ── Order modal ──────────────────────────────────────────────────────────
      selectedSymbol: null,
      orderModalOpen: false,
      orderSide: OrderSide.BUY,
      openOrderModal: (symbol, side = OrderSide.BUY) =>
        set({ selectedSymbol: symbol, orderModalOpen: true, orderSide: side }),
      closeOrderModal: () =>
        set({ orderModalOpen: false, selectedSymbol: null }),
      setOrderSide: (side) => set({ orderSide: side }),

      // ── Orders ───────────────────────────────────────────────────────────────
      orders: mockOrders,
      placeOrder: (order) => {
        const newOrder: Order = {
          ...order,
          id: get().orders.length + 1,
          status: OrderStatus.EXECUTED,
          time: makeTimestamp(),
        };
        set((s) => ({ orders: [newOrder, ...s.orders] }));
        get().showToast(`${order.type} order placed for ${order.symbol}`, ToastType.SUCCESS);
      },

      // ── Positions ────────────────────────────────────────────────────────────
      positions: mockPositions,
      exitPosition: (id) => {
        const pos = get().positions.find((p) => p.id === id);
        if (!pos) return;
        const exitOrder = makeExitOrder(pos, get().orders);
        set((s) => ({
          positions: s.positions.filter((p) => p.id !== id),
          orders: [exitOrder, ...s.orders],
        }));
        get().showToast(`Exited ${pos.symbol} position`, ToastType.SUCCESS);
      },
      partialExitPosition: (id, qty) => {
        const pos = get().positions.find((p) => p.id === id);
        if (!pos) return;
        if (qty >= pos.qty) {
          get().exitPosition(id);
          return;
        }
        const exitOrder: Order = {
          ...makeExitOrder(pos, get().orders),
          qty,
        };
        const pnlPerUnit = pos.pnl / pos.qty;
        set((s) => ({
          positions: s.positions.map((p) =>
            p.id === id
              ? { ...p, qty: p.qty - qty, pnl: p.pnl - pnlPerUnit * qty }
              : p
          ),
          orders: [exitOrder, ...s.orders],
        }));
        get().showToast(`Partial exit: ${qty} lots of ${pos.symbol}`, ToastType.INFO);
      },

      // ── Funds ────────────────────────────────────────────────────────────────
      funds: mockFunds,

      // ── Notifications ────────────────────────────────────────────────────────
      notifications: mockNotifications,
      unreadCount: mockNotifications.filter((n) => !n.read).length,
      markAllRead: () =>
        set((s) => ({
          notifications: s.notifications.map((n) => ({ ...n, read: true })),
          unreadCount: 0,
        })),
      markOneRead: (id) =>
        set((s) => {
          const updated = s.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          );
          return {
            notifications: updated,
            unreadCount: updated.filter((n) => !n.read).length,
          };
        }),

      // ── Toast ────────────────────────────────────────────────────────────────
      toasts: [],
      showToast: (message, type = ToastType.SUCCESS) => {
        const id = Date.now();
        set((s) => ({ toasts: [...s.toasts, { id, message, type }] }));
        setTimeout(() => get().dismissToast(id), 3000);
      },
      dismissToast: (id) =>
        set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
    }),
    {
      name: "tradeapp-storage",
      // Only auth state is persisted — all data rehydrates from mockData
      partialize: (s) => ({
        isLoggedIn: s.isLoggedIn,
        disclaimerAccepted: s.disclaimerAccepted,
      }),
    }
  )
);

// ─────────────────────────────────────────────────────────────────────────────
// Selector hooks — useShallow prevents infinite loops from object identity
// ─────────────────────────────────────────────────────────────────────────────

export const useAuth = () =>
  useAppStore(
    useShallow((s) => ({
      isLoggedIn: s.isLoggedIn,
      disclaimerAccepted: s.disclaimerAccepted,
      login: s.login,
      logout: s.logout,
      acceptDisclaimer: s.acceptDisclaimer,
    }))
  );

export const useWatchlist = () =>
  useAppStore(
    useShallow((s) => ({
      watchlist: s.watchlist,
      watchlistQuery: s.watchlistQuery,
      setWatchlistQuery: s.setWatchlistQuery,
      removeFromWatchlist: s.removeFromWatchlist,
    }))
  );

export const useOrderModal = () =>
  useAppStore(
    useShallow((s) => ({
      selectedSymbol: s.selectedSymbol,
      orderModalOpen: s.orderModalOpen,
      orderSide: s.orderSide,
      openOrderModal: s.openOrderModal,
      closeOrderModal: s.closeOrderModal,
      setOrderSide: s.setOrderSide,
    }))
  );

export const useOrders = () =>
  useAppStore(
    useShallow((s) => ({
      orders: s.orders,
      placeOrder: s.placeOrder,
    }))
  );

export const usePositions = () =>
  useAppStore(
    useShallow((s) => ({
      positions: s.positions,
      exitPosition: s.exitPosition,
      partialExitPosition: s.partialExitPosition,
    }))
  );

export const useFunds = () => useAppStore((s) => s.funds);

export const useNotifications = () =>
  useAppStore(
    useShallow((s) => ({
      notifications: s.notifications,
      unreadCount: s.unreadCount,
      markAllRead: s.markAllRead,
      markOneRead: s.markOneRead,
    }))
  );

export const useToast = () =>
  useAppStore(
    useShallow((s) => ({
      toasts: s.toasts,
      showToast: s.showToast,
      dismissToast: s.dismissToast,
    }))
  );
