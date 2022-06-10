import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachementsMenuComponent } from './attachements-menu.component';

describe('AttachementsMenuComponent', () => {
  let component: AttachementsMenuComponent;
  let fixture: ComponentFixture<AttachementsMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttachementsMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachementsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
