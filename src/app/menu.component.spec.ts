import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should render div with class d-flex align-items-start row ps-2 min-vh-100 fd-color text-nav', () => {
  //   const fixture = TestBed.createComponent(MenuComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('div')?.className).toContain('d-flex align-items-start row ps-2 min-vh-100 fd-color text-nav');
  // });
  // it('should render div with id v-pills-tab and class nav flex-column nav-pills me-3 col-12 col-md-12 col-sm-12 col-lg-3 col-xl-3 col-xxl-3 ps-2', () => {
  //   const fixture = TestBed.createComponent(MenuComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('div#v-pills-tab')?.className).toContain('nav flex-column nav-pills me-3 col-12 col-md-12 col-sm-12 col-lg-3 col-xl-3 col-xxl-3 ps-2');
  // });

  // it('should render a with class nav-link text-nav text-nav md disabled', () => {
  //   const fixture = TestBed.createComponent(MenuComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('a')?.className).toContain('nav-link text-nav text-nav md disabled');
  // });

  // it('should render a with textContent Mi cuenta', () => {
  //   const fixture = TestBed.createComponent(MenuComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('a')?.textContent).toContain('Mi cuenta');
  // });

  // it('should render button with textContent Información basica', () => {
  //   const fixture = TestBed.createComponent(MenuComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('button')?.textContent).toContain('Información basica');
  // });

  // it('should render button with id v-pills-inf-alm-tab textContent Información alimenticia', () => {
  //   const fixture = TestBed.createComponent(MenuComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('#v-pills-inf-alm-tab')?.textContent).toContain('Información alimenticia');
  // });

  // it('should render button with id v-pills-inf-depor-tab textContent Información deportiva', () => {
  //   const fixture = TestBed.createComponent(MenuComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('#v-pills-inf-depor-tab')?.textContent).toContain('Información deportiva');
  // });
  // it('should render button with id v-pills-settings-tabtextContent Mi plan', () => {
  //   const fixture = TestBed.createComponent(MenuComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('#v-pills-settings-tab')?.textContent).toContain('Mi plan');
  // });
  // it('should render a with id id-title-sesion and textContent Sesión deportiva', () => {
  //   const fixture = TestBed.createComponent(MenuComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('#id-title-sesion')?.textContent).toContain('Sesión deportiva');
  // });
  // it('should render button with id v-pills-calendario-tab textContent Calendario', () => {
  //   const fixture = TestBed.createComponent(MenuComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('#v-pills-calendario-tab')?.textContent).toContain('Calendario');
  // });
  // it('should render button with id v-pills-apss-ext-tab textContent Integració apps externas', () => {
  //   const fixture = TestBed.createComponent(MenuComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('#v-pills-apss-ext-tab')?.textContent).toContain('Integració apps externas');
  // });
})
