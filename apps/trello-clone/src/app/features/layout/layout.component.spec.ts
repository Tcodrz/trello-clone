import {ComponentFixture, TestBed} from '@angular/core/testing';
import {LayoutComponent} from './layout.component';
import {MockComponent} from 'ng-mocks';
import {TopnavComponent} from "../topnav/topnav.component";
import {SidebarComponent} from "../sidebar/sidebar.component";

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;
  let initLayoutSpy: jest.SpyInstance;
  let setBoardThemeSpy: jest.SpyInstance;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LayoutComponent,
        MockComponent(SidebarComponent),
        MockComponent(TopnavComponent)
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    initLayoutSpy = jest.spyOn(component, 'initLayout' as never);
    setBoardThemeSpy = jest.spyOn(component, 'setBoardTheme' as never);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnChanges', () => {
    it('Should set hasChanges to true', () => {
      component.ngOnChanges();
      expect(component['hasChanges']).toEqual(true);
    });
  });

  describe('ngAfterViewInit', () => {
    beforeEach(() => {
      component.ngOnChanges();
      component.ngAfterViewInit();
    });
    it('Should call initLayout', () => {
      expect(initLayoutSpy).toHaveBeenCalled();
    });
    it('Should call setBoardTheme if hasChanges is true', () => {
      expect(setBoardThemeSpy).toHaveBeenCalled();
    });
    it('Should set hasChanges to false', () => {
      expect(component['hasChanges']).toEqual(false);
    });
  });

});
