import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ICustomerData } from '../../../types/CustomerTypes';
import { DocumentUploadComponent } from './components/document-upload/document-upload.component';
import { CommonModule } from '@angular/common';
import { Observable, map } from 'rxjs';
import { CustomerService } from '../../../service/customer.service';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-customer-details',
  standalone: true,
  imports: [
    DocumentUploadComponent,
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './customer-details.component.html',
  styleUrl: './customer-details.component.scss',
})
export class CustomerDetailsComponent implements OnInit {
  customer$: Observable<ICustomerData> | null = null;
  isEditing = false;
  editableCustomer: ICustomerData = {} as ICustomerData;
  isPasswordResetModalOpen = false;
  newPassword: string = '';

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.loadCustomers();
    this.loadEditableCustomer();
  }

  loadCustomers(): void {
    this.customer$ = this.customerService
      .getOneCustomer(history.state.customer.id)
      .pipe(map((response) => response.data));
  }

  loadEditableCustomer(): void {
    if (this.customer$) {
      this.customer$.subscribe((customer) => {
        this.editableCustomer = { ...customer };
      });
    }
  }

  toggleEditMode(): void {
    this.isEditing = !this.isEditing;
  }

  editCustomerInfo(): void {
    if (this.editableCustomer) {
      this.customerService
        .editCustomer(this.editableCustomer.id, this.editableCustomer)
        .subscribe({
          next: () => {
            this.isEditing = false;
            alert('Cliente editado com sucesso.');
            window.location.reload();
          },
          error: (error) => {
            alert(
              'Erro ao atualizar dados do cliente, tente novamente mais tarde.'
            );
            console.error('editCustomerInfo Error: ', error);
          },
        });
    }
  }

  openResetPasswordModal(): void {
    this.isPasswordResetModalOpen = true;
  }

  closeResetPasswordModal(): void {
    this.isPasswordResetModalOpen = false;
    this.newPassword = '';
  }

  resetPassword(): void {
    if (this.newPassword) {
      this.customerService
        .editPasswordCustomer(history.state.customer.id, this.newPassword)
        .subscribe({
          next: () => {
            alert('Senha redefinida com sucesso.');
            this.closeResetPasswordModal();
          },
          error: (error: any) => {
            alert('Erro ao redefinir senha, tente novamente mais tarde.');
            console.error('resetPassword Error: ', error);
          },
        });
    } else {
      alert('Por favor, insira uma nova senha.');
    }
  }
}
