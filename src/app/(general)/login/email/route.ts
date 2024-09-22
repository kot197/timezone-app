import { login } from "@/app/lib/actions";

export async function POST(request: Request): Promise<Response> {
    const formData = await request.formData();

    console.log(Object.values(formData));

	const response = await login(formData);

    return response;
}