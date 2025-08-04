export type StockInfoQuery = { data_id?: string };
export type StockInfoRecord = {
  industry_category: string;
  stock_id: string;
  stock_name: string;
  type: string;
  date: string;
};
export type StockInfoResult = {
  msg: string;
  status: number;
  data: StockInfoRecord[];
};

export type StockMonthlyRevenueQuery = {
  data_id: string;
  start_date: string;
  end_date?: string;
};
export type StockMonthlyRevenueRecord = {
  date: string;
  stock_id: string;
  country: string;
  revenue: number;
  revenue_month: number;
  revenue_year: number;
};
export type StockMonthlyRevenueResult = {
  msg: string;
  status: number;
  data: StockMonthlyRevenueRecord[];
};
