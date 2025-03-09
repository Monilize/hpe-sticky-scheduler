import React, { useState } from "react";
import Fields from "./Fields";
import { addTeamMember } from "../store/teams/teamsActions";
import { useDispatch } from "react-redux";
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

const AddTeamMember: React.FC = () => {
    const dispatch = useDispatch();

    const [color, setColor] = useState('#efe9ae');
    const [name, setName] = useState('');
    const [drawerOpen, setDrawerOpen] = useState(false);

    const submitNewTeamMember = () => {

        if (!color || !name) {
            toast.error("Oops!", {
                description: "Please complete all fields in order to continue.",
            })
            return;
        }

        dispatch(
            addTeamMember({
                id: Date.now().toString(), // Generate a unique ID
                name: name ?? '', // If name is not provided, use an empty string
                color: color ?? '#fbc4ab', // Default color if not provided
            })
        );

        // Revert to default after submission
        setColor('#efe9ae');
        setName('');
        setDrawerOpen(false);
    };

    return (
        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
            <DrawerTrigger asChild>
                <Button variant="outline" onClick={() => setDrawerOpen(true)} className="w-full">
                    Add Member +
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle className="text-center">Create Team Member</DrawerTitle>
                    </DrawerHeader>
                    <div className="p-4 pb-0">
                        <Fields
                            placeholder="Add task title..."
                            fieldType="input"
                            label="Team Member's Name"
                            value={name}
                            onValueChange={(newValue: any) => setName(newValue)}
                        />
                        <Fields
                            isFlex={true}
                            fieldType="color-picker"
                            label="Select The Member's Color"
                            value={color}
                            onValueChange={(newValue: any) => setColor(newValue)}
                        />
                    </div>
                    <DrawerFooter>
                        <Button variant="dark" onClick={submitNewTeamMember} >Submit</Button>
                        <DrawerClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>

    );
};

export default AddTeamMember;
