import { create } from 'zustand'
import {
  getTaiwanStockInfo,
  getTaiwanStockMonthRevenue,
} from "@/app/api/finmindClient";
import type {
  StockInfoRecord,
  StockMonthlyRevenueRecord,
} from "@/app/api/type";
import dayjs from "dayjs";

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

interface ProcessedChartItem {
  date: string;  // "YYYYMM"
  revenue: number;
  growthRate: number;
}

interface FinmindStore {
  stockInfo: AsyncState<StockInfoRecord[]>;
  rawRevenueData: AsyncState<StockMonthlyRevenueRecord[]>; 
  fetchStockInfo: (stockId?: string) => Promise<void>;
  fetchStockRevenue: (
    stockId: string,
    start_date: string,
    end_date?: string
  ) => Promise<void>;
  tableData: AsyncState<{
    chartData: ProcessedChartItem[];
    lastYearRevenue: number[];
  }>;
}

export const useFinmindStore = create<FinmindStore>((set) => ({
  stockInfo: { data: null, loading: false, error: null },
  rawRevenueData: { data: null, loading: false, error: null },
  tableData: { data: null, loading: false, error: null },

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
    set({ 
      tableData: { data: null, loading: true, error: null }
    });
    try {
      const rawData = await getTaiwanStockMonthRevenue(stockId, start_date, end_date);
      
      const sortedData = [...rawData].sort((a, b) => 
        dayjs(a.date).isBefore(dayjs(b.date)) ? -1 : 1
      );

      const chartData = sortedData.slice(12).map((currentItem, index) => {
        const lastYearItem = sortedData[index];
        
        const currentRevenue = currentItem.revenue / 1000;
        const lastYearRevenue = lastYearItem.revenue / 1000;
        
        const growthRate = lastYearRevenue !== 0
          ? ((currentRevenue / lastYearRevenue) - 1) * 100
          : 0;

        const formattedDate = dayjs(currentItem.date).format("YYYYMM");

        return {
          date: formattedDate,
          revenue: currentRevenue,
          growthRate: Number(growthRate.toFixed(2))
        };
      });

      set({
        rawRevenueData: { data: sortedData, loading: false, error: null },
        tableData: { 
          data: { 
            chartData,
            lastYearRevenue: sortedData
              .slice(0, sortedData.length - 12)
              .map(item => item.revenue)
          },
          loading: false,
          error: null
        }
      });
    } catch (err: unknown) {
      set({
        tableData: { 
          data: null, 
          loading: false, 
          error: err instanceof Error ? err : new Error(String(err)) 
        }
      });
    }
  },
}));
