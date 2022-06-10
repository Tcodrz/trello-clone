import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCardPreviewComponent } from './list-card-preview.component';
import {Card} from "@trello-clone/trello-interface";

describe('ListCardPreviewComponent', () => {
  let component: ListCardPreviewComponent;
  let fixture: ComponentFixture<ListCardPreviewComponent>;
  const cardMock: Card = {
    archived: false,
    checklists: [],
    cover: "",
    createdAt: 0,
    description: "mock card 1",
    id: "123",
    listID: "1234",
    name: "mock card",
    position: 0
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCardPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCardPreviewComponent);
    component = fixture.componentInstance;
    component.card = cardMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
