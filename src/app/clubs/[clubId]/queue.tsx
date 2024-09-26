import { ScrollArea } from "@/components/ui/scroll-area"
import { Club } from "@/lib/types"
import QueueCard from "./queue-card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { addVideoToQueue } from "@/actions/clubs"

type Props = {
    queue: Club["queue"]
    clubId: Club["id"]
}

export default function Queue({ queue, clubId }: Props) {
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="z-50 absolute bottom-8 right-8">
                        Add
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add a video to queue</DialogTitle>
                        <DialogDescription>
                            Enter the youtube ID of video of your choice to add
                            it to the queue.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <form
                            action={addVideoToQueue.bind(null, clubId)}
                            id="add-to-queue"
                            className="grid grid-cols-4 items-center gap-4"
                        >
                            <Label htmlFor="video-id" className="text-right">
                                Youtbe video ID
                            </Label>
                            <Input
                                id="video-id"
                                defaultValue="LDU_Txk06tM"
                                className="col-span-3"
                                name="videoId"
                            />
                        </form>
                    </div>
                    <DialogFooter>
                        <Button form="add-to-queue" type="submit">
                            Add To Queue
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <ScrollArea className="w-full mt-12">
                {queue.map((videoId) => (
                    <QueueCard key={videoId} videoId={videoId} />
                ))}
            </ScrollArea>
        </>
    )
}
