import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DocumentService } from '../../../service/document.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from '../../../enviroment';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  DEFAULT_CUSTOMER_DATA,
  ICustomerData,
} from '../../../types/CustomerTypes';
import { IDocumentData } from '../../../types/DocumentTypes';

@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class DocumentUploadComponent implements OnInit {
  @Input() customer: ICustomerData = DEFAULT_CUSTOMER_DATA;
  selectedFile: File | null = null;
  documents: Array<{
    id: number;
    name: string;
    viewingDocumentUrl?: SafeResourceUrl;
    file?: string;
  }> = [];
  @ViewChild('successTemplate', { static: true }) successTemplate: any;

  constructor(
    private documentService: DocumentService,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog,
    private router: Router
  ) {}

  openModal(): void {
    alert('Documento excluído com sucesso');
    window.location.reload();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  generateDocumentViewerUrl(file: File): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      URL.createObjectURL(file)
    );
  }

  renameDocument(document: any): void {
    console.log(document);
  }

  deleteDocument(customerId: number, documentId: number) {
    this.documentService.deleteDocument(customerId, documentId).subscribe(
      (response) => {
        this.openModal();
      },
      (error) => {
        console.error('Erro ao excluir documento', error);
      }
    );
  }

  downloadDocument(document: any): void {
    const documentUrl = `${environment.apiUrl}${document.file}`;
    const link = window.document.createElement('a');
    link.href = documentUrl;
    link.download = document.name;
    link.target = '_blank';
    link.click();
  }

  ngOnInit() {
    if (this.customer && this.customer.documents) {
      this.documents = this.customer.documents.map((doc: IDocumentData) => {
        return {
          ...doc,
          viewingDocumentUrl: doc.file
            ? this.sanitizer.bypassSecurityTrustResourceUrl(
                `${environment.apiUrl}${doc.file}`
              )
            : '',
        };
      });
    }
  }

  onUpload(): void {
    if (this.selectedFile && this.customer) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('name', this.selectedFile.name);

      this.documentService.addDocument(formData, this.customer.id).subscribe({
        next: (response) => {
          const documentUrl = response.data.viewingDocumentUrl;

          this.documents.push({
            id: response.data.id,
            name: this.selectedFile!.name,
            viewingDocumentUrl: this.sanitizer.bypassSecurityTrustResourceUrl(
              `${environment.apiUrl}${documentUrl}`
            ),
          });

          this.selectedFile = null;
          window.location.reload();
        },
        error: (error) => {
          console.error('onUpload Document error', error);
        },
      });
    }
  }
}
