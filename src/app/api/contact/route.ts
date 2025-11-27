import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Contact from '@/models/Contact';
import { sendContactEmail } from '@/lib/nodemailer';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, subject, message } = body;

        // Validation
        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        // Email format validation
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }

        // Connect to database
        await dbConnect();

        // Save to database
        const contact = await Contact.create({
            name,
            email,
            subject,
            message,
        });

        // Send email notification
        try {
            await sendContactEmail({ name, email, subject, message });
        } catch (emailError) {
            console.error('Failed to send email:', emailError);
            // Continue even if email fails - data is already saved
        }

        return NextResponse.json(
            { message: 'Contact form submitted successfully', id: contact._id },
            { status: 201 }
        );
    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            { error: 'Failed to submit contact form' },
            { status: 500 }
        );
    }
}
