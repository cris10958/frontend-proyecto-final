import { Injectable } from '@angular/core';

export interface Languaje{
  lenguaje:string;
  nombre_corto:string;
}

@Injectable({
  providedIn: 'root'
})

export class ListLanguajeService {
  languaje : Languaje[] = [
    {
      lenguaje: "Inglés",
      nombre_corto:"EN"
    },
    {
      lenguaje: "Español",
      nombre_corto:"ES"
    }
  ]
}
