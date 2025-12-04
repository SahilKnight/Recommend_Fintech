import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { SubscriptionService, SubscriptionPlan } from '../../core/services/subscrption.service';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {
  user$!: Observable<any>;
  plans: SubscriptionPlan[] = [];
  currentPlan: SubscriptionPlan | null = null;
  remainingTrialDays = 0;
  upgrading = false;

  constructor(
    private authService: AuthService,
    private subscriptionService: SubscriptionService
  ) {}

  ngOnInit(): void {
    this.user$ = this.authService.currentUser$;
    this.loadPlans();
    this.loadCurrentPlan();
    this.remainingTrialDays = this.subscriptionService.getRemainingTrialDays();
  }

  loadPlans(): void {
    this.subscriptionService.getPlans().subscribe(plans => {
      this.plans = plans;
    });
  }

  loadCurrentPlan(): void {
    this.subscriptionService.getCurrentPlan().subscribe(plan => {
      this.currentPlan = plan;
    });
  }

  upgradePlan(planId: string): void {
    this.upgrading = true;
    this.subscriptionService.upgradePlan(planId).subscribe({
      next: (success) => {
        if (success) {
          this.loadCurrentPlan();
          // Refresh user data
          window.location.reload();
        }
      },
      error: (err) => {
        console.error('Upgrade failed:', err);
      },
      complete: () => {
        this.upgrading = false;
      }
    });
  }

  isCurrentPlan(planId: string): boolean {
    return this.currentPlan?.id === planId;
  }
}
