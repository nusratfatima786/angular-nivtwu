import { Component, OnInit } from '@angular/core';
import { Mortgage, IMortgage } from './mortgage';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { MortgageService } from '../assets/mortgage.service';
import { Observable } from 'rxjs/Observable';
import { CalcService } from '../services/calc.service';
import { PaymentService } from './payment.service';

@Component({
  selector: 'paymentplan-app',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  paymentdetails: IMortgage;

  ammortizationYears: string[];
  ammortizationMonths: string[];
  amount: string;
  frequency: string[];
  term: string[];
  perfrequency: string[];
  summaryComponent: any;
  form: FormGroup;
  submitted = false;

  termSummary: any = {};
  ammortizationSummary: any = {};

  showDiv = {
    amountTip: false,
    rateTip: false,
    amortizationTip: false,
    frequencyTip: false,
    preaamountTip: false,
    prefreqTip: false,
    showSummary: true,
  };

  constructor(
    private mortgageService: MortgageService,
    private userService: CalcService,
    private paymentService: PaymentService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      amount: new FormControl('100000', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('^[0-9]*$'),
      ]),
      rate: new FormControl('5.00', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      ammortizationYears: new FormControl('', [
        Validators.required,
        Validators.min(1),
      ]),
      ammortizationMonths: new FormControl('', Validators.required),
      frequency: new FormControl('', Validators.required),
      term: new FormControl('', Validators.required),
      preamount: new FormControl('0.0', Validators.pattern('^[0-9]*$')),
      prefrequency: new FormControl('', Validators.required),
      startswith: new FormControl('1', Validators.pattern('^[0-9]*$')),
    });
  }

  ngOnInit() {
    this.getMortatgeDefaultData();
    this.displayCalculationSummary();
  }

  get f() {
    return this.form.controls;
  }

  getMortatgeDefaultData() {
    this.mortgageService.getMortageAssets().subscribe(
      (mortgageData) => {
        if (mortgageData != null) {
          this.ammortizationYears = mortgageData.amortizationYears;
          this.ammortizationMonths = mortgageData.amortizationMonths;
          this.frequency = mortgageData.paymentFrequeny;
          this.term = mortgageData.term;
          this.perfrequency = mortgageData.prepaymentFrequency;
        }
      },
      (error) => {
        console.log('data not found.');
      }
    );
  }

  submit() {
    console.log('Submit Form :');
    this.submitted = true;
    this.displayCalculationSummary();
  }

  displayCalculationSummary() {
    this.paymentdetails = {
      amount: this.form.value.amount,
      rate: this.form.value.rate,
      amortizationPeriodMonth:
        this.form.value.ammortizationMonths.length == 0
          ? '0 Months'
          : this.form.value.ammortizationMonths,
      amortizationPeriodYears:
        this.form.value.ammortizationYears.length == 0
          ? '25 years'
          : this.form.value.ammortizationYears,
      paymentFrequency:
        this.form.value.frequency.length == 0
          ? 'Monthly (12x per year)'
          : this.form.value.frequency,
      term: this.form.value.term.length == 0 ? '5 years' : this.form.value.term,
      prepaymentAmount: this.form.value.preamount,
      prepaymentFreq: this.form.value.prefrequency,
      startsWith: this.form.value.startswith,
    };

    this.userService.sendPaymentDetails(this.paymentdetails);

    this.termSummary = this.paymentService.termCalculations(
      this.paymentdetails
    );
    this.userService.sendTermPaymentCount(this.termSummary);

    this.ammortizationSummary = this.paymentService.ammortizationCalculations(
      this.paymentdetails
    );
    this.userService.sendAmmortizationPaymentCount(this.ammortizationSummary);
  }
}
