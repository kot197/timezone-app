import { z } from 'zod'

export const addFriendFormSchema = z.object({
    name: z.string().min(1, {message: "Name is required"}),
    country: z
        .string()
        .min(1, "Please select a country"), 
    timezone: z
        .string({
            // Because input is disabled when country is not selected
            message: "Please select a timezone",
        })
        .min(1, "Please select a timezone"),
    location: z.string().optional(),
    notes: z.string().optional(),
    tags: z.string().optional(),
}); 