import { verifyEmail, verifyVerificationCode } from "@/app/lib/accounts";
import { signup } from "@/app/lib/actions";
import { lucia } from "@/app/lib/auth";
import { cookies } from "next/headers";

export async function POST(request: Request): Promise<Response> {
    // Make sure to implement throttling to prevent brute-force attacks.
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    if(!sessionId) {
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
	const code = formData.get("code");
	if (typeof code !== "string") {
		return new Response(null, {
			status: 400
		});
	}

	const validCode = await verifyVerificationCode(user, code);
	if (!validCode) {
		return new Response(null, {
			status: 400
		});
	}

	await lucia.invalidateUserSessions(user.id);
	await verifyEmail(user);

	const session = await lucia.createSession(user.id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	return new Response(null, {
		status: 302,
		headers: {
			Location: "/",
			"Set-Cookie": sessionCookie.serialize()
		}
	});
}