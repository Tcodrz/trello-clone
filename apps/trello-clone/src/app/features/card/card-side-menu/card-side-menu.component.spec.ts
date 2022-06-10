import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSideMenuComponent } from './card-side-menu.component';

describe('CardAddMenuComponent', () => {
  let component: CardSideMenuComponent;
  let fixture: ComponentFixture<CardSideMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardSideMenuComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardSideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
