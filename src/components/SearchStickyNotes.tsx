import { RootState } from '@/store';
import { updateSearchFilteredStickyNotes } from '@/store/stickyNotes/stickyNotesActions';
import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Fields from './Fields';

const SearchStickyNotes: React.FC = () => {
    const dispatch = useDispatch();

    const [searchTerm, setSearchTerm] = useState<string>('');
    const notes = useSelector((state: RootState) => state.stickyNotes.notes);
    const teamMembers = useSelector((state: RootState) => state.teams.team_members);

    // Memoize the filtered notes to optimize performance
    const filteredNotes = useMemo(() => {
        const lowercasedSearchTerm = searchTerm.toLowerCase();

        return notes.filter((note) => {
            const assignee = teamMembers.find((member) => member.id === note.assignee);
            const assigneeName = assignee ? assignee.name.toLowerCase() : '';

            return (
                note.task.toLowerCase().includes(lowercasedSearchTerm) ||
                note.priority.toLowerCase().includes(lowercasedSearchTerm) ||
                assigneeName.includes(lowercasedSearchTerm)
            );
        });
    }, [searchTerm, notes, teamMembers]);

    // Dispatch the update action whenever filteredNotes change
    useEffect(() => {
        dispatch(updateSearchFilteredStickyNotes(filteredNotes));
    }, [filteredNotes, dispatch]);

    return (
        <Fields
            placeholder="Search sticky notes..."
            fieldType="input"
            value={searchTerm}
            onValueChange={(newValue: any) => setSearchTerm(newValue)}
        />
    );
};

export default SearchStickyNotes;
