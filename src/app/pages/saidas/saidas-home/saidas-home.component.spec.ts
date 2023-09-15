import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaidasHomeComponent } from './saidas-home.component';

describe('SaidasHomeComponent', () => {
  let component: SaidasHomeComponent;
  let fixture: ComponentFixture<SaidasHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaidasHomeComponent]
    });
    fixture = TestBed.createComponent(SaidasHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
