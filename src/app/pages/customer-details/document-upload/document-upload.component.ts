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
import { FormsModule } from '@angular/forms';

interface DocumentProps {
  id: number;
  name: string;
  file?: string;
  viewingDocumentUrl?: SafeResourceUrl;
  newName?: string;
  extension?: string;
}

@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class DocumentUploadComponent implements OnInit {
  @Input() customer: ICustomerData = DEFAULT_CUSTOMER_DATA;
  selectedFile: File | null = null;
  editingDocumentId: number | null = null;

  documents: DocumentProps[] = [];
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
      this.documents = this.customer.documents
        .map((doc: IDocumentData): DocumentProps => {
          const extension = doc.name.split('.').pop()?.toLowerCase() || '';
          return {
            ...doc,
            newName: doc.name,
            extension,
            viewingDocumentUrl: doc.file
              ? this.sanitizer.bypassSecurityTrustResourceUrl(
                  `${environment.apiUrl}${doc.file}`
                )
              : '',
          };
        })
        .reverse();
    }
  }

  onUpload(): void {
    if (this.selectedFile && this.customer) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('name', this.selectedFile.name);

      console.log(formData);
      const extension = this.selectedFile.name.substring(
        this.selectedFile.name.lastIndexOf('.')
      );
      formData.append('document_type', extension);

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

  startRenaming(document: any): void {
    this.editingDocumentId = document.id;
    document.newName = document.name;
  }

  saveRenamedDocument(document: any): void {
    if (!document.newName || document.newName.trim() === '') return;

    this.documentService
      .renameDocument(this.customer.id, document.id, document.newName)
      .subscribe({
        next: () => {
          this.editingDocumentId = null;
          console.log(document.viewingDocumentUrl);
          window.location.reload();
        },
        error: (err) => {
          console.error('Erro ao renomear documento', err);
        },
      });
  }
}
