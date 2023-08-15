import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

import { connectDB } from '@/config/db';
import User from '@/models/user';
import { createToken } from '@/utils/token';
import { userWithoutPassword } from '@/utils/db';

connectDB();

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        const user = await User.findOne({ email });
        if (!user)
            return NextResponse.json(
                { error: 'Invalid credentails' },
                { status: 400 },
            );

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword)
            return NextResponse.json(
                { error: 'Invalid credentails' },
                { status: 400 },
            );

        const token = createToken({ userId: user._id }, '30d');

        const response = NextResponse.json({
            data: userWithoutPassword(user),
            error: null,
        });

        response.cookies.set('token', token, {
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
        });

        return response;
    } catch (error) {
        const err = error as Error;
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
