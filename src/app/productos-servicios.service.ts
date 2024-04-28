import { Injectable } from '@angular/core';
export interface Ejercicio {
  nombre: string | null;
  descripcion: string | null;
  repeticiones: number | null;
  duracion: number | null;
}
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
  nombre_sesion: string | null;
  numero_ejercicios: number | null;
  ejercicios: Ejercicio[] | null;
}




@Injectable({
  providedIn: 'root',
})
export class ProductosServiciosService {

  addProductoServicio(productos_servicio: ProductoServicio){
    console.log('ok')
    return 
  }
  constructor() {}
}
