import { prisma } from "@/lib/prisma";
import { createNote } from "./actions";
import NoteCard from "./NoteCard";

export default async function NotesPage(){
    const notes = await prisma.note.findMany({
        orderBy: { updatedAt: "desc" },
    })

    return (
        <main className="max-w-2xl mx-auto p-6 space-y-6">
            <h1 className="text-2xl font-bold">Notes</h1>

            <form action={createNote} className="space-y-2 border rounded p-4">
                <input 
                    className="w-full border rounded px-3 py-2"
                    name="title"
                    placeholder="Title"
                />
                <textarea 
                    className="w-full border rounded px-3 py-2"
                    name="content"
                    placeholder="Content"
                    rows={4}
                />
                <input 
                    className="w-full border rounded px-3 py-2"
                    name="tags"
                    placeholder="Tags"
                />
                <button type="submit" className="bg-black text-white px-4 py-2 rounded">
                    Add Note
                </button>
            </form>

            <div className="space-y-3">
                {notes.length === 0 && (
                    <p className="text-gray-400 text-sm">No notes yet.</p>
                )}

                {notes.map((note) => (
                    <NoteCard key={note.id} note={note} />
                ))}
            </div>
        </main>
    )
}