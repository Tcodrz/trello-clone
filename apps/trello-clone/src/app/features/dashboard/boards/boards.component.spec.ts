import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BoardsComponent} from './boards.component';
import {BoardsService} from "../../../core/services/boards.service";
import {createBoardsServiceMock} from "../../../mocks/board.service.mock";
import {WorkspaceService} from "../../../core/services/workspace.service";
import {createWorkspaceServiceMock} from "../../../mocks/workspace.service.mock";

describe('FeedComponent', () => {
  let component: BoardsComponent;
  let fixture: ComponentFixture<BoardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardsComponent],
      providers: [
        {provide: BoardsService, useValue: createBoardsServiceMock()},
        {provide: WorkspaceService, useValue: createWorkspaceServiceMock()}
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
