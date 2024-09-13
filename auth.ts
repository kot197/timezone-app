import NextAuth from "next-auth"
import Discord from "next-auth/providers/discord"
 
console.log("Discord ID:", process.env.AUTH_DISCORD_ID);
console.log("Discord Secret:", process.env.AUTH_DISCORD_SECRET);

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Discord({
            clientId: process.env.AUTH_DISCORD_ID,
            clientSecret: process.env.AUTH_DISCORD_SECRET,
        })
    ],
})