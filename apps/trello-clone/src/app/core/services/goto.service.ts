import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GotoService {

  constructor(
    private router: Router,
    private location: Location
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
  cardToggle(cardID: string) {
    const url = this.location.path();
    const parts = url.split(';');
    if (parts.length === 3) // no card selected
      this.location.replaceState(url + ';cardID=' + cardID);
    else if (parts.length === 4) // remove cardID from URL
      this.location.replaceState(parts.slice(0, parts.length - 1).join(';'));
    else debugger; // shold not occur
  }
}
