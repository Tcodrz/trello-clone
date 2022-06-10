import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DEFAULT_LINK_HOVER_COLOR, SidebarLinksComponent } from './sidebar-links.component';
import { ButtonModule, MenuItem } from "@ui-components";
import { DarkMode } from "@trello-clone/trello-interface";
import { By } from "@angular/platform-browser";
import { RouterTestingModule } from "@angular/router/testing";


const MENU_ITEMS_MOCK: MenuItem[] = [
  {
    label: 'mock link 1',
    command: jest.fn()
  },
  {
    label: 'mock link 2'
  },
  {
    label: 'mock link 3'
  }
];


describe('SidebarLinksComponent', () => {
  let component: SidebarLinksComponent;
  let fixture: ComponentFixture<SidebarLinksComponent>;
  let initStylesSpy: jest.SpyInstance;
  let resetLinksStyleSpy: jest.SpyInstance;
  let setSingleLinkStyleSpy: jest.SpyInstance;
  let setActiveLinkBackgroundSpy: jest.SpyInstance;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarLinksComponent],
      imports: [RouterTestingModule, ButtonModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarLinksComponent);
    component = fixture.componentInstance;
    component.menuItems = MENU_ITEMS_MOCK;
    initStylesSpy = jest.spyOn(component, "initStyles");
    resetLinksStyleSpy = jest.spyOn(SidebarLinksComponent.prototype as any, "resetLinksStyles");
    resetLinksStyleSpy.mockImplementation(() => {});
    setActiveLinkBackgroundSpy = jest.spyOn(SidebarLinksComponent.prototype as any, 'setActiveLinkBackground')
    setActiveLinkBackgroundSpy.mockImplementation(() => {});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngAfterViewInit', () => {
    it('Should call initStyles', () => {
      expect(initStylesSpy).toHaveBeenCalled();
    });
  });

  describe('onItemClick', () => {
    it('Should call item.command if provided an item with command', () => {
      component.onItemClick(MENU_ITEMS_MOCK[0]);
      expect(MENU_ITEMS_MOCK[0].command).toHaveBeenCalled();
    });

    it('Should call resetLinksStyle', () => {
      expect(resetLinksStyleSpy).toHaveBeenCalled();
    });
  });

  describe('onLinkHover', () => {
    beforeEach(() => {
      setSingleLinkStyleSpy = jest.spyOn(component, 'setSingleLinkStyle');
    });

    it('Should call setSingleLinkStyle with correct index and default background ' +
      'when no theme provided', () => {
      component.onLinkHover(1);
      expect(setSingleLinkStyleSpy).toHaveBeenCalledWith({ backgroundColor: DEFAULT_LINK_HOVER_COLOR }, 1);
    });

    it('Should call setSingleLinkStyle with correct index and theme background ' +
      'when theme provided', () => {
      component.theme = DarkMode;
      fixture.detectChanges();
      component.onLinkHover(1);
      expect(setSingleLinkStyleSpy).toHaveBeenCalledWith(
        { backgroundColor: DarkMode.sidebarLinksHover }, 1);
    });
  });

  describe('onLinkBlur', () => {

    beforeEach(() => {
      setSingleLinkStyleSpy = jest.spyOn(component, 'setSingleLinkStyle');
    });

    it('Should call setActiveLinkBackground when link is active', () => {
      const links = fixture.debugElement.queryAll(By.css('a'));
      links[0].nativeElement.classList.add('active');
      component.onLinkBlur(0);
      expect(setActiveLinkBackgroundSpy).toHaveBeenCalledWith(0);
    });

    it('Should call setSingleLinkStyle with correct index and theme background ' +
      'when theme provided', () => {
      component.theme = DarkMode;
      component.onLinkBlur(1);
      expect(setSingleLinkStyleSpy).toHaveBeenCalledWith({
        backgroundColor: 'transparent'
      }, 1);
    });
  });

  describe('setLinksStyle', () => {
    beforeEach(() => {
      setSingleLinkStyleSpy = jest.spyOn(component, "setSingleLinkStyle");
    })
    it('Should call setSingleLinkStyle with the correct styles object to all links', () => {
      const linkStyle = {
        color: 'black',
        width: '10px'
      };
      component.setLinksStyle(linkStyle);
      expect(setSingleLinkStyleSpy).toHaveBeenCalledTimes(MENU_ITEMS_MOCK.length);
      expect(setSingleLinkStyleSpy).toHaveBeenLastCalledWith(linkStyle, MENU_ITEMS_MOCK.length - 1);
    });
  });

  describe('setSingleLinkStyle', () => {
    it('Should set the correct style object to the link in the provided index', () => {
      const linkStyle = {
        color: 'black'
      };
      component.setSingleLinkStyle(linkStyle, 1);
      const links = fixture.debugElement.queryAll(By.css('a'));
      const link = links[1];
      expect(link.nativeElement.style.color).toBe('black');
      expect(links[0].nativeElement.style.color).not.toBe('black');
    });
  });
});
