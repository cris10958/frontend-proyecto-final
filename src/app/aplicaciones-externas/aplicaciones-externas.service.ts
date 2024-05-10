import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { UsuarioService } from '../usuario.service';

export interface RegistroApp {
  nombre: string | null;
  descripcion: string | null;
  webhook: string | null;
  token: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class AplicacionesExternasService {
  URL_PRINCIPAL = environment.baseUrlGestorSesiones;

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

  addAppExterna(app: RegistroApp) {
    return this.http
      .post<any>(this.URL_PRINCIPAL + '/servicios-externo/registrar_app', app, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.usuarioService.getToken()}`,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
        }),
      })
      .pipe(catchError(this.handleError));
  }

  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService
  ) {}
}
