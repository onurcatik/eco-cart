import { prisma } from '@/db/prisma';
import { hashSync } from 'bcrypt-ts-edge';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { token, password } = await req.json();

  console.log("🔍 Received password reset request. Token:", token);

  const user = await prisma.user.findFirst({
    where: {
      passwordResetToken: token,
      passwordResetExpires: { gt: new Date() }, // Token must not be expired
    },
  });

  if (!user) {
    return NextResponse.json({ message: 'Invalid or expired token' }, { status: 400 });
  }

  const hashedPassword = hashSync(password, 10);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      passwordResetToken: null,
      passwordResetExpires: null,
    },
  });

  return NextResponse.json({ message: 'Password updated successfully' });
}
