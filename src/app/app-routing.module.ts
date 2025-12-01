import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { RecommendationListComponent } from './modules/recommendations/list/recommendation-list.component';
import { RecommendationDetailComponent } from './modules/recommendations/detail/recommendation-detail.component';
import { BacktestingComponent } from './modules/backtesting/backtesting.component';
import { SubscriptionComponent } from './modules/subscription/subscription.component';
import { SettingsComponent } from './modules/settings/settings.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'recommendations', component: RecommendationListComponent },
      { path: 'recommendations/:id', component: RecommendationDetailComponent },
      { path: 'backtesting', component: BacktestingComponent },
      { path: 'subscription', component: SubscriptionComponent },
      { path: 'settings', component: SettingsComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
