import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { SubscriptionService } from '../../core/services/subscrption.service';
import { MockDataService, Recommendation } from '../../core/services/mock-data.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user$!: Observable<any>;
  recommendations: Recommendation[] = [];
  remainingTrialDays = 0;
  
  stats = [
    { label: 'Active Signals', value: 12 },
    { label: 'Win Rate (Last 30d)', value: '63%' },
    { label: 'Avg Return / Trade', value: '+2.4%' },
    { label: 'Portfolio Value', value: '₹2.4L' }
  ];

  constructor(
    private authService: AuthService,
    private subscriptionService: SubscriptionService,
    private mockDataService: MockDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user$ = this.authService.currentUser$;
    this.loadRecommendations();
    this.remainingTrialDays = this.subscriptionService.getRemainingTrialDays();
  }

  loadRecommendations(): void {
    this.mockDataService.getRecommendations().subscribe(data => {
      this.recommendations = data.slice(0, 3); // Show top 3
    });
  }

  logout(): void {
    this.authService.logout();
  }

  getSignalClass(signal: string): string {
    switch (signal) {
      case 'STRONG_BUY': return 'signal strong-buy';
      case 'BUY': return 'signal buy';
      case 'HOLD': return 'signal hold';
      case 'AVOID': return 'signal avoid';
      default: return 'signal';
    }
  }
}
