import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Mortgage, IMortgage } from '../payment/mortgage';

@Injectable()
export class CalcService {
  constructor() {}

  private paymentDetails = new BehaviorSubject<any>(null);
  calPaymentDetails = this.paymentDetails.asObservable();

  private termSummary = new BehaviorSubject<any>(null);
  calTermPayment = this.termSummary.asObservable();

  private ammortizationSummary = new BehaviorSubject<any>(null);
  calAmmortizationPayment = this.ammortizationSummary.asObservable();

  sendPaymentDetails(newValue) {
    this.paymentDetails.next(newValue);
  }

  sendTermPaymentCount(newValue) {
    this.termSummary.next(newValue);
  }

  sendAmmortizationPaymentCount(newValue) {
    this.ammortizationSummary.next(newValue);
  }
}
