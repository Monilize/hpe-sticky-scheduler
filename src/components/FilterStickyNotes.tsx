import React from "react";
import Fields from "./Fields";
import { updateFilteredStickyNotes } from "../store/stickyNotes/stickyNotesActions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";

const FilterStickyNotes: React.FC = () => {
    const teams = useSelector((state: RootState) => state.teams.teams);
    const filtered = useSelector((state: RootState) => state.stickyNotes.filter);
    const dispatch = useDispatch();

    const getAssignees = () => {
        for (const team of teams) {
            if (team.team_members) return team.team_members;
        }
        return [];
    };

    const updateFilter = (filter: string) => {
        dispatch(updateFilteredStickyNotes(filter));
    };

    const assignees = getAssignees();

    return (
        <Fields
            isFlex={true}
            placeholder="-- Select Team Members --"
            fieldType="select"
            value={filtered}
            options={[
                { label: "All Team Members", value: 'all' },
                ...assignees.map(member => ({
                    label: member.name,
                    value: member.id,
                })),
            ]}
            onValueChange={(newValue: any) => updateFilter(newValue)}
        />
    );
};

export default FilterStickyNotes;
