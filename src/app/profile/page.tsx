import Image from "next/image"
import { getUser } from "@/actions/user"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default async function ProfilePage() {
    const user = await getUser()
    return (
        <section className="flex flex-col gap-4 flex-1 ml-4 mt-4 max-w-screen-lg">
            <div>
                <h1 className="text-2xl font-medium mb-1">Profile</h1>
                <Separator />
            </div>
            <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                    <div
                        className="relative shrink-0 aspect-square w-52
                        bg-secondary rounded overflow-hidden cursor-pointer"
                    >
                        {user.profilePic && (
                            <Image
                                src={user.profilePic}
                                alt={user.username}
                                quality={50}
                                className="object-cover"
                                fill
                            />
                        )}
                        {!user.profilePic && (
                            <span className="text-sm text-secondary-foreground flex w-full h-full justify-center items-center">
                                Click to upload profile pic
                            </span>
                        )}
                    </div>
                    <div className="flex grow flex-col gap-2">
                        <div className="flex flex-col gap-1">
                            <Label>Username</Label>
                            <Input value={user.username} />
                        </div>
                        <Textarea
                            className="resize-none flex-1"
                            placeholder="Add an optional bio"
                            maxLength={255}
                            value={user.bio}
                        />
                    </div>
                </div>
                <div className="w-full flex justify-end">
                    <Button>Save Changes</Button>
                </div>
            </div>
        </section>
    )
}
