import { ScrollArea } from "@/components/ui/scroll-area"

export default function Queue() {
    const videoQueue = [
        {
            id: "2",
            title: "Awesome Tune",
            artist: "Great Band",
            videoId: "dQw4w9WgXcQ",
        },
        {
            id: "3",
            title: "Catchy Melody",
            artist: "Pop Star",
            videoId: "dQw4w9WgXcQ",
        },
        {
            id: "4",
            title: "Epic Ballad",
            artist: "Rock Legend",
            videoId: "dQw4w9WgXcQ",
        },
        {
            id: "5",
            title: "Funky Groove",
            artist: "Disco King",
            videoId: "dQw4w9WgXcQ",
        },
    ]
    return (
        <ScrollArea className="w-full mt-12">
            {videoQueue.map((video, index) => (
                <div
                    key={video.id}
                    className="flex items-center space-x-2 mb-4"
                >
                    <div className="flex-shrink-0 w-12 h-12 bg-gray-100 flex items-center justify-center text-gray-600 font-semibold rounded">
                        {index + 1}
                    </div>
                    <div>
                        <p className="font-medium text-gray-800">
                            {video.title}
                        </p>
                        <p className="text-sm text-gray-600">{video.artist}</p>
                    </div>
                </div>
            ))}
        </ScrollArea>
    )
}
