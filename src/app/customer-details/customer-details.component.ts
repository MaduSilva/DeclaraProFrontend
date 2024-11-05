import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICustomerData } from '../customers-list/add-customer-modal/customer.data';

@Component({
  selector: 'app-customer-details',
  standalone: true,
  imports: [],
  templateUrl: './customer-details.component.html',
  styleUrl: './customer-details.component.scss',
})
export class CustomerDetailsComponent implements OnInit {
  customer?: ICustomerData;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.customer = history.state.customer;

    if (!this.customer) {
      this.router.navigate(['/customers']);
    }
  }
}
