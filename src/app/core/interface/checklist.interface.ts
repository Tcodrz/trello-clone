export interface Checklist {
  id: string;
  name: string;
  items: ChecklistItem[];
}

export interface ChecklistItem {
  id: string;
  title: string;
  checklistID: string;
  completed: boolean;
  position: number;
}
