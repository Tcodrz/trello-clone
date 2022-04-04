import { BoardsService } from './../services/boards.service';
import { Board } from './../interface/board.interface';
import { CacheService, CacheKeys } from './../services/cache.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoardGuard implements CanActivate {
  constructor(
    private boardService: BoardsService,
    private cache: CacheService,
    private router: Router,
  ) { }
  canActivate(): Observable<boolean | UrlTree> {
    const cacheBoard = this.cache.getItem<Board>(CacheKeys.CurrentBoard);
    return this.boardService.getCurrentBoard().pipe(
      map(board => {
        const hasBoard = !!board || !!cacheBoard;
        if (!board && !!cacheBoard) this.boardService.setCurrentBoard(cacheBoard);
        return hasBoard ? true : this.router.createUrlTree(['workspace']);
      })
    );
  }

}
