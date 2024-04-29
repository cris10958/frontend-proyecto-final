import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardProductosServiciosComponent } from './card-productos-servicios.component';

describe('CardProductosServiciosComponent', () => {
  let component: CardProductosServiciosComponent;
  let fixture: ComponentFixture<CardProductosServiciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardProductosServiciosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardProductosServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
