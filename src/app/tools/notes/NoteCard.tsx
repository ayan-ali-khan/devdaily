"use client";
import { useState } from "react";
import { deleteNote, updateNote } from "./actions";

type Note = {
    id: string;
    title: string;
    content: string;
    tags: string;
}

export default function NoteCard({ note }: {note: Note}){
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleDelete(){
        if(!confirm(`Delete "${note.title}" ?`))
        await deleteNote(note.id)
    }

    async function handleUpdate(formdata: FormData){
        const res = await updateNote(note.id, formdata);
        if(res.status === "error"){
            setError(res.message)
            return;
        }

        setError(null);
        setIsEditing(false);
    }

    if(isEditing){
        return(
            <form action={handleUpdate} className="border rounded p-4 space-y-2">
                <input 
                    name="title"
                    defaultValue={note.title}
                    className="w-full border rounded px-3 py-2"
                />
                <textarea 
                    name="content"
                    defaultValue={note.content}
                    rows={4}
                    className="w-full border rounded px-3 py-2"
                />
                <input 
                    name="tags"
                    defaultValue={note.tags}
                    className="w-full border rounded px-3 py-2"
                />

                {error && <p className="text-red-600 text-xs">{error}</p>}

                <div className="flex gap-2">
                    <button className="bg-black text-white px-3 py-1 rounded text-sm">Save</button>
                    <button type="button" onClick={() => setIsEditing(false)} className="border px-3 py-1 rounded text-sm">Cancel</button>
                </div>
            </form>
        )
    }
    
    return (
        <div className="border rounded p-4">
            <div className="flex justify-between items-start">
                <div className="font-semibold">{note.title}</div>
                <div className="flex gap-2 text-sm">
                    <button onClick={() => setIsEditing(true)} className="underlined">Edit</button>
                    <button onClick={handleDelete} className="underlined text-red-600">Delete</button>
                </div>
            </div>

            <p className="text-sm text-gray-800 mt-1">{note.content}</p>
            {note.tags && (
                <div className="flex gap-1 mt-2 flex-wrap">
                    {note.tags.split(",").filter(Boolean).map((tag) => (
                        <span className="text-xs bg-black-100 px-2 py-0.5 rounded" key={tag}>{tag.trim()}</span>
                    ))}
                </div>
            )}
        </div>
    )
}