import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Mortgage, IMortgage } from './mortgage';

@Injectable()
export class PaymentService {
  termSummary: any = {};
  ammortizationSummary: any = {};

  name: string = 'headercheck';
  mortgage: number;
  termCount: number;
  termPrincialInterest: any;
  interest: number;
  paymentdetails: IMortgage;

  detailedSummary: any;

  termCalculations(payment: IMortgage): any {
    this.mortgage = this.calculateMonthlyMortgage(payment);
    this.termPrincialInterest = this.calculateTermInterestPayment(payment);
    this.termSummary = {
      numberOfPayments: this.calculateTermNumPayments(payment),
      mortgagePayment: this.mortgage,
      prepayment: Number(payment.prepaymentAmount),
      principalPayment: Number(this.termPrincialInterest.principalPaid),
      interestPayment: Number(this.termPrincialInterest.interest),
      totalCost:
        Number(this.termPrincialInterest.principalPaid) +
        Number(this.termPrincialInterest.interest),
      detailedTermSummary: this.termPrincialInterest.detailedPayments,
    };
    console.log('From Payment Service' + this.termSummary);
    return this.termSummary;
  }

  ammortizationCalculations(payment: IMortgage): any {
    this.mortgage = this.calculateMonthlyMortgage(payment);
    this.termPrincialInterest = this.calculateTermInterestPayment(payment);
    this.ammortizationSummary = {
      numberOfPayments: this.calculateAmmortizationNumPayments(payment),
      mortgagePayment: this.mortgage,
      prepayment: Number(payment.prepaymentAmount),
      principalPayment: Number(payment.amount),
      interestPayment: this.calculateTotalInterest(payment),
      totalCost: this.calculateTotalCost(payment),
    };
    return this.ammortizationSummary;
  }

  public calculateTermNumPayments(payment): number {
    return (
      Number(payment.term.split(' ')[0]) *
      this.GetFreqNumber(payment.paymentFrequency)
    );
  }

  public calculateAmmortizationNumPayments(payment): number {
    let paymentCount: number =
      Number(payment.amortizationPeriodYears.split(' ')[0]) *
        this.GetFreqNumber(payment.paymentFrequency) +
      Number(payment.amortizationPeriodMonth.split(' ')[0]);
    this.ammortizationSummary.numberOfPayments = paymentCount;
    return paymentCount;
  }

  public calculateTotalCost(payment): number {
    return (
      this.calculateMonthlyMortgage(payment) *
      this.calculateAmmortizationNumPayments(payment)
    );
  }

  public calculateTotalInterest(payment): number {
    return this.calculateTotalCost(payment) - Number(payment.amount);
  }

  public calculateTermInterestPayment(payment) {
    let myArray = [];
    let firstPrincipalPaid: number =
      this.mortgage - payment.amount * this.interest;
    let termPaymentMap: {
      principal: number;
      interestPaid: number;
      principalPaid: number;
      remainBal: number;
    } = {
      principal: Number(payment.amount),
      interestPaid: Number(payment.amount) * this.interest,
      principalPaid: this.mortgage - Number(payment.amount) * this.interest,
      remainBal: Number(payment.amount) - firstPrincipalPaid,
    };
    myArray.push(termPaymentMap);
    let counter: number = this.calculateTermNumPayments(payment);
    for (let i = 1; i < counter; i++) {
      let p: number = myArray[i - 1].remainBal;
      let ip: number = p * this.interest;
      let pp: number = this.mortgage - ip;
      let rb: number = Number((p - pp - ip).toFixed(2));
      let termPaymentMap: {
        principal: number;
        interestPaid: number;
        principalPaid: number;
        remainBal: number;
      } = {
        principal: p,
        interestPaid: ip,
        principalPaid: pp,
        remainBal: rb,
      };
      myArray.push(termPaymentMap);
    }

    let totaInterest: number = myArray
      .map((a) => a.interestPaid)
      .reduce(function (a, b) {
        return a + b;
      });
    let totalPrincipal: number = myArray
      .map((a) => a.principalPaid)
      .reduce(function (a, b) {
        return a + b;
      });
    let term: {
      interest: number;
      principalPaid: number;
      detailedPayments: any[];
    } = {
      interest: totaInterest,
      principalPaid: totalPrincipal,
      detailedPayments: myArray,
    };
    return term;
  }

  public calculateMonthlyMortgage(payment): number {
    let principal: number = Number(payment.amount);
    let ai: number =
      Number(payment.rate) /
      (100 * this.GetFreqNumber(payment.paymentFrequency));
    let r: number = Math.pow(
      1 + ai,
      this.calculateAmmortizationNumPayments(payment)
    );
    this.interest = ai;
    return (payment.amount * (ai * r)) / (r - 1);
  }

  public GetFreqNumber(frequency): number {
    let freqMap: { code: string; numvalue: number }[] = [
      {
        code: 'Accelerated Weekly',
        numvalue: 52,
      },
      {
        code: 'Weekly',
        numvalue: 52,
      },
      {
        code: 'Accelerated Bi-Weekly',
        numvalue: 26,
      },
      {
        code: 'Bi-Weekly (every 2 weeks)',
        numvalue: 26,
      },
      ,
      {
        code: 'Bi-Monthly (24x per year)',
        numvalue: 24,
      },
      {
        code: 'Monthly (12x per year)',
        numvalue: 12,
      },
    ];
    let varr = freqMap.filter((a) => a.code == frequency);
    return varr[0].numvalue;
  }
}
