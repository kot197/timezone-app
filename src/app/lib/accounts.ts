import { prisma } from "@/db/prisma";
import { DiscordUser } from "../(general)/login/discord/callback/route";

export async function getAccountByDiscordId(discordId: string) {
    return await prisma.user.findFirst({
        where: {
            discord_id: discordId
        }
    })
}

export async function createDiscordUser(discordUser: DiscordUser) {
    const user = await prisma.user.create({
        data: {
            discord_id: discordUser.id,
            discord_username: discordUser.username,
            discord_avatar: discordUser.avatar ?? "",
            discord_email: discordUser.email ?? "",
            discriminator: discordUser.discriminator,
            discord_verified: discordUser.verified,
        }
    });

    return user.discord_id;
}
