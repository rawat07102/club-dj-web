"use server"

import { apiRoute } from "@/lib/utils"

export async function signup(formData: FormData) {

    const reqBody = {
        username: formData.get("username"),
        password: formData.get("password"),
    }

    await fetch(apiRoute("/users"), {
        method: "POST",
        body: JSON.stringify(reqBody),
        headers: {
            "Content-Type": "application/json"
        }
    })
}

