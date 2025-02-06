import { prisma } from '@/db/prisma';
import { sendEmail } from '@/lib/mail';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ message: 'E-posta adresi gereklidir.' }, { status: 400 });
    }

    // Kullanıcıyı bul
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Eğer kullanıcı bulunamazsa
    if (!user) {
      return NextResponse.json({ message: 'Bu e-posta ile kayıtlı bir hesap bulunamadı.' }, { status: 404 });
    }

    // Eğer kullanıcı zaten doğrulanmışsa
    if (user.isVerified) {
      return NextResponse.json({
        message: 'Bu hesap zaten doğrulandı. Tekrar doğrulama gerekmez.',
      }, { status: 400 });
    }

    // Yeni doğrulama token oluştur
    const verificationToken = crypto.randomUUID();

    // Kullanıcının doğrulama token'ını güncelle
    await prisma.user.update({
      where: { email },
      data: { verificationToken },
    });

    // Yeni doğrulama bağlantısını oluştur
    const verificationUrlNew = `${process.env.NEXTAUTH_URL}/verify-email?token=${verificationToken}`;

    console.log("📩 Yeni Aktivasyon bağlantısı:", verificationUrlNew);

    // Kullanıcıya e-posta gönder
    await sendEmail({
      to: email,
      subject: 'Hesabınızı Yeniden Doğrulayın',
      text: `Hesabınızı doğrulamak için aşağıdaki bağlantıya tıklayın:\n\n${verificationUrlNew}`,
    });

    return NextResponse.json({
      message: 'Doğrulama e-postası yeniden gönderildi. Lütfen e-postanızı kontrol edin.',
    });

  } catch (error) {
    console.error('❌ Doğrulama e-postası gönderme hatası:', error);
    return NextResponse.json({ message: 'Bir hata oluştu, lütfen tekrar deneyin.' }, { status: 500 });
  }
}
