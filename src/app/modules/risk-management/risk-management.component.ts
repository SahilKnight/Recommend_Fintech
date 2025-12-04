import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';

interface PortfolioRisk {
  symbol: string;
  name: string;
  allocation: number;
  riskScore: number;
  beta: number;
  volatility: number;
  var: number;
  recommendation: 'REDUCE' | 'MAINTAIN' | 'INCREASE';
}

@Component({
  selector: 'app-risk-management',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './risk-management.component.html',
  styleUrls: ['./risk-management.component.scss']
})
export class RiskManagementComponent implements OnInit {
  user$!: Observable<any>;
  portfolioRisks: PortfolioRisk[] = [];
  overallRiskScore = 0;
  riskCapacity = 'MODERATE';
  
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user$ = this.authService.currentUser$;
    this.loadPortfolioRisks();
    this.calculateOverallRisk();
  }

  loadPortfolioRisks(): void {
    this.portfolioRisks = [
      {
        symbol: 'RELIANCE',
        name: 'Reliance Industries',
        allocation: 25,
        riskScore: 6.2,
        beta: 1.1,
        volatility: 18.5,
        var: 4.2,
        recommendation: 'MAINTAIN'
      },
      {
        symbol: 'TCS',
        name: 'Tata Consultancy Services',
        allocation: 20,
        riskScore: 4.8,
        beta: 0.9,
        volatility: 15.2,
        var: 3.1,
        recommendation: 'INCREASE'
      },
      {
        symbol: 'GOLD',
        name: 'Gold ETF',
        allocation: 15,
        riskScore: 3.5,
        beta: 0.2,
        volatility: 12.8,
        var: 2.1,
        recommendation: 'MAINTAIN'
      },
      {
        symbol: 'HDFC',
        name: 'HDFC Bank',
        allocation: 18,
        riskScore: 5.1,
        beta: 1.0,
        volatility: 16.7,
        var: 3.8,
        recommendation: 'REDUCE'
      },
      {
        symbol: 'INFY',
        name: 'Infosys',
        allocation: 12,
        riskScore: 4.9,
        beta: 0.8,
        volatility: 14.9,
        var: 2.9,
        recommendation: 'MAINTAIN'
      }
    ];
  }

  calculateOverallRisk(): void {
    const weightedRisk = this.portfolioRisks.reduce((sum, item) => 
      sum + (item.riskScore * item.allocation / 100), 0
    );
    this.overallRiskScore = Math.round(weightedRisk * 10) / 10;
  }

  getRiskClass(score: number): string {
    if (score <= 3) return 'risk-low';
    if (score <= 6) return 'risk-medium';
    return 'risk-high';
  }

  getRecommendationClass(rec: string): string {
    switch (rec) {
      case 'INCREASE': return 'rec-increase';
      case 'REDUCE': return 'rec-reduce';
      default: return 'rec-maintain';
    }
  }
}