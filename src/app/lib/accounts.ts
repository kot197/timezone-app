import { prisma } from "@/db/prisma";
import { DiscordUser } from "../(general)/login/discord/callback/route";

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
            passwordHash: passwordHash,
        }
    });
}


