"use server"

import { apiRoute } from "@/lib/utils"
import { cookies } from "next/headers"

export async function login(formData: FormData) {
    console.log("hello")
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
    const { accessToken } = await res.json()
    cookies().set("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // a week
    })
    console.log(accessToken, reqBody)
}
