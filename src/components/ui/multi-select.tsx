"use client"
import Fuse from "fuse.js"
import { X } from "lucide-react"
import React from "react"
import { Popover, PopoverContent } from "@/components/ui/popover"
import { Anchor } from "@radix-ui/react-popover"

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
}

const MultiSelect = React.forwardRef<HTMLInputElement, InputProps>(
    ({ options, handleDeSelect, handleSelect, selectedOptions }, _ref) => {
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
        const inputRef = React.useRef<HTMLInputElement>(null)
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
            <div className="relative w-full justify-stretch flex flex-col gap-1">
                <div className="flex flex-wrap gap-1 border border-border focus-within:ring ring-ring ring-offset-ring rounded-lg p-1">
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
                    <input
                        onChange={handleTextInput}
                        value={textInput}
                        onClick={() => setShowOptions(true)}
                        ref={inputRef}
                        className="flex-1 outline-none"
                    />
                </div>
                <Popover
                    open={showOptions}
                    onOpenChange={(open) => setShowOptions(open)}
                >
                    <Anchor></Anchor>
                    <PopoverContent
                        onOpenAutoFocus={(e) => e.preventDefault()}
                        align="start"
                        className="max-h-72 overflow-y-auto"
                    >
                        {fuzzyOptions.length > 0 ? (
                            fuzzyOptions.map((opt) => (
                                <div
                                    key={opt.value}
                                    className="hover:bg-accent hover:text-accent-foreground py-1 px-2 cursor-default rounded-sm"
                                    onClick={() => handleSelect(opt)}
                                >
                                    {opt.label}
                                </div>
                            ))
                        ) : (
                            <div className="flex justify-center items-center">
                                No options found.
                            </div>
                        )}
                    </PopoverContent>
                </Popover>
            </div>
        )
    }
)

MultiSelect.displayName = "MultiSelect"

export { MultiSelect }
