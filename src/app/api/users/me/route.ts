import { NextRequest, NextResponse } from 'next/server';

import { connectDB } from '@/config/db';
import { getDataFromToken } from '@/utils/token';
import User from '@/models/user';

connectDB();

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get('token')?.value || '';
        const userId = getDataFromToken(token);
        const user = await User.findById(userId).select('-password -role');
        return NextResponse.json({ data: user, error: null });
    } catch (error) {
        const err = error as Error;
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}
