import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanSubscripcionActualComponent } from './plan-subscripcion-actual.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


describe('PlanSubscripcionActualComponent', () => {
  let component: PlanSubscripcionActualComponent;
  let fixture: ComponentFixture<PlanSubscripcionActualComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanSubscripcionActualComponent, RouterModule.forRoot([]),HttpClientModule]
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
