"use server"
import { cookies } from "next/headers"
import { apiRoute, extractAccessToken, getUserId } from "@/lib/utils"
import { redirect } from "next/navigation"
import { User } from "@/lib/types"

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
    const body = await res.json()

    if (!res.ok) {
        console.error(body)
        throw new Error(res.statusText)
    }

    const { accessToken, payload } = body
    const cookieStore = await cookies()

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
    redirect("/")
}

export async function signup(formData: FormData) {
    const reqBody = {
        username: formData.get("username"),
        password: formData.get("password"),
    }
    console.log(reqBody)

    const res = await fetch(apiRoute("/users"), {
        method: "POST",
        body: JSON.stringify(reqBody),
        headers: {
            "Content-Type": "application/json",
        },
    })

    const body = await res.json()

    if (!res.ok) {
        console.error(body)
        throw new Error(res.statusText)
    }

    redirect("/auth/login")
}

export async function logout() {
    const cookieStore = await cookies()
    cookieStore.delete("accessToken")
    cookieStore.delete("userId")
}

export async function getAuthToken() {
    const accessToken = (await cookies()).get("accessToken")?.value
    if (!accessToken) {
        throw new Error("No accessToken found in cookies")
    }
    return accessToken
}

export async function getUser(id?: string): Promise<User> {
    const userId = id || getUserId(await cookies())
    const res = await fetch(apiRoute(`/users/${userId}`))

    if (!res.ok) {
        console.log(await res.json())
        throw new Error()
    }

    const user = await res.json()
    return user
}

export async function updateMyDetails(formData: FormData) {
    const bio = formData.get("bio")
    const body: Record<string, any> = {}
    if (bio) {
        body["bio"] = bio
    }
    const res = await fetch(apiRoute(`/users/me`), {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: extractAccessToken(await cookies()),
        },
        body: JSON.stringify(body),
    })

    if (!res.ok) {
        console.error(await res.json())
        throw new Error(res.statusText)
    }

    if (formData.has("profilePic")) {
        await changeMyProfilePic(formData)
    }
}

export async function changeMyProfilePic(formData: FormData) {
    const res = await fetch(apiRoute(`/users/me/profile-pic`), {
        method: "PUT",
        headers: {
            Authorization: extractAccessToken(await cookies()),
        },
        body: formData,
    })
    if (!res.ok) {
        console.error(await res.json())
        throw new Error(res.statusText)
    }

}
