import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../service/customer.service';
import { CommonModule } from '@angular/common';
import { Observable, map, switchMap } from 'rxjs';
import { AddCustomerModalComponent } from './add-customer-modal/add-customer-modal.component';
import {
  DEFAULT_CUSTOMER_DATA,
  ICustomerData,
} from './add-customer-modal/customer.data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers-list',
  standalone: true,
  imports: [CommonModule, AddCustomerModalComponent],
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss'],
})
export class CustomersListComponent implements OnInit {
  customers$: Observable<ICustomerData[]> | null = null;
  showAddCustomerModal = false;
  customerData: ICustomerData = { ...DEFAULT_CUSTOMER_DATA };

  constructor(
    private router: Router,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customers$ = this.customerService
      .getCustomers()
      .pipe(map((response) => response.data));
  }

  handleAddNewCustomer(): void {
    this.showAddCustomerModal = true;
  }

  closeAddCustomerModal(): void {
    this.showAddCustomerModal = false;
    this.customerData = { ...DEFAULT_CUSTOMER_DATA };
  }

  goToCustomerDetails(customer: ICustomerData): void {
    this.router.navigate([`/customers/${customer.id}`], {
      state: { customer },
    });
  }

  addNewCustomer(customerData: ICustomerData): void {
    this.customerService
      .addCustomer(customerData)
      .pipe(
        switchMap(() => this.customerService.getCustomers()),
        map((response) => response.data)
      )
      .subscribe(
        //TODO: Substituir esse subscribe pois tá deprecated
        (updatedCustomers) => {
          this.customers$ = new Observable((observer) => {
            observer.next(updatedCustomers);
            observer.complete();
          });
          this.closeAddCustomerModal();
        },
        (error) => {
          console.error('addNewCostumer error', error);
        }
      );
  }
}
