"use client"
import { deleteClub } from "@/actions/clubs"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Trash2 } from "lucide-react"

type Props = {
    clubId: string
}

export default function DeleteClub({ clubId }: Props) {
    async function handleDelete() {
        await deleteClub(clubId)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className="hover:text-destructive rounded-full"
                    variant="ghost"
                    size="icon"
                >
                    <Trash2 />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Are you sure you want to delete?</DialogTitle>
                <DialogFooter>
                    <Button onClick={handleDelete} variant="destructive">
                        Confirm
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
