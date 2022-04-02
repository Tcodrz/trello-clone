import { Card } from './../../core/interface/card.interface';
import { Component, OnInit, Input, ChangeDetectionStrategy, ElementRef } from '@angular/core';

@Component({
  selector: 'app-list-card-preview',
  templateUrl: './list-card-preview.component.html',
  styleUrls: ['./list-card-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListCardPreviewComponent implements OnInit {
  @Input() card!: Card;
  constructor(
    public elementRef: ElementRef
  ) { }

  ngOnInit(): void {
  }

}
