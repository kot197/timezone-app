import { cookies } from "next/headers";
import { lucia } from "./auth";
import { UserId } from "lucia";

export async function setSession(userId: UserId) {
    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
  }