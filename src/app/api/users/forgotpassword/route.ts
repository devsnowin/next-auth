import { NextRequest, NextResponse } from 'next/server';

import { connectDB } from '@/config/db';
import User from '@/models/user';
import { sendVerifyEmail } from '@/utils/auth';

connectDB();

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();
        const user = await User.findOne({ email });
        if (!user)
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 },
            );

        await sendVerifyEmail(user.id, user.email, 'RESET_PASSWORD');

        return NextResponse.json({ data: null, error: null }, { status: 200 });
    } catch (error) {
        const err = error as Error;
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
