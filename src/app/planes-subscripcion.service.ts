import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { UsuarioService } from './usuario.service';



export interface PlanSubscripcion {
  id_plan_subscripcion: string;
  nombre:               string;
  beneficios:           BeneficioPlanSubscripcion[];
}

export interface BeneficioPlanSubscripcion {
  id_detalle_subscripcion: string;
  beneficios:              string;
}

@Injectable({
  providedIn: 'root'
})
export class PlanesSubscripcionService {
  URL_PRINCIPAL: string = environment.baseUrlRegistro;
  registro_usuarios_url: string = this.URL_PRINCIPAL + "/registro/";

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
    return throwError(() => errorObject);
  }

  getPlanes(): Observable<PlanSubscripcion[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.usuarioService.getToken()}`,
    });
    return this.http.get<PlanSubscripcion[]>(this.registro_usuarios_url+'obtener_planes_subscripion', {
      headers: headers,
    }).pipe(
      catchError(this.handleError)
    );
  }


  constructor(private http: HttpClient, private usuarioService: UsuarioService) { }
}
