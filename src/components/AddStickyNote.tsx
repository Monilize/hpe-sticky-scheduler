import React, { useState, useEffect } from "react";
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
import { toast } from "sonner";

const AddStickyNote: React.FC = () => {
    const teams = useSelector((state: RootState) => state.teams.team_members);
    const dispatch = useDispatch();

    const [task, setTask] = useState('');
    const [priority, setPriority] = useState<"low" | "medium" | "high">("low");
    const [assignee, setAssignee] = useState('1');
    const [drawerOpen, setDrawerOpen] = useState(false);

    const submitNewSticky = () => {
        if (!task || !priority || !assignee) {
            toast.error("Oops!", {
                description: "Please complete all fields in order to continue.",
            });
            return;
        }

        dispatch(addStickyNote({
            id: Date.now().toString(), // Generate a unique ID
            task: task ?? '',
            priority: priority ?? 'low',
            assignee: assignee,
            completed: false,
            position: { x: 0, y: 0 }
        }));
        // Revert to default after submission
        setTask('');
        setPriority('low');
        setAssignee('1');
        setDrawerOpen(false);
    };

    useEffect(() => {
        // Function to handle clicks on designated areas
        const handleDesignatedAreaClick = () => {
            // Ensure the drawer isn't already open
            if (!drawerOpen) {
                setDrawerOpen(true);
            }
        };

        // Select the designated area where clicks should open the drawer
        const designatedArea = document.getElementById('designated-click-area');
        if (designatedArea) {
            designatedArea.addEventListener("click", handleDesignatedAreaClick);
        }

        return () => {
            if (designatedArea) {
                designatedArea.removeEventListener("click", handleDesignatedAreaClick);
            }
        };
    }, [drawerOpen]);

    return (
        <>
            <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
                <DrawerTrigger asChild>
                    <Button variant="outline" className="w-full">Add Sticky +</Button>
                </DrawerTrigger>
                <DrawerContent>
                    <div className="mx-auto w-full max-w-sm">
                        <DrawerHeader>
                            <DrawerTitle className="text-center">Create A New Sticky Note</DrawerTitle>
                        </DrawerHeader>
                        <div className="p-4 pb-0">
                            <Fields
                                isFlex={true}
                                placeholder="Search team member..."
                                fieldType="select-search"
                                label="Select Assignee"
                                value={assignee}
                                options={teams.map(member => ({
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
                            <Button variant="dark" onClick={submitNewSticky}>Submit</Button>
                            <DrawerClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </div>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default AddStickyNote;
