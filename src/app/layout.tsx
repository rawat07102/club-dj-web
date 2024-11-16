import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import { SidebarProvider } from "@/components/ui/sidebar"

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
})
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
})

export const metadata: Metadata = {
    title: "Club.dj",
    description: "Share and discover music with your friends",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased flex w-full`}
            >
                <SidebarProvider>{children}</SidebarProvider>
            </body>
        </html>
    )
}
