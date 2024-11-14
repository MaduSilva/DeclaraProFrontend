import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { ICustomerData } from '../../types/CustomerTypes';
import { Observable, map } from 'rxjs';
import { AuthService } from '../../service/auth/auth.service'

@Component({
  selector: 'app-clientes-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clientes-dashboard.component.html',
  styleUrl: './clientes-dashboard.component.scss'
})
export class ClientesDashboardComponent {
  customer$: Observable<ICustomerData> | null = null;

  constructor(private customerService: CustomerService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    const userId = this.authService.getUserId();
    if (userId !== null) {
      this.customer$ = this.customerService
        .getClienteHomeData(userId)
        .pipe(map((response) => response.data));
    } else {
      console.error('Não foi encontrado o user id para esse customer');
      alert('Ocorreu um erro, tente novamente mais tarde.')
    }
  }
}