import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProducaoComponent } from './list-producao.component';

describe('ListProducaoComponent', () => {
  let component: ListProducaoComponent;
  let fixture: ComponentFixture<ListProducaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListProducaoComponent]
    });
    fixture = TestBed.createComponent(ListProducaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
