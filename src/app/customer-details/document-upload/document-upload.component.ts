import { Component, Input } from '@angular/core';
import { DocumentService } from '../../service/document.service';
import { SafeUrlPipe } from '../../pipes/safe-url.pipe';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.scss'],
  standalone: true,
  imports: [SafeUrlPipe, CommonModule],
})
export class DocumentUploadComponent {
  @Input() customer!: any;
  selectedFile: File | null = null;
  documents: Array<{
    name: string;
    document_type: string;
    viewingDocumentUrl?: string;
  }> = [];

  constructor(
    private documentService: DocumentService,
    private sanitizer: DomSanitizer
  ) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  getDocumentType(mimeType: string): string {
    switch (mimeType) {
      case 'image/jpeg':
        return 'jpg';
      case 'image/png':
        return 'png';
      case 'application/pdf':
        return 'pdf';
      default:
        return 'unknown';
    }
  }

  generateDocumentViewerUrl(file: File): string {
    return URL.createObjectURL(file);
  }

  renameDocument(document: any): void {
    console.log(document);
  }

  deleteDocument(document: any): void {
    console.log(document);
  }

  downloadDocument(document: any): void {
    console.log(document);
  }

  ngOnInit() {
    this.documents = this.customer.documents.map((doc: any) => {
      console.log('URL do documento:', doc.file);

      return {
        ...doc,
        viewingDocumentUrl: doc.file
          ? this.sanitizer.bypassSecurityTrustUrl(doc.file)
          : '',
      };
    });

    this.documents.forEach((doc) => {
      console.log('URL segura para o documento:', doc.viewingDocumentUrl);
    });
  }

  onUpload(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('name', this.selectedFile.name);

      const documentType = this.getDocumentType(this.selectedFile.type);
      formData.append('document_type', documentType);

      this.documentService.addDocument(formData, this.customer.id).subscribe({
        next: (response) => {
          const documentUrl = this.generateDocumentViewerUrl(
            this.selectedFile!
          );

          this.documents.push({
            name: this.selectedFile!.name,
            document_type: this.selectedFile!.type,
            viewingDocumentUrl: response.data.viewingDocumentUrl,
          });

          this.selectedFile = null;
        },
        error: (error) => {
          console.error('onUpload Document error', error);
        },
      });
    }
  }
}
