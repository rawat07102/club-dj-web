import AppSidebar from "@/components/shared/app-sidebar/app-sidebar"

type Props = Readonly<{
    children: React.ReactNode
}>

export default async function ClubLayout({ children }: Props) {
    return (
        <div className="flex gap-8">
            <AppSidebar />
            <main className="flex-1 my-4">{children}</main>
        </div>
    )
}
