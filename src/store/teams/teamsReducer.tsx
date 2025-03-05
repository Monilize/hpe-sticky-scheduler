import { createReducer } from "@reduxjs/toolkit";
import { addTeam, removeTeam, updateTeam } from "./teamsActions";

interface TeamMember {
  id: string,
  name: string;
  color: string;
}

interface Team {
  id: string;
  name: string;
  team_members: TeamMember[];
}

interface TeamsState {
  teams: Team[];
}

const initialState: TeamsState = {
  teams: [ // Adding test data
    {
      id: "1",
      name: "Team Alpha",
      team_members: [
        { id: "1", name: "Jane Doe", color: "#adf7b6" },
        { id: "2", name: "John Smith", color: "#baf2e9" }
      ]
    }
  ],
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
