import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { PaymentComponent } from './payment/payment.component';
import { MortgageService } from './assets/mortgage.service';
import { SummaryComponent } from './calculationSummary/summary.component';
import { FooterComponent } from '../footer/footer.component';
import { CalcService } from './services/calc.service';
import { PaymentService } from './payment/payment.service';
import {DetailedComponent} from './detailedSummary/detailed.compoment';

@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule],
  declarations: [
    PaymentComponent,
    AppComponent,
    SummaryComponent,
    FooterComponent,
    DetailedComponent
  ],
  bootstrap: [AppComponent],
  providers: [MortgageService, CalcService, PaymentService],
})
export class AppModule {}
