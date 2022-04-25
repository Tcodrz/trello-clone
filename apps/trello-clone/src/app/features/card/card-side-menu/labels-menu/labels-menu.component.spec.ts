import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelsMenuComponent } from './labels-menu.component';

describe('LabelsMenuComponent', () => {
  let component: LabelsMenuComponent;
  let fixture: ComponentFixture<LabelsMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabelsMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
