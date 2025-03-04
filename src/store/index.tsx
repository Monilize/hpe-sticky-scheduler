import { configureStore } from "@reduxjs/toolkit";
import stickyNotesReducer from "./stickyNotes/stickyNotesReducer";
import teamsReducer from "./teams/teamsReducer";

export const store = configureStore({
  reducer: {
    stickyNotes: stickyNotesReducer,
    teams: teamsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
