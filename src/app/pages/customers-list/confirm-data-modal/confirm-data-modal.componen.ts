import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICustomerData } from '../../../types/CustomerTypes';

@Component({
  selector: 'app-confirm-data-modal',
  standalone: true,
  template: `
    <div class="modal-overlay">
      <div class="modal-content">
        <h3>Cliente Cadastrado</h3>
        <h6>{{ customerData?.name }}</h6>
        <h6>{{ customerData?.cpf }}</h6>
        <h6>{{ customerData?.birthDate }}</h6>
        <h6>{{ customerData?.email }}</h6>
        <h6>{{ customerData?.phone }}</h6>
        <h6>{{ customerData?.status }}</h6>
        <h4>
          Atenção! <br />
          Guarde essas credenciais pois só será possível visualizar agora.
        </h4>
        <h6>Login do cliente: {{ customerData?.email }}</h6>
        <h6>Senha do cliente: {{ customerData?.raw_password }}</h6>
        <div class="modal-buttons">
          <button (click)="onConfirm()">Okay</button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.4);
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all 0.3s ease-in-out;
      }

      .modal-content {
        background: #fff;
        width: 100%;
        max-width: 600px;
        padding: 25px;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        animation: modalAppear 0.3s ease-out;
        text-align: center;
        position: relative;
        max-height: 80vh;
        overflow-y: auto;
      }

      @keyframes modalAppear {
        0% {
          opacity: 0;
          transform: translateY(-30px);
        }
        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }

      h3 {
        font-size: 1.8rem;
        font-weight: 600;
        color: #333;
        margin-bottom: 20px;
      }

      h4 {
        font-size: 1.2rem;
        color: #ff6f61;
        font-weight: 500;
        margin-top: 20px;
      }

      h6 {
        font-size: 1rem;
        color: #555;
        margin-bottom: 10px;
        line-height: 1.5;
      }

      button {
        background-color: #007bff;
        color: white;
        border: none;
        padding: 12px 25px;
        font-size: 1rem;
        font-weight: 500;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;
        margin-top: 15px;
      }

      button:hover {
        background-color: #0056b3;
      }

      .modal-buttons {
        display: flex;
        justify-content: center;
        margin-top: 25px;
      }

      .modal-overlay:focus {
        outline: none;
      }

      @media (max-width: 768px) {
        .modal-content {
          width: 90%;
          padding: 20px;
        }

        h3 {
          font-size: 1.5rem;
        }

        h4 {
          font-size: 1rem;
        }

        h6 {
          font-size: 0.9rem;
        }

        button {
          font-size: 0.9rem;
        }
      }
    `,
  ],
})
export class ConfirmDataModalComponent {
  @Input() customerData: ICustomerData | undefined;
  @Output() closeModal = new EventEmitter<void>();

  onConfirm(): void {
    this.closeModal.emit();
  }
}
