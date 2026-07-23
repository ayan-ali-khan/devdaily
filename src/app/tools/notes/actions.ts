"use server";

import { prisma } from "@/lib/prisma";
import { noteSchema } from "./schema";
import { revalidatePath } from "next/cache";

export type ActionResult = 
    | {status: "success"}
    | {status: "error", message: string};

export async function createNote(formData: FormData): Promise<ActionResult>{
    const parsed = noteSchema.safeParse({
        title:    formData.get("title"),
        content:  formData.get("content"),
        tags:     formData.get("tags"),
    });

    if(!parsed.success){
        return {status: "error", message: parsed.error.issues[0].message}
    }

    await prisma.note.create({data: parsed.data})
    revalidatePath("/tools/notes");
    return {status: "success"}
}


export async function updateNote(id: string, formdata: FormData,): 
Promise<ActionResult>{
    const parsed = noteSchema.safeParse({
        title:      formdata.get("title"),
        content:      formdata.get("content"),
        tags:      formdata.get("tags"),
    });

    if(!parsed.success){
        return {status: "error", message: parsed.error.issues[0].message}
    }

    await prisma.note.update({ where: {id}, data: parsed.data});
    revalidatePath("/tools/notes")
    return {status: "success"}
}

export async function deleteNote(id: string): Promise<ActionResult>{
    await prisma.note.delete({where: {id} });
    revalidatePath("/tools/notes");
    return {status: "success"}
}