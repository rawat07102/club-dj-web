type Props = Readonly<{
    children: React.ReactNode
}>

export default async function AuthLayout({ children }: Props) {
    return (
        <main className="flex w-full justify-center my-4">
            {children}
        </main>
    )
}
