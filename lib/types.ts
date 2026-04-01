// ─── Domain enums ─────────────────────────────────────────────────────────────

export enum OrderSide {
  BUY = "BUY",
  SELL = "SELL",
}

export enum OrderType {
  MARKET = "MARKET",
  LIMIT = "LIMIT",
}

export enum OrderStatus {
  OPEN = "OPEN",
  EXECUTED = "EXECUTED",
  REJECTED = "REJECTED",
}

export enum NotificationType {
  INFO = "info",
  WARNING = "warning",
  SUCCESS = "success",
}

export enum ToastType {
  SUCCESS = "success",
  ERROR = "error",
  INFO = "info",
}

export enum InstrumentType {
  INDEX = "INDEX",
  EQ = "EQ",
}

export enum ProductType {
  MIS = "MIS",
  CNC = "CNC",
  NRML = "NRML",
}

// ─── Domain interfaces ────────────────────────────────────────────────────────

export interface WatchlistItem {
  id: number;
  symbol: string;
  price: number;
  change: number;
  changeAmt: number;
  type: InstrumentType | string;
}

export interface Position {
  id: number;
  symbol: string;
  qty: number;
  avgPrice: number;
  ltp: number;
  pnl: number;
  type: OrderSide | string;
  product: ProductType | string;
}

export interface Order {
  id: number;
  symbol: string;
  type: OrderSide | string;
  orderType: OrderType | string;
  qty: number;
  price: number;
  status: OrderStatus | string;
  time: string;
}

export interface Funds {
  totalBalance: number;
  freeMargin: number;
  usedMargin: number;
  floatingPnL: number;
}

export interface AppNotification {
  id: number;
  message: string;
  type: NotificationType;
  read: boolean;
  timestamp: string;
}

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

export interface User {
  name: string;
  email: string;
  phone: string;
  clientId: string;
  avatar: string;
  plan: string;
}
