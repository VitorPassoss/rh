import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInsumosComponent } from './list-insumos.component';

describe('ListInsumosComponent', () => {
  let component: ListInsumosComponent;
  let fixture: ComponentFixture<ListInsumosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListInsumosComponent]
    });
    fixture = TestBed.createComponent(ListInsumosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
