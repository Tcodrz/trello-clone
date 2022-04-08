import { Observable, of } from 'rxjs';
import { CardStore } from './../../state/card/card.store';
import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { CardQuery } from 'src/app/state/card/card.query';
import { Card } from 'src/app/core/interface/card.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent implements OnInit, OnDestroy {
  card$: Observable<Card | null> = of(null);

  constructor(
    private cardQuery: CardQuery,
    private cardStore: CardStore,
  ) { }
  ngOnInit(): void {
    this.card$ = this.cardQuery.card$;
  }
  ngOnDestroy(): void {
    console.log('OnDestroy CardComponent');
    this.cardStore.update({ card: null });
  }


}
