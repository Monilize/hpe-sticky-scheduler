export interface StickyNote {
    id: string;
    priority: 'low' | 'medium' | 'high';
    task: string;
    completed: boolean;
    assignee: string;
    position: { x: number; y: number };
}

export interface FilteredStickyNotes {
    id: string;
    priority: 'low' | 'medium' | 'high';
    task: string;
    completed: boolean;
    assignee: string;
    position: { x: number; y: number };
}


export interface StickyNotesState {
    notes: StickyNote[];
    filtered_sticky_notes: FilteredStickyNotes[];
    filter: string;
}
