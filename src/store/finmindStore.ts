import { create } from 'zustand'
import {
  getTaiwanStockInfo,
  getTaiwanStockMonthRevenue,
} from "@/app/api/finmindClient";
import type {
  StockInfoRecord,
  StockMonthlyRevenueRecord,
} from "@/app/api/type";

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

interface FinmindStore {
  stockInfo: AsyncState<StockInfoRecord[]>;
  stockRevenue: AsyncState<StockMonthlyRevenueRecord[]>;
  fetchStockInfo: (stockId?: string) => Promise<void>;
  fetchStockRevenue: (
    stockId: string,
    start_date: string,
    end_date?: string
  ) => Promise<void>;
}

export const useFinmindStore = create<FinmindStore>((set) => ({
  stockInfo: { data: null, loading: false, error: null },
  stockRevenue: { data: null, loading: false, error: null },

  fetchStockInfo: async (stockId) => {
    set({ stockInfo: { data: null, loading: true, error: null } });
    try {
      const data = await getTaiwanStockInfo(stockId);
      set({ stockInfo: { data, loading: false, error: null } });
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error(String(err))
      set({ stockInfo: { data: null, loading: false, error } });
    }
  },

  fetchStockRevenue: async (stockId, start_date, end_date) => {
    set({ stockRevenue: { data: null, loading: true, error: null } });
    try {
      const data = await getTaiwanStockMonthRevenue(
        stockId,
        start_date,
        end_date
      );
      set({ stockRevenue: { data, loading: false, error: null } });
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error(String(err))
      set({ stockRevenue: { data: null, loading: false, error } });
    }
  },
}));
