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
import { Playlist } from "@/lib/types"
import React from "react"
import { Button } from "@/components/ui/button"
import PlaylistHeader from "./playlist-header"
import { updatePlaylistDetails } from "@/actions/playlists"

type Props = {
    playlist: Playlist
}

export default function EditablePlaylistHeader({ playlist }: Props) {
    const [thumbnail, setThumbnail] = React.useState(playlist.thumbnail)
    const [imageFile, setImageFile] = React.useState<File | null>()
    const [description, setDescription] = React.useState(playlist.description)
    const [name, setName] = React.useState(playlist.name)
    const fileInputRef = React.useRef<HTMLInputElement>(null)

    async function handleSave(e: React.FormEvent) {
        e.preventDefault()
        const formData = new FormData()
        formData.append("playlistId", playlist.id)

        let toEdit = false
        if (name !== playlist.name) {
            formData.append("name", name)
            toEdit = true
        }
        if (description !== playlist.description) {
            formData.append("description", description)
            toEdit = true
        }
        if (imageFile) {
            formData.append("thumbnail", imageFile)
            toEdit = true
        }
        if (toEdit) {
            await updatePlaylistDetails(formData)
        }
    }

    async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (!file) {
            setThumbnail(playlist.thumbnail)
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
                <PlaylistHeader
                    title="Edit details"
                    className="cursor-pointer max-w-fit"
                    playlist={playlist}
                />
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Edit Details</DialogTitle>
                <form
                    id="edit-playlist"
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
                </form>
                <DialogFooter>
                    <Button form="edit-playlist">Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
