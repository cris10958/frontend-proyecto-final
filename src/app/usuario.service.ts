import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { catchError, throwError } from 'rxjs';

export interface LoginUsuario{
  email?: string | null;
  contrasena?: string | null;
}

export interface Usuario {
  nombre:                string;
  apellido:              string;
  tipo_identificacion:   string;
  numero_identificacion: string;
  email:                 string;
  genero:                string;
  edad:                  string;
  peso:                  string;
  altura:                string;
  pais_nacimiento:       string;
  ciudad_nacimiento:     string;
  pais_residencia:       string;
  ciudad_residencia:     string;
  antiguedad_residencia: string;
  contrasena:            string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  REGISTRO_USUARIOS_URL: string = "https://3001-abenitezm20-registrousu-lgd8q05juco.ws-us110.gitpod.io/registro-usuarios";
  registro_usuarios_url: string = this.REGISTRO_USUARIOS_URL + "/registro/deportistas";
  login_usuarios_url: string = this.REGISTRO_USUARIOS_URL + "/login/deportista";

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
    return throwError(()=> new Error(msg))
  }

  addUsuario(usuario: Usuario){
    return this.http.post<Usuario>(this.registro_usuarios_url,usuario,{
      headers : new HttpHeaders({
        'Content-Type': 'application/json'
      }) 
    })
    .pipe(
      catchError(this.handleError)
    )
  }

  loginUsuarios(login: LoginUsuario){
    return this.http.post<LoginUsuario>(this.login_usuarios_url, login, {
      headers : new HttpHeaders({
        'Content-Type': 'application/json'
      }) 
    })
    .pipe(
      catchError(this.handleError)
    )
    ;
     
  }

  constructor(private http: HttpClient) { 

  }
}

