import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { CommonModule } from '@angular/common';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-customers-list',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent implements OnInit {
  //TODO: Lembrar de tipar isso corretamente
  customers$: Observable<any> | null | undefined;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.customers$ = this.customerService.getCustomers().pipe(
      map(response => response)  
    );

  
  }

  // addCustomer(): void {}

  // removeCustomer(): void {}
}
