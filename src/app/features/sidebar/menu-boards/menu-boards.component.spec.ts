import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuBoardsComponent } from './menu-boards.component';

describe('MenuBoardsComponent', () => {
  let component: MenuBoardsComponent;
  let fixture: ComponentFixture<MenuBoardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuBoardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuBoardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
