"use server";

import { signIn, signOut } from "../../../../auth";

export async function handleSignIn() {
  "use server"
  
  await signIn("discord", { redirectTo: "/home" })
}

export async function handleSignOut() {
    "use server"

    await signOut({ redirectTo: "/" })
}