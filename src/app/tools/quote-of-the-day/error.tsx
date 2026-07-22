"use client";

export default function Error({ reset}: {error: Error; reset: () => void }){
    return (
        <main className="max-w-xl mx-auto p-6 text-center">
            <p className="text-red-600 mb-4">Couldn&apos;t load quote from the server </p>
            <button onClick={() => reset()} className="border rounded px-4 py-2">Try Again</button>
        </main>
    )
}