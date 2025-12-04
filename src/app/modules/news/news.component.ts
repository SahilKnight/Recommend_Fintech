import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  sentiment: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL';
  sentimentScore: number;
  source: string;
  publishedAt: Date;
  category: string;
  impactedSymbols: string[];
  relevanceScore: number;
}

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  user$!: Observable<any>;
  newsItems: NewsItem[] = [];
  selectedCategory = 'ALL';
  selectedSentiment = 'ALL';
  
  categories = ['ALL', 'MARKET', 'EARNINGS', 'POLICY', 'GLOBAL', 'SECTOR'];
  sentiments = ['ALL', 'POSITIVE', 'NEGATIVE', 'NEUTRAL'];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user$ = this.authService.currentUser$;
    this.loadNews();
  }

  loadNews(): void {
    this.newsItems = [
      {
        id: '1',
        title: 'RBI Maintains Repo Rate at 6.5%, Signals Cautious Approach',
        summary: 'Reserve Bank of India keeps key interest rates unchanged, citing inflation concerns and global economic uncertainty.',
        sentiment: 'NEUTRAL',
        sentimentScore: 0.1,
        source: 'Economic Times',
        publishedAt: new Date('2024-01-15T10:30:00'),
        category: 'POLICY',
        impactedSymbols: ['NIFTY', 'BANKNIFTY', 'HDFC', 'ICICI'],
        relevanceScore: 9.2
      },
      {
        id: '2',
        title: 'Reliance Industries Reports Strong Q3 Results, Beats Estimates',
        summary: 'RIL posts 12% YoY growth in net profit driven by robust performance in retail and digital segments.',
        sentiment: 'POSITIVE',
        sentimentScore: 8.5,
        source: 'Business Standard',
        publishedAt: new Date('2024-01-14T16:45:00'),
        category: 'EARNINGS',
        impactedSymbols: ['RELIANCE'],
        relevanceScore: 8.8
      },
      {
        id: '3',
        title: 'Global Markets Rally on Fed Rate Cut Expectations',
        summary: 'International markets surge as investors anticipate potential Federal Reserve policy easing in coming months.',
        sentiment: 'POSITIVE',
        sentimentScore: 7.2,
        source: 'Reuters',
        publishedAt: new Date('2024-01-14T09:15:00'),
        category: 'GLOBAL',
        impactedSymbols: ['NIFTY', 'TCS', 'INFY'],
        relevanceScore: 7.5
      },
      {
        id: '4',
        title: 'IT Sector Faces Headwinds Amid Client Budget Cuts',
        summary: 'Major IT companies report slower deal closures as clients reduce discretionary spending on technology projects.',
        sentiment: 'NEGATIVE',
        sentimentScore: -6.8,
        source: 'Mint',
        publishedAt: new Date('2024-01-13T14:20:00'),
        category: 'SECTOR',
        impactedSymbols: ['TCS', 'INFY', 'WIPRO', 'HCL'],
        relevanceScore: 8.1
      },
      {
        id: '5',
        title: 'Gold Prices Surge to New Highs on Safe Haven Demand',
        summary: 'Precious metals rally continues as geopolitical tensions and inflation concerns drive investor interest.',
        sentiment: 'POSITIVE',
        sentimentScore: 6.9,
        source: 'CNBC',
        publishedAt: new Date('2024-01-13T11:30:00'),
        category: 'MARKET',
        impactedSymbols: ['GOLD'],
        relevanceScore: 7.8
      }
    ];
  }

  get filteredNews(): NewsItem[] {
    return this.newsItems.filter(item => {
      const categoryMatch = this.selectedCategory === 'ALL' || item.category === this.selectedCategory;
      const sentimentMatch = this.selectedSentiment === 'ALL' || item.sentiment === this.selectedSentiment;
      return categoryMatch && sentimentMatch;
    });
  }

  getSentimentClass(sentiment: string): string {
    switch (sentiment) {
      case 'POSITIVE': return 'sentiment-positive';
      case 'NEGATIVE': return 'sentiment-negative';
      default: return 'sentiment-neutral';
    }
  }

  getSentimentIcon(sentiment: string): string {
    switch (sentiment) {
      case 'POSITIVE': return '📈';
      case 'NEGATIVE': return '📉';
      default: return '➡️';
    }
  }

  getRelevanceClass(score: number): string {
    if (score >= 8) return 'relevance-high';
    if (score >= 6) return 'relevance-medium';
    return 'relevance-low';
  }

  getPositiveCount(): number {
    return this.newsItems.filter(item => item.sentiment === 'POSITIVE').length;
  }

  getNegativeCount(): number {
    return this.newsItems.filter(item => item.sentiment === 'NEGATIVE').length;
  }

  getNeutralCount(): number {
    return this.newsItems.filter(item => item.sentiment === 'NEUTRAL').length;
  }
}