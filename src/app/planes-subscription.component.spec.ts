import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanesSubscriptionComponent } from './planes-subscription.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

describe('PlanesSubscriptionComponent', () => {
  let component: PlanesSubscriptionComponent;
  let fixture: ComponentFixture<PlanesSubscriptionComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanesSubscriptionComponent, RouterModule.forRoot([]),HttpClientModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlanesSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
