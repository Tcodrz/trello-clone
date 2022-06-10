import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import { Icons } from '../icon/icons';

export type ButtonTypes = 'button' | 'submit';

@Component({
  selector: 'ui-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements AfterViewInit{
  @Input() type: ButtonTypes | undefined = 'button';
  @Input() icon: Icons | undefined = Icons.None;
  @Input() className: string | undefined = '';
  @Input() disabled: boolean | undefined = false;
  @Output() submit: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('btnText') btnText!: ElementRef;
  @ViewChild('content') content!: ElementRef;

  ngAfterViewInit(): void {
    if(this.btnText.nativeElement.innerHTML.length > 0) {
      this.content.nativeElement.style.columnGap = '8px';
    }
  }
}
