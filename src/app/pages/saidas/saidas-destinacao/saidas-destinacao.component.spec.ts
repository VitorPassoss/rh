import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaidasDestinacaoComponent } from './saidas-destinacao.component';

describe('SaidasDestinacaoComponent', () => {
  let component: SaidasDestinacaoComponent;
  let fixture: ComponentFixture<SaidasDestinacaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaidasDestinacaoComponent]
    });
    fixture = TestBed.createComponent(SaidasDestinacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
