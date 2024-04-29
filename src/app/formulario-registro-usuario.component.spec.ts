import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioRegistroUsuarioComponent } from './formulario-registro-usuario.component';

describe('FormularioRegistroUsuarioComponent', () => {
  let component: FormularioRegistroUsuarioComponent;
  let fixture: ComponentFixture<FormularioRegistroUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioRegistroUsuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormularioRegistroUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should render a with href /home', () => {
  //   const fixture = TestBed.createComponent(FormularioRegistroUsuarioComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('a')?.href).toContain('/home');
  // });

  // it('should render img with src ./assets/icon/Brand.png', () => {
  //   const fixture = TestBed.createComponent(FormularioRegistroUsuarioComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('img')?.src).toContain('assets/icon/Brand.png');
  // });

  // it('should render h1 with textContent Registro Inicial', () => {
  //   const fixture = TestBed.createComponent(FormularioRegistroUsuarioComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('h1')?.textContent).toContain('Registro Inicial');
  // });

  // it('should render label with textContent Nombre', () => {
  //   const fixture = TestBed.createComponent(FormularioRegistroUsuarioComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('label')?.textContent).toContain('Nombre');
  // });
  // it('should render input with id id-nombre-usuario', () => {
  //   const fixture = TestBed.createComponent(FormularioRegistroUsuarioComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('input')?.id).toEqual('id-nombre-usuario');
  // });

  // it('should render label with id id-label-apellido textContent Apellido', () => {
  //   const fixture = TestBed.createComponent(FormularioRegistroUsuarioComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('#id-label-apellido')?.textContent).toContain('Apellido');
  // });

  // it('should render input with id id-apellido', () => {
  //   const fixture = TestBed.createComponent(FormularioRegistroUsuarioComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('#id-label-apellido+input')?.id).toEqual('id-apellido');
  // });

  // it('should render label with id id-label-tp-doc and textContent Tipo de identificación', () => {
  //   const fixture = TestBed.createComponent(FormularioRegistroUsuarioComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('#id-label-tp-doc')?.textContent).toContain('Tipo de identificación');
  // });

  // it('should render input with id-label-num-doc', () => {
  //   const fixture = TestBed.createComponent(FormularioRegistroUsuarioComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('#id-label-num-doc+input')?.id).toEqual('id-num-doc-usuario');
  // });

  // it('should render label with id id-label-genero and textContent Genero', () => {
  //   const fixture = TestBed.createComponent(FormularioRegistroUsuarioComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('#id-label-genero')?.textContent).toEqual('Genero');
  // });

  // it('should render div with class form-check form-check-inline next to label with id id-label-genero', () => {
  //   const fixture = TestBed.createComponent(FormularioRegistroUsuarioComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('#id-label-genero + div > div')?.className).toEqual('form-check form-check-inline');
  // });

  // it('should render label with id id-label-edad and textContent Edad', () => {
  //   const fixture = TestBed.createComponent(FormularioRegistroUsuarioComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('#id-label-edad')?.textContent).toEqual('Edad');
  // });

  // it('should render input with id-edad-usuario next to label with id id-label-edad with clas form-control fd-color white', () => {
  //   const fixture = TestBed.createComponent(FormularioRegistroUsuarioComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('#id-label-edad + #id-edad-usuario')?.className).toContain('form-control fd-color white');
  // });

  // it('should render label with id id-label-altura and textContent Altura', () => {
  //   const fixture = TestBed.createComponent(FormularioRegistroUsuarioComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('#id-label-altura')?.textContent).toEqual('Altura');
  // });

  // it('should render input with id-altura-usuario next to label with id id-label-edad with clas form-control fd-color white', () => {
  //   const fixture = TestBed.createComponent(FormularioRegistroUsuarioComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('#id-label-altura + #id-altura-usuario')?.className).toContain('form-control fd-color white');
  // });

  // it('should render label with id-label-pais and textContent País de nacimiento', () => {
  //   const fixture = TestBed.createComponent(FormularioRegistroUsuarioComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('#id-label-pais')?.textContent).toEqual('País de nacimiento');
  // });

  // it('should render select next to label with id id-label-pais with id id-pais-usuario', () => {
  //   const fixture = TestBed.createComponent(FormularioRegistroUsuarioComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('#id-label-pais + select')?.id).toContain('id-pais-usuario');
  // });

  // it('should render label with id-label-ciudad and textContent Ciudad de nacimiento', () => {
  //   const fixture = TestBed.createComponent(FormularioRegistroUsuarioComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('#id-label-ciudad')?.textContent).toEqual('Ciudad de nacimiento');
  // });

  // it('should render select next to label with id id-label-ciudad with id-ciudad-usuario', () => {
  //   const fixture = TestBed.createComponent(FormularioRegistroUsuarioComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('#id-label-ciudad + select#id-ciudad-usuario')?.className).toContain('form-select fd-color white');
  // });

  // it('should render label with id-label-pais-residencia and textContent País de residencia', () => {
  //   const fixture = TestBed.createComponent(FormularioRegistroUsuarioComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('#id-label-pais-residencia')?.textContent).toEqual('País de residencia');
  // });

  // it('should render select next to label with id id-label-pais-residencia with id-pais-residencia-usuario', () => {
  //   const fixture = TestBed.createComponent(FormularioRegistroUsuarioComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('#id-label-pais-residencia + select#id-pais-residencia-usuario')?.className).toContain('form-select fd-color white');
  // });

  // it('should render label with id-label-ciudad-residencia and textContent Ciudad de residencia', () => {
  //   const fixture = TestBed.createComponent(FormularioRegistroUsuarioComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('#id-label-ciudad-residencia')?.textContent).toEqual('Ciudad de residencia');
  // });

  // it('should render select next to label with id id-label-ciudad-residencia with id-ciudad-residencia-usuario', () => {
  //   const fixture = TestBed.createComponent(FormularioRegistroUsuarioComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('#id-label-ciudad-residencia + select#id-ciudad-residencia-usuario')?.className).toContain('form-select fd-color white');
  // });

  // it('should render label with id-label-deporte and textContent ¿Cuál de los siguientes deportes practica o desea practicar?', () => {
  //   const fixture = TestBed.createComponent(FormularioRegistroUsuarioComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('#id-label-deporte')?.textContent).toEqual('¿Cuál de los siguientes deportes practica o desea practicar?');
  // });

  // it('should render div nextcto label with id id-deporte-usuario with id-ciudad-residencia-usuario with class ', () => {
  //   const fixture = TestBed.createComponent(FormularioRegistroUsuarioComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('#id-label-deporte + div#id-deporte-usuario')?.className).toContain('form-check');
  // });

  // it('should render label with id-label-tiempo-residencia and textContent ¿Hace cuánto tiempo reside en esta ciudad?', () => {
  //   const fixture = TestBed.createComponent(FormularioRegistroUsuarioComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('#id-label-tiempo-residencia')?.textContent).toEqual('¿Hace cuánto tiempo reside en esta ciudad?');
  // });

  // it('should render input next to label with id id-label-tiempo-residenciawith id-ciudad-residencia-usuario with clas form-control fd-color white', () => {
  //   const fixture = TestBed.createComponent(FormularioRegistroUsuarioComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('#id-label-tiempo-residencia + #id-tiempo-residencia-usuario')?.className).toContain('form-control fd-color white');
  // });

  // it('should render label with id-label-email and textContent Correo electrónico', () => {
  //   const fixture = TestBed.createComponent(FormularioRegistroUsuarioComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('#id-label-email')?.textContent).toEqual('Correo electrónico');
  // });

  // it('should render input with id id-email-usuarioo next to label wuth id id-label-emaili with class form-control fd-color white', () => {
  //   const fixture = TestBed.createComponent(FormularioRegistroUsuarioComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('#id-label-email + #id-email-usuario')?.className).toContain('form-control fd-color white');
  // });

  // it('should render label with id-label-password and textContent Contraseña', () => {
  //   const fixture = TestBed.createComponent(FormularioRegistroUsuarioComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('#id-label-password')?.textContent).toEqual('Contraseña');
  // });

  // it('should render input with id-password-usuario to label wuth id id id-label-password with class form-control fd-color white', () => {
  //   const fixture = TestBed.createComponent(FormularioRegistroUsuarioComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('#id-label-password+ #id-password-usuario')?.className).toContain('form-control fd-color white');
  // });

  // it('should render button with type submit', () => {
  //   const fixture = TestBed.createComponent(FormularioRegistroUsuarioComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('button')?.type).toContain('submit');
  // });

  // it('should render button with class btn btn-secondary', () => {
  //   const fixture = TestBed.createComponent(FormularioRegistroUsuarioComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('button')?.className).toContain('btn btn-secondary');
  // });

  // it('should render button with class btn btn-primary', () => {
  //   const fixture = TestBed.createComponent(FormularioRegistroUsuarioComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('button#id-bt')?.className).toContain('btn btn-primary');
  // });  

  // it('should render div with id contenedor-1 and class col-8 fd-color white p-4 shadow rounded pt-5 mt-5', () => {
  //   const fixture = TestBed.createComponent(FormularioRegistroUsuarioComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('#contenedor-1')?.className).toContain('col-8 fd-color white p-4 shadow rounded pt-5 mt-5');
  // });

  // it('should render div with id contenedor-2 and class col-8 fd-color white p-4 shadow rounded pt-5 mt-5', () => {
  //   const fixture = TestBed.createComponent(FormularioRegistroUsuarioComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('#contenedor-2')?.className).toContain('row pt-3 justify-content-center pt-2 pb-5');
  // });
});
