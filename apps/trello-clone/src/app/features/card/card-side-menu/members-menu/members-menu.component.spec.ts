import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersMenuComponent } from './members-menu.component';

describe('MembersMenuComponent', () => {
  let component: MembersMenuComponent;
  let fixture: ComponentFixture<MembersMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembersMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
