import { Board } from './../../core/interface/board.interface';
import { Observable, of } from 'rxjs';
import { StateService } from './../../state/state.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  board$: Observable<Board | null> = of(null);
  constructor(
    private state: StateService
  ) { }

  ngOnInit(): void {
    this.board$ = this.state.getCurrentBoard();
  }

}
