import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaidasListComponent } from './saidas-list.component';

describe('SaidasListComponent', () => {
  let component: SaidasListComponent;
  let fixture: ComponentFixture<SaidasListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaidasListComponent]
    });
    fixture = TestBed.createComponent(SaidasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
