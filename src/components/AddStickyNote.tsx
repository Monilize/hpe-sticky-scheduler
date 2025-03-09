import React, { useState } from "react";
import Fields from "./Fields";
import { addStickyNote } from "../store/stickyNotes/stickyNotesActions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";

const AddStickyNote: React.FC = () => {
    const teams = useSelector((state: RootState) => state.teams.teams);
    const dispatch = useDispatch();

    const [task, setTask] = useState('');
    const [priority, setPriority] = useState<"low" | "medium" | "high">("low");
    const [assignee, setAssignee] = useState('1');

    const submitNewSticky = () => {
        dispatch(addStickyNote({
            id: Date.now().toString(), // Generate a unique ID
            task: task ?? '',
            priority: priority ?? 'low',
            assignee: assignee,
            completed: false,
            position: { x: 0, y: 0 }
        }));
    };

    const getAssignees = () => {
        for (const team of teams) {
            if (team.team_members) return team.team_members;
        }
        return [];
    };

    const assignees = getAssignees();

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button variant="white_outline">Add +</Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle className="text-center">Create A New Sticky Note</DrawerTitle>
                    </DrawerHeader>
                    <div className="p-4 pb-0">
                        <Fields
                            placeholder="-- Select Assignee --"
                            fieldType="select"
                            label="Assignee"
                            value={assignee}
                            options={assignees.map(member => ({
                                label: member.name,
                                value: member.id,
                            }))}
                            onValueChange={(newValue: any) => setAssignee(newValue)}
                        />
                        <Fields
                            placeholder="-- Select Priority --"
                            fieldType="select"
                            label="Priority"
                            value={priority}
                            options={["low", "medium", "high"].map(val => ({
                                label: val,
                                value: val,
                            }))}
                            onValueChange={(newValue: any) => setPriority(newValue)}
                        />
                        <Fields
                            placeholder="Add task title..."
                            fieldType="input"
                            label="Task"
                            value={task}
                            onValueChange={(newValue: any) => setTask(newValue)}
                        />
                    </div>
                    <DrawerFooter>
                        <Button onClick={submitNewSticky}>Submit</Button>
                        <DrawerClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>

    );
};

export default AddStickyNote;
