// property bindings example
import { SummaryComponent } from './summary.component';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CalcService } from '../services/calc.service';
import { delay } from 'rxjs/operators';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

describe('SummaryComponent', () => {
  let component: SummaryComponent;
  let fixture: ComponentFixture<SummaryComponent>;
  let dbgElement: ComponentFixture;
  let element: HTMLElement;
  let calcService: CalcService;

  beforeEach(() => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(
      BrowserDynamicTestingModule,
      platformBrowserDynamicTesting()
    );

    TestBed.configureTestingModule({
      declarations: [SummaryComponent],
      providers: [CalcService],
    });

    fixture = TestBed.createComponent(SummaryComponent);
    component = fixture.componentInstance;
    calcService = TestBed.get(CalcService);
    dbgElement = fixture.debugElement.query(By.css('.caption'));
    element = dbgElement.nativeElement;

    fixture.detectChanges();
  });

  it('Summary Component Should Contains Defaiult Header', () => {
    console.log(element.innerText);
    expect(element.textContent).toContain('Calculation Summary');
  });
});
