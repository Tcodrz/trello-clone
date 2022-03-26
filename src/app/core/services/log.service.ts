import { Action } from './../../state/state.service';
import { Injectable } from '@angular/core';

export interface LogObject {
  action: Action;
  value?: any;
  message?: string | undefined;
}

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private lastLog!: LogObject;
  constructor() { }
  logAction(log: LogObject) {
    const sameLog = this.sameLog(log);
    if (!sameLog) {
      this.lastLog = log;
      console.log(`${log.action} - ${log.message ?? ''}`, log.value);
    }
  }
  private sameLog(newLog: LogObject): boolean {
    if (!this.lastLog) return false;
    return this.lastLog.action === newLog.action &&
      this.lastLog.value === newLog.value &&
      this.lastLog.message === newLog.message;
  }
}
