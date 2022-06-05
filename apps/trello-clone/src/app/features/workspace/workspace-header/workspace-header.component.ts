import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Workspace } from "@trello-clone/trello-interface";
import { Icons, LogoPreviewConfig, LogoPreviewSize } from "@ui-components";

@Component({
  selector: 'app-workspace-header',
  templateUrl: './workspace-header.component.html',
  styleUrls: ['./workspace-header.component.scss'],
})
export class WorkspaceHeaderComponent implements OnChanges {
  @Input() workspace: Workspace | null = null;
  Icons = Icons;
  logoPreviewConfig: LogoPreviewConfig = {} as LogoPreviewConfig;

  ngOnChanges(changes: SimpleChanges): void {
    this.logoPreviewConfig = {
      name: this.workspace?.name ?? '',
      size: LogoPreviewSize.Large
    }
  }
}
