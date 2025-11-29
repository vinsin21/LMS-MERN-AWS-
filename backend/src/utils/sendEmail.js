import { Resend } from 'resend';
import { ApiError } from './ApiError.js';

// Initialize Resend only if API key is present, otherwise set to null
// This prevents the app from crashing on startup if the key is missing
// We will lazy-initialize the Resend client inside the function
// to ensure environment variables are loaded (avoiding import order issues)
let resend;

export const sendEmail = async (email, subject, htmlContent) => {
    try {
        // In development, if we don't have an API key or just want to save credits, 
        // we might want to just log it. But since we are using Resend's free tier which is generous,
        // and we want to test the actual delivery, we will try to send it.
        // However, we should ensure we don't send to real users in dev if the data is seeded/fake.

        // For this implementation, we will proceed with sending.

        if (!process.env.RESEND_API_KEY) {
            console.warn("RESEND_API_KEY is missing. Email will not be sent.");
            console.log(`[MOCK EMAIL] To: ${email}, Subject: ${subject}, Content: (HTML Content)`);
            return null;
        }

        if (!resend) {
            resend = new Resend(process.env.RESEND_API_KEY);
        }

        const data = await resend.emails.send({
            from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
            to: email,
            subject: subject,
            html: htmlContent,
        });

        if (data.error) {
            console.error("Resend API Error:", data.error);
            throw new ApiError(500, "Failed to send email", [data.error]);
        }

        return data;
    } catch (error) {
        console.error("Error sending email:", error);
        // If it's already an ApiError, rethrow it
        if (error instanceof ApiError) {
            throw error;
        }
        // Otherwise wrap it
        throw new ApiError(500, "Error sending email", [], error.stack);
    }
};
