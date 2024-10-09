import { Lucia, Session, User } from "lucia";
import { Discord } from "arctic";
import { adapter } from "../../db/prisma";
import { cookies } from "next/headers";
import { cache } from "react";

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
			discordId: attributes.discordId,
			email: attributes.email,
			emailVerified: attributes.emailVerified,
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
		console.log("Validate Session: " + JSON.stringify(result.user, null, 2));

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
	discordId: string;
	email: string;
	emailVerified: boolean;
}
