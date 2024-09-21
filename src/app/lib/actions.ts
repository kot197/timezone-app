"use server"

import { hash, verify } from "@node-rs/argon2";
import { generateIdFromEntropySize } from "lucia";
import { createUser, getUserByUserId, getUserByUsername } from "./accounts";
import { lucia } from "./auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signup(formData: FormData): Promise<ActionResult> {
    const username = formData.get("username");
    if (
        typeof username !== "string" ||
        username.length < 3 ||
        username.length > 31 ||
        !/^[a-z0-9_-]+$/.test(username)
    ) {
        return {
            error: "Invalid username"
        };
    }

    const password = formData.get("password");
    if(typeof password !== "string" || password.length < 6 || password.length > 255) {
        return {
            error: "Invalid password"
        };
    }

    const passwordHash = await hash(password, {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1
    });
    const userId = generateIdFromEntropySize(10);

    const user = await getUserByUserId(userId);

    if(!user) {
        await createUser(userId, username, passwordHash)
    }

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    redirect("/web-app/home");
}

export async function login(formData: FormData): Promise<ActionResult> {
    console.log("in login actions.ts")
    const username = formData.get("username");
    console.log(typeof username);
    if(
        typeof username !== "string" ||
		username.length < 3 ||
		username.length > 31 ||
		!/^[a-z0-9_-]+$/.test(username)
    ) {
        console.log("Invalid username");
		return {
			error: "Invalid username"
		};
	}

    const password = formData.get("password");
	if (typeof password !== "string" || password.length < 6 || password.length > 255) {
        console.log("Invalid password");
		return {
			error: "Invalid password"
		};
	}

    const existingUser = await getUserByUsername(username);
    if(!existingUser) {
        console.log("Incorrect username or password");
        return {
			error: "Incorrect username or password"
		};
    }

    const validPassword = await verify(existingUser.passwordHash as string, password, {
        memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1
    });
    if(!validPassword) {
        console.log("Incorrect username or password");
        return {
			error: "Incorrect username or password"
		};
    }

    const session = await lucia.createSession(existingUser.id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    console.log("login: no error");
}

interface ActionResult {
    error: string;
}