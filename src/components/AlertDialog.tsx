import React from "react";
import {
    AlertDialog as Dialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface AlertDialogProps {
    open: boolean;
    heading: string;
    description: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const AlertDialog: React.FC<AlertDialogProps> = ({ open, heading, description, onConfirm, onCancel }) => {
    return (
        <Dialog open={open}>
            <AlertDialogContent className="bg-white">
                <AlertDialogHeader>
                    <AlertDialogTitle>{heading}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-black text-white" onClick={onConfirm}>Confirm</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </Dialog>
    );
};

export default AlertDialog;