import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  isLoggedIn: boolean = false;
  isCustomer: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  
  goToPrivacyPolicy(): void {
    this.router.navigate(['/politica-de-privacidade']);
  }


}
