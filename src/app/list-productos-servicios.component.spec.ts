import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductosServiciosComponent } from './list-productos-servicios.component';

describe('ListProductosServiciosComponent', () => {
  let component: ListProductosServiciosComponent;
  let fixture: ComponentFixture<ListProductosServiciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListProductosServiciosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListProductosServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
