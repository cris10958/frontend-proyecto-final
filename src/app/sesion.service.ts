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
import { UsuarioService } from './usuario.service';

export interface DatosSesion {
  estado: string;
  fecha_fin: null;
  fecha_inicio: null;
  fecha_sesion: string;
  ftp: null;
  id_plan_deportista: string;
  vo2_max: null;
}

@Injectable({
  providedIn: 'root',
})
export class SesionService {
  URL_PRINCIPAL: string = environment.baseUrlGestorSesiones;

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

  getDatosSesiones(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.usuarioService.getToken()}`,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE'
    });
    return this.http.get<any>(this.URL_PRINCIPAL + '/sesiones/obtener_sesiones_deportista', {
      headers: headers,
    });
  }

  constructor(
    private usuarioService: UsuarioService,
    private http: HttpClient,
    private router: Router
  ) {}
}
