import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

import { connectDB } from '@/config/db';
import User from '@/models/user';
import { sendVerifyEmail } from '@/utils/auth';

connectDB();

export async function POST(request: NextRequest) {
    try {
        const { name, email, password } = await request.json();

        const userExist = await User.findOne({ email });
        if (userExist)
            return NextResponse.json(
                { error: 'User already exists' },
                { status: 400 },
            );

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        // send verification email
        const res = await sendVerifyEmail(user.id, user.email, 'VERIFY_EMAIL');

        return NextResponse.json({ data: user, error: null }, { status: 201 });
    } catch (error) {
        const err = error as Error;
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
