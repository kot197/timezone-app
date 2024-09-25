"use server"

import { hash, verify } from "@node-rs/argon2";
import { generateIdFromEntropySize } from "lucia";
import { createUser, getUserByUserId, getUserByEmail, generateEmailVerificationCode } from "./accounts";
import { lucia } from "./auth";
import { cookies } from "next/headers";
import { isValidEmail } from "./utils";
import { sendVerificationCode } from "./email";

export async function signup(formData: FormData): Promise<Response> {
    const email = formData.get("email");
    if (
        !email || typeof email !== "string" || !isValidEmail(email)
    ) {
        return new Response("Invalid email", {
			status: 400
		});
    }

    const password = formData.get("password");
    if(!password || typeof password !== "string" || password.length < 6 || password.length > 255) {
        return new Response("Invalid password", {
			status: 400
		});
    }

    const passwordHash = await hash(password, {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1
    });
    const userId = generateIdFromEntropySize(10);

    const user = await getUserByUserId(userId);

    ("before generate verification code");
    try {
        if(!user) {
            await createUser(userId, email, passwordHash)
        }

        console.log("before generate verification code");
        const verificationCode = await generateEmailVerificationCode(userId, email);
        console.log(verificationCode);
        await sendVerificationCode(email, verificationCode);
        
        const session = await lucia.createSession(userId, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        return new Response(null, {
			status: 302,
			headers: {
				Location: "/",
				"Set-Cookie": sessionCookie.serialize()
			}
		});
    } catch(err) {
        console.log(err);
        return new Response("Email already used", {
			status: 400
		});
    }
}

export async function login(formData: FormData): Promise<Response> {
    console.log("in login actions.ts")
    const email = formData.get("email");
    if(
        !email ||
        typeof email !== "string" ||
        isValidEmail(email)
    ) {
        console.log("Invalid email");
		return new Response("Invalid email", {
			status: 400
		});
	}

    const password = formData.get("password");
	if (!password || typeof password !== "string" || password.length < 6 || password.length > 255) {
        console.log("Invalid password");
		return new Response(null, {
			status: 400
		});
	}

    const existingUser = await getUserByEmail(email);
    if(!existingUser) {
        console.log("Incorrect email or password");
        return new Response("Invalid email or password", {
			status: 400
		});
    }

    const validPassword = await verify(existingUser.passwordHash as string, password, {
        memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1
    });
    if(!validPassword) {
        console.log("Incorrect email or password");
        return new Response("Invalid email or password", {
			status: 400
		});
    }

    const session = await lucia.createSession(existingUser.id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);

    console.log("login: no error");

    const serializedCookie = sessionCookie.serialize();

    console.log(serializedCookie);

    return new Response(null, {
		status: 302,
		headers: {
			Location: "/web-app/home",
			"Set-Cookie": sessionCookie.serialize()
		}
	});
}

interface ActionResult {
    error: string;
}