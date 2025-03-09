import { createReducer } from "@reduxjs/toolkit";
import { TeamsState } from "./teamsTypes";
import { addTeamMember } from "./teamsActions";
import { toast } from "sonner";

const initialState: TeamsState = {
  team_members: [
    { id: "1", name: "John Smith", color: "#84dcc6" },
    { id: "2", name: "Jana du Toit", color: "#b8b8ff" },
    { id: "3", name: "Kathelo Mohapi", color: "#efe9ae" },
  ],
};

const teamsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addTeamMember, (state, action) => {
      const newMember = action.payload;
      // Check if a member with the same name already exists (case-insensitive)
      const exists = state.team_members.some(
        (member) => member.name.toLowerCase() === newMember.name.toLowerCase()
      );

      if (exists) {
        toast.error("Oops!", {
          description: "Oops, the team member already exists.",
        })

      } else {
        state.team_members.push(newMember);
        toast.success("Success!", {
          description: "Team member added successfully.",
        })
      }

    });
});

export default teamsReducer;
