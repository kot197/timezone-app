// app/login/github/callback/route.ts
import { discord, lucia } from "@/app/lib/auth";
import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { getAccountByDiscordId, createDiscordUser } from "@/app/lib/accounts";

export async function GET(request: Request): Promise<Response> {
	const url = new URL(request.url);
	const code = url.searchParams.get("code");
	const state = url.searchParams.get("state");
	const storedState = cookies().get("discord_oauth_state")?.value ?? null;

	console.log('in callback: \n' + "code: " + code + "\nstate: " + state + "\nstoredState: " + storedState);
	
	if (!code || !state || !storedState || state !== storedState) {
		return new Response(null, {
			status: 400
		});
	}

	try {
		// GET Get Current User https://discord.com/developers/docs/resources/user#get-current-user
		const tokens = await discord.validateAuthorizationCode(code);
		const response = await fetch("https://discord.com/api/users/@me", {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`
			}
		});
		const discordUser: DiscordUser = await response.json();

        console.log("discordUser: " + JSON.stringify(discordUser, null, 2))
        
		// Get a user from User table in database
		const existingUser = await getAccountByDiscordId(discordUser.id);

		console.log("existingUser: " + JSON.stringify(existingUser, null, 2))

		// If user exists, create session with its id along with the cookie
		if (existingUser) {
			const session = await lucia.createSession(existingUser.discord_id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			console.log("existingUser true \n" + "session: " + JSON.stringify(session, null, 2) + "\nsessionCookie: " + JSON.stringify(sessionCookie, null, 2));
			cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
			return new Response(null, {
				status: 302,
				headers: {
					Location: "/web-app/home"
				}
			});
		}

		// User is not found, so create one with response data from discord
		const userId = await createDiscordUser(discordUser);

		// Create session with id along with the cookie
		const session = await lucia.createSession(userId, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
		return new Response(null, {
			status: 302,
			headers: {
				Location: "/web-app/home"
			}
		});
	} catch (e) {
		// the specific error message depends on the provider
		if (e instanceof OAuth2RequestError) {
			// invalid code
			return new Response(null, {
				status: 400
			});
		}
		return new Response(null, {
			status: 500
		});
	}
}

export interface DiscordUser {
	id: string;
	username: string;
    discriminator: string;
    avatar: string | null;
    verified: boolean;
    email: string | null;
}
