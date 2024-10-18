"use client"

import React from "react"
import { MultiSelect, MultiSelectOption } from "@/components/ui/multi-select"
import { Button } from "@/components/ui/button"

const options: MultiSelectOption[] = [
    {
        value: "1",
        label: "Hip Hop",
    },
    {
        value: "2",
        label: "Rock",
    },
    {
        value: "3",
        label: "Metal",
    },
    {
        value: "4",
        label: "Pop",
    },
]

export default function Test() {
    const [selectedOptions, setSelectedOptions] = React.useState<
        MultiSelectOption[]
    >([])

    function onSelect(option: MultiSelectOption) {
        const optionIndex = selectedOptions.findIndex(
            (o) => o.value === option.value
        )

        if (optionIndex === -1) {
            setSelectedOptions([...selectedOptions, option])
        }
    }

    function onDeSelect(option: MultiSelectOption) {
        const updatedOptions = selectedOptions.filter(
            (o) => o.value !== option.value
        )
        setSelectedOptions(updatedOptions)
    }
    return (
        <main className="mx-auto max-w-md flex flex-col items-center gap-4">
            <MultiSelect
                label="Genres"
                options={options}
                handleSelect={onSelect}
                handleDeSelect={onDeSelect}
                selectedOptions={selectedOptions}
            />
            <Button onClick={() => console.log(selectedOptions)}>Submit</Button>
        </main>
    )
}
