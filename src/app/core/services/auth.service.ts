import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

export interface User {
  id: string;
  email: string;
  subscriptionType: 'TRIAL' | 'BASIC' | 'PREMIUM';
  trialEndsAt?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private router: Router) {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

  login(email: string, password: string): Observable<boolean> {
    return new Observable(observer => {
      // Mock authentication - in real app, call backend API
      setTimeout(() => {
        const mockUser: User = {
          id: '1',
          email: email,
          subscriptionType: 'TRIAL',
          trialEndsAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // 3 days from now
        };
        
        localStorage.setItem('currentUser', JSON.stringify(mockUser));
        this.currentUserSubject.next(mockUser);
        observer.next(true);
        observer.complete();
      }, 500);
    });
  }

  register(email: string, password: string): Observable<boolean> {
    return new Observable(observer => {
      // Mock registration
      setTimeout(() => {
        const mockUser: User = {
          id: '1',
          email: email,
          subscriptionType: 'TRIAL',
          trialEndsAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
        };
        
        localStorage.setItem('currentUser', JSON.stringify(mockUser));
        this.currentUserSubject.next(mockUser);
        observer.next(true);
        observer.complete();
      }, 500);
    });
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}