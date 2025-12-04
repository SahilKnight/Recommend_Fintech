import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  email = '';
  isSubmitted = false;
  
  onWaitlistSubmit(): void {
    if (this.email) {
      // Mock waitlist submission
      this.isSubmitted = true;
      setTimeout(() => {
        this.isSubmitted = false;
        this.email = '';
      }, 3000);
    }
  }
}