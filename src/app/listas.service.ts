import { Injectable } from '@angular/core';

export interface TipoDocumento{
  value:string;
  key:string;
}
export interface Genero{
  value:string;
  key:string;
}

export interface Paises{
  value:string;
  key:string;
}

export interface Ciudad{
  value:string;
  key:string;
  pais:string;
}

export interface listProductosServivicio{
  value:string;
  key:string;
  tipo: string;
}

@Injectable({
  providedIn: 'root'
})
export class ListasService {
  listaTipoDocumento: TipoDocumento[] = [
    { value: "Tarjeta de identidad", key: "tarjeta_identidad"},
    { value: "Cedula de ciudadanía", key: "cedula_ciudadania"},
    { value: "Cedula de extranjería",key: "cedula_extranjeria"},
    { value: "Pasaporte", key: "pasaporte"},
    { value: "Registro civil", key: "registro_civil"}
  ];

  listaGenero:Genero[] = [
    { value: "Masculino", key: "masculino"},
    { value: "Femenino", key: "femenino"},
    { value: "Otro", key: "otro"}
  ]
  listaCiudad:Ciudad[] = [
    { pais:"Argentina", value: "Argentina", key: "Argentina"},
    { pais:"Argentina", value: "Córdoba", key: "Córdoba"},
    { pais:"Argentina" , value: "Rosario", key: "Rosario"},
    { pais:"Argentina" , value: "Mendoza", key: "Mendoza"},
    { pais:"Bolivia" , value: "La Paz", key: "La Paz"},
    { pais:"Bolivia" , value: "Sucre", key: "Sucre"},
    { pais:"Bolivia" , value: "Cochabamba", key: "Cochabamba"},
    { pais:"Bolivia" , value: "Oruro", key: "Oruro"},
    { pais:"Brasil" , value: "São Paulo", key: "São Paulo"},
    { pais:"Brasil" , value: "Brasilia", key: "Brasilia"},
    { pais:"Brasil" , value: "Fortaleza", key: "Fortaleza"},
    { pais:"Chile" , value: "Santiago", key: "Santiago"},
    { pais:"Chile" , value: "Concepción", key: "Concepción"},
    { pais:"Chile" , value: "Antofagasta", key: "Antofagasta"},
    { pais:"Colombia" , value: "Bogotá", key: "Bogotá"},
    { pais:"Colombia" , value: "Medellín", key: "Medellín"},
    { pais:"Colombia" , value: "Cali", key: "Cali"},
    { pais:"Colombia" , value: "Barranquilla", key: "Barranquilla"},
    { pais:"Colombia" , value: "Cartagena", key: "Cartagena"},
    { pais:"Colombia" , value: "Cúcuta", key: "Cúcuta"},
    { pais:"Colombia" , value: "Bucaramanga", key: "Bucaramanga"},
    { pais:"Colombia" , value: "Pereira", key: "Pereira"},
    { pais:"Colombia" , value: "Santa Marta", key: "Santa Marta"},
    { pais:"Colombia" , value: "Ibagué", key: "Ibagué"},
    { pais:"Cuba" , value: "La Habana", key: "La Habana"},
    { pais:"Cuba" , value: "Santiago de Cuba", key: "Santiago de Cuba"},
    { pais:"Cuba" , value: "Camagüey", key: "Camagüey"},
    { pais:"Ecuador" , value: "Quito", key: "Quito"},
    { pais:"Ecuador" , value: "Guayaquil", key: "Guayaquil"},
    { pais:"Ecuador" , value: "Cuenca", key: "Cuenca"},
    { pais:"Guatemala" , value: "Ciudad de Guatemala", key: "Ciudad de Guatemala"},
    { pais:"Guatemala" , value: "Quetzaltenango", key: "Quetzaltenango"},
    { pais:"Guatemala" , value: "Escuintla", key: "Escuintla"},
    { pais:"Honduras" , value: "Tegucigalpa", key: "Tegucigalpa"},
    { pais:"Honduras" , value: "San Pedro Sula", key: "San Pedro Sula"},
    { pais:"Honduras" , value: "Choloma", key: "Choloma"},
    { pais:"Nicaragua" , value: "Managua", key: "Managua"},
    { pais:"Nicaragua" , value: "León", key: "León"},
    { pais:"Panamá" , value: "Tocumen", key: "Tocumen"},
    { pais:"Panamá" , value: "Arraiján", key: "Arraiján"},
   
  ];

  listaPais:Paises[] = [
    { value: "Argentina", key: "Argentina"},
    { value: "Bolivia", key: "Bolivia"},
    { value: "Brasil", key: "Brasil"},
    { value: "Chile", key: "Chile"},
    { value: "Colombia", key: "Colombia"},
    { value: "Ecuador", key: "Ecuador"},
    { value: "Guatemala", key: "Guatemala"},
    { value: "Honduras", key: "Honduras"},
    { value: "Nicaragua", key: "Honduras"},
    { value: "Panamá", key: "Honduras"},
  ]
  listaProductosServicios:listProductosServivicio[] = [
    { value: "Deportologo", key: "Deportologo", tipo: "servicio"},
    { value: "Entrenador Personalizado", key: "Entrenador Personalizado", tipo: "servicio"},
    { value: "Alimento suplementario", key: "Alimento suplementario", tipo: "producto"},
    { value: "Bebida energetica", key: "Bebida energetica", tipo: "producto"},
    { value: "Acompañamiento deportivo", key: "Acompañamiento deportivo", tipo:"servicio"},
    { value: "Sesión personalizada", key: "Sesión personalizada", tipo:"producto"},
    { value: "Otro", key: "otro", tipo:"servicio"},
    { value: "Otro", key: "otro", tipo:"producto"},
  ]
  
}