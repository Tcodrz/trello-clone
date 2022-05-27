import {ComponentFixture, TestBed} from '@angular/core/testing';
import {WorkspaceComponent} from './workspace.component';
import {BoardsService} from "../../core/services/boards.service";
import {GotoService} from "../../core/services/goto.service";
import {WorkspaceService} from "../../core/services/workspace.service";
import {
  createBoardsServiceMock,
  createGotoServiceMock,
  createWorkspaceServiceMock,
  MOCK_WORKSPACE
} from "@trello-clone/trello-mocks";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {of} from "rxjs";
import {Board, Theme} from "@trello-clone/trello-interface";


function createActivatedRouteMock(): Partial<ActivatedRoute> {
  return {
    params: of({'workspaceID': MOCK_WORKSPACE.id} as unknown as ParamMap),
  };
}

const MOCK_BOARD: Board = {
  createdAt: 0,
  members: [],
  name: 'mock board',
  theme: {} as Theme,
  updatedAt: 0,
  id: '1',
  lists: [],
  listIDs: ['1'],
  workspaceID: '1'
};

describe('WorkspaceComponent', () => {
  let component: WorkspaceComponent;
  let fixture: ComponentFixture<WorkspaceComponent>;
  let boardsServiceMock: BoardsService;
  let gotoServiceMock: GotoService;
  let workspaceServiceMock: WorkspaceService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkspaceComponent],
      providers: [
        {provide: ActivatedRoute, useValue: createActivatedRouteMock()},
        {provide: BoardsService, useValue: createBoardsServiceMock()},
        {provide: GotoService, useValue: createGotoServiceMock()},
        {provide: WorkspaceService, useValue: createWorkspaceServiceMock()}
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspaceComponent);
    component = fixture.componentInstance;
    boardsServiceMock = TestBed.inject(BoardsService);
    gotoServiceMock = TestBed.inject(GotoService);
    workspaceServiceMock = TestBed.inject(WorkspaceService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () =>{
    beforeEach(() => {
      component.ngOnInit();
    });

    it('Should initialize view$', () => {
      expect(component.view$).toBeTruthy();
    });

    it('Should Call workspaceService.getWorkspace with workspace id', () => {
      expect(workspaceServiceMock.getWorkspace).toHaveBeenCalledWith(MOCK_WORKSPACE.id);
      component.view$.subscribe((view) => {
          expect(view.currentWorkspace).toEqual(MOCK_WORKSPACE);
      });
    });

    it('Should call workspaceService.getAll', () => {
      expect(workspaceServiceMock.getAll).toHaveBeenCalled();
    });

    it('Should call boardsService.getBoards with workspace id', () => {
      expect(boardsServiceMock.getBoards).toHaveBeenCalledWith(MOCK_WORKSPACE.id);
    });
  });

  describe('onBoardClick', () => {
    it('Should call gotoService.board with board id and workspaceID', () => {
        component.onBoardClick(MOCK_BOARD);
        expect(gotoServiceMock.board).toHaveBeenCalledWith(MOCK_BOARD.id, MOCK_BOARD.workspaceID)
    });
  });

  describe('onCreateBoard', () => {
    beforeEach(() => {
      component.onCreateBoard(MOCK_BOARD);
    });

    it('Should call boardsService.createNewBoard with new board', () => {
        expect(boardsServiceMock.createNewBoard).toHaveBeenCalledWith(MOCK_BOARD);
    });
  });
});
