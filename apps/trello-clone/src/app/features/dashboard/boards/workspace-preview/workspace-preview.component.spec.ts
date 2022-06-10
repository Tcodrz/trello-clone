import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkspacePreviewComponent } from './workspace-preview.component';
import {BoardsService} from "../../../../core/services/boards.service";
import {boardMock, createBoardsServiceMock} from "../../../../mocks/board.service.mock";
import {WorkspaceService} from "../../../../core/services/workspace.service";
import {createWorkspaceServiceMock} from "../../../../mocks/workspace.service.mock";
import {GotoService} from "../../../../core/services/goto.service";
import {createGotoServiceMock} from "../../../../mocks/goto.service.mock";
import {MockComponent} from "ng-mocks";
import {LogoPreviewComponent, MenuComponent, PreviewCardListComponent} from "@ui-components";
import {WorkspacePreviewToolbarComponent} from "../workspace-preview-toolbar/workspace-preview-toolbar.component";
import {NewBoardMenuComponent} from "../../../new-board-menu/new-board-menu.component";
import {SimpleChanges} from "@angular/core";

describe('WorkspacePreviewComponent', () => {
  let component: WorkspacePreviewComponent;
  let fixture: ComponentFixture<WorkspacePreviewComponent>;
  let boardServiceMock: BoardsService;
  let workspaceServiceMock: WorkspaceService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        WorkspacePreviewComponent,
        MockComponent(LogoPreviewComponent),
        MockComponent(WorkspacePreviewToolbarComponent),
        MockComponent(PreviewCardListComponent),
        MockComponent(MenuComponent),
        MockComponent(NewBoardMenuComponent)
      ],
      providers:[
        {provide: BoardsService, useValue: createBoardsServiceMock()},
        {provide: WorkspaceService, useValue: createWorkspaceServiceMock()},
        {provide: GotoService, useValue: createGotoServiceMock()}
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspacePreviewComponent);
    component = fixture.componentInstance;
    component.workspace = {
      id: "123", name: "mock workspace", userID: "1234"
    }
    boardServiceMock = TestBed.inject(BoardsService);
    workspaceServiceMock = TestBed.inject(WorkspaceService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call boardService.getWorkspaceBoards', () => {
      expect(boardServiceMock.getWorkspaceBoards).toHaveBeenCalledWith('123');
    });

    it('Should call workspaceService.getAll', () => {
      expect(workspaceServiceMock.getAll).toHaveBeenCalled();
    });

    it('Should set boardsPreviewItems$ with correct data', () => {
      component.boardsPreviewItems$.subscribe(items => {
        expect(items.length).toBe([boardMock].length);
        expect(items[0].name).toEqual(boardMock.name);
        expect(items[0].theme).toEqual(boardMock.theme);
      });
    });
  });

  describe('ngOnChanges', ()=>{
    it('should set the workspaceLogoConfig name to the provided workspace name', ()=> {
      component.ngOnChanges({} as SimpleChanges);
      expect(component.workspaceLogoConfig.name).toEqual("mock workspace");
    });
  });
});
