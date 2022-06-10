import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TopnavComponent} from './topnav.component';
import {GotoService} from "../../core/services/goto.service";
import {createUserServiceMock} from "@trello-clone/trello-mocks";
import {UserService} from "../../core/services/user.service";
import {WorkspaceService} from "../../core/services/workspace.service";
import {ButtonModule, MenuItem, MenuModule} from "@ui-components";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {createWorkspaceServiceMock} from "../../mocks/workspace.service.mock";
import {createGotoServiceMock} from "../../mocks/goto.service.mock";


describe('TopnavComponent', () => {
  let component: TopnavComponent;
  let fixture: ComponentFixture<TopnavComponent>;
  let gotoServiceMock: GotoService;
  let userServiceMock: UserService;
  let workspaceServiceMock: WorkspaceService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopnavComponent],
      imports: [ButtonModule, MenuModule],
      providers: [
        {provide: GotoService, useValue: createGotoServiceMock()},
        {provide: UserService, useValue: createUserServiceMock()},
        {provide: WorkspaceService, useValue: createWorkspaceServiceMock()},
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopnavComponent);
    component = fixture.componentInstance;
    gotoServiceMock = TestBed.inject(GotoService);
    userServiceMock = TestBed.inject(UserService);
    workspaceServiceMock = TestBed.inject(WorkspaceService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('Should init profile menu', () => {
      expect(component.profileMenuItems).toBeTruthy();
    });

    it('Should call workspaceService.getMenuItems', () => {
      expect(workspaceServiceMock.getMenuItems).toHaveBeenCalled();
    });

    it('Should call userService.getUser', () => {
      expect(userServiceMock.getUser).toHaveBeenCalled();
    });
  });

  describe('onMenuItemClick', () => {
    it('Should call item.command if provided and item with command', () => {
      const item = {
        label: '',
        command: jest.fn()
      } as MenuItem;
      component.onMenuItemClick(item);
      expect(item.command).toHaveBeenCalled();
    });
  });

  describe('goToDashboard', () => {
    it('Should call gotoService.dashboard', () => {
      component.gotoDashboard();
      expect(gotoServiceMock.dashboard).toHaveBeenCalled();
    });
  });

  describe('smallScreen', () => {
    it('should return true if small screen', () => {
      Object.defineProperty(window, 'innerWidth', {
        value: 100
      });
      expect(component.smallScreen).toEqual(true);
    });
    it('Should return false if large or medium screen', () => {
      Object.defineProperty(window, 'innerWidth', {value: 1000});
      expect(component.smallScreen).toEqual(false);
    })
  });
});
