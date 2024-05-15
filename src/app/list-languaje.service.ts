import { Injectable } from '@angular/core';

export interface Languaje {
  lenguaje: string;
  nombre_corto: string;
  lang: string;
}

@Injectable({
  providedIn: 'root',
})
export class ListLanguajeService {
  languaje: Languaje[] = [
    {
      lenguaje: 'Inglés',
      nombre_corto: 'EN',
      lang: 'en',
    },
    {
      lenguaje: 'Español',
      nombre_corto: 'ES',
      lang: 'es',
    },
  ];
}
