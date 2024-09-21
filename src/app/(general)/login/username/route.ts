import { login } from "@/app/lib/actions";

export async function POST(request: Request): Promise<Response> {
    const formData = await request.formData();

    console.log(Object.values(formData));

	await login(formData);

    return new Response(null, {
        status: 302,
        headers: {
            Location: "/web-app/home"
        }
    });
}