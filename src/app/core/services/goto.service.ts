import { Board } from './../interface/board.interface';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GotoService {

  constructor(
    private router: Router
  ) { }
  private goto(route: string, params?: object) {
    const commands: any[] = [route];
    if (!!params) commands.push(params);
    this.router.navigate(commands);
  }
  home() { this.goto(''); }
  dashboard() { this.goto('dashboard/boards'); }
  login() { this.goto('home'); }
  workspace(workspaceID: string) { this.goto('workspace', { workspaceID }); }
  boards() { this.goto('/dashboard/boards'); }
  board(boardID: string, workspaceID: string) { this.goto('board', { workspaceID, boardID }); }
}
