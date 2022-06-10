import {ComponentFixture, TestBed} from '@angular/core/testing';
import {LayoutComponent} from './layout.component';
import {MockComponent} from 'ng-mocks';
import {TopnavComponent} from "../topnav/topnav.component";
import {SidebarComponent} from "../sidebar/sidebar.component";
import {DarkMode} from "@trello-clone/trello-interface";
import {ContentComponent} from "../content/content.component";

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;
  // let initLayoutSpy: jest.SpyInstance;
  let setBoardThemeSpy: jest.SpyInstance;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LayoutComponent,
        MockComponent(SidebarComponent),
        MockComponent(TopnavComponent),
        MockComponent(ContentComponent)
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    component.board = {
      createdAt: 0,
      id: "1234",
      listIDs: [],
      lists: [],
      members: [],
      name: "mock board",
      theme: DarkMode,
      updatedAt: 0,
      workspaceID: "1234"
    };
    component.workspace = {
      id: "1234",
      name: "mock workspace",
      userID: "1234"
    };
    // initLayoutSpy = jesst.spyOn(component, 'initLayout' as never);
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
    // it('Should call initLayout', () => {
    //   expect(initLayoutSpy).toHaveBeenCalled();
    // });
    it('Should call setBoardTheme if hasChanges is true', () => {
      expect(setBoardThemeSpy).toHaveBeenCalled();
    });
    it('Should set hasChanges to false', () => {
      expect(component['hasChanges']).toEqual(false);
    });
  });

});
