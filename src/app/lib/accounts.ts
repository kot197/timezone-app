import { prisma } from "@/db/prisma";
import { DiscordUser } from "../(general)/login/discord/callback/route";
import { alphabet, generateRandomString } from "oslo/crypto";
import { createDate, TimeSpan } from "oslo";

export async function getAccountByDiscordId(discordId: string) {
    return await prisma.user.findFirst({
        where: {
            discordId: discordId
        }
    })
}

export async function createDiscordUser(discordUser: DiscordUser) {
    const user = await prisma.user.create({
        data: {
            id: "123", // TODO
            discordId: discordUser.id,
            discordUsername: discordUser.username,
            discordAvatar: discordUser.avatar ?? "",
            discordEmail: discordUser.email ?? "",
            discriminator: discordUser.discriminator,
            discordVerified: discordUser.verified,
        }
    });

    return user.discordId;
}

export async function getUserByUserId(userId: string) {
    return await prisma.user.findFirst({
        where: {
            id: userId
        }
    })
}

export async function getUserByEmail(email: string) {
    return await prisma.user.findFirst({
        where: {
            email: email
        }
    })
}

export async function createUser(userId: string, email: string, passwordHash: string) {
    await prisma.user.create({
        data: {
            id: userId,
            email: email,
            emailVerified: false,
            passwordHash: passwordHash,
        }
    });
}

export async function generateEmailVerificationCode(userId: string, email: string): Promise<string> {
    const verification = await prisma.verification.findUnique({
        where: { userId: userId }
    });

    if(verification) {
        // Delete existing codes
        await prisma.verification.delete({
            where: {
                userId: userId
            }
        });
    }

    const code = generateRandomString(6, alphabet("0-9", "A-Z"));
    console.log(code);

    await prisma.verification.create({
        data: {
            userId: userId,
            email: email,
            code: code,
            expires_at: createDate(new TimeSpan(15, "m")) // 15 minutes
        }
    });

    return code;
}
