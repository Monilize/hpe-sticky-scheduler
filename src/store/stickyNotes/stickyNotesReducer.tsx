import { createReducer } from "@reduxjs/toolkit";
import { StickyNotesState } from "./stickyNotesTypes";
import { addStickyNote, removeStickyNote, toggleStickyNote, updateStickyNote, updateFilteredStickyNotes } from "./stickyNotesActions";

const initialState: StickyNotesState = {
    notes: [
        // Relevant Test Data
        {
            id: '1',
            task: 'Fix the website bug',
            priority: 'medium',
            completed: false,
            assignee: '1',
            position: { x: 0, y: 0 },
        },
        {
            id: '2',
            task: 'Update team meeting schedule',
            priority: 'high',
            completed: false,
            assignee: '2',
            position: { x: 100, y: 100 },
        }
    ],
    filtered_sticky_notes: [
        // Relevant Test Data
        {
            id: '1',
            task: 'Fix the website bug',
            priority: 'medium',
            completed: false,
            assignee: '1',
            position: { x: 0, y: 0 },
        },
        {
            id: '2',
            task: 'Update team meeting schedule',
            priority: 'high',
            completed: false,
            assignee: '2',
            position: { x: 100, y: 100 },
        }
    ],
    filter: 'all'
};

const stickyNotesReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(addStickyNote, (state, action) => {
            const newStickyNote = {
                ...action.payload
            };

            state.notes.push(newStickyNote); // Add the note to the main list

            // Update filtered_sticky_notes based on the current filter
            if (state.filter === null || state.filter === "all") {
                state.filtered_sticky_notes = state.notes;
            } else if (newStickyNote.assignee === state.filter) {
                // Only add to filtered_sticky_notes if it matches the current filter
                state.filtered_sticky_notes.push(newStickyNote);
            }
        })
        .addCase(removeStickyNote, (state, action) => {
            // Remove note from the main list
            state.notes = state.notes.filter((note) => note.id !== action.payload);

            // Also update filtered_sticky_notes to reflect the change
            state.filtered_sticky_notes = state.filtered_sticky_notes.filter((note) => note.id !== action.payload);
        })
        .addCase(toggleStickyNote, (state, action) => {
            // Find the note in the main list
            const note = state.notes.find((note) => note.id === action.payload);
            if (note) {
                note.completed = !note.completed;
            }

            // Update filtered_sticky_notes if necessary
            const filteredNote = state.filtered_sticky_notes.find((note) => note.id === action.payload);
            if (filteredNote) {
                filteredNote.completed = !filteredNote.completed;
            }
        })
        .addCase(updateStickyNote, (state, action) => {
            const index = state.notes.findIndex((note) => note.id === action.payload.id);
            if (index !== -1) {
                state.notes[index] = { ...state.notes[index], ...action.payload };
            }

            // Update filtered_sticky_notes to reflect the latest note updates
            if (state.filter === null || state.filter === "all") {
                state.filtered_sticky_notes = state.notes;
            } else {
                state.filtered_sticky_notes = state.notes.filter(
                    (note) => note.assignee === state.filter
                );
            }
        })
        .addCase(updateFilteredStickyNotes, (state, action) => {
            state.filter = action.payload;

            if (action.payload === null || action.payload === "all") {
                state.filtered_sticky_notes = state.notes;
                return;
            }

            // Filter notes based on the selected assignee
            state.filtered_sticky_notes = state.notes.filter((note) => note.assignee === action.payload);
        });
});

export default stickyNotesReducer;
