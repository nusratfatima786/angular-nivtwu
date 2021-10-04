export interface IMortgage {
  amount: number;
  rate: string;
  amortizationPeriodYears: string;
  amortizationPeriodMonth: string;
  paymentFrequency: string;
  term: string;
  prepaymentAmount: number;
  prepaymentFreq : string;
  startsWith: number

}

export class Mortgage implements IMortgage {
  constructor(
    public amount: number,
    public rate: string,
    public amortizationPeriodYears: string,
    public amortizationPeriodMonth: string,
    public paymentFrequency: string,
    public term: string,
    public prepaymentAmount: number,
    public prepaymentFreq: string,
    public startsWith: number
  ) {}
}
