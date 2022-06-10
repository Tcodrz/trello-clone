import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ContentComponent} from './content.component';
import {DarkMode, ScreenSize} from "@trello-clone/trello-interface";

describe('ContentComponent', () => {
  let component: ContentComponent;
  let fixture: ComponentFixture<ContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContentComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('workspace', () => {

    it('should set margin-left to 0 when workspace is truthy', () => {
      component.workspace = {
        id: "1234",
        name: "mock workspace",
        userID: "a123b3"
      };
      fixture.detectChanges();
      const element = fixture.debugElement.nativeElement;
      expect(element.style.marginLeft).toEqual('0px');
    });

    it('should set margin-left to 300px when workspace is null and screen size is large', () => {
      component['_width'] = 1200;
      component.workspace = null;
      fixture.detectChanges();
      const element = fixture.debugElement.nativeElement;
      expect(element.style.marginLeft).toEqual('300px');
    });

    it('Should set margin-left to 0 if workspace is null and screen size is medium', () => {
      component['_width'] = 400;
      component.workspace = null;
      fixture.detectChanges();
      const element = fixture.debugElement.nativeElement;
      expect(element.style.marginLeft).toEqual('0px');
    });

    it('Should set the max-width to 800px when workspace is null and screen size is large', () => {
      component['_width'] = ScreenSize.Large;
      component.workspace = null;
      fixture.detectChanges();
      expect(component.content.nativeElement.style.maxWidth).toEqual('800px');
    });

    it('Should set the max-width to initial when workspace is null and screen size is small', () => {
      component['_width'] = ScreenSize.Small;
      component.workspace = null;
      fixture.detectChanges();
      expect(component.content.nativeElement.style.maxWidth).toEqual('initial');
    });

    it('Should set the max-width to initial when workspace is truthy', () => {
      component.workspace = {id: "123", name: "mock workspace", userID: ""};
      expect(component.content.nativeElement.style.maxWidth).toEqual('initial');
    });
  });

  describe('theme', () => {
    it('Should not set the backgroundColor when theme is null', () => {
      component.theme = null;
      expect(fixture.debugElement.nativeElement.style.backgroundColor).toBeFalsy();
    });
    it('should set the background color to the theme board backgroundColor when theme is provided', () => {
      component.theme = DarkMode;
      fixture.detectChanges();
      const element = fixture.debugElement.nativeElement;
      expect(element.style.backgroundColor).toEqual(DarkMode.boardBackground);
    });
  });

  describe('onResize', () => {
    let element: HTMLElement;
    beforeEach(() => {
      element = fixture.debugElement.nativeElement;
    });
    it('should set margin-left to 0px when screen size is medium', () => {
      component.onResize({
        target: {
          innerWidth: 400
        }
      } as unknown as Event)
      expect(element.style.marginLeft).toEqual('0px');
    });

    it('Should set margin-left to 300px when screen size is large', () => {
      component.onResize({
        target: {
          innerWidth: 1200
        }
      } as unknown as Event);
      expect(element.style.marginLeft).toEqual('300px');
    });
  });

  describe('ngAfterViewInit', () => {
    beforeEach(() => {
      component.workspace = null;
    });

    it('should set max-width to 800px when screen size is large', () => {
      component['_width'] = ScreenSize.Large;
      fixture.detectChanges();
      component.ngAfterViewInit();
      expect(component.content.nativeElement.style.maxWidth).toEqual('800px');
    });

    it('Should set max-width to initial when screen size is medium', () => {
      component['_width'] = ScreenSize.Medium;
      fixture.detectChanges();
      component.ngAfterViewInit();
      expect(component.content.nativeElement.style.maxWidth).toEqual('initial');
    });
  });

});
