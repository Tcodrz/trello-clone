import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewCardListComponent } from './preview-card-list.component';

describe('PreviewCardListComponent', () => {
  let component: PreviewCardListComponent;
  let fixture: ComponentFixture<PreviewCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreviewCardListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
