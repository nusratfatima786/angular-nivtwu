import { Component, Input, OnInit } from '@angular/core';
import { IMortgage } from '../payment/mortgage';
import { CalcService } from '../services/calc.service';

@Component({
  selector: 'payment-schedule',
  templateUrl: './detailed.component.html',
  styleUrls: ['./detailed.component.css'],
})
export class DetailedComponent implements OnInit {
  header = ' Term Payment Schedule';

  termDetailedSummary: any = {};
  termSummary: any = {};

  constructor(private calcService: CalcService) {}

  ngOnInit() {
    this.calcService.calTermPayment.subscribe(
      (termSummary) => (this.termSummary = termSummary)
    );
    this.termDetailedSummary = this.termSummary.detailedTermSummary;
  }

  ConvertToInt(val){
    return  Number(val);
  }
}
