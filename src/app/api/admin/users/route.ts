import { auth } from '@/auth';
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function GET(req: Request) {
    const session = await auth();

    if (!session || session.user.role !== 'admin') {
        return new NextResponse('Forbidden', { status: 403 });
    }

    try {
        await dbConnect();
        const users = await User.find({}).sort({ createdAt: -1 });
        return NextResponse.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}

export async function DELETE(req: Request) {
    const session = await auth();

    if (!session || session.user.role !== 'admin') {
        return new NextResponse('Forbidden', { status: 403 });
    }

    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return new NextResponse('Missing ID', { status: 400 });
        }

        await dbConnect();
        await User.findByIdAndDelete(id);

        return new NextResponse('User deleted', { status: 200 });
    } catch (error) {
        console.error('Error deleting user:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}

export async function PATCH(req: Request) {
    const session = await auth();

    if (!session || session.user.role !== 'admin') {
        return new NextResponse('Forbidden', { status: 403 });
    }

    try {
        const body = await req.json();
        const { id, role } = body;

        if (!id || !role) {
            return new NextResponse('Missing ID or Role', { status: 400 });
        }

        await dbConnect();
        await User.findByIdAndUpdate(id, { role });

        return new NextResponse('User updated', { status: 200 });
    } catch (error) {
        console.error('Error updating user:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
