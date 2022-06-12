export enum ChipColors {
  Success = '#CDFFC1FF' ,
  Danger = '#ffb1b1',
  Primary = '#98c4ff',
  Secondary = ''
}

export interface ChipConfig {
  icon: string;
  label: string;
  removable: boolean;
  styleClass?: string;
  color: ChipColors;
  timeOut?: number; // time in seconds - after this time the chip will be hidden
}

export enum ChipTextColors {
  Success = '#5aac44',
  Danger = '#c32e2e',
  Primary = '#244779',
  Secondary = ''
}
