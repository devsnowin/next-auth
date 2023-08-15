import { NextRequest, NextResponse } from 'next/server';

import { connectDB } from '@/config/db';
import User from '@/models/user';

connectDB();

export async function POST(request: NextRequest) {
    try {
        const { token } = await request.json();

        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: { $gt: Date.now() },
        });

        if (!user)
            return NextResponse.json(
                { error: 'Invalid token' },
                { status: 400 },
            );

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({ data: null, error: null }, { status: 200 });
    } catch (error) {
        const err = error as Error;
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
