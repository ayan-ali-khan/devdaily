type Quote = {
    content: string;
    author: string;
}

async function getQuote(): Promise<Quote>{
    const res = await fetch('https://dummyjson.com/quotes/random', {
        next: { revalidate: 60}
    });

    if(!res.ok){
        throw new Error(`Failed to fetch quote (${res.status})`)
    }

    const data = await res.json();
    return {content: data.quote, author: data.author}
}

export default async function QuotePage(){
    const quote = await getQuote();
    
    return (
        <main className="max-w-2xl mx-auto p-6 space-y-4">
            <h1 className="text-2xl font-bold mb-6">Quote of the Day</h1>

            <blockquote className="border-l-4 border-black pl-4"> 
                <p className="text-lg italic">&ldquo;{quote.content}&rdquo;</p>
                <footer className="text-gray-500 text-sm mt-2">{quote.author}</footer>
            </blockquote>

            <p className="text-xs text-gray-400 mt-6">
                This quote is cached for 60 seconds. If you will refresh it under this window time. It will show the same quote; refreshing after 60 sec will update the quote.
            </p>
        </main>
    )
}