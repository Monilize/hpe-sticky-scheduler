import { createAction } from '@reduxjs/toolkit';
import { ADD_TEAM, REMOVE_TEAM, UPDATE_TEAM } from './teamsTypes';

export const addTeam = createAction(ADD_TEAM, (team) => ({
    payload: team,
}));

export const removeTeam = createAction(REMOVE_TEAM, (teamId) => ({
    payload: teamId,
}));

export const updateTeam = createAction(UPDATE_TEAM, (team) => ({
    payload: team,
}));
