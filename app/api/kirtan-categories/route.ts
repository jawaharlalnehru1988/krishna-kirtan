import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get('lang') || 'ta';

  try {
    const response = await fetch(
      `https://api.askharekrishna.com/api/v1/kirtan-categories/?lang=${encodeURIComponent(lang)}`,
      { cache: 'no-store' },
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch kirtan categories' },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Upstream categories API unreachable', detail: String(error) },
      { status: 502 },
    );
  }
}
