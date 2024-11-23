"use client"
import { createClub } from "@/actions/clubs"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"
import React from "react"
import useSWR from "swr"
import { MultiSelect, MultiSelectOption } from "../ui/multi-select"
import { fetcher } from "@/lib/utils"

export default function CreateClubDialog() {
    const { data: genres } = useSWR("/genres", fetcher)
    const [selectedGenres, setSelectedGenres] = React.useState<
        MultiSelectOption[]
    >([])

    function onSelect(option: MultiSelectOption) {
        const optionIndex = selectedGenres.findIndex(
            (o) => o.value === option.value
        )

        if (optionIndex !== -1) {
            onDeSelect(option)
        } else {
            setSelectedGenres([...selectedGenres, option])
        }
    }

    function onDeSelect(option: MultiSelectOption) {
        const updatedOptions = selectedGenres.filter(
            (o) => o.value !== option.value
        )
        setSelectedGenres(updatedOptions)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Club
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a New Club</DialogTitle>
                    <DialogDescription>
                        Fill in the details to create your new music club.
                    </DialogDescription>
                </DialogHeader>
                <form
                    action={createClub}
                    id="create-club"
                    className="grid gap-4 py-4"
                >
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="club-name" className="text-right">
                            Name
                        </Label>
                        <Input name="name" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label
                            htmlFor="club-description"
                            className="text-right"
                        >
                            Description
                        </Label>
                        <Input name="description" className="col-span-3" />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="file">Thumbnail</Label>
                        <Input id="file" type="file" name="file" />
                    </div>
                    {genres && (
                        <MultiSelect
                            options={genres.map(({ id, name }: any) => ({
                                value: id,
                                label: name,
                            }))}
                            handleSelect={onSelect}
                            handleDeSelect={onDeSelect}
                            selectedOptions={selectedGenres}
                        />
                    )}
                </form>
                <DialogFooter>
                    <Button form="create-club" type="submit">
                        Create Club
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
