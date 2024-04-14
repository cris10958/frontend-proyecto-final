import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroSocioComponent } from './registro-socio.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

describe('RegistroSocioComponent', () => {
  let component: RegistroSocioComponent;
  let fixture: ComponentFixture<RegistroSocioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroSocioComponent, RouterModule.forRoot([]), HttpClientModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistroSocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render div with class fd-color primary_container h-total w-100 row justify-content-center pb-5', () => {
    const fixture = TestBed.createComponent(RegistroSocioComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('div')?.className).toContain('fd-color primary_container h-total w-100 row justify-content-center pb-5');
  });

  it('should render a with href /home', () => {
    const fixture = TestBed.createComponent(RegistroSocioComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('a')?.href).toContain('/home');
  });

  it('should render img with src assets/icon/Brand.png', () => {
    const fixture = TestBed.createComponent(RegistroSocioComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('img')?.src).toContain('assets/icon/Brand.png');
  });

  it('should render img whith id img-acc and class src ico-ascesibilidad-w', () => {
    const fixture = TestBed.createComponent(RegistroSocioComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#img-acc')?.className).toContain('ico-ascesibilidad-w');
  });

  it('should render h1 whith content Registro de socios', () => {
    const fixture = TestBed.createComponent(RegistroSocioComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Registro de socios');
  });

  it('should render form whith class contentrow g-3', () => {
    const fixture = TestBed.createComponent(RegistroSocioComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('form')?.className).toContain('row g-3');
  });

  it('should render label with textContent Nombre', () => {
    const fixture = TestBed.createComponent(RegistroSocioComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('label')?.textContent).toContain('Nombre');
  });
  it('should render input with id id-name-socio', () => {
    const fixture = TestBed.createComponent(RegistroSocioComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('input')?.id).toEqual('id-name-socio');
  });

  it('should render label with id id-lb-tp-doc-socio and textContent Tipo  de documento', () => {
    const fixture = TestBed.createComponent(RegistroSocioComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('label#id-lb-tp-doc-socio')?.textContent).toContain('Tipo de documento');
  });

  it('should render select with id id-tp-doc-socio', () => {
    const fixture = TestBed.createComponent(RegistroSocioComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('select')?.id).toEqual('id-tp-doc-socio');
  });

  it('should render input with id-num-doc-socio next to label with id id-lb-num-doc-socio', () => {
    const fixture = TestBed.createComponent(RegistroSocioComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('label#id-lb-num-doc-socio+input')?.id).toEqual('id-num-doc-socio');
  });

  it('should render label with id-lb-email-socio and textContent Correo electrónico', () => {
    const fixture = TestBed.createComponent(RegistroSocioComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#id-lb-email-socio')?.textContent).toEqual('Correo electrónico');
  });

  it('should render label with id-lb-email-socio and textContent Correo electrónico', () => {
    const fixture = TestBed.createComponent(RegistroSocioComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#id-lb-email-socio+#id-email-socio')?.className).toContain('form-control fd-color white');
  });

  it('should render label with id-lb-contrasena-socio and textContent Contraseña', () => {
    const fixture = TestBed.createComponent(RegistroSocioComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#id-lb-contrasena-socio')?.textContent).toEqual('Contraseña');
  });

  it('should render input with id-contrasena-socioto label wuth id id id-lb-contrasena-socio with class form-control fd-color white', () => {
    const fixture = TestBed.createComponent(RegistroSocioComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#id-lb-contrasena-socio+ #id-contrasena-socio')?.className).toContain('form-control fd-color white');
  });

  it('should render button with type submit', () => {
    const fixture = TestBed.createComponent(RegistroSocioComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('button')?.type).toContain('submit');
  });

  it('should render button with class btn btn-secondary', () => {
    const fixture = TestBed.createComponent(RegistroSocioComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('button')?.className).toContain('btn btn-secondary');
  });

  it('should render button with class btn btn btn-primary', () => {
    const fixture = TestBed.createComponent(RegistroSocioComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('button#id-bt')?.className).toContain('btn btn-primary');
  });  


});
