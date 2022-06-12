import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {ChipColors, ChipConfig, ChipTextColors} from "../chip-config.interface";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'ui-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChipComponent implements OnChanges {
  @Input() chipConfig!: ChipConfig;
  @Output() removed: EventEmitter<any> = new EventEmitter<any>();
  showChip$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  textColor: string = '';
  private timeOut: any;

  ngOnChanges(changes: SimpleChanges): void {
    this.textColor = ChipComponent.getTextColor(this.chipConfig.color);
    this.initChipTimeout();
  }

  onRemove(event: Event) {
    this.showChip$.next(false);
    clearTimeout(this.timeOut);
    this.removed.emit(event);
  }

  private static getTextColor(color: ChipColors): ChipTextColors {
    switch (color) {
      case ChipColors.Success:
        return ChipTextColors.Success;
      case ChipColors.Danger:
        return ChipTextColors.Danger;
      case ChipColors.Primary:
        return ChipTextColors.Primary;
      case ChipColors.Secondary:
        return ChipTextColors.Secondary;
    }
  }

  private initChipTimeout(): void {
    const isShown = this.showChip$.getValue();
    if (isShown) return;
    this.showChip$.next(true);
    if (this.chipConfig?.timeOut) {
      this.timeOut = setTimeout(() => {
        this.showChip$.next(false);
      }, this.chipConfig.timeOut * 1000);
    }
  }
}
