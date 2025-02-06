import { prisma } from '@/db/prisma';
import { sendEmail } from '@/lib/mail';
import { randomBytes } from 'crypto';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    console.log("📩 Password reset request received:", email);

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ message: 'Email address not found' }, { status: 400 });
    }

    const resetToken = randomBytes(32).toString('hex');
    const resetTokenExpires = new Date(Date.now() + 3600000); // Valid for 1 hour

    await prisma.user.update({
      where: { email },
      data: {
        passwordResetToken: resetToken,
        passwordResetExpires: resetTokenExpires,
      },
    });

    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`;

    console.log("🔗 Password reset link:", resetUrl);

    await sendEmail({
      to: email,
      subject: 'Password Reset Request',
      text: `Click the following link to reset your password:\n\n${resetUrl}`,
    });

    return NextResponse.json({ message: 'Password reset link sent' });
  } catch (error) {
    console.error("❌ An error occurred:", error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
