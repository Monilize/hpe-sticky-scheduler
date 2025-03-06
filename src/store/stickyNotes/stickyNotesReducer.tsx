import { createReducer } from "@reduxjs/toolkit";
import { StickyNotesState } from "./stickyNotesTypes";
import { addStickyNote, removeStickyNote, toggleStickyNote, updateStickyNote } from "./stickyNotesActions";

const initialState: StickyNotesState = {
    notes: [
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
    filter: null,
};

const stickyNotesReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(addStickyNote, (state, action) => {
            const newStickyNote = {
                ...action.payload,
                position: action.payload.position || { x: 0, y: 0 }, // Ensure position exists
            };
            state.notes.push(newStickyNote); // Add the note with position
        })
        .addCase(removeStickyNote, (state, action) => {
            state.notes = state.notes.filter((note) => note.id !== action.payload);
        })
        .addCase(toggleStickyNote, (state, action) => {
            const note = state.notes.find((note) => note.id === action.payload);
            if (note) note.completed = !note.completed;
        })
        .addCase(updateStickyNote, (state, action) => {
            const index = state.notes.findIndex((note) => note.id === action.payload.id);
            if (index !== -1) {
                state.notes[index] = { ...state.notes[index], ...action.payload };
            }
        });
});

export default stickyNotesReducer;
