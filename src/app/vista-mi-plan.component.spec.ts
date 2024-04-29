import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaMiPlanComponent } from './vista-mi-plan.component';

describe('VistaMiPlanComponent', () => {
  let component: VistaMiPlanComponent;
  let fixture: ComponentFixture<VistaMiPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaMiPlanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VistaMiPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
