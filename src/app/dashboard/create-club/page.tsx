"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Upload, Pencil } from "lucide-react"
import { createClub } from "@/actions/dashboard"
import React from "react"
import { MultiSelect, MultiSelectOption } from "@/components/ui/multi-select"
import useSWR from "swr"
import { fetcher } from "@/lib/utils"

export default function CreateClub() {
    const [clubName, setClubName] = useState("")
    const [clubDescription, setClubDescription] = useState("")
    const [thumbnail, setThumbnail] = useState<string | null>(null)
    const [imageFile, setImageFile] = React.useState<File | null>()
    const fileInputRef = React.useRef<HTMLInputElement>(null)

    const { data: genres, isLoading } = useSWR("/genres", fetcher)
    const [selectedGenres, setSelectedGenres] = React.useState<
        MultiSelectOption[]
    >([])

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

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            setImageFile(file)
            const reader = new FileReader()
            reader.onloadend = () => {
                setThumbnail(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        if (!(imageFile && clubName && clubDescription)) {
            return
        }
        const formData = new FormData()
        formData.append("name", clubName)
        formData.append("description", clubDescription)
        formData.append("thumbnail", imageFile)

        await createClub(formData)
    }

    return (
        <Card className="flex-1 border-none">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">
                    Create a New Club
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                        <div>
                            <Label
                                htmlFor="thumbnail"
                                className="block text-lg font-medium mb-2"
                            >
                                Thumbnail
                            </Label>
                            <div className="flex items-center space-x-4">
                                <div className="w-32 h-32 bg-gray-200 rounded-lg overflow-hidden">
                                    {thumbnail ? (
                                        <img
                                            src={thumbnail}
                                            alt="Club thumbnail"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            No image
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <Input
                                        id="thumbnail"
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleFileUpload}
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() =>
                                            fileInputRef.current?.click()
                                        }
                                    >
                                        <Upload className="mr-2 h-4 w-4" />{" "}
                                        Upload a new file
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <Label
                                htmlFor="clubName"
                                className="block text-lg font-medium"
                            >
                                Club Details
                            </Label>
                            <div className="relative">
                                <Input
                                    id="clubName"
                                    placeholder="Name"
                                    value={clubName}
                                    onChange={(e) =>
                                        setClubName(e.target.value)
                                    }
                                    className="pr-10"
                                />
                                <Pencil className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            </div>
                            <Textarea
                                id="clubDescription"
                                placeholder="Description"
                                value={clubDescription}
                                onChange={(e) =>
                                    setClubDescription(e.target.value)
                                }
                                rows={4}
                            />
                        </div>
                        <div>
                            {genres && (
                                <>
                                    <Label className="ml-1 block text-lg font-medium mb-2">
                                        Genres
                                    </Label>
                                    <MultiSelect
                                        options={genres.map(
                                            ({ id, name }: any) => ({
                                                value: id,
                                                label: name,
                                            })
                                        )}
                                        handleSelect={onSelect}
                                        handleDeSelect={onDeSelect}
                                        selectedOptions={selectedGenres}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button type="submit" onClick={handleSubmit}>
                    Create Club
                </Button>
            </CardFooter>
        </Card>
    )
}
