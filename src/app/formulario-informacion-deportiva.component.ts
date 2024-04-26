import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { __values } from 'tslib';

@Component({
  selector: 'app-formulario-informacion-deportiva',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form
      class="row g-3"
      [formGroup]="informacion_deportistas"
      (ngSubmit)="registro()"
    >
      <div class="col-md-6">
        <label for="id-cantidad-dias" class="form-label"
          >Cantidad de días por semana que desea practicar</label
        >
        <input
          type="number"
          class="form-control fd-color white"
          id="id-cantidad-dias"
          formControlName="dias_semana"
          [class]="{
            'is-invalid':
              informacion_deportistas.get('dias_semana')?.invalid &&
              (informacion_deportistas.get('dias_semana')?.dirty ||
                informacion_deportistas.get('dias_semana')?.touched)
          }"
          id="id-nombre-usuario"
          required
        />
        <div class="invalid-feedback">
          Por favor ingrese la cantidad de días que desea practicar
        </div>
      </div>
      <div class="col-md-6">
        <label
          id="id-label-tiempo-semana"
          for="d-tiempo-semana"
          class="form-label"
          >Tiempo de practica (horas/semana)</label
        >
        <input
          type="number"
          class="form-control fd-color white"
          id="id-tiempo-semana"
          formControlName="tiempo_practica"
          [class]="{
            'is-invalid':
              informacion_deportistas.get('tiempo_practica')?.invalid &&
              (informacion_deportistas.get('tiempo_practica')?.dirty ||
                informacion_deportistas.get('tiempo_practica')?.touched)
          }"
          required
        />
        <div class="invalid-feedback">
          Por favor ingrese el tiempo que desea practicar durante la semana
        </div>
      </div>
      <div class="col-md-6 ps-2">
        <label id="id-label-vo2max" for="id-vo2max" class="form-label"
          >¿Cuál es tu VO2max actual?</label
        >
        <input
          type="number"
          class="form-control fd-color white"
          id="id-vo2max"
          formControlName="VO2max"
          [class]="{
            'is-invalid':
              informacion_deportistas.get('VO2max')?.invalid &&
              (informacion_deportistas.get('VO2max')?.dirty ||
                informacion_deportistas.get('VO2max')?.touched)
          }"
          required
        />
        <div class="invalid-feedback">Por favor ingresa el VO2max actual</div>
      </div>
      <div class="col-md-6 ps-2">
        <label id="id-label-ftp" for="id-ftp" class="form-label"
          >¿Cuál es tud FTP actual?</label
        >
        <input
          type="number"
          class="form-control fd-color white"
          id="id-vo2max"
          formControlName="FTP_value"
          [class]="{
            'is-invalid':
              informacion_deportistas.get('FTP')?.invalid &&
              (informacion_deportistas.get('FTP')?.dirty ||
                informacion_deportistas.get('FTP')?.touched)
          }"
          required
        />
        <div class="invalid-feedback">Por favor ingresa el FTP actual</div>
      </div>
      <div class="col-md-6 ps-2">
        <label
          id="id-label-intolerancia"
          for="id-intolerancia-usuario"
          class="form-label"
          >¿Cuenta con alguna lesion, molestia o incapacidad?
        </label>
        <div class="row-col-12">
          <div class="form-check form-check-inline">
            <input
              id="inlineRadioSi"
              class="form-check-input"
              (click)="habilitar_molestia('1')"
              type="radio"
              name="inlineLesion"
              value="1"
            />
            <label class="form-check-label" for="inlineRadioSi">Si</label>
          </div>
          <div class="form-check form-check-inline">
            <input
              id="inlineRadioNo"
              class="form-check-input"
              (click)="habilitar_molestia('0')"
              type="radio"
              name="inlineLesion"
              value="0"
            />
            <label class="form-check-label" for="inlineRadioNo">No</label>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <label
          id="id-label-detalle-lesion"
          for="id-edad-usuario"
          class="form-label"
          >¿Cuál?</label
        >
        <input
          type="text"
          class="form-control fd-color white"
          id="id-edad-usuario"
          formControlName="detalle_lesion"
          [class]="{
            'is-invalid':
              lesion == '1' &&
               (informacion_deportistas.get('detalle_lesion')?.invalid ||
               informacion_deportistas.value.detalle_lesion == '') &&
              (informacion_deportistas.get('detalle_lesion')?.dirty ||
              informacion_deportistas.get('detalle_lesion')?.touched)
          }"
        />
        <div class="invalid-feedback">Por favor ingrese que molestica o lesión tiene</div>
      </div>
      <div class="col-md-12 pt-5 pb-2 text-center">
        <div class="invalido" *ngIf="isError">
          {{ error }}
        </div>
      </div>
      <div class="row p-0">
        <div class="col-md-6 text-end pe-0">
          <button class="btn btn-secondary" (click)="cancelar()" type="submit">
            Cancelar
          </button>
        </div>
        <div class="col-md-6 text-start ps-4">
          <button
            id="id-bt"
            class="btn btn-primary"
            type="submit"
            [disabled]="
              !informacion_deportistas.valid ||
              informacion_deportistas.value.dias_semana == '0' ||
              informacion_deportistas.value.tiempo_practica == '0' ||
              informacion_deportistas.value.VO2max == '0' ||
              informacion_deportistas.value.FTP_value == '0' ||
              lesion == '' ||
              (lesion == '1' && informacion_deportistas.value.detalle_lesion == '')
            "
          >
           Actualizar
          </button>
        </div>
      </div>
    </form>
  `,
  styles: ``,
})
export class FormularioInformacionDeportivaComponent implements OnInit{
  isError: boolean = false;
  error: string = '';
  lesion: string = '';

  informacion_deportistas = new FormGroup({
    dias_semana: new FormControl('', [
      Validators.required
    ]),
    tiempo_practica: new FormControl('', [
      Validators.required
    ]),
    VO2max: new FormControl('', [Validators.required]),
    FTP_value: new FormControl('', [Validators.required]),
    lesion: new FormControl(''),
    detalle_lesion: new FormControl('',[Validators.maxLength(50)]),
  });

  registro() {}

  habilitar_molestia(seleccion: string) {
    this.lesion = seleccion;
    this.informacion_deportistas.get('detalle_lesion')?.reset();
    this.informacion_deportistas.value.lesion = this.lesion;
    if (seleccion == '1') {
      this.informacion_deportistas.get('detalle_lesion')?.enable();
    } else {
      this.informacion_deportistas.get('detalle_lesion')?.disable();
    }
  }

  cancelar(){
    this.informacion_deportistas.reset();
  }

  ngOnInit(): void {
    this.informacion_deportistas.get('detalle_lesion')?.disable();
  }

}
