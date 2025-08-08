export interface BalanceItem {
  amount: number;
  currency: string;
}

export interface BalanceResponse {
  available: BalanceItem[];
  pending: BalanceItem[];
}