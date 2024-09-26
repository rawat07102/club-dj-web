"use server"
import { cookies } from "next/headers"
import { apiRoute } from "@/lib/utils"
import { redirect } from "next/navigation"

export async function login(formData: FormData) {
    const reqBody = {
        username: formData.get("username"),
        password: formData.get("password"),
    }

    const res = await fetch(apiRoute("/auth"), {
        method: "POST",
        body: JSON.stringify(reqBody),
        headers: {
            "Content-Type": "application/json",
        },
    })
    const { accessToken, payload } = await res.json()
    const cookieStore = cookies()

    cookieStore.set("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // a week
    })

    cookieStore.set("userId", payload.id, {
        maxAge: 60 * 60 * 24 * 7, // a week
    })
    redirect("/dashboard")
}

export async function signup(formData: FormData) {
    const reqBody = {
        username: formData.get("username"),
        password: formData.get("password"),
    }

    await fetch(apiRoute("/users"), {
        method: "POST",
        body: JSON.stringify(reqBody),
        headers: {
            "Content-Type": "application/json",
        },
    })
}

export async function logout() {
    const cookieStore = cookies()
    cookieStore.delete("accessToken")
    cookieStore.delete("userId")
}

export async function getAuthToken() {
    const accessToken = cookies().get("accessToken")?.value
    if (!accessToken) {
        throw new Error("No accessToken found in cookies")
    }
    return accessToken

}
