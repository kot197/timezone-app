import { verifyEmail, verifyVerificationCode } from "@/app/lib/accounts";
import { lucia } from "@/app/lib/auth";
import { cookies } from "next/headers";

export async function POST(request: Request): Promise<Response> {
    // Make sure to implement throttling to prevent brute-force attacks.
	console.log(lucia.sessionCookieName);
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    if(!sessionId) {
		console.log("No sessionId found");
		return new Response(null, {
			status: 400
		});
	}

    const { user } = await lucia.validateSession(sessionId);
	if (!user) {
		return new Response(null, {
			status: 401
		});
	}

    const formData = await request.formData();
	let code = '';
	// Use `for...of` to iterate over formData entries
	for (const [key, value] of formData.entries()) {
		code += value; // Combine the values into a single string
	}
	console.log(code);
	if (typeof code !== "string") {
		return new Response(null, {
			status: 400
		});
	}

	const validCode = await verifyVerificationCode(user, code);
	if (!validCode) {
		console.log("Invalid code!")
		return new Response(null, {
			status: 400
		});
	}

	await lucia.invalidateUserSessions(user.id);
	await verifyEmail(user);
	console.log('Email verified!');

	const session = await lucia.createSession(user.id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	return new Response(null, {
		status: 302,
		headers: {
			Location: "/web-app/home",
			"Set-Cookie": sessionCookie.serialize()
		}
	});
}