import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { toggleStickyNote, updateStickyNote } from "../store/stickyNotes/stickyNotesActions";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"

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

    // Helper to get the team member object by assignee id
    const getAssignee = (assigneeId: string) => {
        for (const team of teams) {
            const member = team.team_members.find((member) => member.id === assigneeId);
            if (member) return member;
        }
        return null;
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

    // Utility: Darken a hex color by a percentage
    const darkenColor = (hex: string, percent: number) => {
        let num = parseInt(hex.slice(1), 16);
        let amt = Math.round(2.55 * percent);
        let r = (num >> 16) - amt;
        let g = ((num >> 8) & 0x00ff) - amt;
        let b = (num & 0x0000ff) - amt;
        r = r < 0 ? 0 : r;
        g = g < 0 ? 0 : g;
        b = b < 0 ? 0 : b;
        return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, "0")}`;
    };

    return (
        <div
            className="sticky-notes"
        >
            {notes.map((note) => {
                const assignee = getAssignee(note.assignee);
                // If this note is currently being dragged, use the currentPos; otherwise, use the stored note position.
                const isDragging = dragState.noteId === note.id;
                const pos = isDragging ? currentPos : note.position;

                return (
                    <div
                        key={note.id}
                        className={`sticky-notes-position ${dragState.noteId === note.id ? "dragging" : ""}`}
                        onMouseDown={(e) => handleMouseDown(e, note.id, note.position)}
                        style={{
                            left: `${pos.x}px`,
                            top: `${pos.y}px`,
                            transition: isDragging ? "none" : "left 0.1s ease, top 0.1s ease",
                        }}
                    >
                        <Card
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
                                    <span>{assignee ? assignee.name : "Unassigned"}</span>
                                </p>
                                <p>
                                    <b>Priority: </b>
                                    <Badge variant={`priority_${note.priority}`}>{note.priority}</Badge>
                                </p>
                                <p>
                                    <b>Task: </b>
                                    <span>{note.task}</span>
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
