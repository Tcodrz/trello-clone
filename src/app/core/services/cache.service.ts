import { Injectable } from '@angular/core';

export enum CacheKeys {
  User = 't_user',
}

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  constructor() { }
  setItem(key: CacheKeys, item: any): void {
    localStorage.setItem(key, JSON.stringify(item));
  }
  getItem<T>(key: CacheKeys): T | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }
}
