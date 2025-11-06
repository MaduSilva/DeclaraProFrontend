import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../../service/customer.service';
import { CommonModule } from '@angular/common';
import { Observable, map, switchMap } from 'rxjs';
import { AddCustomerModalComponent } from './components/add-customer-modal/add-customer-modal.component';
import {
  DEFAULT_CUSTOMER_DATA,
  ICustomerData,
} from '../../../types/CustomerTypes';
import { Router } from '@angular/router';
import { ConfirmDeleteModalComponent } from './components/confirm-delete-modal/confirm-delete-modal.component';
import { FormsModule } from '@angular/forms';
import { ConfirmDataModalComponent } from './components/confirm-data-modal/confirm-data-modal.componen';

@Component({
  selector: 'app-customers-list',
  standalone: true,
  imports: [
    CommonModule,
    AddCustomerModalComponent,
    ConfirmDeleteModalComponent,
    FormsModule,
    ConfirmDataModalComponent,
  ],
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss'],
})
export class CustomersListComponent implements OnInit {
  customers$: Observable<ICustomerData[]> | null = null;
  showAddCustomerModal = false;
  showConfirmDeleteModal = false;
  showConfirmDataModal = false;
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
  }

  openConfirmDeleteModal(customer: ICustomerData): void {
    this.customerToDelete = customer;
    this.showConfirmDeleteModal = true;
  }

  closeConfirmDeleteModal(): void {
    this.showConfirmDeleteModal = false;
    this.customerToDelete = undefined;
  }

  closeConfirmDataModal(): void {
    this.showConfirmDataModal = false;
    this.customerData = { ...DEFAULT_CUSTOMER_DATA };
  }

  goToCustomerDetails(customer: ICustomerData): void {
    this.router.navigate([`/customers/${customer.id}`], {
      state: { customer },
    });
  }

  addNewCustomer(customerData: any): void {
    this.customerService
      .addCustomer(customerData)
      .pipe(
        switchMap((addResponse) => {
          this.customerData = addResponse.data;
          return this.customerService.getCustomers();
        })
      )
      .subscribe({
        next: (response: any) => {
          const updatedCustomers = response.data;
          this.customers$ = new Observable((observer) => {
            observer.next(updatedCustomers);
            observer.complete();
          });
          this.showConfirmDataModal = true;
          this.closeAddCustomerModal();
        },
        error: (error: any) => {
          alert(
            'Erro ao atualizar dados do cliente, tente novamente mais tarde.'
          );
          console.error('addNewCustomer error', error);
        },
      });
  }

  editCustomer(customerId: any, updatedData: { status: string }): void {
    this.customerService
      .editCustomer(customerId, updatedData)
      .pipe(switchMap(() => this.customerService.getCustomers()))
      .subscribe({
        next: (response: any) => {
          this.customers$ = new Observable<ICustomerData[]>((observer) => {
            observer.next(response.data);
            observer.complete();
          });
        },
        error: (error: any) => {
          console.error('editCustomer error', error);
        },
      });
  }

  handleStatusChange(customerId: number, event: Event): void {
    const target = event.target as HTMLSelectElement;
    const newStatus = target?.value || '';

    if (newStatus) {
      this.editCustomer(customerId, { status: newStatus });
    }
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
