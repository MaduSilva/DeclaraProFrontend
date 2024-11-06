import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-delete-modal',
  standalone: true,
  template: `
    <div class="modal-overlay">
      <div class="modal-content">
        <h3>
          Are you sure you want to delete the customer: {{ customerName }}?
        </h3>
        <div class="modal-buttons">
          <button (click)="onConfirm()">Yes</button>
          <button (click)="onCancel()">No</button>
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
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .modal-content {
        background: white;
        padding: 20px;
        border-radius: 5px;
        text-align: center;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
      }
      .modal-buttons {
        margin-top: 15px;
      }
      button {
        margin: 0 10px;
        padding: 10px 15px;
        cursor: pointer;
        border: none;
        border-radius: 5px;
        background-color: #007bff;
        color: white;
      }
      button:hover {
        background-color: #0056b3;
      }
    `,
  ],
})
export class ConfirmDeleteModalComponent {
  @Input() customerName: string | undefined;
  @Output() confirmDeletion = new EventEmitter<void>();
  @Output() closeModal = new EventEmitter<void>();

  onConfirm(): void {
    this.confirmDeletion.emit();
  }

  onCancel(): void {
    this.closeModal.emit();
  }
}
