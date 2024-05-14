import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Inject, Injectable, Output, output } from '@angular/core';
import { environment } from '../environments/environment';
import { UsuarioService } from './usuario.service';
import { catchError, throwError } from 'rxjs';
import { SociosService } from './socios.service';
import { DOCUMENT } from '@angular/common';

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
  fotos: Fotos[],
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
  servicio_producto_vendidos:number | null;
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

export interface listaMetodoPago{
  value:string;
  key:string;
}

export interface Compra {
  id_servicio_producto: string;
  fecha_servicio:       string;
  direccion_servicio:   string;
  valor:                number;
  telefono:             string;
  metodo_pago:          string;
  estado_entrega:       string;
}



@Injectable({
  providedIn: 'root',
})
export class ProductosServiciosService {
  url_gestion_productos_servicios:string = environment.baseUrlGestionProductosServicios;
  listaMetodoPago: listaMetodoPago[] = [
    { value: "Efectivo", key: "efectivo"},
    { value: "Tarjeta", key: "tarjeta"},
    { value: "Transferencia",key: "transferencia"}
  ];
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

  getListaProductosServicios(filtro:string){
    let url = this.url_gestion_productos_servicios+'/productos-servicios/listar';

    if(filtro != ''){
      url = this.url_gestion_productos_servicios+'/productos-servicios/listar/'+filtro;
    }

    return this.http
      .get<any>(url, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
          'Authorization': `Bearer ${this.socioService.getToken()}`,
        }),
      })
  }

  getSesionDeportiva(id:string){
    return this.http
      .get<any>(this.url_gestion_productos_servicios+'/productos-servicios/listar-sesion-personalizada/'+id,{
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
          'Authorization': `Bearer ${this.socioService.getToken()}`,
        }),
      })
  }

  getDetalleProductoServicio(id:string, type:string){
    let token: string = '';
    let url: string = this.url_gestion_productos_servicios;
    if(type == "socio"){
      token = this.socioService.getToken()??'';
      url += '/productos-servicios/listarID/'+id;
    }
    else if(type == "user"){
      token = this.usuarioService.getToken()??'';
      url += '/productos-servicios-deportista/listarID/'+id;
    }
    return this.http
      .get<any>(url,{
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
          'Authorization': `Bearer ${token}`,
        }),
      })
  }

  getListaProductosServiciosUsuario(filtro:string){
    let url = this.url_gestion_productos_servicios+'/productos-servicios-deportista/listar';

    if(filtro != ''){
      url = this.url_gestion_productos_servicios+'/productos-servicios-deportista/listar/'+filtro;
    }

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

  comprar(compra:Compra){
    const url = this.url_gestion_productos_servicios+'/productos-servicios-deportista/comprar';

    return this.http
      .post<any>(url,compra, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
          'Authorization': `Bearer ${this.usuarioService.getToken()}`,
        }),
      })
  }

  guardarFiltro(filtro: string){
      this.localStorage?.setItem('filtro', filtro);
    return 'Filtro guardado'
  }

  getFiltro() {
    return this.localStorage?.getItem('filtro');
  }

    constructor(private http: HttpClient, private socioService: SociosService, private usuarioService: UsuarioService,  @Inject(DOCUMENT) private document: Document) {}
}
