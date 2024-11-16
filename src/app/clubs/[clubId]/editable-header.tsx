"use client"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Club, Genre } from "@/lib/types"
import React from "react"
import { Button } from "@/components/ui/button"
import editClub from "@/actions/dashboard"
import ClubHeader from "./club-header"
import { MultiSelect, MultiSelectOption } from "@/components/ui/multi-select"
import useSWR from "swr"
import { fetcher } from "@/lib/utils"
import { Trash2 } from "lucide-react"

type Props = {
    club: Club
}

export default function EditableHeader({ club }: Props) {
    const [selectedGenres, setSelectedGenres] = React.useState<
        MultiSelectOption[]
    >([])
    const [thumbnail, setThumbnail] = React.useState(club.thumbnail)
    const [imageFile, setImageFile] = React.useState<File | null>()
    const [description, setDescription] = React.useState(club.description)
    const [name, setName] = React.useState(club.name)
    const fileInputRef = React.useRef<HTMLInputElement>(null)
    const { data: genres } = useSWR<Genre[]>("/genres", fetcher)

    React.useEffect(() => {
        if (club.genres) {
            setSelectedGenres(
                club.genres.map((g) => ({
                    value: g.id,
                    label: g.name,
                }))
            )
        }
    }, [genres])

    function onSelect(option: MultiSelectOption) {
        const optionIndex = selectedGenres.findIndex(
            (o) => o.value === option.value
        )

        if (optionIndex === -1) {
            setSelectedGenres([...selectedGenres, option])
        }
    }

    function onDeSelect(option: MultiSelectOption) {
        const updatedOptions = selectedGenres.filter(
            (o) => o.value !== option.value
        )
        setSelectedGenres(updatedOptions)
    }

    async function handleSave(e: React.FormEvent) {
        e.preventDefault()
        const formData = new FormData()
        formData.append("clubId", club.id)

        let toEdit = false
        if (name !== club.name) {
            formData.append("name", name)
            toEdit = true
        }
        if (description !== club.description) {
            formData.append("description", description)
            toEdit = true
        }
        if (imageFile) {
            formData.append("thumbnail", imageFile)
            toEdit = true
        }
        if (toEdit) {
            await editClub(formData)
        }
    }

    async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (!file) {
            setThumbnail(club.thumbnail)
            setImageFile(null)
            return
        }

        setImageFile(file)
        const reader = new FileReader()
        reader.onloadend = () => {
            setThumbnail(reader.result as string)
        }
        reader.readAsDataURL(file)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <ClubHeader
                    title="Edit details"
                    className="cursor-pointer max-w-fit"
                    club={club}
                />
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Edit Details</DialogTitle>
                <form
                    id="edit-club"
                    onSubmit={handleSave}
                    className="flex flex-col gap-4 w-full"
                >
                    <div className="flex gap-8">
                        <div
                            title="click to upload new thumbnail"
                            className="aspect-square bg-gray-200
                        rounded-lg w-40 overflow-hidden cursor-pointer"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            {thumbnail ? (
                                <img
                                    src={thumbnail}
                                    alt="Club Thumbnail"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div
                                    className="w-full h-full flex
                                        items-center justify-center
                                        text-gray-400"
                                >
                                    No image
                                </div>
                            )}
                            <Input
                                id="thumbnail"
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileUpload}
                            />
                        </div>
                        <div className="flex grow flex-col gap-2">
                            <div className="flex flex-col gap-1">
                                <Label>Name</Label>
                                <Input
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                />
                            </div>
                            <Textarea
                                className="resize-none flex-1"
                                placeholder="Add an optional description"
                                maxLength={255}
                                onChange={(e) => setDescription(e.target.value)}
                                value={description}
                            />
                        </div>
                    </div>
                    <div>
                        <Label>Genres</Label>
                        {genres && (
                            <MultiSelect
                                options={genres.map((g) => ({
                                    label: g.name,
                                    value: g.id,
                                }))}
                                selectedOptions={selectedGenres}
                                handleSelect={onSelect}
                                handleDeSelect={onDeSelect}
                            />
                        )}
                    </div>
                </form>
                <DialogFooter>
                    <Button form="edit-club">Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
