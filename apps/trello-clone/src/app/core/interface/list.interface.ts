import { Card } from './card.interface';
export interface List {
  id: string;
  name: string;
  position: number;
  cards: Card[];
}
