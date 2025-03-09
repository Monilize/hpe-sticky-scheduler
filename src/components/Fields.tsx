import React, { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Sketch as ColorPicker } from '@uiw/react-color';
import { Check, ChevronsUpDown, ChevronDown, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { CommandSeparator } from "cmdk";

interface FieldsProps {
    label?: string;
    placeholder?: string;
    fieldType?: "select" | "textarea" | "input" | "paragraph" | "highlight" | 'checkbox' | 'color-picker' | 'select-search'; //default is input
    value: any;
    options?: { label: string; value: string }[];
    isFlex?: boolean;
    highlightVariant?: string,
    maxLength?: number,
    onValueChange: (newValue: string | boolean) => void;
}

const Fields: React.FC<FieldsProps> = ({ label, placeholder, fieldType, value, options = [], isFlex = false, highlightVariant, maxLength, onValueChange }) => {

    const [open, setOpen] = useState(false);

    const [searchQuery, setSearchQuery] = useState("");
    const [viewAll, setViewAll] = useState(true);

    // Filter options based on search query
    const filteredOptions = searchQuery
        ? options.filter((option) =>
            option.label.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : options;

    // Determine options to display
    const displayedOptions = viewAll ? filteredOptions : filteredOptions.slice(0, 5);

    const fields = () => {
        switch (fieldType) {
            case "select":
                return (
                    <Select value={value} onValueChange={onValueChange}>
                        <SelectTrigger className="w-full min-w-xxs">
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
            case "color-picker":
                return (
                    <Popover>
                        <PopoverTrigger>
                            <div className="color-picker" style={{ background: value, width: 40, height: 40, borderRadius: "50%", cursor: "pointer" }}></div>
                        </PopoverTrigger>
                        <PopoverContent className="p-2 border-0 shadow-none flex justify-center">
                            <ColorPicker
                                color={value}
                                onChange={(color) => {
                                    onValueChange(color.hex);
                                }}
                            />
                        </PopoverContent>
                    </Popover>
                );
            case "select-search":
                return (
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild className="w-full">
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className="w-full justify-between"
                            >
                                {value
                                    ? options.find((option) => option.value === value)?.label
                                    : "Select option..."}
                                <ChevronsUpDown className="opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                            <Command className="bg-white">
                                <CommandInput
                                    placeholder="Search option..."
                                    value={searchQuery}
                                    onValueChange={setSearchQuery}
                                />
                                <CommandList>
                                    {filteredOptions.length === 0 && (
                                        <CommandEmpty>No team member found.</CommandEmpty>
                                    )}

                                    <CommandGroup className="bg-gray-300">
                                        {filteredOptions.length > 5 &&
                                            <CommandItem
                                                onSelect={() => setViewAll(!viewAll)}
                                                className="text-center text-sm text-muted"
                                            >
                                                {
                                                    viewAll ?
                                                        <div className="flex w-full justify-between">
                                                            <span>Show less</span> <ChevronDown className="opacity-50" />
                                                        </div>
                                                        :
                                                        <div className="flex w-full justify-between">
                                                            <span>View all</span> <ChevronRight className="opacity-50" />
                                                        </div>
                                                }

                                            </CommandItem>
                                        }
                                    </CommandGroup>
                                    <CommandSeparator className="border-black-1" />

                                    <CommandGroup>

                                        {displayedOptions.map((option) => (

                                            <CommandItem
                                                key={option.value}
                                                value={option.label}
                                                onSelect={() => {
                                                    onValueChange(option.value);
                                                    setOpen(false);
                                                }}
                                            >
                                                {option.label}
                                                <Check
                                                    className={cn(
                                                        "ml-auto",
                                                        value === option.value ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>

                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                );
            default:
                return (
                    <Input
                        className="w-full"
                        type="text"
                        value={value}
                        onChange={(e) => onValueChange(e.target.value)}
                        placeholder={placeholder ?? ''}
                    />
                );
        }
    };

    return (
        <div className={`w-full mb-1 ${!isFlex && 'mb-4'} ${fieldType == 'color-picker' && 'flex items-center'}`}>
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