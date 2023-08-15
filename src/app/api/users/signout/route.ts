import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const res = NextResponse.json({ data: null, error: null });
        res.cookies.set('token', '', {
            httpOnly: true,
            expires: new Date(0),
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
        });

        return res;
    } catch (error) {
        const err = error as Error;
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
