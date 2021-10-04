import { Component, Input, OnInit } from '@angular/core';
import { IMortgage } from '../payment/mortgage';
import { CalcService } from '../services/calc.service';

@Component({
  selector: 'summary-app',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent implements OnInit {
  header = 'Calculation Summary';

  termSummary: any = {};
  ammortizationSummary: any = {};
  paymentdetails: IMortgage;

  constructor(private calcService: CalcService) {}

  ngOnInit() {
    this.calcService.calTermPayment.subscribe(
      (termSummary) => (this.termSummary = termSummary)
    );
    this.calcService.calAmmortizationPayment.subscribe(
      (ammortizationSummary) =>
        (this.ammortizationSummary = ammortizationSummary)
    );

    this.calcService.calPaymentDetails.subscribe(
      (paymentdetails) => (this.paymentdetails = paymentdetails)
    );
  }

  showDiv = {
    numberofPayments: false,
    payment: false,
    prepayment: false,
    principalPayment: false,
    interestPayments: false,
    totalCost: false,
    summaryReport : false,
  };

  showSummaryReport(){
    this.showDiv.summaryReport = !this.showDiv.summaryReport;
  }
}
