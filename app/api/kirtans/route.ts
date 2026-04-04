import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://api.askharekrishna.com/api/v1/kirtans/', {
      cache: 'no-store',
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch kirtans' },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Upstream kirtans API unreachable', detail: String(error) },
      { status: 502 },
    );
  }
}
