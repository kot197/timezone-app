"use server";

import { redirect } from "next/dist/server/api-utils";
import { auth, signIn, signOut } from "../../../../auth";

export async function handleSignIn() {
  "use server"
  
  await signIn("discord", { redirectTo: "/web-app/home" })
}

export async function handleSignOut() {
    "use server"
    
    const session = await auth()

    console.log("handleSignOut " + session?.user)
    await signOut({ redirect: false })

    return { redirectTo: "/" }
}