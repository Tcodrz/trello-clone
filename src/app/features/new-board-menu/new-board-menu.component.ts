import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Workspace } from 'src/app/core/interface/workspace.interface';
import { DropdownOption } from '../../../../projects/ui-components/src/interface/dropdown-option.interface';
import { Board } from './../../core/interface/board.interface';
import { Themes } from './../../core/interface/themes';

@Component({
  selector: 'app-new-board-menu',
  templateUrl: './new-board-menu.component.html',
  styleUrls: ['./new-board-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewBoardMenuComponent implements OnChanges, OnDestroy {
  @Input() set workspaces(workspaces: Workspace[] | null) {
    if (workspaces)
      this.workspaceOptions = workspaces.map(workspace => ({ code: workspace.id, name: workspace.name }));
  };
  @Input() currentWorkspace: Workspace | null = null;
  @Output() submitNewBoard: EventEmitter<Partial<Board>> = new EventEmitter();
  newBoardForm!: FormGroup;
  workspaceOptions: DropdownOption[] = [];
  themes: DropdownOption[] = Object.values(Themes).map(theme => ({ code: theme.id, name: theme.name }))
  constructor(
    private fb: FormBuilder,
  ) { }
  ngOnDestroy(): void { this.newBoardForm.reset(); }
  ngOnChanges(): void {
    if (!this.newBoardForm) this.initForm();
    this.initWorkspaceList();
  }
  initForm() {
    this.newBoardForm = this.fb.group({
      boardName: this.fb.control('', [Validators.required]),
      workspace: this.fb.control('', [Validators.required]),
      theme: this.fb.control(this.themes[0], [Validators.required]),
    });
  }
  onSubmit() {
    const board = {
      name: this.newBoardForm.value.boardName,
      workspaceID: this.newBoardForm.value.workspace.code,
      theme: Themes[this.newBoardForm.value.theme.name as keyof Themes]
    };
    debugger;
    this.submitNewBoard.emit(board);
  }
  initWorkspaceList() {
    let currentWorkspaceOption: DropdownOption | undefined = undefined;
    if (this.currentWorkspace) {
      currentWorkspaceOption = {
        code: this.currentWorkspace.id,
        name: this.currentWorkspace.name,
      }
      const control = this.newBoardForm.controls['workspace'];
      if (!!control) control.patchValue(currentWorkspaceOption);
    }
  }
  resetForm() {
    if (this.newBoardForm.touched) {
      this.newBoardForm.reset();
      this.initWorkspaceList()
    }
  }
}
