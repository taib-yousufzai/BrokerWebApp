import {
  NotificationType,
  OrderSide,
  OrderStatus,
  OrderType,
  ProductType,
  type AppNotification,
  type Funds,
  type Order,
  type Position,
  type User,
  type WatchlistItem,
} from "./types";

// ─── User ─────────────────────────────────────────────────────────────────────
export const mockUser: User = {
  name: "Rahul Sharma",
  email: "rahul@example.com",
  phone: "+91 98765 43210",
  clientId: "ZRD1234",
  avatar: "RS",
  plan: "Pro Trader",
};

// ─── Notifications ────────────────────────────────────────────────────────────
export const mockNotifications: AppNotification[] = [
  {
    id: 1,
    message: "Market opens Monday 9:15 AM. Enjoy your weekend!",
    type: NotificationType.INFO,
    read: false,
    timestamp: "09:00",
  },
  {
    id: 2,
    message: "Margin call warning: Used margin above 80%",
    type: NotificationType.WARNING,
    read: false,
    timestamp: "10:30",
  },
];

// ─── Quick Actions ────────────────────────────────────────────────────────────
export const mockQuickActions = [
  { id: 1, label: "Indicators", icon: "BarChart2", color: "bg-indigo-50 text-indigo-600" },
  { id: 2, label: "Algo Bot",   icon: "Bot",       color: "bg-purple-50 text-purple-600" },
  { id: 3, label: "Training",   icon: "BookOpen",  color: "bg-sky-50 text-sky-600"       },
  { id: 4, label: "Tips",       icon: "Lightbulb", color: "bg-amber-50 text-amber-600"   },
];

// ─── Funds ────────────────────────────────────────────────────────────────────
export const mockFunds: Funds = {
  totalBalance: 125000.0,
  freeMargin:    87500.0,
  usedMargin:    37500.0,
  floatingPnL:    2340.5,
};

// ─── Watchlist ────────────────────────────────────────────────────────────────
export const mockWatchlist: WatchlistItem[] = [
  { id:  1, symbol: "NIFTY 50",   price: 22345.60, change:  1.24, changeAmt:  273.40, type: "INDEX" },
  { id:  2, symbol: "BANKNIFTY",  price: 48230.15, change: -0.87, changeAmt: -423.10, type: "INDEX" },
  { id:  3, symbol: "RELIANCE",   price:  2876.40, change:  2.13, changeAmt:   59.90, type: "EQ"    },
  { id:  4, symbol: "TCS",        price:  3945.20, change: -0.45, changeAmt:  -17.90, type: "EQ"    },
  { id:  5, symbol: "INFY",       price:  1823.75, change:  0.98, changeAmt:   17.70, type: "EQ"    },
  { id:  6, symbol: "HDFC BANK",  price:  1654.30, change: -1.23, changeAmt:  -20.60, type: "EQ"    },
  { id:  7, symbol: "ICICI BANK", price:  1123.50, change:  0.67, changeAmt:    7.50, type: "EQ"    },
  { id:  8, symbol: "WIPRO",      price:   456.80, change:  1.45, changeAmt:    6.50, type: "EQ"    },
  { id:  9, symbol: "HCLTECH",    price:  1567.30, change: -0.32, changeAmt:   -5.10, type: "EQ"    },
  { id: 10, symbol: "AXISBANK",   price:  1089.60, change:  0.54, changeAmt:    5.80, type: "EQ"    },
];

// ─── Positions ────────────────────────────────────────────────────────────────
export const mockPositions: Position[] = [
  { id: 1, symbol: "NIFTY 50",  qty: 50, avgPrice: 22100.00, ltp: 22345.60, pnl:  12280.00, type: OrderSide.BUY,  product: ProductType.MIS },
  { id: 2, symbol: "RELIANCE",  qty: 10, avgPrice:  2900.00, ltp:  2876.40, pnl:   -236.00, type: OrderSide.BUY,  product: ProductType.CNC },
  { id: 3, symbol: "BANKNIFTY", qty: 25, avgPrice: 48500.00, ltp: 48230.15, pnl:  -6746.25, type: OrderSide.SELL, product: ProductType.MIS },
];

