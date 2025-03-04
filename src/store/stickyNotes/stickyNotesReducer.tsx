import { createReducer } from "@reduxjs/toolkit";
import { StickyNotesState } from "./stickyNotesTypes";
import { addStickyNote, removeStickyNote, toggleStickyNote, updateStickyNote } from "./stickyNotesActions";

const initialState: StickyNotesState = {
    notes: [],
};

const stickyNotesReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(addStickyNote, (state, action) => {
            state.notes.push(action.payload);
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
            if (index !== -1) state.notes[index] = action.payload;
        });
});

export default stickyNotesReducer;
