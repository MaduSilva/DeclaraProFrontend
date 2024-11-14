import { Component } from '@angular/core';
import { AuthService } from '../../../service/auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.scss'],
  imports: [CommonModule, FormsModule],
  standalone: true,
})
export class LoginAdminComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.loginAdmin(this.username, this.password).subscribe(
      () => {
        this.router.navigate(['/customers']);
      },
      (error: any) => {
        this.errorMessage = 'Login inválido. Por favor, tente novamente';
      }
    );
  }
}
