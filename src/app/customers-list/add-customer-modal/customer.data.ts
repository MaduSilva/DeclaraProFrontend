export interface ICustomerData {
  id: number;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  birthDate: string;
  status: string;
}

export const DEFAULT_CUSTOMER_DATA: ICustomerData = {
  name: '',
  email: '',
  phone: '',
  cpf: '',
  birthDate: '',
  status: '',
  id: 0,
};
