import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render div with class container-flex footer ps-0 pe-5 pt-1 pb-2', () => {
    const fixture = TestBed.createComponent(FooterComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('div')?.className).toContain('container-flex footer ps-0 pe-5 pt-1 pb-2');
  });

  it('should render img with src /assets/icon/Copyright.png', () => {
    const fixture = TestBed.createComponent(FooterComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('img')?.src).toContain('/assets/icon/Copyright.png');
  });

  it('should render img with alt /Imagen Copyright', () => {
    const fixture = TestBed.createComponent(FooterComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('img')?.alt).toContain('Imagen Copyright');
  });

  it('should render div with class container-flex', () => {
    const fixture = TestBed.createComponent(FooterComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('div')?.textContent).toContain('LAAD.exe 2024');
  });

  it('should render div#id-text with class col-11 text-start ps-0 small pt-1', () => {
    const fixture = TestBed.createComponent(FooterComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#id-text')?.className).toContain('col-11 text-start ps-0 small pt-1');
  });
  

  
});


