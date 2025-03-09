import { createAction } from "@reduxjs/toolkit";
import { TeamMember } from "./teamsTypes";

// Define actions separately
export const addTeamMember = createAction<TeamMember>("teams/addTeamMember");