import { prisma } from '@/db/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');

    console.log("🔍 Verification request received. Token:", token);

    if (!token) {
      return NextResponse.json({ message: 'Token is missing.' }, { status: 400 });
    }

    // Find the user by verification token
    const user = await prisma.user.findFirst({
      where: { verificationToken: token },
    });

    if (!user) {
      return NextResponse.json({ message: 'Invalid or expired verification link.' }, { status: 400 });
    }

    console.log("✅ User found:", user.email);

    // Verify the user and remove the token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        verificationToken: null,
      },
    });

    console.log("✅ User verified:", user.email);

    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/sign-in?verified=true`);

  } catch (error) {
    console.error("❌ User verification error:", error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
