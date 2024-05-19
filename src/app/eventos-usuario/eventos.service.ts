import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, throwError } from 'rxjs';
import { UsuarioService } from '../usuario.service';

export interface Eventos {
  deporte:     string | null;
  descripcion: string | null;
  fecha:       string | null;
  id:          string | null;
  lugar:       string | null;
  nombre:      string | null;
  pais:        string | null;
}

@Injectable({
  providedIn: 'root'
})
export class EventosService {
  url_gestor_eventos:string = environment.baseUrlGestionEventos;

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

  getListaEventos(){
    let url = this.url_gestor_eventos+'/eventos/listar';

    return this.http
      .get<any>(url, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
          'Authorization': `Bearer ${this.usuarioService.getToken()}`,
        }),
      })
  }

  getListaEventosRegistrados(){
    let url = this.url_gestor_eventos+'/eventos/agendados';

    return this.http
      .get<any>(url, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
          'Authorization': `Bearer ${this.usuarioService.getToken()}`,
        }),
      })
  }

  registrarEvento(id:string){
    return this.http
      .post<any>(this.url_gestor_eventos+'/eventos/registrar/'+id,null,{
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
          'Authorization': `Bearer ${this.usuarioService.getToken()}`,
        }),
      })
  }

  constructor(private http: HttpClient, private usuarioService: UsuarioService) {}

}
