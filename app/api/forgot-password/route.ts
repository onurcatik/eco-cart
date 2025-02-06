import { prisma } from '@/db/prisma';
import { sendEmail } from '@/lib/mail';
import { randomBytes } from 'crypto';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    console.log("📩 Şifre sıfırlama isteği alındı:", email);

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ message: 'E-posta adresi bulunamadı' }, { status: 400 });
    }

    const resetToken = randomBytes(32).toString('hex');
    const resetTokenExpires = new Date(Date.now() + 3600000); // 1 saat geçerli

    await prisma.user.update({
      where: { email },
      data: {
        passwordResetToken: resetToken,
        passwordResetExpires: resetTokenExpires,
      },
    });

    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`;

    console.log("🔗 Şifre sıfırlama bağlantısı:", resetUrl);

    await sendEmail({
      to: email,
      subject: 'Şifre Sıfırlama Talebi',
      text: `Şifrenizi sıfırlamak için aşağıdaki bağlantıya tıklayın:\n\n${resetUrl}`,
    });

    return NextResponse.json({ message: 'Şifre sıfırlama bağlantısı gönderildi' });
  } catch (error) {
    console.error("❌ Hata oluştu:", error);
    return NextResponse.json({ message: 'Sunucu hatası' }, { status: 500 });
  }
}
