import { createAction } from "@reduxjs/toolkit";
import { StickyNote } from "./stickyNotesTypes";

// Define actions separately
export const addStickyNote = createAction<StickyNote>("stickyNotes/addStickyNote");
export const removeStickyNote = createAction<string>("stickyNotes/removeStickyNote"); // ID of note to remove
export const toggleStickyNote = createAction<string>("stickyNotes/toggleStickyNote"); // ID to toggle completion
export const updateStickyNote = createAction<StickyNote>("stickyNotes/updateStickyNote");
