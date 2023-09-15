import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoProdutosComponent } from './tipo-produtos.component';

describe('TipoProdutosComponent', () => {
  let component: TipoProdutosComponent;
  let fixture: ComponentFixture<TipoProdutosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TipoProdutosComponent]
    });
    fixture = TestBed.createComponent(TipoProdutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
