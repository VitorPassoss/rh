import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTipoInsumoComponent } from './list-tipo-insumo.component';

describe('ListTipoInsumoComponent', () => {
  let component: ListTipoInsumoComponent;
  let fixture: ComponentFixture<ListTipoInsumoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListTipoInsumoComponent]
    });
    fixture = TestBed.createComponent(ListTipoInsumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
