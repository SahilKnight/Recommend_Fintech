import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { 
    path: 'login', 
    loadComponent: () => import('./modules/auth/login/login.component').then(m => m.LoginComponent)
  },
  { 
    path: 'register', 
    loadComponent: () => import('./modules/auth/register/register.component').then(m => m.RegisterComponent)
  },
  { 
    path: 'dashboard', 
    loadComponent: () => import('./modules/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [AuthGuard]
  },
  { 
    path: 'recommendations', 
    loadComponent: () => import('./modules/recommendations/list/recommendation-list.component').then(m => m.RecommendationListComponent),
    canActivate: [AuthGuard]
  },
  { 
    path: 'recommendations/:id', 
    loadComponent: () => import('./modules/recommendations/detail/recommendation-detail.component').then(m => m.RecommendationDetailComponent),
    canActivate: [AuthGuard]
  },
  { 
    path: 'subscription', 
    loadComponent: () => import('./modules/subscription/subscription.component').then(m => m.SubscriptionComponent),
    canActivate: [AuthGuard]
  }
];
