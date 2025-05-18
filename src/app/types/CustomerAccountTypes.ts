export type CalculatorResponse = {
  taxable_amount: number;
  tax_due: number;
  paid_irrf: number;
  amountDifference: number;
  isRefund: boolean;
  deduction: string;
};

export type CalculatorProps = {
  income: number | null;
  inss: number | null;
  private_pension: number | null;
  paid_irrf: number | null;
  dependents: number | null;
  education: number | null;
  health: number | null;
  alimony: number | null;
  [key: string]: number | null;
};

export const DEFAULT_CALCULATOR_DATA: CalculatorProps = {
  income: null,
  inss: null,
  private_pension: null,
  paid_irrf: null,
  dependents: null,
  education: null,
  health: null,
  alimony: null,
};
