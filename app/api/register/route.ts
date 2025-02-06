import { prisma } from '@/db/prisma';
import { hashSync } from 'bcrypt-ts-edge';
import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/mail';
import { randomBytes } from 'crypto';

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    console.log("📝 New registration request:", email);

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return NextResponse.json({ message: 'This email is already registered.' }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = hashSync(password, 10);

    // Create a random token for verification
    const verificationToken = randomBytes(32).toString('hex');

    // Save the new user
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        verificationToken,
        isVerified: false, // Save user as unverified
      },
    });

    // Create the verification link
    const verificationUrl = `${process.env.NEXTAUTH_URL}/verify-email?token=${verificationToken}`;

    console.log("📩 Verification link:", verificationUrl);

    // Send an email to the user
    await sendEmail({
      to: email,
      subject: 'Verify Your Account',
      text: `Hello ${name},\n\nPlease click the following link to verify your account:\n\n${verificationUrl}`,
    });

    return NextResponse.json({ message: 'Registration successful! Please verify your email.' });

  } catch (error) {
    console.error("❌ Registration error:", error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
