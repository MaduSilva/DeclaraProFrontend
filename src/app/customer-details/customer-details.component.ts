import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICustomerData } from '../customers-list/add-customer-modal/customer.data';
import { DocumentUploadComponent } from './document-upload/document-upload.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-details',
  standalone: true,
  imports: [DocumentUploadComponent, CommonModule],
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
