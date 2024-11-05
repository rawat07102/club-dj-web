
type Props = {
    children: React.ReactNode
}

export default async function ClubsLayout({ children }: Props) {
    return <main className="px-8 py-4">{children}</main>
}
