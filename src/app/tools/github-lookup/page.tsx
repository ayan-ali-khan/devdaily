"use client";

import { useState, useTransition } from "react";
import { LookupGithubUser, type LookupResult } from "./actions";
import Image from "next/image";

export default function GithubLookupPage() {
    const [username, setUsername] = useState("");
    const [result, setResult] = useState<LookupResult | null>(null);
    const [isPending, startTransaction] = useTransition();

    function handleLookup(){
        startTransaction(async () => {
            const res = await LookupGithubUser(username);
            setResult(res);
        });
    }
    
    return (
        <main className="max-w-3xl mx-auto p-6 space-y-4">
            <h1 className="text-2xl font-bold">Github Lookup</h1>

            <div className="flex gap-2">
                <input 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleLookup()}
                    placeholder="Enter username"
                    className="flex-1 border rounded px-3 py-2"
                />
                
                <button
                    onClick={handleLookup}
                    disabled={isPending}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
                >
                    {isPending ? "Loading..." : "Search"}
                </button>

                {result?.status === "error" && (
                    <p className="text-red-600 text-sm">{result.message}</p>
                )}

                {result?.status === "success" && (
                    <div className="border rounded-xl p-6 flex gap-5 items-center shadow-lg bg-white text-black w-full">
                        <Image 
                            src={result.user.avatar_url}
                            alt={result.user.login}
                            width={64}
                            height={64}
                            className="rounded full"
                        />

                        <div className="">
                            <p className="font-semibold">{result.user.name ?? result.user.login}</p>
                            <p className="text-sm text-gray-500">@{result.user.login}</p>
                            {result.user.bio && <p className="text-sm mt-1">{result.user.bio}</p>}

                            <p className="text-xs text-gray-600 mt-1">
                                {result.user.public_repos} repos | {result.user.followers} followers | {result.user.following} following
                            </p>

                            <a
                                href={result.user.html_url}
                                target="_blank"
                                className="text-xs text-blue-600 underline"
                            >
                               View Profile 
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </main>
    )
}