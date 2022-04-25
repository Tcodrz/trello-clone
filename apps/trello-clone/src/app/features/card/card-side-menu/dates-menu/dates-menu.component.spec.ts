import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatesMenuComponent } from './dates-menu.component';

describe('DatesMenuComponent', () => {
  let component: DatesMenuComponent;
  let fixture: ComponentFixture<DatesMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatesMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatesMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
