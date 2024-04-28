import { Injectable, Inject } from '@angular/core';
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
import { UsuarioService } from './usuario.service';

export interface PerfilAlimenticio {
  intorelancia_alergia:         boolean;
  detalle_intolerancia_alergia: string;
  vegano:                       boolean;
  objetivo_peso:                string;
}

export interface PerfilDeportivo {
  FTP_actual:                          string;
  VO2max_actual:                       string;
  detalle_lesion_molestia_incapacidad: string;
  dias_semana_practica:                string;
  lesion_molestia_incapacidad:         boolean;
  tiempo_practica:                     string;
}


@Injectable({
  providedIn: 'root',
})
export class PerfilamientoService {
  URL_PRINCIPAL: string = environment.baseUrlGestorUsuarios;
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

  getInfoAlimentcia(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.usuarioService.getToken()}`,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    return this.http.get<any>(
      this.URL_PRINCIPAL + '/perfil-alimenticio/consultar',
      { headers: headers }
    )
    .pipe(catchError(this.handleError));
    ;
  }

  addPerfilAlimenticion(perfilAlimenticio: PerfilAlimenticio) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.usuarioService.getToken()}`,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    return this.http
      .post<any>(this.URL_PRINCIPAL+'/perfil-alimenticio/agregar', perfilAlimenticio, {
        headers: headers
      })
      .pipe(catchError(this.handleError));
  }

  updPerfilAlimenticion(perfilAlimenticio: PerfilAlimenticio) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.usuarioService.getToken()}`,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    return this.http
      .put<any>(this.URL_PRINCIPAL+'/perfil-alimenticio/actualizar', perfilAlimenticio, {
        headers: headers
      })
      .pipe(catchError(this.handleError));
  }

  getInfoDeportiva(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.usuarioService.getToken()}`,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    return this.http.get<any>(
      this.URL_PRINCIPAL + '/perfil-deportivo/consultar',
      { headers: headers }
    )
    .pipe(catchError(this.handleError));
    ;
  }

  addPerfilDeportivo(perfilDeportivo: PerfilDeportivo) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.usuarioService.getToken()}`,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    return this.http
      .post<any>(this.URL_PRINCIPAL+'/perfil-deportivo/agregar', perfilDeportivo, {
        headers: headers
      })
      .pipe(catchError(this.handleError));
  }

  updPerfilDeportivo(perfilDeportivo: PerfilDeportivo) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.usuarioService.getToken()}`,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    return this.http
      .put<any>(this.URL_PRINCIPAL+'/perfil-deportivo/actualizar', perfilDeportivo, {
        headers: headers
      })
      .pipe(catchError(this.handleError));
  }


  constructor(
    private http: HttpClient,
    private router: Router,
    private usuarioService: UsuarioService,
    @Inject(DOCUMENT) private document: Document
  ) {}
}
