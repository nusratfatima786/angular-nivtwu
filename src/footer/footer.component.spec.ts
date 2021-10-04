// property bindings example
import { FooterComponent } from './footer.component';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { delay } from 'rxjs/operators';

import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

describe('SummaryComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let dbgElement: ComponentFixture;
  let element: HTMLElement;

  beforeEach(() => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(
      BrowserDynamicTestingModule,
      platformBrowserDynamicTesting()
    );

    TestBed.configureTestingModule({
      declarations: [FooterComponent],
      providers: [],
    });

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    dbgElement = fixture.debugElement.query(By.css('.header'));
    element = dbgElement.nativeElement;

    fixture.detectChanges();
  });

  it('Footer Component Should Contains Defaiult Header', () => {
    console.log('Footer Component' + element.innerHTML);
    expect(element.innerHTML).toContain('Rate This Tool');
  });
});
