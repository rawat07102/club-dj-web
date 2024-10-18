"use client"
import { Label } from "@radix-ui/react-label"
import Fuse from "fuse.js"
import { X } from "lucide-react"
import React from "react"
import { Button } from "./button"
import { ScrollArea } from "./scroll-area"

export interface MultiSelectOption {
    label: string
    value: string | number
}

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    options: MultiSelectOption[]
    selectedOptions: MultiSelectOption[]
    handleSelect: (option: MultiSelectOption) => void
    handleDeSelect: (option: MultiSelectOption) => void
    label?: string
}

const MultiSelect = React.forwardRef<HTMLInputElement, InputProps>(
    (
        { options, handleDeSelect, handleSelect, selectedOptions, label },
        _ref
    ) => {
        const fuse = React.useMemo(() => {
            return new Fuse(options, {
                keys: ["label"],
                ignoreLocation: true,
                findAllMatches: true,
                shouldSort: true,
            })
        }, [options])
        const [fuzzyOptions, setFuzzyOptions] = React.useState<
            MultiSelectOption[]
        >([])
        const [showOptions, setShowOptions] = React.useState(false)
        const [textInput, setTextInput] = React.useState("")
        React.useEffect(() => {
            if (textInput.trim() === "") {
                setFuzzyOptions(options)
            } else {
                setFuzzyOptions(fuse.search(textInput).map((res) => res.item))
            }
        }, [textInput])

        function handleTextInput(e: React.ChangeEvent<HTMLInputElement>) {
            setTextInput(e.target.value)
        }
        return (
            <div className="w-full justify-stretch flex flex-col gap-1">
                <Label className="ml-1">{label}</Label>
                <div className="flex border border-border rounded-lg p-1">
                    <div className="flex gap-2">
                        {selectedOptions.map((opt) => (
                            <div
                                key={opt.value}
                                onClick={() => handleDeSelect(opt)}
                                className="flex items-center gap-1 text-secondary-foreground bg-secondary text-sm rounded-full px-2 py-1"
                            >
                                {opt.label}
                                <button className="rounded-full transition-colors hover:bg-primary/10 p-1">
                                    <X className="text-primary/80" size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                    <input
                        className="pl-1 w-full flex-1 min-w-12 outline-none bg-none"
                        onChange={handleTextInput}
                        value={textInput}
                        onFocus={() => setShowOptions(true)}
                    />
                </div>
                {showOptions && (
                    <div className="relative animate-in fade-in-0 slide-in-from-top-2 zoom-in-95 ease-in z-50">
                        <div
                            onClick={() => setShowOptions(false)}
                            className="fixed top-0 left-0 h-full w-full -z-10"
                        ></div>
                        <ScrollArea className="h-48 bg-popover border-border border rounded-lg z-[999]">
                            <div className="mt-1 ">
                                {fuzzyOptions.map((opt) => (
                                    <div
                                        key={opt.value}
                                        className="hover:bg-accent hover:text-accent-foreground py-1 px-2 cursor-default rounded-sm"
                                        onClick={() => handleSelect(opt)}
                                    >
                                        {opt.label}
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>
                )}
            </div>
        )
    }
)

MultiSelect.displayName = "MultiSelect"

export { MultiSelect }
