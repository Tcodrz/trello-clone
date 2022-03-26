import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Workspace } from 'src/app/core/interface/workspace.interface';
import { DropdownOption } from '../../core/interface/dropdown-option.interface';

@Component({
  selector: 'app-new-board-menu',
  templateUrl: './new-board-menu.component.html',
  styleUrls: ['./new-board-menu.component.scss']
})
export class NewBoardMenuComponent implements OnInit, OnChanges {
  @Input() set workspaces(workspaces: Workspace[] | null) {
    if (workspaces)
      this.workspaceOptions = workspaces.map(workspace => ({ code: workspace.id, name: workspace.name }));
  };
  @Input() currentWorkspace: Workspace | null = null;
  newBoard: FormGroup = new FormGroup({});
  workspaceOptions: DropdownOption[] = [];
  constructor(
    private fb: FormBuilder,
  ) { }
  ngOnInit(): void {
    this.newBoard = this.fb.group({
      boardName: this.fb.control('', [Validators.required]),
      workspaceID: this.fb.control('', [Validators.required]),
    });
  }

  ngOnChanges(): void {
    let currentWorkspaceOption: DropdownOption | undefined = undefined;
    if (this.currentWorkspace) {
      currentWorkspaceOption = {
        code: this.currentWorkspace.id,
        name: this.currentWorkspace.name,
      }
      const control = this.newBoard.controls['workspaceID'];
      if (!!control) control.patchValue(currentWorkspaceOption);
    }
  }

}
