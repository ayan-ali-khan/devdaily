"use client";
import { useDebounce } from "@/useDebounce";
import {useMemo, useState} from "react"

type RegexResult = 
    | {status: "success", matchCount: number, highlighted: string}
    | {status: "error", message: string}
    | {status: "idle"}

function escapeHtml(str: string): string {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
}

export default function RegexTesterPage() {
    const [pattern, setPattern] = useState("");
    const [flags, setFlags] = useState("g");
    const [testString, setTestString] = useState("");

    const debouncedPattern = useDebounce(pattern, 300);
    const debouncedFlags = useDebounce(flags, 300);
    const debouncedText = useDebounce(testString, 300);

    const result: RegexResult = useMemo(() => {
        if(!debouncedPattern) return {status: "idle"};

        try {
            const regex = new RegExp(debouncedPattern, debouncedFlags);
            const matches = [...debouncedText.matchAll(new RegExp(regex, regex.flags.includes("g") ? regex.flags : regex.flags + "g"))]

            let highlighted = escapeHtml(debouncedText);

            if(matches.length > 0) {
                highlighted = ""
                let lastIdx =0;
                
                for(const match of matches) {
                    const start = match.index ?? 0;
                    const end = start + match[0].length;
                    highlighted += escapeHtml(debouncedText.slice(lastIdx, start));

                    highlighted += `<mark class="bg-yellow-300">${escapeHtml(match[0])}</mark>`
                    lastIdx=end;
                }
                highlighted += escapeHtml(debouncedText.slice(lastIdx));
            }

            return {status: "success", matchCount: matches.length, highlighted};
        } catch(err){
            const msg = err instanceof Error ? err.message : "Invalid regex";
            return {status: "error", message: msg};
        }
    }, [debouncedPattern, debouncedFlags, debouncedText]);

    return (
        <main className="max-w-2xl mx-auto p-6 space-y-4">
            <h1 className="font-bold text-2xl">Regex Tester</h1>

            <div className="flex gap-2">
                <span className="text-gray-400 self-center">/</span>
                <input 
                    value={pattern}
                    placeholder="Pattern e.g. \d+"
                    onChange={(e) => setPattern(e.target.value)}
                    className="flex-1 border rounded p-2 font-mono text-sm"
                />

                <span className="text-gray-400 self-center">/</span>
                <input 
                    value={flags}
                    placeholder="Flags e.g. \d+"
                    onChange={(e) => setFlags(e.target.value)}
                    className="w-16 border rounded p-2 font-mono text-sm"
                />
            </div>

            <textarea 
                value={testString}
                placeholder="Test string..."
                onChange={(e) => setTestString(e.target.value)}
                rows={10}
                className="w-full border rounded p-3 font-mono text-sm"
            />

            {result.status === "error" && (
                <p className="text-red-600 text-sm">Invalid regex: {result.message}</p>
            )}

            {result.status === "success" && (
                <div className="space-y-2">
                    <p className="text-sm text-gray-500">{result.matchCount}</p>

                    <div className="" dangerouslySetInnerHTML={{ __html: result.highlighted }} />
                </div>
            )}
        </main>
    )
}