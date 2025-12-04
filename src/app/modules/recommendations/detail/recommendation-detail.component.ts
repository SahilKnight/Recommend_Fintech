import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MockDataService, Recommendation } from '../../../core/services/mock-data.service';

@Component({
  selector: 'app-recommendation-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './recommendation-detail.component.html',
  styleUrls: ['./recommendation-detail.component.css']
})
export class RecommendationDetailComponent implements OnInit {
  recommendation?: Recommendation;
  history: { date: string; price: number }[] = [];
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private mockDataService: MockDataService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.mockDataService.getRecommendationById(id).subscribe(rec => {
      this.recommendation = rec;
      if (rec) {
        this.mockDataService.getPriceHistory(rec.symbol).subscribe(history => {
          this.history = history;
          this.loading = false;
        });
      } else {
        this.loading = false;
      }
    });
  }
}
