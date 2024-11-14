import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  DEFAULT_CUSTOMER_DATA,
  ICustomerData,
} from '../../../types/CustomerTypes';

@Component({
  selector: 'app-add-customer-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="modal" *ngIf="visible">
      <div class="modal-overlay"></div>
      <div class="modal-content">
        <span class="close" (click)="closeModal()">&times;</span>
        <h2 class="modal-title">Adicionar Novo Cliente</h2>
        <form (ngSubmit)="onSubmit()" class="modal-form">
          <div class="form-row">
            <div class="input-group">
              <label for="name">Nome:</label>
              <input
                type="text"
                id="name"
                [(ngModel)]="customerData.name"
                name="name"
                required
              />
            </div>
            <div class="input-group">
              <label for="email">Email:</label>
              <input
                type="email"
                id="email"
                [(ngModel)]="customerData.email"
                name="email"
                required
              />
            </div>
            <div class="input-group">
              <label for="phone">Telefone:</label>
              <input
                type="tel"
                id="phone"
                [(ngModel)]="customerData.phone"
                name="phone"
              />
            </div>
          </div>
          <div class="form-row">
            <div class="input-group">
              <label for="cpf">CPF:</label>
              <input
                type="text"
                id="cpf"
                [(ngModel)]="customerData.cpf"
                name="cpf"
              />
            </div>
            <div class="input-group">
              <label for="birthDate">Data de Nascimento:</label>
              <input
                type="date"
                id="birthDate"
                [(ngModel)]="customerData.birthDate"
                name="birthDate"
              />
            </div>
            <div class="input-group">
              <label for="status">Status:</label>
              <select
                id="status"
                [(ngModel)]="customerData.status"
                name="status"
                required
              >
                <option *ngFor="let status of statusOptions" [value]="status">
                  {{ status }}
                </option>
              </select>
            </div>
          </div>
          <button type="submit" class="submit-btn">Adicionar</button>
        </form>
      </div>
    </div>
  `,
  styleUrls: ['./add-customer-modal.component.scss'],
})
export class AddCustomerModalComponent {
  @Input() visible = false;
  @Input() customerData: ICustomerData = { ...DEFAULT_CUSTOMER_DATA };
  @Output() close = new EventEmitter<void>();
  @Output() addCustomer = new EventEmitter<any>();

  statusOptions = [
    'Em Análise',
    'Declaração Enviada',
    'Concluído',
    'Documento Pendente',
  ];

  closeModal() {
    this.close.emit();
  }

  onSubmit() {
    this.addCustomer.emit(this.customerData);
  }
}
