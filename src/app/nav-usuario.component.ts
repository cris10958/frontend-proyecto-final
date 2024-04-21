import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-usuario',
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
                <li class="nav-item" >
                  <a i18n class="nav-link" [class]="{'active': selected == 'home'}" (click)="selected = 'home';" aria-current="page">Home</a>
                </li>
                <li class="nav-item">
                  <a i18n id="id-ingresar-socio" class="nav-link" [class]="{'active': selected == 'mi-perfil'}" (click)="selected = 'mi-perfil';"  href="/login-socios">Mi perfil</a>
                </li>
                <li class="nav-item">
                  <a i18n id="id-ingresar-socio" class="nav-link" [class]="{'active': selected == 'produc-service'}" (click)="selected = 'produc-service';">Productos y servicios</a>
                </li>
                <li class="nav-item">
                  <a i18n id="id-ingresar-socio" class="nav-link" [class]="{'active': selected == 'eventos'}" (click)="selected = 'eventos';">Eventos</a>
                </li>
              </ul>
             </div>
             <form class="d-flex col-2" role="search">
              <button (mouseenter)="img_login='./assets/icon/power-hover.png'" (mouseleave)="img_login='./assets/icon/power.png'" class="btn btn-outline-primary" type="submit" routerLink="/home">
                <div class="container-fluit bt-login">
                  <div class="row">
                    <div i18n class="col-6">
                      Usuario
                    </div>
                    <div class="col-6">
                      <img i18n-[alt]="cerrar sesión" [src]="img_login" alt="Cerrar sesión">
                    </div>
                  </div>
                </div>  
              </button>
             </form>
           </div>
         </div>
      </nav>
    </div>
  `,
  styles:  [`
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
export class NavUsuarioComponent {
  img_login: string = "./assets/icon/power.png";
  hover:boolean = false;
  selected:string = 'mi-perfil';


}
