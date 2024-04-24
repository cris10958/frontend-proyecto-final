import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { catchError, throwError } from 'rxjs';
import { environment } from '../environments/environment';

export interface LoginSocio{
  email?: string | null;
  contrasena?: string | null;
}

export interface SocioRegistro {
  nombre?:                string | null;
  tipo_identificacion?:   string | null;
  numero_identificacion?: string | null;
  email?:                 string | null;
  contrasena?:            string | null;
}



@Injectable({
  providedIn: 'root'
})

export class SociosService {
  URL_PRINCIPAL: string = environment.baseUrlRegistro;
  registro_socios_url: string = this.URL_PRINCIPAL + "/registro/socios";
  login_socios_url: string = this.URL_PRINCIPAL + "/login/socio-negocio";

  private handleError(error: HttpErrorResponse){
    let msg = ""
    if(error.status === 0){
      msg ="Problema de conexión del lado del cliente";
    }else{
      if(error.status == 401){
        msg = "Usuario o contraseña incorrecto";
      }
      else if(error.status == 404){
        msg = "El email ingresado no corresponde a algun usuario registrado";
      }
      else if(error.status == 432){
        msg = "El email ingresado ya se encuentra registrado";
      }
      else {
        msg = "Algo salio mal, intenta mas tarde";
      }
      console.log(`Error desde el backend con status ${error.status}, con el siguiente error ${error.error}`);
    }
    const errorObject = { message: msg, code: error.status };
    return throwError(() => errorObject)
  }
  addSocio(socio: SocioRegistro){
    return this.http.post<SocioRegistro>(this.registro_socios_url,socio,{
      headers : new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
    .pipe(
      catchError(this.handleError)
    )
  }
  loginSocio(login: LoginSocio){
    return this.http.post<LoginSocio>(this.login_socios_url, login, {
      headers : new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
    .pipe(
      catchError(this.handleError)
    )
    ;
  }
  constructor(private http: HttpClient) { }
}
