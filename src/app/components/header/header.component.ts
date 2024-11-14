import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isLoggedIn: boolean = false;
  isCustomer: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
    this.authService.isCustomer$.subscribe((customer) => {
      this.isCustomer = customer;
    });
  }

  goToCustomers(): void {
    this.router.navigate(['/customers/']);
  }

  goToHomeClientes(): void {
    this.router.navigate(['/clientes-dashboard/']);
  }

  goToLoginCustomer(): void {
    this.router.navigate(['/login-cliente']);
  }

  goToLoginAdmin(): void {
    this.router.navigate(['/login']);
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.isCustomer = false;
    window.location.href = '/login';
  }
}
