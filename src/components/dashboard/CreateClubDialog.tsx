"use client"

import { createClub } from "@/actions/dashboard"
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

export default function CreateClubDialog() {
    const [isCreateClubOpen, setIsCreateClubOpen] = React.useState(false)
    const [name, setName] = React.useState("")
    const [description, setDescription] = React.useState("")

    return (
        <Dialog open={isCreateClubOpen} onOpenChange={setIsCreateClubOpen}>
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
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="club-name" className="text-right">
                            Name
                        </Label>
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            id="club-name"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label
                            htmlFor="club-description"
                            className="text-right"
                        >
                            Description
                        </Label>
                        <Input
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            id="club-description"
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        onClick={async () => {
                            await createClub(name, description)
                            setIsCreateClubOpen(false)
                        }}
                        type="submit"
                    >
                        Create Club
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
