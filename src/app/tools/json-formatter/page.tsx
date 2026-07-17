"use client"
import { useState } from "react"


type FormatResult = 
    | {status: "success"; data: string}
    | {status: "error"; message: string}
    | {status: "idle"};

export default function JsonFormatterPage() {
    const [input, setInput] = useState("");
    const [result, setResult] = useState<FormatResult>({status: "idle"});
    const [isCopied, setIsCopied] = useState(false);

    function handleFormat(){
        if(!input.trim()){
            setResult({ status: "error", message: "Input is empty"})
            return;
        }

        try {
            const parsed = JSON.parse(input);
            const pretty = JSON.stringify(parsed, null, 2);
            setResult({ status: "success", data: pretty});
        } catch(err){
            const msg = err instanceof Error ? err.message : "Invalid JSON";
            setResult({ status: "error", message: msg});
        }
        setIsCopied(false);
    }

    async function handleCopy(){
        if(result.status !== "success") return;
        await navigator.clipboard.writeText(result.data);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 1500);
    }

    return (
        <main className="max-w-2xl mx-auto p-6 space-y-4">
            <h1 className="text-2xl font-bold">JSON Formatter</h1>

            <textarea 
                value={input}
                placeholder="Enter raw JSON here..."
                rows={10}
                onChange={(e) => setInput(e.target.value)}
                className="w-full border rounded p-3 font-mono"
            />

            <button onClick={handleFormat} className="bg-black text-white px-4 py-2 rounded hover:opacity-80">
                Format Now
            </button>


            {result.status === "error" && (
                <p className="text-red-600 text-sm">Error: {result.message}</p>
            )}

            {result.status === "success" && (
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <span className="text-grey-900 text-sm">Formatted output</span>

                        <button onClick={handleCopy} className="text-sm border px-2  py-1 rounded">
                            {isCopied ? "!Copied" : "Copy"}
                        </button>
                    </div>

                    <pre className="bg-gray-100 text-black p-3 rounded overflow-x-auto text-sm">{result.data}</pre>
                </div>
            )}

        </main>
    )
}