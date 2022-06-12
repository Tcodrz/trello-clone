import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ChipColors, ChipComponent, ChipConfig} from '@ui-components';
import {SimpleChanges} from "@angular/core";

describe('ChipComponent', () => {
  let component: ChipComponent;
  let fixture: ComponentFixture<ChipComponent>;
  const mockConfig: ChipConfig = {
    icon: "",
    color: ChipColors.Success,
    label: 'Chip text',
    timeOut: 2,
    removable: true
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChipComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('showChip$', () => {
    it('Should be false when created', () => {
      expect(component.showChip$.getValue()).toBeFalsy();
    });

    it('Should be true when providing a config' +
      ' and change detection cycle activated', () => {
      component.chipConfig = mockConfig;
      fixture.detectChanges();
      component.ngOnChanges({} as SimpleChanges);
      expect(component.showChip$.getValue()).toBeTruthy();
    });

    it('Should be false after chip config timer runs out', () => {
      component.chipConfig = mockConfig;
      fixture.detectChanges();
      component.ngOnChanges({} as SimpleChanges);
      setTimeout(() => {
        expect(component.showChip$.getValue()).toBeFalsy();
      }, 2001);
    });
  });

  describe('onRemove', () => {
    it('Should set showChip$ to false', () => {
      expect(component.showChip$.getValue()).toBeFalsy();
    });

    it('Should call removed event emitter', () => {
      const spy = jest.spyOn(component.removed, 'emit');
      component.onRemove({} as Event);
      expect(spy).toHaveBeenCalled();
    });
  });
});
