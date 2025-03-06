import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { toggleStickyNote, updateStickyNote, removeStickyNote } from "../store/stickyNotes/stickyNotesActions";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FiEdit, FiTrash, FiCheck } from "react-icons/fi";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "./ui/textarea";
import { darkenColor } from "@/lib/utils";

interface DragState {
    noteId: string | null;
    offsetX: number;
    offsetY: number;
}

const StickyNotes: React.FC = () => {
    const dispatch = useDispatch();
    const notes = useSelector((state: RootState) => state.stickyNotes.notes);
    const teams = useSelector((state: RootState) => state.teams.teams);

    // State to track the current dragging note and mouse offset relative to note position
    const [dragState, setDragState] = useState<DragState>({
        noteId: null,
        offsetX: 0,
        offsetY: 0,
    });
    // State for continuously updating the current position during drag
    const [currentPos, setCurrentPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    // Track editing state for each note
    const [editStates, setEditStates] = useState<{ [key: string]: boolean }>({});

    // Helper to get the team member object by assignee id
    const getAssignee = (assigneeId: string) => {
        for (const team of teams) {
            const member = team.team_members.find((member) => member.id === assigneeId);
            if (member) return member;
        }
        return null;
    };

    const getAssignees = () => {
        for (const team of teams) {
            if (team.team_members) return team.team_members;
        }
        return [];
    };

    const updateNoteField = (noteId: string, field: string, newValue: string) => {
        const noteToUpdate = notes.find((note) => note.id === noteId);
        if (noteToUpdate) {
            const updatedNote = { ...noteToUpdate, [field]: newValue };
            dispatch(updateStickyNote(updatedNote));
        }
    };

    const handleEditToggle = (noteId: string) => {
        setEditStates((prevState) => ({
            ...prevState,
            [noteId]: !prevState[noteId],
        }));
    };

    const handleDelete = (noteId: string) => {
        dispatch(removeStickyNote(noteId));
    };

    // When mouse is pressed down on a sticky note, start dragging
    const handleMouseDown = (
        e: React.MouseEvent<HTMLDivElement>,
        noteId: string,
        notePosition: { x: number; y: number }
    ) => {
        const offsetX = e.clientX - notePosition.x;
        const offsetY = e.clientY - notePosition.y;
        setDragState({ noteId, offsetX, offsetY });
        // Initialize current position with the note's position
        setCurrentPos({ x: notePosition.x, y: notePosition.y });
    };

    // Update the dragged note's current position as the mouse moves
    const handleMouseMove = (e: MouseEvent) => {
        if (dragState.noteId) {
            setCurrentPos({
                x: e.clientX - dragState.offsetX,
                y: e.clientY - dragState.offsetY,
            });
        }
    };

    // When the mouse is released, update the note's position in Redux and clear drag state
    const handleMouseUp = () => {
        if (dragState.noteId) {
            const note = notes.find((n) => n.id === dragState.noteId);
            if (note) {
                dispatch(updateStickyNote({ ...note, position: currentPos }));
            }
        }
        setDragState({ noteId: null, offsetX: 0, offsetY: 0 });
    };

    // Attach mouse move and mouse up listeners to the window so dragging works even if the cursor leaves the note area
    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [dragState, currentPos, notes]);

    const renderEditableField = (noteId: string, field: string, value: string) => {
        switch (field) {
            case "assignee":
                return (
                    <Select value={value} onValueChange={(newAssignee) => updateNoteField(noteId, field, newAssignee)}>
                        <SelectTrigger className="w-full mb-2 mt-2">
                            <SelectValue placeholder="Select Assignee" />
                        </SelectTrigger>
                        <SelectContent className="SelectContent">
                            {getAssignees().map((assignee) => (
                                <SelectItem key={assignee.id} value={assignee.id}>
                                    {assignee.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                );
            case "priority":
                return (
                    <Select value={value} onValueChange={(newPriority) => updateNoteField(noteId, field, newPriority)}>
                        <SelectTrigger className="w-full mb-2 mt-2">
                            <SelectValue placeholder="Select Priority" />
                        </SelectTrigger>
                        <SelectContent className="SelectContent">
                            {["low", "medium", "high"].map((priority) => (
                                <SelectItem key={priority} value={priority}>
                                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                );
            case "task":
                return (
                    <Textarea
                        maxLength={40}
                        defaultValue={value}
                        placeholder="Add task title here..."
                        onChange={(e) => updateNoteField(noteId, field, e.target.value)}
                    />
                );
            default:
                return <span>{value}</span>;
        }
    };

    return (
        <div className="sticky-notes">
            {notes.map((note) => {
                const assignee = getAssignee(note.assignee);
                const isDragging = dragState.noteId === note.id;
                const pos = isDragging ? currentPos : note.position;

                return (
                    <div
                        key={note.id}
                        className={`sticky-notes-container sticky-notes-position ${isDragging ? "dragging" : ""}`}
                        onMouseDown={(e) => handleMouseDown(e, note.id, note.position)}
                        style={{
                            left: `${pos.x}px`,
                            top: `${pos.y}px`,
                            transition: isDragging ? "none" : "left 0.1s ease, top 0.1s ease",
                        }}
                    >
                        <div className="sticky-notes-icons">
                            {
                                editStates[note.id] ? (
                                    <FiCheck
                                        className="sticky-notes-icon"
                                        onClick={() => handleEditToggle(note.id)} // Toggle off edit mode
                                    />
                                ) : !note.completed && (
                                    <FiEdit
                                        className="sticky-notes-icon"
                                        onClick={() => handleEditToggle(note.id)} // Toggle on edit mode
                                    />
                                )
                            }

                            <FiTrash
                                className="sticky-notes-icon"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(note.id);
                                }}
                            />
                        </div>
                        <Card
                            className="sticky-notes-card"
                            style={{
                                backgroundColor: assignee?.color || "#ccc",
                                border: `1px solid ${darkenColor(assignee?.color || "#ccc", 20)}`,
                                opacity: note.completed ? 0.5 : 1,
                                padding: "10px",
                            }}
                        >
                            <CardContent style={{ whiteSpace: "normal", wordWrap: "break-word" }}>
                                <p>
                                    <b>Assignee: </b>
                                    {editStates[note.id] ? renderEditableField(note.id, "assignee", note.assignee) : assignee?.name || "Unassigned"}
                                </p>
                                <p>
                                    <b>Priority: </b>
                                    {editStates[note.id] ? renderEditableField(note.id, "priority", note.priority) : <Badge variant={`priority_${note.priority}`}>{note.priority}</Badge>}
                                </p>
                                <p>
                                    <b>Task: </b>
                                    {editStates[note.id] ? renderEditableField(note.id, "task", note.task ?? '') : note.task}
                                </p>
                                <p>
                                    <b>Completed: </b>
                                    <Checkbox
                                        checked={note.completed}
                                        onCheckedChange={() => dispatch(toggleStickyNote(note.id))}
                                    />
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                );
            })}
        </div>
    );
};

export default StickyNotes;
