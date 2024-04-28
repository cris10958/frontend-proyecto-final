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

@Injectable({
  providedIn: 'root',
})
export class PerfilamientoService {
  URL_PRINCIPAL: string = environment.baseUrlGestorUsuarios;
  helper = new JwtHelperService();

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

  getInfoAlimentcia(token:string): Observable<any> {
    let token_obtenido = this.usuarioService.getToken();
    let token_postman = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF4ZWxiZW55MTZAZ21haWwuY29tIn0.1froxeGGGpSDTkRHqMzp4yi338BSMkd71DYIo_AM-J8'
    console.log("token_obtenido", token_obtenido);
    console.log("token_postman", token_postman);
    if(token_obtenido == token_postman){
      console.log("HOLIS");
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.usuarioService.getToken()}`,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    console.log("headers alimen",headers);
    return this.http.get<any>(
      this.URL_PRINCIPAL + '/perfil-alimenticio/consultar',
      { headers: headers }
    );
  }


  constructor(
    private http: HttpClient,
    private router: Router,
    private usuarioService: UsuarioService
  ) {}
}