// ─── Orders ───────────────────────────────────────────────────────────────────
export const mockOrders: Order[] = [
  { id: 1, symbol: "NIFTY 50",  type: OrderSide.BUY,  orderType: OrderType.MARKET, qty: 50, price: 22100.00, status: OrderStatus.EXECUTED, time: "09:15:32" },
  { id: 2, symbol: "RELIANCE",  type: OrderSide.BUY,  orderType: OrderType.LIMIT,  qty: 10, price:  2900.00, status: OrderStatus.EXECUTED, time: "09:22:10" },
  { id: 3, symbol: "BANKNIFTY", type: OrderSide.SELL, orderType: OrderType.MARKET, qty: 25, price: 48500.00, status: OrderStatus.EXECUTED, time: "10:05:44" },
  { id: 4, symbol: "TCS",       type: OrderSide.BUY,  orderType: OrderType.LIMIT,  qty:  5, price:  3900.00, status: OrderStatus.OPEN,     time: "11:30:00" },
  { id: 5, symbol: "INFY",      type: OrderSide.SELL, orderType: OrderType.LIMIT,  qty: 20, price:  1850.00, status: OrderStatus.REJECTED,  time: "11:45:22" },
];

// ─── Trade History (closed positions) ────────────────────────────────────────
export interface TradeRecord {
  id: number;
  symbol: string;
  type: OrderSide | string;
  qty: number;
  entryPrice: number;
  exitPrice: number;
  pnl: number;
  brokerage: number;
  date: string;
  orderType: string;
}

export const mockTradeHistory: TradeRecord[] = [
  { id: 1, symbol: "NIFTY 50",  type: OrderSide.BUY,  qty: 75,  entryPrice: 22456.80, exitPrice: 22650.25, pnl:  14508.75, brokerage: 20, date: "2026-03-28", orderType: "MARKET" },
  { id: 2, symbol: "RELIANCE",  type: OrderSide.SELL, qty: 250, entryPrice:  2856.40, exitPrice:  2830.15, pnl:   6562.50, brokerage: 20, date: "2026-03-28", orderType: "LIMIT"  },
  { id: 3, symbol: "BANKNIFTY", type: OrderSide.BUY,  qty: 25,  entryPrice: 48210.50, exitPrice: 47890.25, pnl:  -8006.25, brokerage: 20, date: "2026-03-27", orderType: "MARKET" },
  { id: 4, symbol: "INFY",      type: OrderSide.SELL, qty: 50,  entryPrice:  1598.40, exitPrice:  1612.80, pnl:   -720.00, brokerage: 20, date: "2026-03-26", orderType: "LIMIT"  },
  { id: 5, symbol: "HCLTECH",   type: OrderSide.BUY,  qty: 30,  entryPrice:  1540.00, exitPrice:  1567.30, pnl:    819.00, brokerage: 20, date: "2026-03-26", orderType: "MARKET" },
  { id: 6, symbol: "TCS",       type: OrderSide.BUY,  qty: 20,  entryPrice:  3982.50, exitPrice:  4012.30, pnl:    596.00, brokerage: 20, date: "2026-03-25", orderType: "LIMIT"  },
  { id: 7, symbol: "WIPRO",     type: OrderSide.SELL, qty: 100, entryPrice:   462.00, exitPrice:   456.80, pnl:    520.00, brokerage: 20, date: "2026-03-24", orderType: "MARKET" },
  { id: 8, symbol: "AXISBANK",  type: OrderSide.BUY,  qty: 40,  entryPrice:  1075.00, exitPrice:  1089.60, pnl:    584.00, brokerage: 20, date: "2026-03-23", orderType: "LIMIT"  },
];
