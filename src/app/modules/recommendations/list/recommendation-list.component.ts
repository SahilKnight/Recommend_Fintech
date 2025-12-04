import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MockDataService, Recommendation } from '../../../core/services/mock-data.service';

@Component({
  selector: 'app-recommendation-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './recommendation-list.component.html',
  styleUrls: ['./recommendation-list.component.css']
})
export class RecommendationListComponent implements OnInit {
  recommendations: Recommendation[] = [];
  loading = true;

  constructor(
    private mockDataService: MockDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.mockDataService.getRecommendations().subscribe(data => {
      this.recommendations = data;
      this.loading = false;
    });
  }

  getSignalClass(signal: Recommendation['signal']): string {
    switch (signal) {
      case 'STRONG_BUY':
        return 'signal strong-buy';
      case 'BUY':
        return 'signal buy';
      case 'HOLD':
        return 'signal hold';
      case 'AVOID':
        return 'signal avoid';
      default:
        return 'signal';
    }
  }

  openDetail(rec: Recommendation): void {
    this.router.navigate(['/recommendations', rec.id]);
  }
}
