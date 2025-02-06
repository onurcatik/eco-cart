import { prisma } from '@/db/prisma';
import { sendEmail } from '@/lib/mail';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ message: 'Email address is required.' }, { status: 400 });
    }

    // Find the user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // If no user is found
    if (!user) {
      return NextResponse.json({ message: 'No account found with this email address.' }, { status: 404 });
    }

    // If the user is already verified
    if (user.isVerified) {
      return NextResponse.json({
        message: 'This account is already verified. Reverification is not required.',
      }, { status: 400 });
    }

    // Create a new verification token
    const verificationToken = crypto.randomUUID();

    // Update the user's verification token
    await prisma.user.update({
      where: { email },
      data: { verificationToken },
    });

    // Create a new verification link
    const verificationUrlNew = `${process.env.NEXTAUTH_URL}/verify-email?token=${verificationToken}`;

    console.log("📩 New verification link:", verificationUrlNew);

    // Send an email to the user
    await sendEmail({
      to: email,
      subject: 'Re-verify Your Account',
      text: `Click the link below to verify your account:\n\n${verificationUrlNew}`,
    });

    return NextResponse.json({
      message: 'Verification email resent. Please check your email.',
    });

  } catch (error) {
    console.error('❌ Error sending verification email:', error);
    return NextResponse.json({ message: 'An error occurred, please try again.' }, { status: 500 });
  }
}
