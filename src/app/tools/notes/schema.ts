import z from "zod";

export const noteSchema = z.object({
    title: z.string().min(3, "Title must be atleast 3 characters long"),
    content: z.string().min(3, "Min. three char should be in the content"),
    tags: z.string().optional(),
})

export type NoteInput = z.infer<typeof noteSchema>;