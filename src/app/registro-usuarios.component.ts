import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormularioRegistroUsuarioComponent } from './formulario-registro-usuario.component';


@Component({
  selector: 'app-registro-usuarios',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormularioRegistroUsuarioComponent],
  template: `
     <div class="fd-color h-total w-100 row justify-content-center pb-5">
      <div id="contenedor-1" class="col-8 fd-color white p-4 shadow rounded pt-5 mt-5">
        <div id="contenedor-2" class="row pt-3 justify-content-center pt-2 pb-5">
          <div class="col-10">
            <div class="row-col-12 text-start">
              <a href="/home">
                <img src="./assets/icon/Brand.png" class="ico-brand-w" alt="logo">
              </a>
            </div>
            <div class="row-col-12 text-center pt-3 pb-3">
              <h1>Registro Inicial</h1>
            </div>
            <app-formulario-registro-usuario></app-formulario-registro-usuario>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``
})
export class RegistroUsuariosComponent{
  constructor(){}
  
 
}
