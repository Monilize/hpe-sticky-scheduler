export interface TeamMember {
  id: string;
  name: string;
  color: string;
}

export interface TeamsState {
  team_members: TeamMember[];
}
