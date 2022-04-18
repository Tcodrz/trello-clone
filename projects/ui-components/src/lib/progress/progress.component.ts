import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'ui-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressComponent {
  @Input() set value(val: number | null) { this.setProgrssStyles(val ?? 0); };
  @ViewChild('progress', { static: true }) progress!: ElementRef;
  width: number = 0;
  progressValueStyles = {
    height: 'inherit',
    transition: 'all 2s ease-in -out',
    width: '0%',
    backgroundColor: 'transparent'
  };
  constructor() { }
  setProgrssStyles(i: number) {
    this.width = i;
    this.progressValueStyles = {
      ...this.progressValueStyles,
      backgroundColor: i === 100 ? '#61bd4f' : '#5ba4cf',
      width: this.width + '%',
      transition: 'all 2s ease-in-out',
    }
  }
}
