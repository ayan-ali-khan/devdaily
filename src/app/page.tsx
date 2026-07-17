import { tools } from "@/lib/tools";
import Link from "next/link";

export default function Home(){
  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-1">DevDaily</h1>
      <p className="text-gray-500 mb-6">One tool a day. {tools.length} built so far</p>
    
      <ul className='space-y-3'>
        {tools.map((tool) => (
          <li key={tool.slug} className="border rounded p-4 hover:bg-gray-50">
            <Link href={`/tools/${tool.slug}`} className='font-semibold'>
              {tool.title}
            </Link>

            <p className="text-sm text-gray-500">{tool.description}</p>   
          </li>
        ))}
      </ul>
    </main>
  );
}