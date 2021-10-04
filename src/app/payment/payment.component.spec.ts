// property bindings example
import { PaymentComponent } from './payment.component';
import {
  TestBed,
  ComponentFixture,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CalcService } from '../services/calc.service';
import { PaymentService } from './payment.service';
import { delay } from 'rxjs/operators';
import { Mortgage, IMortgage } from './mortgage';
import { expressionChangedAfterItHasBeenCheckedError } from '@angular/core/src/view/errors';
import { summaryFileName } from '@angular/compiler/src/aot/util';
import { pureArrayDef } from '@angular/core/src/view/pure_expression';

describe('SummaryComponent', () => {
  let component: PaymentComponent;
  let fixture: ComponentFixture<PaymentComponent>;
  let dbgElement: ComponentFixture;
  let element: HTMLElement;
  let calcService: CalcService;
  let paymentService: PaymentService;

  const createFakeFile = (fileName: string = 'fileName'): File => {
    const blob = new Blob([''], { type: 'text/html' });
    blob['lastModifiedDate'] = '';
    blob['name'] = fileName;
    return <File>blob;
  };

  const paymentDetails: IMortgage = {
    amount: 100000,
    rate: '5',
    amortizationPeriodMonth: '25 Months',
    amortizationPeriodYears: '25 years',
    paymentFrequency: 'Monthly (12x per year)',
    term: '5 years',
    prepaymentAmount: 0,
    prepaymentFreq: '',
    startsWith: 1,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentComponent],
      providers: [CalcService, PaymentService],
    });

    fixture = TestBed.createComponent(PaymentComponent);
    component = fixture.componentInstance;
    calcService = TestBed.get(CalcService);
    paymentService = TestBed.get(PaymentService);
    dbgElement = fixture.debugElement.query(By.css('.caption'));
    element = dbgElement.nativeElement;

    fixture.detectChanges();
  });

  it('Payment service should be created', () => {
    const service: PaymentService = TestBed.get(paymentService);
    expect(service).toBeTruthy();
  });

  it('Show Div for all elements should be disabled on page load', () => {
    let status = component.showDiv;
    expect(status.amountTip == false);
    expect(status.rateTip == false);
    expect(status.amortizationTip == false);
    expect(status.frequencyTip == false);
    expect(status.preaamountTip == false);
    expect(status.prefreqTip == false);
    expect(status.prefreqTip == false);
  });

  it(' Calculae total term payments ', () => {
    paymentService.calculateTermNumPayments(paymentDetails);
    expect(service.termSummary.numberOfPayments).tobe(60);
  });

  it(' Calculae total ammoritzation payments ', () => {
    paymentService.calculateAmmortizationNumPayments(paymentDetails);
    expect(service.termSummary.numberOfPayments).tobe(300);
  });


  it(' Calculae monthy mortgage payments ', () => {
    paymentService.calculateMonthlyMortgage(paymentDetails);
    expect(service.termSummary.numberOfPayments).tobe(1613);
  });
});
