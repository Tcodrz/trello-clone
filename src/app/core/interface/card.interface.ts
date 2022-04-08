export interface Card {
  id: string;
  name: string;
  listID: string;
  position: number;
  createdAt: number;
  cover?: string;
  description?: string;
}
