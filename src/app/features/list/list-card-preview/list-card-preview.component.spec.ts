import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCardPreviewComponent } from './list-card-preview.component';

describe('ListCardPreviewComponent', () => {
  let component: ListCardPreviewComponent;
  let fixture: ComponentFixture<ListCardPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCardPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCardPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
