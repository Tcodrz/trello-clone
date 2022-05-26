import { environment } from '../../../environments/environment';
export function isDev(): boolean {
  return !environment.production;
}
