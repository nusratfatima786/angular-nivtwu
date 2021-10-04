import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Staticdata, IStaticData } from './staticdata';

@Injectable()
export class MortgageService {
  assets: IStaticData = {
    amortizationYears: [
      '1 year',
      '2 years',
      '3 years',
      '4 years',
      '5 years',
      '6 years',
      '7 years',
      '8 years',
      '9 years',
      '10 years',
      '11 years',
      '12 years',
      '13 years',
      '14 years',
      '15 years',
      '16 years',
      '17 years',
      '18 years',
      '19 years',
      '20 years',
      '21 years',
      '22 years',
      '23 years',
      '24 years',
      '25 years',
      '26 year',
      '27 years',
      '28 years',
      '29 years',
      '30 years',
    ],
    amortizationMonths: [
      '1 Month',
      '2 Months',
      '3 Months',
      '4 Months',
      '5 Months',
      '6 Months',
      '7 Months',
      '8 Months',
      '9 Months',
      '10 Months',
      '11 Months',
      '12 Months',
    ],
    term: [
      '1 year',
      '2 years',
      '3 years',
      '4 years',
      '5 years',
      '6 years',
      '7 years',
      '8 years',
      '9 years',
      '10 years',
    ],
    paymentFrequeny: [
      'Accelerated Weekly',
      'Weekly',
      'Accelerated Bi-Weekly',
      'Bi-Weekly (every 2 weeks)',
      'Bi-Monthly (24x per year)',
      'Monthly (12x per year)',
    ],
    prepaymentFrequency:[
      'One Time',
      'Each Year',
      'Same As Regular Payment'
    ]
  };

  getMortageAssets(): Observable<IStaticData> {
    let mortgageData = new Observable<IStaticData>((observer) => {
      setTimeout(() => {
        observer.next(this.assets);
      }, 500);
    });
    return mortgageData;
  }
}
