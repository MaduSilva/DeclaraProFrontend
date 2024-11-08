export enum DocumentTypes {
  PDF = 'application/pdf',
  DOCX = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  JPG = 'image/jpeg',
  PNG = 'image/png',
}

export interface IDocumentData {
  id: number;
  name: string;
  file: string;
}
