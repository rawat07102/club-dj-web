import AppSidebar from "@/components/shared/app-sidebar/app-sidebar"

type Props = Readonly<{
    children: React.ReactNode
}>

export default async function ProfileLayout({ children }: Props) {
    return (
        <div className="flex w-full">
            <AppSidebar />
            <main className="flex-1">{children}</main>
        </div>
    )
}
