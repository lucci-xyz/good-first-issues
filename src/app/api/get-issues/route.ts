import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { promises as fs } from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic'; // Ensure fresh data on every request

interface Issue {
  id: number;
  title: string;
  url: string;
  repository: string;
  tags: string[];
  created_at: string;
  number: number;
  stars?: number;
  forks?: number;
}

export async function GET() {
  // Check if KV is available (not forced to local and env vars present)
  const kvAvailable = !process.env.USE_LOCAL_DATA &&
    !!process.env.KV_REST_API_URL && 
    !!process.env.KV_REST_API_TOKEN;

  // Try KV first if available
  if (kvAvailable) {
    try {
      const issues = await kv.get<Issue[]>('all_issues_data');

      if (!issues) {
        // Issues haven't been populated yet, or KV store is empty for this key
        return NextResponse.json({ issues: [], message: 'No issues found or KV store is empty for this key.' }, { status: 200 });
      }

      return NextResponse.json({ issues });
    } catch (error) {
      console.warn('Error fetching issues from Vercel KV, falling back to local file:', error);
      // Fall through to file-based fallback
    }
  }

  // Fallback to local JSON file
  try {
    const filePath = path.join(process.cwd(), 'public', 'issues.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const issues = JSON.parse(fileContents) as Issue[];
    
    return NextResponse.json({ 
      issues, 
      message: kvAvailable ? 'Loaded from local file (KV fallback)' : 'Running in local mode (no KV configured)' 
    });
  } catch (error) {
    console.error('Error reading local issues file:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ 
      error: 'Failed to fetch issues from both KV and local file.', 
      details: errorMessage 
    }, { status: 500 });
  }
} 