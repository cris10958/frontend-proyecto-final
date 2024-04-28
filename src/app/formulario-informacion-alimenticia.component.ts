import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PerfilamientoService } from './perfilamiento.service';
import { UsuarioService } from './usuario.service';

@Component({
  selector: 'app-formulario-informacion-alimenticia',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form
      class="row g-3"
      [formGroup]="informacion_alimenticia"
      (ngSubmit)="registro()"
    >
      <div class="col-md-6 ps-2">
        <label
          id="id-label-intolerancia"
          for="id-intolerancia-usuario"
          class="form-label"
          >¿Cuenta con alguna intolerancia o alergia a algún alimento?
        </label>
        <div class="row-col-12">
          <div class="form-check form-check-inline">
            <input
              id="inlineRadioSi"
              class="form-check-input"
              (click)="habilitar_alergias('1')"
              type="radio"
              name="inlineIntolerancia"
              value="1"
            />
            <label class="form-check-label" for="inlineRadioSi">Si</label>
          </div>
          <div class="form-check form-check-inline">
            <input
              id="inlineRadioNo"
              class="form-check-input"
              (click)="habilitar_alergias('0')"
              type="radio"
              name="inlineIntolerancia"
              value="0"
            />
            <label class="form-check-label" for="inlineRadioNo">No</label>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <label
          id="id-label-detalle-alergia"
          for="id-edad-usuario"
          class="form-label"
          >¿Cuál?</label
        >
        <input
          type="text"
          class="form-control fd-color white"
          id="id-edad-usuario"
          formControlName="detalle_alergia"
          [class]="{
            'is-invalid':
              alergia == '1' &&
              (informacion_alimenticia.get('detalle_alergia')?.invalid ||
                informacion_alimenticia.value.detalle_alergia == '') &&
              (informacion_alimenticia.get('detalle_alergia')?.dirty ||
                informacion_alimenticia.get('detalle_alergia')?.touched)
          }"
        />
        <div class="invalid-feedback">
          Por favor ingrese a que alimentos es alérgico o intolerante
        </div>
      </div>
      <div class="col-md-6 ps-2">
        <label id="id-label-vegano" for="id-vegano-usuario" class="form-label"
          >¿Se considera una persona vegetariana o vegana?
        </label>
        <div class="row-col-12">
          <div class="form-check form-check-inline">
            <input
              id="inlineRadioinlineVeganoSi"
              class="form-check-input"
              (click)="vegano = '1'"
              type="radio"
              name="inlineVegano"
              value="1"
            />
            <label class="form-check-label" for="inlineRadioinlineVeganoSi"
              >Si</label
            >
          </div>
          <div class="form-check form-check-inline">
            <input
              id="inlineRadioinlineVeganoNo"
              class="form-check-input"
              (click)="vegano = '0'"
              type="radio"
              name="inlineVegano"
              value="0"
            />
            <label class="form-check-label" for="inlineRadioinlineVeganoNo"
              >No</label
            >
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <label for="id-peso-usuario" class="form-label"
          >¿Cuál es tu objetivo de peso?</label
        >
        <input
          type="number"
          class="form-control fd-color white"
          id="id-peso-usuario"
          placeholder="Peso en kilogramos (kg)"
          formControlName="peso"
          [class]="{
            'is-invalid':
              (informacion_alimenticia.get('peso')?.invalid ||
                informacion_alimenticia.value.peso == '0') &&
              (informacion_alimenticia.get('peso')?.dirty ||
                informacion_alimenticia.get('peso')?.touched)
          }"
          required
        />
        <div class="invalid-feedback">Por favor ingrese el peso objetivo</div>
      </div>
      <div class="col-md-12 pt-5 pb-2 text-center">
        <div class="invalido" *ngIf="isError">
          {{ error }}
        </div>
      </div>
      <div class="row p-0">
        <div class="col-md-6 text-end pe-0">
          <button class="btn btn-secondary" routerLink="/home" type="submit">
            Cancelar
          </button>
        </div>
        <div class="col-md-6 text-start ps-4">
          <button
            id="id-bt"
            class="btn btn-primary"
            type="submit"
            [disabled]="
              !informacion_alimenticia.valid ||
              informacion_alimenticia.value.peso == '0' ||
              (alergia == '1' &&
                informacion_alimenticia.value.detalle_alergia?.trim() == '') ||
              vegano == ''
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
export class FormularioInformacionAlimenticiaComponent implements OnInit {
  alergia: string = '';
  vegano: string = '';
  isError: boolean = false;
  error: string = '';

  informacion_alimenticia = new FormGroup({
    detalle_alergia: new FormControl({ value: '', disabled: true }, [
      Validators.maxLength(50),
      Validators.required,
    ]),
    peso: new FormControl('', [Validators.required, Validators.max(999)]),
    alergia: new FormControl(''),
    detalle_alergico: new FormControl(''),
    vegano: new FormControl(''),
  });

  registro() {}
  habilitar_alergias(seleccion: string) {
    this.alergia = seleccion;
    this.informacion_alimenticia.get('detalle_alergia')?.reset();
    if (seleccion == '1') {
      this.informacion_alimenticia.get('detalle_alergia')?.enable();
    } else {
      this.informacion_alimenticia.get('detalle_alergia')?.disable();
    }
  }

  getInfoAlimenticia() {
    let token:string | null | undefined= this.usuarioService.getToken();
    this.perfilamientoService.getInfoAlimentcia(token??'').subscribe(
      (info) => {
        let infoAlimenticia = info;
        this.informacion_alimenticia = new FormGroup({
          detalle_alergia: new FormControl({ value: '', disabled: true }, [
            Validators.maxLength(50),
            Validators.required,
          ]),
          peso: new FormControl(infoAlimenticia.objetivo_peso, [Validators.required, Validators.max(999)]),
          alergia: new FormControl(infoAlimenticia.intorelancia_alergia),
          detalle_alergico: new FormControl(infoAlimenticia.vegano.detalle_intolerancia_alergia),
          vegano: new FormControl(infoAlimenticia.vegano),
        });
      },
      (err) => {
        if (err.code != 400) {
          this.isError = true;
          this.error = err.message;
        }
      }
    );
  }

  ngOnInit(): void {
    this.informacion_alimenticia.get('detalle_alergia')?.disable();
    this.getInfoAlimenticia();
  }

  constructor(private perfilamientoService: PerfilamientoService, private usuarioService: UsuarioService) {}
}
