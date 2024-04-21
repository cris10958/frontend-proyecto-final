import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPlanSubscripcionComponent } from './card-plan-subscripcion.component';
import {By} from '@angular/platform-browser'

describe('CardPlanSubscripcionComponent', () => {
  let component: CardPlanSubscripcionComponent;
  let fixture: ComponentFixture<CardPlanSubscripcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardPlanSubscripcionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardPlanSubscripcionComponent);
    component = fixture.componentInstance;
    const expectedPlan = { "id_plan_subscripcion": "1",
    "nombre":"Gratis",
    "beneficios": [{
      "id_detalle_subscripcion": "1",
      "beneficios": "Plan de entrenamiento básico basado en las características fisiológicas, demográficas e historial deportivo"
    }]
    };
    component.plan = expectedPlan;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('should render div with id id-inicial-div', () => {
    const fixture = TestBed.createComponent(CardPlanSubscripcionComponent);
    component = fixture.componentInstance;
    const expectedPlan = { "id_plan_subscripcion": "1",
    "nombre":"Gratis",
    "beneficios": [{
      "id_detalle_subscripcion": "1",
      "beneficios": "Plan de entrenamiento básico basado en las características fisiológicas, demográficas e historial deportivo"
    }]
    };
    component.plan = expectedPlan;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('div')?.id).toContain('id-inicial-div');
  });

  it('should render 6 div elements', ()=>{
    const fixture = TestBed.createComponent(CardPlanSubscripcionComponent);
    component = fixture.componentInstance;
    const expectedPlan = { "id_plan_subscripcion": "1",
    "nombre":"Gratis",
    "beneficios": [{
      "id_detalle_subscripcion": "1",
      "beneficios": "Plan de entrenamiento básico basado en las características fisiológicas, demográficas e historial deportivo"
    }]
    };
    component.plan = expectedPlan;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLLegendElement;
    expect(compiled.querySelectorAll('div')?.length).toBe(6);
  }
  );

  it('should render 1 h1 elements', ()=>{
    const fixture = TestBed.createComponent(CardPlanSubscripcionComponent);
    component = fixture.componentInstance;
    const expectedPlan = { "id_plan_subscripcion": "1",
    "nombre":"Gratis",
    "beneficios": [{
      "id_detalle_subscripcion": "1",
      "beneficios": "Plan de entrenamiento básico basado en las características fisiológicas, demográficas e historial deportivo"
    }]
    };
    component.plan = expectedPlan;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLLegendElement;
    expect(compiled.querySelectorAll('h1')?.length).toBe(1);
  }
  );

  it('should render h1 element with textContent Gratis', ()=>{
    const fixture = TestBed.createComponent(CardPlanSubscripcionComponent);
    component = fixture.componentInstance;
    const expectedPlan = { "id_plan_subscripcion": "1",
    "nombre":"Gratis",
    "beneficios": [{
      "id_detalle_subscripcion": "1",
      "beneficios": "Plan de entrenamiento básico basado en las características fisiológicas, demográficas e historial deportivo"
    }]
    };
    component.plan = expectedPlan;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLLegendElement;
    expect(compiled.querySelector('h1')?.textContent).toBe("Gratis");
  }
  );

  it('should render 1 li elements', ()=>{
    const fixture = TestBed.createComponent(CardPlanSubscripcionComponent);
    component = fixture.componentInstance;
    const expectedPlan = { "id_plan_subscripcion": "1",
    "nombre":"Gratis",
    "beneficios": [{
      "id_detalle_subscripcion": "1",
      "beneficios": "Plan de entrenamiento básico basado en las características fisiológicas, demográficas e historial deportivo"
    }]
    };
    component.plan = expectedPlan;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLLegendElement;
    expect(compiled.querySelectorAll('li')?.length).toBe(1);
  }
  );

  it('should render 1 ul elements', ()=>{
    const fixture = TestBed.createComponent(CardPlanSubscripcionComponent);
    component = fixture.componentInstance;
    const expectedPlan = { "id_plan_subscripcion": "1",
    "nombre":"Gratis",
    "beneficios": [{
      "id_detalle_subscripcion": "1",
      "beneficios": "Plan de entrenamiento básico basado en las características fisiológicas, demográficas e historial deportivo"
    }]
    };
    component.plan = expectedPlan;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLLegendElement;
    expect(compiled.querySelectorAll('ul')?.length).toBe(1);
  }
  );

  it('should render div with id-plan-1 and class fd-color rounded-top p-3 text-center primary_container', ()=>{
    const fixture = TestBed.createComponent(CardPlanSubscripcionComponent);
    component = fixture.componentInstance;
    const expectedPlan = { "id_plan_subscripcion": "1",
    "nombre":"Gratis",
    "beneficios": [{
      "id_detalle_subscripcion": "1",
      "beneficios": "Plan de entrenamiento básico basado en las características fisiológicas, demográficas e historial deportivo"
    }]
    };
    component.plan = expectedPlan;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLLegendElement;
    expect(compiled.querySelector('div#id-plan-1')?.className).toContain('fd-color rounded-top p-3 text-center primary_container');
  }
  );

  it('should render div with id-plan-2 and class fd-color rounded-top p-3 text-center on_primary_fixed_variant', ()=>{
    const fixture = TestBed.createComponent(CardPlanSubscripcionComponent);
    component = fixture.componentInstance;
    const expectedPlan = { "id_plan_subscripcion": "2",
    "nombre":"Intermedio",
    "beneficios": [{
      "id_detalle_subscripcion": "1",
      "beneficios": "Plan de entrenamiento básico basado en las características fisiológicas, demográficas e historial deportivo"
    }]
    };
    component.plan = expectedPlan;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLLegendElement;
    expect(compiled.querySelector('div#id-plan-2')?.className).toContain('fd-color rounded-top p-3 text-center on_primary_fixed_variant');
  }
  );

  it('should render div with id-plan-3 and class fd-color rounded-top p-3 text-center on_primary_container', ()=>{
    const fixture = TestBed.createComponent(CardPlanSubscripcionComponent);
    component = fixture.componentInstance;
    const expectedPlan = { "id_plan_subscripcion": "3",
    "nombre":"Premium",
    "beneficios": [{
      "id_detalle_subscripcion": "1",
      "beneficios": "Plan de entrenamiento básico basado en las características fisiológicas, demográficas e historial deportivo"
    }]
    };
    component.plan = expectedPlan;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLLegendElement;
    expect(compiled.querySelector('div#id-plan-3')?.className).toContain('fd-color rounded-top p-3 text-center on_primary_container');
  }
  );

  it('should render lit with textContent Plan de entrenamiento básico basado en las características fisiológicas, demográficas e historial deportivo', ()=>{
    const fixture = TestBed.createComponent(CardPlanSubscripcionComponent);
    component = fixture.componentInstance;
    const expectedPlan = { "id_plan_subscripcion": "3",
    "nombre":"Premium",
    "beneficios": [{
      "id_detalle_subscripcion": "1",
      "beneficios": "Plan de entrenamiento básico basado en las características fisiológicas, demográficas e historial deportivo"
    }]
    };
    component.plan = expectedPlan;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLLegendElement;
    expect(compiled.querySelector('li')?.textContent).toContain('Plan de entrenamiento básico basado en las características fisiológicas, demográficas e historial deportivo');
  }
  );

  it('should render div with id id-plan-content-1 and class rounded-bottom pb-3 pt-2', ()=>{
    const fixture = TestBed.createComponent(CardPlanSubscripcionComponent);
    component = fixture.componentInstance;
    const expectedPlan = { "id_plan_subscripcion": "1",
    "nombre":"Premium",
    "beneficios": [{
      "id_detalle_subscripcion": "1",
      "beneficios": "Plan de entrenamiento básico basado en las características fisiológicas, demográficas e historial deportivo"
    }]
    };
    component.plan = expectedPlan;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLLegendElement;
    expect(compiled.querySelector('#id-plan-content-1')?.className).toContain('rounded-bottom pb-3 pt-2');
  }
  );



  it('should render a div with class col-12 contenido-tarjeta pe-5 ps-2 next to div with id id-plan-content-1', ()=>{
    const fixture = TestBed.createComponent(CardPlanSubscripcionComponent);
    component = fixture.componentInstance;
    const expectedPlan = { "id_plan_subscripcion": "1",
    "nombre":"Premium",
    "beneficios": [{
      "id_detalle_subscripcion": "1",
      "beneficios": "Plan de entrenamiento básico basado en las características fisiológicas, demográficas e historial deportivo"
    }]
    };
    component.plan = expectedPlan;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLLegendElement;
    expect(compiled.querySelector('#id-plan-content-1 > div')?.className).toContain('col-12 contenido-tarjeta pe-5 ps-2');
  }
  );

  it('should render second div with class col-12 text-center ps-4 pt-5 below to div with id id-plan-content-1 next to first div', ()=>{
    const fixture = TestBed.createComponent(CardPlanSubscripcionComponent);
    component = fixture.componentInstance;
    const expectedPlan = { "id_plan_subscripcion": "1",
    "nombre":"Premium",
    "beneficios": [{
      "id_detalle_subscripcion": "1",
      "beneficios": "Plan de entrenamiento básico basado en las características fisiológicas, demográficas e historial deportivo"
    }]
    };
    component.plan = expectedPlan;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLLegendElement;
    expect(compiled.querySelector('#id-plan-content-1 > div + div')?.className).toContain('col-12 text-center ps-4 pt-5');
  }
  );

  it('should render button with class btn btn-primary', ()=>{
    const fixture = TestBed.createComponent(CardPlanSubscripcionComponent);
    component = fixture.componentInstance;
    const expectedPlan = { "id_plan_subscripcion": "1",
    "nombre":"Premium",
    "beneficios": [{
      "id_detalle_subscripcion": "1",
      "beneficios": "Plan de entrenamiento básico basado en las características fisiológicas, demográficas e historial deportivo"
    }]
    };
    component.plan = expectedPlan;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLLegendElement;
    expect(compiled.querySelector('button')?.className).toContain('btn btn-primary');
  }
  );

  it('should render button with textContent and id id-bt-3', ()=>{
    const fixture = TestBed.createComponent(CardPlanSubscripcionComponent);
    component = fixture.componentInstance;
    const expectedPlan = { "id_plan_subscripcion": "3",
    "nombre":"Premium",
    "beneficios": [{
      "id_detalle_subscripcion": "1",
      "beneficios": "Plan de entrenamiento básico basado en las características fisiológicas, demográficas e historial deportivo"
    }]
    };
    component.plan = expectedPlan;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLLegendElement;
    expect(compiled.querySelector('#id-bt-3')?.textContent).toContain('Subscribirme');
  }
  );

  

});
