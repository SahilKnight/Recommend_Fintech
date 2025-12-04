import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

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

@Injectable({ providedIn: 'root' })
export class MockDataService {
  private recommendations: Recommendation[] = [
    {
      id: '1',
      symbol: 'RELIANCE',
      name: 'Reliance Industries',
      segment: 'Equity',
      signal: 'BUY',
      confidence: 72,
      horizon: 'Medium',
      currentPrice: 2800,
      changePercent: 1.2
    },
    {
      id: '2',
      symbol: 'GOLD',
      name: 'Gold Futures',
      segment: 'Commodity',
      signal: 'STRONG_BUY',
      confidence: 81,
      horizon: 'Short',
      currentPrice: 62000,
      changePercent: -0.4
    },
    {
      id: '3',
      symbol: 'NIFTY',
      name: 'Nifty 50 Index',
      segment: 'Equity',
      signal: 'HOLD',
      confidence: 55,
      horizon: 'Short',
      currentPrice: 22000,
      changePercent: 0.3
    },
    {
      id: '4',
      symbol: 'TCS',
      name: 'Tata Consultancy Services',
      segment: 'Equity',
      signal: 'STRONG_BUY',
      confidence: 85,
      horizon: 'Long',
      currentPrice: 3850,
      changePercent: 2.1
    },
    {
      id: '5',
      symbol: 'CRUDEOIL',
      name: 'Crude Oil Futures',
      segment: 'Commodity',
      signal: 'AVOID',
      confidence: 68,
      horizon: 'Short',
      currentPrice: 6800,
      changePercent: -1.7
    }
  ];

  getRecommendations(): Observable<Recommendation[]> {
    return of(this.recommendations);
  }

  getRecommendationById(id: string): Observable<Recommendation | undefined> {
    return of(this.recommendations.find(r => r.id === id));
  }

  // Mock chart data (price over time)
  getPriceHistory(symbol: string): Observable<{ date: string; price: number }[]> {
    const dummy = [
      { date: '2025-11-26', price: 2600 },
      { date: '2025-11-27', price: 2650 },
      { date: '2025-11-28', price: 2700 },
      { date: '2025-11-29', price: 2750 },
      { date: '2025-11-30', price: 2800 }
    ];
    return of(dummy);
  }
}
