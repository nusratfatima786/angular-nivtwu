// property bindings example
//import { PaymentComponent } from './payment.component';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { PaymentService } from './payment.service';
import { Mortgage, IMortgage } from './mortgage';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

describe('Payment Service ', () => {
  let dbgElement: ComponentFixture;
  let element: HTMLElement;
  let paymentService: PaymentService;

  const paymentDetails: IMortgage = {
    amount: 100000,
    rate: '5',
    amortizationPeriodMonth: '0 Months',
    amortizationPeriodYears: '25 years',
    paymentFrequency: 'Monthly (12x per year)',
    term: '5 years',
    prepaymentAmount: 0,
    prepaymentFreq: '',
    startsWith: 1,
  };

  beforeEach(() => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(
      BrowserDynamicTestingModule,
      platformBrowserDynamicTesting()
    );

    TestBed.configureTestingModule({
      providers: [PaymentService],
    });

    paymentService = TestBed.get(PaymentService);
  });

  it(' Calculae total princial payment ', () => {
    let testResult: any = Number(paymentDetails.amount)
    console.log('Term Ammortization Cost -> ' + testResult);
    expect(testResult).toBe(175377);
  });

  it(' Calculae total ammortization cost ', () => {
    let testResult: any = Math.round(
      paymentService.calculateTotalCost(paymentDetails)
    );
    console.log('Term Ammortization Cost -> ' + testResult);
    expect(testResult).toBe(175377);
  });

  it(' Calculae total ammortization interest  ', () => {
    let testResult: any = Math.round(
      paymentService.calculateTotalInterest(paymentDetails)
    );
    console.log('Term Ammortization Cost -> ' + testResult);
    expect(testResult).toBe(75377);
  });

  it(' Calculae total ammoritzation payments ', () => {
    let testResult: any =
      paymentService.calculateAmmortizationNumPayments(paymentDetails);
    console.log('Ammortization Payments -> ' + testResult);
    expect(testResult).toBe(300);
  });

  it(' Calculae total term payments ', () => {
    let testResult: any =
      paymentService.calculateTermNumPayments(paymentDetails);
    console.log('Term Payments -> ' + testResult);
    expect(testResult).toBe(60);
  });

  it(' Calculae monthy mortgage payments ', () => {
    let testResult: any = Math.round(
      paymentService.calculateMonthlyMortgage(paymentDetails)
    );
    console.log('Monthly Mortgage -> ' + testResult);
    expect(testResult).toBe(585);
  });
});
