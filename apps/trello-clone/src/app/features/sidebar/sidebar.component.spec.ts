import {ComponentFixture, TestBed} from '@angular/core/testing';
import {SidebarComponent} from './sidebar.component';
import {ActivatedRoute} from "@angular/router";
import {
  createSidebarServiceMock,
} from "@trello-clone/trello-mocks";
import {BoardsService} from "../../core/services/boards.service";
import {GotoService} from "../../core/services/goto.service";
import {SidebarService} from "../../core/services/sidebar.service";
import {WorkspaceService} from "../../core/services/workspace.service";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {createWorkspaceServiceMock, MOCK_WORKSPACE} from "../../mocks/workspace.service.mock";
import {createBoardsServiceMock, boardMock} from "../../mocks/board.service.mock";
import {createGotoServiceMock} from "../../mocks/goto.service.mock";
import {createActiveRouteMock, MockParams} from "../../mocks/active-route.mock";

const activatedRouteParamsMock: MockParams = {
  workspaceID: MOCK_WORKSPACE.id,
  boardID: boardMock.id
}

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let workspaceServiceMock: WorkspaceService;
  let boardServiceMock: BoardsService;
  let initSideBarSpy: jest.SpyInstance;
  let updateThemeSpy: jest.SpyInstance;
  let initWorkspaceSpy: jest.SpyInstance;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarComponent],
      providers: [
        {provide: ActivatedRoute, useValue: createActiveRouteMock(activatedRouteParamsMock)},
        {provide: BoardsService, useValue: createBoardsServiceMock()},
        {provide: GotoService, useValue: createGotoServiceMock()},
        {provide: SidebarService, useValue: createSidebarServiceMock()},
        {provide: WorkspaceService, useValue: createWorkspaceServiceMock()}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    initSideBarSpy = jest.spyOn(component, 'initSidebar');
    updateThemeSpy = jest.spyOn(component, 'updateTheme');
    initWorkspaceSpy = jest.spyOn(component, 'initWorkspace');
    workspaceServiceMock = TestBed.inject(WorkspaceService);
    boardServiceMock = TestBed.inject(BoardsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should call initSidebar on window resize event', () => {
    Object.defineProperty(window, 'resizeBy', {
      value: () => null
    });
    expect(initSideBarSpy).toHaveBeenCalled();
  });

  // describe('ngOnChanges', () => {
  //   it('Should call updateTheme', () => {
      // component.ngOnChanges();
  //     expect(updateThemeSpy).toHaveBeenCalled();
  //   });
  // });

  describe('ngOnInit', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('Should call initSidebar', () => {
      expect(initSideBarSpy).toHaveBeenCalled();
    });

    it('Should call workspaceService.getAll', () => {
      expect(workspaceServiceMock.getAll).toHaveBeenCalled();
    });

    it('Should call initWorkspace with correct workspace id', () => {
      expect(initWorkspaceSpy).toHaveBeenCalledWith(MOCK_WORKSPACE.id);
    });

    // it('Should call boardService.getBoard with correct board id', () => {
    //   expect(boardServiceMock.getBoard).toHaveBeenCalled()
    // });
  });

  describe('initWorkspace', () => {
    beforeEach(() => {
      component.initWorkspace(MOCK_WORKSPACE.id);
    })
    it('Should call workspaceService.getWorkspace', () =>{
      expect(workspaceServiceMock.getWorkspace).toHaveBeenCalledWith(MOCK_WORKSPACE.id);
    });
    it('Should call boardsService.getBoards', () => {
      expect(boardServiceMock.getBoards).toHaveBeenCalledWith(MOCK_WORKSPACE.id);
    })
  });

});
