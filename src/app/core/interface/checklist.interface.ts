export interface Checklist {
  id: string;
  name: string;
  items: ChecklistItem[];
}

export interface ChecklistItem {
  title: string;
  checklistID: string;
  completed: boolean;
}
