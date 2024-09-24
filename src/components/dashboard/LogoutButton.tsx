"use client"

import { logout } from "@/actions/auth"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { LogOut } from "lucide-react"

export function LogoutButton() {
    return (
        <DropdownMenuItem onClick={() => logout()}>
            <LogOut className="h-4 w-4 mr-2" />
            <span>Log out</span>
        </DropdownMenuItem>
    )
}
