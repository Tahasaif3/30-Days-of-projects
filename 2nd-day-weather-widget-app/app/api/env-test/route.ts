import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    envVar: process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY ? 'API key is set' : 'API key is not set' 
  });
}