import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStockInsumosComponent } from './list-stock-insumos.component';

describe('ListStockInsumosComponent', () => {
  let component: ListStockInsumosComponent;
  let fixture: ComponentFixture<ListStockInsumosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListStockInsumosComponent]
    });
    fixture = TestBed.createComponent(ListStockInsumosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
