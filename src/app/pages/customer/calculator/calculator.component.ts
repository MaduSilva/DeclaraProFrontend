import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CustomerAccountService } from '../../../service/customer-account.service';
import { FormsModule, NgForm } from '@angular/forms';
import {
  CalculatorProps,
  CalculatorResponse,
  DEFAULT_CALCULATOR_DATA,
} from '../../../types/CustomerAccountTypes';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class CalculatorComponent {
  result: CalculatorResponse | null = null;
  @Input() calculatorData: CalculatorProps = { ...DEFAULT_CALCULATOR_DATA };
  constructor(private customerAccountService: CustomerAccountService) {}

  labels: Record<string, string> = {
    income: 'Renda total anual',
    inss: 'INSS pago',
    private_pension: 'Previdência privada',
    paid_irrf: 'IRRF já pago',
    dependents: 'Número de dependentes',
    education: 'Despesas com educação',
    health: 'Despesas com saúde',
    alimony: 'Pensão alimentícia',
  };

  formSubmitted = false;

  calculate(customerData: any, form: NgForm): void {
    this.formSubmitted = true;

    Object.values(form.controls).forEach((control) => control.markAsTouched());

    if (!form.valid) {
      this.result = null;
      return;
    }
    const sanitizedData: CalculatorProps = Object.fromEntries(
      Object.entries(customerData).filter(([key, value]) => value !== null)
    ) as CalculatorProps;

    console.log(customerData);

    this.customerAccountService.calculate(sanitizedData).subscribe({
      next: (response) => {
        this.result = response.data;
        console.log(response.data);
      },
      error: (error: any) => {
        alert('Erro ao calcular, tente novamente mais tarde.');
        console.error('calculate error', error);
      },
    });
  }
}
