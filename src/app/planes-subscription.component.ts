import { Component } from '@angular/core';
import { PlanesSubscripcionService } from './planes-subscripcion.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-planes-subscription',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fd-color h-total w-100 row justify-content-center pb-5">
      <div class="col-10 pt-5">
        <div class="row-col-12 text-start">
          <a href="/home">
            <img src="./assets/icon/Brand.png" class="ico-brand-w" alt="logo">
          </a>
        </div>
        <div class="row-col-12 text-center pt-3 pb-3">
          <h1>Planes de subscripción</h1>
        </div>
        <div class="row justify-content-center pt-3 pb-3">
          <div class="col-4" *ngFor="let plan of planSubscripcion.planSubscripcion">
            <div class="fd-color white p-0 shadow rounded">
              <div class="fd-color rounded-top p-3 text-center" [class]="{'primary_container': plan.id_plan_subscripcion == '1', 'on_primary_fixed_variant': plan.id_plan_subscripcion == '2', 'on_primary_container': plan.id_plan_subscripcion == '3', }">
                <h1>{{plan.nombre}}</h1>
              </div>
              <div class="rounded-bottom pb-3 pt-2">
                <div class="col-12 contenido-tarjeta pe-5 ps-2">
                  <ul>
                    <li *ngFor="let beneficio of plan.beneficios" class="tx-justify">{{beneficio.beneficios}}</li>
                  </ul>
                </div>
                <div *ngIf="plan.id_plan_subscripcion == '1'" class="col-12 text-center ps-4 pt-5">
                  <button id="id-bt" class="btn btn-primary" type="submit" (click)="registrar_subscripcion(plan.id_plan_subscripcion)">Continuar gratis</button>
                </div>
                <div *ngIf="plan.id_plan_subscripcion == '2' || plan.id_plan_subscripcion == '3'" class="col-12 text-center ps-4 pt-5">
                  <button id="id-bt" class="btn btn-primary" type="submit" (click)="registrar_subscripcion(plan.id_plan_subscripcion)" >Subscribirme</button>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  `,
  styles: [`
    .contenido-tarjeta{
      max-height: 50vh;
      overflow: auto;
    }
  `]
})
export class PlanesSubscriptionComponent {
  registrar_subscripcion(id:string){
    if(id == "1"){
      this.router.navigate(['/home-usuario']);
    }else if(id == "2" || id == "3"){
      alert("Actualizar plan");
      this.router.navigate(['/home-usuario']);
    }else{
      console.log("Valor invalido")
      return
    }
  }

  constructor(readonly planSubscripcion: PlanesSubscripcionService, private router: Router){}
}
