import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ICustomerData } from '../../types/CustomerTypes';
import { DocumentUploadComponent } from './document-upload/document-upload.component';
import { CommonModule } from '@angular/common';
import { Observable, map } from 'rxjs';
import { CustomerService } from '../../service/customer.service';

@Component({
  selector: 'app-customer-details',
  standalone: true,
  imports: [DocumentUploadComponent, CommonModule],
  templateUrl: './customer-details.component.html',
  styleUrl: './customer-details.component.scss',
})
export class CustomerDetailsComponent implements OnInit {
  customer$: Observable<ICustomerData> | null = null;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customer$ = this.customerService
      .getOneCustomer(history.state.customer.id)
      .pipe(map((response) => response.data));
  }
}
