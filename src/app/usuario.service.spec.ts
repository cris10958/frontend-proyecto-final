import { TestBed } from '@angular/core/testing';

import { LoginUsuario, UsuarioService } from './usuario.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('UsuarioService', () => {
  let service: UsuarioService;
  let login: LoginUsuario ={
    email: "laura@correo.com",
    contrasena: "12345678"
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule]
    });
    service = TestBed.inject(UsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  // it('#loginUsuarios should return real value', () => {
  //   expect(service.loginUsuarios(login)).toBe();
  // });
});
