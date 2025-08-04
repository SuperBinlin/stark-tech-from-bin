import type {
  StockInfoRecord,
  StockMonthlyRevenueRecord,
} from "@/app/api/type";

const FINMIND_BASE = "https://api.finmindtrade.com/api/v4/data";
const PROXY_PATH = "/api/finmind";

async function requestFinmind<T>(
  dataset: string,
  query: Record<string, string>
): Promise<T> {
  const url = new URL(FINMIND_BASE);
  url.searchParams.append("dataset", dataset);
  Object.entries(query).forEach(([k, v]) => {
    if (v) url.searchParams.append(k, v);
  });

  const resp = await fetch(PROXY_PATH, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ method: "GET", url: url.toString() }),
  });
  if (!resp.ok) {
    throw new Error(`FinMind proxy error: ${resp.status}`);
  }
  const json = await resp.json();
  return json.data as T;
}

export function getTaiwanStockInfo(data_id?: string) {
  return requestFinmind<StockInfoRecord[]>(
    "TaiwanStockInfo",
    { data_id: data_id ?? "" }
  );
}

export function getTaiwanStockMonthRevenue(
  data_id: string,
  start_date: string,
  end_date?: string
) {
  return requestFinmind<StockMonthlyRevenueRecord[]>(
    "TaiwanStockMonthRevenue",
    { data_id, start_date, end_date: end_date ?? "" }
  );
}
