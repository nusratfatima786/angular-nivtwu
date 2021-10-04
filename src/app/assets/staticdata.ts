export interface IStaticData {
  amortizationYears: string[];
  amortizationMonths: string[];
  paymentFrequeny: string[];
  term: string[];
  prepaymentFrequency: string[]
}

export class Staticdata implements IStaticData {
  constructor(
    public amortizationYears: string[],
    public amortizationMonths: string[],
    public paymentFrequeny: string[],
    public term: string[],
    public prepaymentFrequency: string[]
  ) {}
}
