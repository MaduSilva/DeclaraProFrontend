import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { CommonModule } from '@angular/common';
import { Observable, map, switchMap } from 'rxjs';
import { AddCustomerModalComponent } from './add-customer-modal/add-customer-modal.component';
import {
  DEFAULT_CUSTOMER_DATA,
  ICustomerData,
} from '../../types/CustomerTypes';
import { Router } from '@angular/router';
import { ConfirmDeleteModalComponent } from './confirm-delete-modal/confirm-delete-modal.component';

@Component({
  selector: 'app-customers-list',
  standalone: true,
  imports: [
    CommonModule,
    AddCustomerModalComponent,
    ConfirmDeleteModalComponent,
  ],
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss'],
})
export class CustomersListComponent implements OnInit {
  customers$: Observable<ICustomerData[]> | null = null;
  showAddCustomerModal = false;
  showConfirmDeleteModal = false;
  customerData: ICustomerData = { ...DEFAULT_CUSTOMER_DATA };
  customerToDelete: ICustomerData | undefined;

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

  openConfirmDeleteModal(customer: ICustomerData): void {
    this.customerToDelete = customer;
    this.showConfirmDeleteModal = true;
  }

  closeConfirmDeleteModal(): void {
    this.showConfirmDeleteModal = false;
    this.customerToDelete = undefined;
  }

  goToCustomerDetails(customer: ICustomerData): void {
    this.router.navigate([`/customers/${customer.id}`], {
      state: { customer },
    });
  }

  addNewCustomer(customerData: any): void {
    this.customerService
      .addCustomer(customerData)
      .pipe(switchMap(() => this.customerService.getCustomers()))
      .subscribe({
        next: (response: any) => {
          const updatedCustomers = response.data;
          this.customers$ = new Observable((observer) => {
            observer.next(updatedCustomers);
            observer.complete();
          });
          this.closeAddCustomerModal();
        },
        error: (error: any) => {
          console.error('addNewCustomer error', error);
        },
      });
  }

  deleteCustomer(customerId: any): void {
    this.customerService
      .deleteCustomer(customerId)
      .pipe(switchMap(() => this.customerService.getCustomers()))
      .subscribe({
        next: (response: any) => {
          this.customers$ = new Observable<ICustomerData[]>((observer) => {
            observer.next(response.data);
            observer.complete();
          });
          this.closeConfirmDeleteModal();
        },
        error: (error: any) => {
          console.error('deleteCustomer error', error);
        },
      });
  }
}
