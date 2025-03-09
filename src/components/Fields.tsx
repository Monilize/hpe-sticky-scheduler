import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input"

interface FieldsProps {
    label?: string;
    placeholder?: string;
    fieldType?: "select" | "textarea" | "input" | "paragraph" | "highlight" | 'checkbox'; //default is input
    value: any;
    options?: { label: string; value: string }[];
    isFlex?: boolean;
    highlightVariant?: string,
    maxLength?: number,
    onValueChange: (newValue: string | boolean) => void;
}

const Fields: React.FC<FieldsProps> = ({ label, placeholder, fieldType, value, options = [], isFlex = false, highlightVariant, maxLength, onValueChange }) => {

    const fields = () => {
        switch (fieldType) {
            case "select":
                return (
                    <Select value={value} onValueChange={onValueChange}>
                        <SelectTrigger className="w-full bg-white">
                            <SelectValue placeholder={placeholder ?? ''} />
                        </SelectTrigger>
                        <SelectContent className="SelectContent">
                            {options.map((option, index) => (
                                <SelectItem key={index} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                );
            case "textarea":
                return (
                    <Textarea
                        maxLength={maxLength}
                        defaultValue={value}
                        placeholder={placeholder ?? ''}
                        onChange={(e) => onValueChange(e.target.value)}
                    />
                );
            case "checkbox":
                return (
                    <Checkbox
                        checked={value as boolean}
                        onCheckedChange={(newValue: boolean) => onValueChange(!newValue)}
                    />
                );
            case "paragraph":
                return (
                    <span>{value}</span>
                );
            case "highlight":
                return (
                    <span className={`capitalize highlight ${highlightVariant}`}>{value}</span>
                );
            default:
                return (
                    <Input
                        type="text"
                        value={value}
                        onChange={(e) => onValueChange(e.target.value)}
                        placeholder={placeholder ?? ''}
                    />
                );
        }
    };

    return (
        <div className={`w-full mb-1 ${!isFlex && 'mb-4'}`}>
            {
                label &&
                <Label
                    className={
                        `mb-1 ${isFlex && 'me-2 inline'} 
                        ${(!isFlex && fieldType == 'checkbox') && 'inline'}`
                    }
                >{`${label}: `}</Label>
            }
            {fields()}
        </div>
    )

};

export default Fields;