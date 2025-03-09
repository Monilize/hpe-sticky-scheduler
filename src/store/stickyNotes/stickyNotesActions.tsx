import { createAction } from "@reduxjs/toolkit";
import { StickyNote } from "./stickyNotesTypes";

// Define actions separately
export const addStickyNote = createAction<StickyNote>("stickyNotes/addStickyNote");
export const removeStickyNote = createAction<string>("stickyNotes/removeStickyNote");
export const toggleStickyNote = createAction<string>("stickyNotes/toggleStickyNote");
export const updateStickyNote = createAction<StickyNote>("stickyNotes/updateStickyNote");
export const updateStickyNotePosition = createAction<{ id: string; x: number; y: number }>("stickyNotes/updatePosition");
export const updateFilteredStickyNotes = createAction<string>("stickyNotes/updateFilteredStickyNotes");
