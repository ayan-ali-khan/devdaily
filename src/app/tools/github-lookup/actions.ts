"use server";

type GithubUser = {
    login: string;
    name: string | null;
    avatar_url: string;
    html_url: string;
    bio: string | null;
    followers: number;
    following: number;
    public_repos: number;
}

export type LookupResult = 
    | { status: "success"; user: GithubUser}
    | { status: "error"; message: string};

export async function LookupGithubUser(username: string): Promise<LookupResult> {
    if(!username.trim()){
        return {status: "error", message: "Enter a username"};
    }

    try {
        const res = await fetch(`https://api.github.com/users/${username}`, {
            cache: "no-store",
            headers: {"Accept": "application/vnd.github+json"}    
        });

        if(res.status === 404){
            return { status: "error", message: `No user found with this username: ${username}`}
        }

        if(!res.ok){
            return { status: "error", message: `Github API Error (${res.status})`}
        }

        const user = (await res.json()) as GithubUser;

        return {status: "success", user};

    } catch(err){
        console.error("github fetch err: ", err);
        return {status: "error", message: "Network error. Please try again later."}
    }
}