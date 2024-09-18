import { Lucia, Session, User } from "lucia";
import { Discord } from "arctic";
import { adapter } from "../../db/prisma";
import { cookies } from "next/headers";
import { cache } from "react";
import { redirect } from "next/navigation";

console.log('AUTH_DISCORD_ID: ' + process.env.AUTH_DISCORD_ID);
console.log('AUTH_DISCORD_SECRET: ' + process.env.AUTH_DISCORD_SECRET);
console.log('DISCORD_REDIRECT_URI: ' + process.env.DISCORD_REDIRECT_URI);

export const discord = new Discord(process.env.AUTH_DISCORD_ID??'', process.env.AUTH_DISCORD_SECRET??'', process.env.DISCORD_REDIRECT_URI??'');

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		// this sets cookies with super long expiration
		// since Next.js doesn't allow Lucia to extend cookie expiration when rendering pages
		expires: false,
		attributes: {
			// set to `true` when using HTTPS
			secure: process.env.NODE_ENV === "production"
		}
	},
	getUserAttributes: (attributes) => {
		return {
			discordId: attributes.discord_id,
			username: attributes.username
		}
	}
});

export const validateRequest = cache(
	async (): Promise<
		{ user: User; session: Session } | { user: null; session: null }
	> => {
		const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
		if(!sessionId) {
			return {
				user: null,
				session: null
			};
		}

		const result = await lucia.validateSession(sessionId);

		try {
			if(result.session && result.session.fresh) {
				const sessionCookie = lucia.createSessionCookie(result.session.id);
				cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
			}
			if(!result.session) {
				const sessionCookie = lucia.createBlankSessionCookie();
				cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
			}
		} catch {}

		return result;
	}
);

// IMPORTANT!
declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	discord_id: string;
	username: string;
}