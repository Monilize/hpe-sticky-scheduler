import React from "react";
import Fields from "./Fields";
import { updateFilteredStickyNotes } from "../store/stickyNotes/stickyNotesActions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";

const FilterStickyNotes: React.FC = () => {
    const teams = useSelector((state: RootState) => state.teams.team_members);
    const filtered = useSelector((state: RootState) => state.stickyNotes.filter);
    const dispatch = useDispatch();

    const updateFilter = (filter: string) => {
        dispatch(updateFilteredStickyNotes(filter));
    };

    return (
        <Fields
            isFlex={true}
            placeholder="Search members..."
            fieldType="select-search"
            value={filtered}
            options={[
                { label: "All Team Members", value: 'all' },
                ...teams.map(member => ({
                    label: member.name,
                    value: member.id,
                })),
            ]}
            onValueChange={(newValue: any) => updateFilter(newValue)}
        />
    );
};

export default FilterStickyNotes;
