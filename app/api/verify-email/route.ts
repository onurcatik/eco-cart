import { prisma } from '@/db/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');

    console.log("🔍 Doğrulama isteği alındı. Token:", token);

    if (!token) {
      return NextResponse.json({ message: 'Token eksik.' }, { status: 400 });
    }

    // Kullanıcıyı doğrulama token'i ile bul
    const user = await prisma.user.findFirst({
      where: { verificationToken: token },
    });

    if (!user) {
      return NextResponse.json({ message: 'Geçersiz veya süresi dolmuş doğrulama bağlantısı.' }, { status: 400 });
    }

    console.log("✅ Kullanıcı bulundu:", user.email);

    // Kullanıcıyı doğrula ve token’i kaldır
    await prisma.user.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        verificationToken: null,
      },
    });

    console.log("✅ Kullanıcı doğrulandı:", user.email);

    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/sign-in?verified=true`);

  } catch (error) {
    console.error("❌ Kullanıcı doğrulama hatası:", error);
    return NextResponse.json({ message: 'Sunucu hatası' }, { status: 500 });
  }
}
