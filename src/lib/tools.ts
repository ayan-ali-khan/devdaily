export type ToolMeta = {
    slug: string;
    title: string;
    description: string;
    dateAdded: string;
}

export const tools: ToolMeta[] = [
    {
        slug: "json-formatter",
        title: "JSON Formatter",
        description: "Pretty print and validate raw JSON",
        dateAdded: "2026-07-17"
    },
    {
        slug: "regex-tester",
        title: "Regex Tester",
        description: "Test a regex pattern against a string with live match highlighting",
        dateAdded: "2026-07-18"
    },
    {
        slug: "form-validator",
        title: "Form Validator",
        description: "Validate form data using Zod schema validation",
        dateAdded: "2026-07-19"
    },
    {
        slug: "github-lookup",
        title: "Github Lookup",
        description: "Look up any GitHub user's profile using a Server Action.",
        dateAdded: "2026-07-20"
    },
    {
        slug: "quote-of-the-day",
        title: "Quote of the Day",
        description: "Server-rendered quote with 60 seconds cache revalidtion.",
        dateAdded: "2026-07-22"
    },
    {
        slug: "notes",
        title: "Notes",
        description: "Full CRUD Notes App backed by Prisma + PostgreSQL.",
        dateAdded: "2026-07-22"
    },
]