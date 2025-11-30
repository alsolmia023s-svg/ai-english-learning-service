import { auth } from '@/auth';
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import Contact from '@/models/Contact';

export async function GET(req: Request) {
    const session = await auth();

    if (!session || session.user.role !== 'admin') {
        return new NextResponse('Forbidden', { status: 403 });
    }

    try {
        await dbConnect();
        const userCount = await User.countDocuments();
        const contactCount = await Contact.countDocuments();

        return NextResponse.json({
            userCount,
            contactCount,
        });
    } catch (error) {
        console.error('Error fetching stats:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
