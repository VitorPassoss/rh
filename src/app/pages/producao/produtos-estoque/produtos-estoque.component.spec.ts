import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutosEstoqueComponent } from './produtos-estoque.component';

describe('ProdutosEstoqueComponent', () => {
  let component: ProdutosEstoqueComponent;
  let fixture: ComponentFixture<ProdutosEstoqueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProdutosEstoqueComponent]
    });
    fixture = TestBed.createComponent(ProdutosEstoqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
