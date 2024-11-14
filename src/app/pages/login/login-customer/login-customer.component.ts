import { Component } from '@angular/core';
import { AuthService } from '../../../service/auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-customer',
  templateUrl: './login-customer.component.html',
  styleUrls: ['./login-customer.component.scss'],
  imports: [CommonModule, FormsModule],
  standalone: true,
})
export class LoginCustomerComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.loginCustomer(this.username, this.password).subscribe(
      () => {
        this.router.navigate(['/clientes-dashboard']);
      },
      (error: any) => {
        this.errorMessage = 'Login inválido. Por favor, tente novamente';
      }
    );
  }
}
