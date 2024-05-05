import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { UsuarioService } from './usuario.service';
import { catchError, throwError } from 'rxjs';
import { SociosService } from './socios.service';

export interface AdicionalEjercicio {
  titulo: string | null;
  nombre_invalido: boolean | null;
  descripcion_invalido: boolean | null;
  repeticiones_invalido: boolean | null;
  duracion_invalido: boolean | null;
}
export interface VistaEjercicio {
  adicional: AdicionalEjercicio;
  detalle_ejercicio: Ejercicio;
}

export interface ProductoServicio {
  descripcion: string | null;
  deporte: string | null;
  subtipo: string | null,
  pais: string | null;
  ciudad: string | null;
  lugar_entrega_prestacion: string | null;
  cantidad_disponible: number | null;
  fecha_entrega_prestacion: string | null;
  valor: number | null;
  foto: Fotos[],
  tipo: string | null;
}

export interface ProductoServicioLista {
  descripcion: string | null;
  deporte: string | null;
  subtipo_servicio_producto: string | null,
  pais: string | null;
  ciudad: string | null;
  lugar_entrega_prestacion: string | null;
  cantidad_disponible: number | null;
  fecha_entrega_prestacion: string | null;
  valor: number | null;
  fotos: Fotos[],
  id:string | null;
  tipo_servicio_producto: string | null;

} 

export interface Fotos {
  foto: string | null;
  orden: number | null;
}

export interface SesionPerzonalizada {
  id_servicio_producto: string | null;
  nombre_sesion: string | null;
  ejercicios: Ejercicio[]; 
}

export interface Ejercicio {
  nombre: string | null;
  descripcion: string | null;
  cantidad_repeticiones: number | null;
  duracion: number | null;
}


@Injectable({
  providedIn: 'root',
})
export class ProductosServiciosService {
  url_gestion_productos_servicios:string = environment.baseUrlGestionProductosServicios;

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

  addProductoServicio(productos_servicio: ProductoServicio){
    return this.http
      .post<any>(this.url_gestion_productos_servicios+'/productos-servicios/agregar', productos_servicio, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
          'Authorization': `Bearer ${this.socioService.getToken()}`,
        }),
      }).pipe(catchError(this.handleError))
  }

  addSesionPersonalizada(sesionDeportiva: SesionPerzonalizada){
    return this.http
      .post<any>(this.url_gestion_productos_servicios+'/productos-servicios/agregar-sesion-personalizada', sesionDeportiva, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
          'Authorization': `Bearer ${this.socioService.getToken()}`,
        }),
      }).pipe(catchError(this.handleError))
  }

  getListaProductosServicios(){
    return this.http
      .get<any>(this.url_gestion_productos_servicios+'/productos-servicios/listar', {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
          'Authorization': `Bearer ${this.socioService.getToken()}`,
        }),
      })
  }

  constructor(private http: HttpClient, private socioService: SociosService) {}
}
