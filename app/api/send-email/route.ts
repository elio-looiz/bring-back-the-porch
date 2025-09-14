// app/api/send-email/route.ts

import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY;

// Updated interface to include the reCAPTCHA token
interface RequestBody {
    name: string;
    email: string;
    subject: string;
    message: string;
    recaptchaToken: string;
}

export async function POST(request: Request) {
    try {
        const body: RequestBody = await request.json();
        const { name, email, subject, message, recaptchaToken } = body;

        // --- reCAPTCHA Verification Step ---
        // 1. Check if the reCAPTCHA token is missing
        if (!recaptchaToken) {
            return NextResponse.json({ error: 'reCAPTCHA token is missing' }, { status: 400 });
        }

        // 2. Send a request to Google's verification API
        const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `secret=${recaptchaSecretKey}&response=${recaptchaToken}`,
        });

        const recaptchaData = await recaptchaResponse.json();

        // 3. Check the verification result
        if (!recaptchaData.success || recaptchaData.score < 0.5) {
            // If verification fails or the score is too low, block the request
            console.warn('Potential spam detected', recaptchaData);
            return NextResponse.json({ error: 'Failed reCAPTCHA verification, potential spam.' }, { status: 403 });
        }

        // --- Email Sending Step (only runs if reCAPTCHA passes) ---
        // 4. Send the email using Resend
        const data = await resend.emails.send({
            from: 'Onboarding <onboarding@resend.dev>', // Replace with your verified domain
            to: ['b.protsenko9@gmail.com'], // Your email for receiving messages
            subject: subject,
            replyTo: email,
            html: `
        <h1>New message from the "Bring Back The Porch" website</h1>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>From:</strong> ${name} (${email})</p>
        <hr>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
        });

        return NextResponse.json({ message: 'Email sent successfully!', data }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
    }
}