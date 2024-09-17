import NextAuth from "next-auth"
import Discord from "next-auth/providers/discord"
import { NextResponse } from "next/server";
import { authConfig } from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";
 
console.log("Discord ID:", process.env.AUTH_DISCORD_ID);
console.log("Discord Secret:", process.env.AUTH_DISCORD_SECRET);

export const { handlers, signIn, signOut, auth } = NextAuth({
    session: { strategy: "database" },
    adapter: PrismaAdapter(prisma),
    ...authConfig,
})