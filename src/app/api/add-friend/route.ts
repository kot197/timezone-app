import { validateRequest } from "@/app/lib/auth";
import { prisma } from "@/db/prisma";

export async function POST(request: Request): Promise<Response> {
    const formData = await request.formData();

    console.log(formData);

    // Validate if user is authorized
    const result = await validateRequest();
    
    // Not authorized, redirect to home
    if(!result) {
        return new Response(
            JSON.stringify({
                message: "Unauthorized. Email not verified."
            }), {
                status: 401, // Unauthorized
                headers: {
                    Location: "/",
                }
            });
    }

    // Otherwise, add new friend
	const newFriend = await prisma.friend.create({
        data: {
            name: formData.get("name") as string,
            country: formData.get("country") as string,
            country_code: formData.get("country") as string,
            timezone: formData.get("timezone") as string,
            userId: result.user?.id as string,
            location: formData.get("location") as string | null,
            notes: formData.get("notes") as string | null,
        }
    });

    // Add tags if there is one
    const tags = formData.getAll("tags") as string[] | null;
    if (tags) {
        // For each tag
        tags.forEach(async (tag) => {
            // Check if it exist
            const existingTag = await prisma.tag.findUnique({
                where: {
                    name: tag,
                }
            });

            let newTag;
            // If it doesn't exist, create
            if(!existingTag) {
                newTag = await prisma.tag.create({
                    data: {
                        name: tag,
                    }
                })
            }

            // Use existing tag id or new tag id
            const tagId = existingTag ? existingTag.id : newTag?.id;

            if (!tagId) {
                throw new Error("Tag ID is undefined");
            }

            // Associate tags with a friend
            await prisma.friendTag.create({
                data: {
                    friendId: newFriend.id,
                    tagId: tagId,
                }
            });
        });
    } 

    // Success code 200
    return new Response(null, {
		status: 200,
	});
}