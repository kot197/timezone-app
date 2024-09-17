import { Lucia } from "lucia";
import { Discord } from "arctic";
import { adapter } from "../../db/prisma";

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
	}
});

// IMPORTANT!
declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
	}
}