import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanSubscripcionActualComponent } from './plan-subscripcion-actual.component';

describe('PlanSubscripcionActualComponent', () => {
  let component: PlanSubscripcionActualComponent;
  let fixture: ComponentFixture<PlanSubscripcionActualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanSubscripcionActualComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlanSubscripcionActualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
