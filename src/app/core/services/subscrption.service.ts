import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthService, User } from './auth.service';

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  recommended?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private plans: SubscriptionPlan[] = [
    {
      id: 'trial',
      name: '3-Day Trial',
      price: 0,
      features: [
        'Access to 5 recommendations per day',
        'Basic market insights',
        'Email notifications'
      ]
    },
    {
      id: 'basic',
      name: 'Basic Plan',
      price: 999,
      features: [
        'Unlimited recommendations',
        'Advanced market analysis',
        'Real-time alerts',
        'Portfolio tracking'
      ]
    },
    {
      id: 'premium',
      name: 'Premium Plan',
      price: 1999,
      recommended: true,
      features: [
        'Everything in Basic',
        'AI-powered insights',
        'Custom risk management',
        'Priority support',
        'Advanced charting tools'
      ]
    }
  ];

  constructor(private authService: AuthService) {}

  getPlans(): Observable<SubscriptionPlan[]> {
    return of(this.plans);
  }

  getCurrentPlan(): Observable<SubscriptionPlan | null> {
    const user = this.authService.getCurrentUser();
    if (!user) return of(null);

    const planId = user.subscriptionType.toLowerCase();
    const plan = this.plans.find(p => p.id === planId);
    return of(plan || null);
  }

  upgradePlan(planId: string): Observable<boolean> {
    return new Observable(observer => {
      // Mock upgrade process
      setTimeout(() => {
        const user = this.authService.getCurrentUser();
        if (user) {
          const updatedUser: User = {
            ...user,
            subscriptionType: planId.toUpperCase() as 'TRIAL' | 'BASIC' | 'PREMIUM'
          };
          localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        }
        observer.next(true);
        observer.complete();
      }, 1000);
    });
  }

  getRemainingTrialDays(): number {
    const user = this.authService.getCurrentUser();
    if (!user || !user.trialEndsAt) return 0;

    const now = new Date();
    const trialEnd = new Date(user.trialEndsAt);
    const diffTime = trialEnd.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return Math.max(0, diffDays);
  }
}