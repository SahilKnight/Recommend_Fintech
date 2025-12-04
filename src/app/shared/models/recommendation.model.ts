export interface Recommendation {
  id: string;
  symbol: string;
  name: string;
  segment: 'Equity' | 'Commodity' | 'Forex' | 'Crypto';
  signal: 'STRONG_BUY' | 'BUY' | 'HOLD' | 'AVOID';
  confidence: number;
  horizon: 'Short' | 'Medium' | 'Long';
  currentPrice: number;
  changePercent: number;
}

export interface PriceHistory {
  date: string;
  price: number;
  volume?: number;
}