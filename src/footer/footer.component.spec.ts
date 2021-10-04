import { FooterComponent } from './footer.component';
import { ComponentFixture,TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

describe('FooterComponent', () => {
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('Footer Component Should Contains Defaiult Header', () => {
    console.log('Footer Component' + element.innerHTML);
    expect(element.innerHTML).toContain('Rate This Tool');
  });
});
