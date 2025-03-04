export interface StickyNote {
    id: string;
    priority: "low" | "medium" | "high";
    task: string;
    completed: boolean;
    color: string;
    assignee: string;
}

export interface StickyNotesState {
    notes: StickyNote[];
}
