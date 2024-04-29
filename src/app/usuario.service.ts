import { Inject, Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

export interface LoginUsuario {
  email?: string | null;
  contrasena?: string | null;
}

export interface Usuario {
  nombre: string;
  apellido: string;
  tipo_identificacion: string;
  numero_identificacion: string;
  email: string;
  genero: string;
  edad: string;
  peso: string;
  altura: string;
  pais_nacimiento: string;
  ciudad_nacimiento: string;
  pais_residencia: string;
  ciudad_residencia: string;
  antiguedad_residencia: string;
  contrasena: string;
  deportes: Deporte[];
}

export interface UsuarioUpd {
  nombre: string;
  apellido: string;
  tipo_identificacion: string;
  numero_identificacion: string;
  genero: string;
  edad: string;
  peso: string;
  altura: string;
  pais_nacimiento: string;
  ciudad_nacimiento: string;
  pais_residencia: string;
  ciudad_residencia: string;
  antiguedad_residencia: string;
  deportes: Deporte[];
}

export interface Deporte {
  atletismo?: string | null;
  ciclismo?: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  //REGISTRO_USUARIOS_URL: string = "https://3001-abenitezm20-registrousu-lgd8q05juco.ws-us110.gitpod.io/registro-usuarios";
  URL_PRINCIPAL: string = environment.baseUrlRegistro;
  registro_usuarios_url: string = this.URL_PRINCIPAL + '/registro/deportistas';
  login_usuarios_url: string = this.URL_PRINCIPAL + '/login/deportista';
  usuarios_url: string = this.URL_PRINCIPAL + '/registro';
  helper = new JwtHelperService();
  localStorage = this.document.defaultView?.localStorage;

  private handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.status === 0) {
      msg = 'Problema de conexión del lado del cliente';
    } else {
      if (error.status == 401) {
        msg = 'Usuario o contraseña incorrecto';
      } else if (error.status == 404) {
        msg = 'El email ingresado no corresponde a algun usuario registrado';
      } else if (error.status == 432) {
        msg = 'El email ingresado ya se encuentra registrado';
      } else {
        msg = 'Algo salio mal, intenta mas tarde';
      }
      console.log(
        `Error desde el backend con status ${error.status}, con el siguiente error ${error.error}`
      );
    }
    const errorObject = { message: msg, code: error.status };
    return throwError(() => errorObject);
  }

  addUsuario(usuario: Usuario) {
    return this.http
      .post<any>(this.registro_usuarios_url, usuario, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(catchError(this.handleError));
  }

  loginUsuarios(login: LoginUsuario) {
    return this.http
      .post<any>(this.login_usuarios_url, login, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(catchError(this.handleError));
  }

  logout() {
    this.localStorage?.removeItem('token');
    this.router.navigate(['/login-usuarios']);
  }

  getToken() {
    return this.localStorage?.getItem('token');
  }

  loggedIn() {
    if (this.localStorage?.getItem('token')) {
      return true;
    }
    return false;
  }

  registrarToken(token: string | undefined) {
    if (token) {
      this.localStorage?.setItem('token', token);
    }
  }

  getInfoBasicaUsuario(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE'
    });
    return this.http.get<any>(this.usuarios_url + '/deportista', {
      headers: headers,
    });
  }

  updInfoBasicaUsuario(usuario: UsuarioUpd) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE'

    });
    return this.http
      .put<any>(this.usuarios_url+"/actualizar", usuario, {
        headers: headers
      })
      .pipe(catchError(this.handleError));
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {}
}
