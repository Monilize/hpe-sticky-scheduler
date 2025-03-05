export interface StickyNote {
    id: string;
    priority: 'low' | 'medium' | 'high';
    task: string;
    completed: boolean;
    assignee: string;
    position: { x: number; y: number };
}


export interface StickyNotesState {
    notes: StickyNote[];
    filter: string | null;
}
