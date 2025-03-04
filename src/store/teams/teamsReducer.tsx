import { createReducer } from "@reduxjs/toolkit";
import { addTeam, removeTeam, updateTeam } from "./teamsActions";

interface Team {
  id: string;
  name: string;
  color: string;
}

interface TeamsState {
  teams: Team[];
}

const initialState: TeamsState = {
  teams: [],
};

const teamsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addTeam, (state, action) => {
      state.teams.push(action.payload);
    })
    .addCase(removeTeam, (state, action) => {
      state.teams = state.teams.filter((team) => team.id !== action.payload);
    })
    .addCase(updateTeam, (state, action) => {
      const index = state.teams.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.teams[index] = action.payload;
      }
    });
});

export default teamsReducer;
