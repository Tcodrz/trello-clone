import { CardStore } from './../../../state/card/card.store';
import { CARD_MODAL } from './../../card/card-modal.config';
import { ModalService } from './../../../../../projects/ui-components/src/lib/modal/modal.service';
import { Component, OnInit, Input, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { Card } from 'src/app/core/interface/card.interface';
import { CardComponent } from '../../card/card.component';

@Component({
  selector: 'app-list-card-preview',
  templateUrl: './list-card-preview.component.html',
  styleUrls: ['./list-card-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListCardPreviewComponent implements OnInit {
  @Input() card!: Card;
  constructor(
    public elementRef: ElementRef,
    private modalService: ModalService,
    private cardStore: CardStore,
  ) { }

  ngOnInit(): void {
  }
  openCard(): void {
    this.cardStore.update({ card: this.card })
    this.modalService.open({ ...CARD_MODAL, component: CardComponent });
  }
}
