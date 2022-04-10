import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'ui-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressComponent {
  @Input() set value(val: number | null) {
    console.log(val);
    if (this.progress && (val || val === 0)) this.setProgrssStyles(val);
  };
  @ViewChild('progress') progress!: ElementRef;
  constructor() { }
  setProgrssStyles(i: number) {
    const element = this.progress.nativeElement as HTMLDivElement;
    element.style.width = `${i}%`;
    element.style.backgroundColor = i === 100 ? '#61bd4f' : '#5ba4cf';
  }
}
