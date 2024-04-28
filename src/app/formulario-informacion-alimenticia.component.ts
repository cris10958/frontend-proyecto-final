import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  PerfilAlimenticio,
  PerfilamientoService,
} from './perfilamiento.service';
import { UsuarioService } from './usuario.service';
import { ToastrService, ToastNoAnimation } from 'ngx-toastr';

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
      <div class="col-6 ps-2">
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
              [checked]="alergia == '1'"
              value="1"
            />
            <label class="form-check-label" for="inlineRadioSi">Si</label>
          </div>
          <div class="form-check form-check-inline">
            <input
              id="inlineRadioNoDep"
              class="form-check-input"
              (click)="habilitar_alergias('0')"
              type="radio"
              name="inlineIntolerancia"
              value="0"
              [checked]="alergia == '0'"
            />
            <label class="form-check-label" for="inlineRadioNoDep">No</label>
          </div>
        </div>
      </div>
      <div class="col-6">
        <label
          id="id-label-detalle-alergia"
          for="id-intolerancia"
          class="form-label"
          >¿Cuál?</label
        >
        <input
          type="text"
          class="form-control fd-color white"
          id="id-intolerancia"
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
      <div class="col-6 ps-2">
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
              [checked]="vegano == '1'"
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
              [checked]="vegano == '0'"
            />
            <label class="form-check-label" for="inlineRadioinlineVeganoNo"
              >No</label
            >
          </div>
        </div>
      </div>
      <div class="col-6">
        <label for="id-peso-deseado" class="form-label"
          >¿Cuál es tu objetivo de peso?</label
        >
        <input
          type="number"
          class="form-control fd-color white"
          id="id-peso-deseado"
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
        <div class="col-6 text-end pe-0">
          <button class="btn btn-secondary" (click)="cancelar=true; getInfoAlimenticia();">
            Cancelar
          </button>
        </div>
        <div class="col-6 text-start ps-4">
          <button
            id="id-bt-info-alm"
            class="btn btn-primary"
            type="submit"
            [disabled]="
              !informacion_alimenticia.valid ||
              informacion_alimenticia.value.peso == '0' ||
              (alergia == '1' &&
                informacion_alimenticia.value.detalle_alergia?.trim() == '') ||
              vegano == ''
            "
            (click)="cancelar=false; registro()"
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
  perfil_registrado: boolean = false;
  cancelar:boolean = false;

  informacion_alimenticia = new FormGroup({
    detalle_alergia: new FormControl({ value: '', disabled: true }, [
      Validators.maxLength(50),
    ]),
    peso: new FormControl('', [Validators.required, Validators.max(999)]),
    alergia: new FormControl(''),
    detalle_alergico: new FormControl(''),
    vegano: new FormControl(''),
  });

  registro() {
    if (
      !(
        !this.informacion_alimenticia.valid ||
        this.informacion_alimenticia.value.peso == '0' ||
        (this.alergia == '1' &&
          this.informacion_alimenticia.value.detalle_alergia?.trim() == '') ||
        this.vegano == ''
        || this.cancelar 
      )
    ) {
      const perfilAlimentcioReg: PerfilAlimenticio = {
        intorelancia_alergia: this.alergia == '1' ? true : false,
        detalle_intolerancia_alergia:
          this.informacion_alimenticia.value.detalle_alergia ?? 'NA',
        vegano: this.vegano == '1' ? true : false,
        objetivo_peso: this.informacion_alimenticia.value.peso ?? '0',
      };
      if (!this.perfil_registrado) {
        this.perfilamientoService
          .addPerfilAlimenticion(perfilAlimentcioReg)
          .subscribe(
            (resp) => {
              this.toastr.success('Actualización exitosa', 'Vamos por esa meta');
              this.perfil_registrado = true;
              this.isError = false;
            },
            (err) => {
              this.isError = true;
              this.error = err.message;
            }
          );
      }else{
        this.perfilamientoService
          .updPerfilAlimenticion(perfilAlimentcioReg)
          .subscribe(
            (resp) => {
              this.toastr.success('Actualización exitosa', 'Vamos por esa meta');
              this.isError = false;
            },
            (err) => {
              this.isError = true;
              this.error = err.message;
            }
          );
      }
    }
  }

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
    this.perfilamientoService.getInfoAlimentcia().subscribe(
      (info) => {
        let infoAlimenticia = info;
        this.perfil_registrado = true;
        
        if (infoAlimenticia.vegano) {
          this.vegano = '1';
        } else {
          this.vegano = '0';
        }
        if(infoAlimenticia.detalle_intolerancia_alergia == 'NA'){
          infoAlimenticia.detalle_intolerancia_alergia = '';
        }

        this.informacion_alimenticia = new FormGroup({
          detalle_alergia: new FormControl(
            infoAlimenticia.detalle_intolerancia_alergia,
            [Validators.maxLength(50)]
          ),
          peso: new FormControl(infoAlimenticia.objetivo_peso, [
            Validators.required,
            Validators.max(999),
          ]),
          alergia: new FormControl(''),
          detalle_alergico: new FormControl(),
          vegano: new FormControl(),
        });
        if (infoAlimenticia.intorelancia_alergia) {
          this.alergia = '1';
          this.informacion_alimenticia.get('detalle_alergia')?.enable();
        } else {
          this.alergia = '0';
          this.informacion_alimenticia.get('detalle_alergia')?.disable();
        }
        this.isError = false;
      },
      (err) => {
        if (err.code != 400) {
          this.isError = true;
          this.error = err.message;
          this.perfil_registrado = false;
        }
      }
    );
  }

  ngOnInit(): void {
    this.informacion_alimenticia.get('detalle_alergia')?.disable();
  }

  constructor(
    private perfilamientoService: PerfilamientoService,
    private usuarioService: UsuarioService,
    private toastr: ToastrService
  ) {}
}
