import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { promises as fs } from 'fs';
import path from 'path';

// Ensure this route is always dynamic
export const dynamic = 'force-dynamic';

export async function GET() {
  // Check if KV is available (not forced to local and env vars present)
  const kvAvailable = !process.env.USE_LOCAL_DATA &&
    !!process.env.KV_REST_API_URL && 
    !!process.env.KV_REST_API_TOKEN;

  // Try KV first if available
  if (kvAvailable) {
    try {
      const timestamp = await kv.get<string>('last_cron_update_timestamp');
      
      if (!timestamp) {
        return NextResponse.json({ lastUpdated: null }, { status: 404 });
      }
      
      return NextResponse.json({ lastUpdated: timestamp });
    } catch (error) {
      console.warn('Error fetching timestamp from Vercel KV, falling back to local file:', error);
      // Fall through to file-based fallback
    }
  }

  // Fallback to local JSON file
  try {
    const filePath = path.join(process.cwd(), 'public', 'last-update.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContents) as { lastUpdated: string | null };
    
    return NextResponse.json({ lastUpdated: data.lastUpdated });
  } catch (error) {
    console.error('Error reading local last-update file:', error);
    // Return null if file doesn't exist or can't be read
    return NextResponse.json({ lastUpdated: null });
  }
} 