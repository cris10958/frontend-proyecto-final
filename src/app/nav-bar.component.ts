import { Component, OnInit } from '@angular/core';
import { ListLanguajeService } from './list-languaje.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container-fluit ps-4 pe-4 pb-4" (mouseenter)="hover = true" (mouseleave)="hover = false" [class]="{'brand-hover':hover}">
      <nav class="navbar navbar-expand-lg bg-body-tertiary row" [class]="{'brand-hover':hover}">
        <div class="container-fluid">
           <a class="navbar-brand" href="#">
              <img src="./assets/icon/Brand.png" alt="Logo SportApp" class="d-inline-block align-text-top brand">
           </a>
           <button class="navbar-toggler" type="button" data-bs-toggle="collapse    " data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
         <span class="navbar-toggler-icon"></span>
           </button>
           <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <div class="container">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0 justify-content-center">
                <li class="nav-item">
                  <a i18n class="nav-link" aria-current="page" href="/registro-socios">Quiero ser socio</a>
                </li>
                <li class="nav-item">
                  <a i18n id="id-ingresar-socio" class="nav-link" href="/login-socios">Ingresar como socio</a>
                </li>
              </ul>
             </div>
             <form class="d-flex row" role="search">
             <div class="dropdown col-5">
                <button class="btn dropdown-toggle ps-3 me-5" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {{lang_selected}}
                </button>
                <ul class="dropdown-menu">
                  <li><a i18n class="dropdown-item disabled">SELECCIONE UNO</a></li>
                  <li *ngFor="let lang of listLanguajeService.languaje"><a class="dropdown-item lang-li" [class]="{active:lang_selected == lang.nombre_corto}">{{lang.lenguaje}}</a></li>
                </ul>
              </div>
              <button (mouseenter)="img_login='./assets/icon/person_white.png'" (mouseleave)="img_login='./assets/icon/person.png'" class="btn btn-outline-primary col-7" type="submit" routerLink="/login-usuarios">
                <div class="container-fluit bt-login">
                  <div class="row">
                    <div i18n class="col-6">
                      Ingresar
                    </div>
                    <div class="col-6">
                      <img i18n-[alt]="persona" [src]="img_login" alt="persona">
                    </div>
                  </div>
                </div>  
              </button>
             </form>
           </div>
         </div>
      </nav>
      <div class="container-fluit row pt-3" [class]="{'brand-hover':hover}">
        <img [src]="img_ascesibilidad" class="ico-ascesibilidad ms-2" alt="ascesibilidad">
      </div>
    </div>
  `,
  styles: [`
    .brand{
      width:10rem;
    }
    .bt-login{
      min-width:4.5em;
    }
    .ico-ascesibilidad{
      width:3.5em;
    }
    .lang-li:hover, .lang-li:focus{
      cursor:pointer;
    }
    .brand-hover{
    background-color: #EADDFF !important;
}
  `]
})
export class NavBarComponent implements OnInit{
  lang_selected:string = "ES";
  img_login: string = "./assets/icon/person.png"
  img_ascesibilidad: string = "./assets/icon/ascesibilidad.png"
  hover:boolean = false;


  constructor(readonly listLanguajeService: ListLanguajeService){
    
  }
  ngOnInit(): void {
      
  }

}
