import { Component, OnInit } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { Workspace } from 'src/app/core/interface/workspace.interface';
import { StateService } from './../../state/state.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {
  workspace$: Observable<Workspace | null> = of(null);
  constructor(
    private state: StateService,
  ) { }

  ngOnInit(): void {
    this.workspace$ = this.state.getCurrentWorkspace().pipe(
      tap((workspace) => console.log(workspace))
    );

  }

}
