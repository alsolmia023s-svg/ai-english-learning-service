import { auth } from '@/auth';
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Contact from '@/models/Contact';

export async function GET(req: Request) {
    const session = await auth();

    if (!session || session.user.role !== 'admin') {
        return new NextResponse('Forbidden', { status: 403 });
    }

    try {
        await dbConnect();
        const contacts = await Contact.find({}).sort({ createdAt: -1 });
        return NextResponse.json(contacts);
    } catch (error) {
        console.error('Error fetching contacts:', error);
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
        await Contact.findByIdAndDelete(id);

        return new NextResponse('Contact deleted', { status: 200 });
    } catch (error) {
        console.error('Error deleting contact:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
