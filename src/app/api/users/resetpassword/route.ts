import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

import { connectDB } from '@/config/db';
import User from '@/models/user';

connectDB();

export async function POST(request: NextRequest) {
    try {
        const { token, password, confirmPassword } = await request.json();

        const user = await User.findOne({
            forgotPasswordToken: token,
            forgotPasswordTokenExpiry: { $gt: Date.now() },
        });
        if (!user)
            return NextResponse.json(
                { error: 'Invalid token' },
                { status: 400 },
            );

        if (confirmPassword !== password)
            return NextResponse.json(
                { error: 'Password does not matched' },
                { status: 400 },
            );

        user.password = await bcrypt.hash(password, 10);
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({ data: null, error: null }, { status: 200 });
    } catch (error) {
        const err = error as Error;
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
