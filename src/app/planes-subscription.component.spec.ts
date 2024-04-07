import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanesSubscriptionComponent } from './planes-subscription.component';

describe('PlanesSubscriptionComponent', () => {
  let component: PlanesSubscriptionComponent;
  let fixture: ComponentFixture<PlanesSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanesSubscriptionComponent]
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
