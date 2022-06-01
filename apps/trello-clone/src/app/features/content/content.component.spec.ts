import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContentComponent } from './content.component';
import { workspaceMock } from "../../mocks/workspace.mock";
import { DarkMode } from "@trello-clone/trello-interface";

describe('ContentComponent', () => {
  let component: ContentComponent;
  let fixture: ComponentFixture<ContentComponent>;
  let calcPositionSpy: jest.SpyInstance;
  let setMarginSpy: jest.SpyInstance;
  let setThemeSpy: jest.SpyInstance;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContentComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentComponent);
    component = fixture.componentInstance;
    setMarginSpy = jest.spyOn(component, 'setMargin');
    calcPositionSpy = jest.spyOn(component, "calcPosition");
    setThemeSpy = jest.spyOn(component, "setTheme");
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should call calcPosition when given a workspace input', () => {
    component.workspace = workspaceMock;
    expect(calcPositionSpy).toHaveBeenCalled();
  });

  describe('calcPosition', () => {
    describe('when workspace is truthy', () => {
      beforeEach(() => {
        component.workspace = workspaceMock;
        component.calcPosition(1024);
      });

      it('Should call setMargin with 0', () => {
        expect(setMarginSpy).toHaveBeenCalledWith(0);
      });
    });

    describe('when workspace is falsy', () => {
      beforeEach(() => {
        component.workspace = null;
      });

      it('Should call setMargin with 0 when screen size is medium', () => {
        component.calcPosition(600);
        expect(setMarginSpy).toHaveBeenCalledWith(0);
      });

      it('Should call setMargin with 300 if screen size is large', () => {
        component.calcPosition(2000);
        expect(setMarginSpy).toHaveBeenCalledWith(300);
      });
    });
  });

  describe('setMargin', () => {
    it('Should set the margin of ContentComponent', () => {
      component.setMargin(1)
      const margin = fixture.debugElement.nativeElement.style.marginLeft;
      expect(margin).toBe('1px');
    });
  });

  describe('theme', () => {
    it('Should call set theme with provided theme', () => {
      component.theme = DarkMode;
      fixture.detectChanges();
      expect(setThemeSpy).toHaveBeenCalledWith(DarkMode);
    });
  });

  describe('setTheme', () => {
    it('Should set the background color of ContentComponent according to theme provided', () => {
      component.setTheme(DarkMode);
      const backgroundColor = fixture.debugElement.nativeElement.style.backgroundColor;
      expect(backgroundColor).toEqual(DarkMode.boardBackground);
    });
  });

  describe('onResize', () => {
    it('Should call set width to event width and call calcPosition with width', () => {
      component.onResize({ target: { innerWidth: 800 } } as unknown as Event);
      expect(calcPositionSpy).toHaveBeenCalledWith(800);
    });
  });

});
