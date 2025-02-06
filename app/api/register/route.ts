import { prisma } from '@/db/prisma';
import { hashSync } from 'bcrypt-ts-edge';
import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/mail';
import { randomBytes } from 'crypto';

export async function POST(req: Request) {
  try {
    const { name, email, password} = await req.json();

    console.log("📝 Yeni kayıt isteği:", email);

    // Kullanıcının olup olmadığını kontrol et
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return NextResponse.json({ message: 'Bu e-posta zaten kayıtlı.' }, { status: 400 });
    }

    // Şifreyi hashle
    const hashedPassword = hashSync(password, 10);

    // Aktivasyon için rastgele token oluştur
    const verificationToken = randomBytes(32).toString('hex');

    // Yeni kullanıcıyı kaydet
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        verificationToken,
        isVerified: false, // Kullanıcıyı doğrulanmamış olarak kaydet
      },
    });

    // Aktivasyon bağlantısı oluştur
    const verificationUrl = `${process.env.NEXTAUTH_URL}/verify-email?token=${verificationToken}`;

    console.log("📩 Aktivasyon bağlantısı:", verificationUrl);

    // Kullanıcıya e-posta gönder
    await sendEmail({
      to: email,
      subject: 'Hesabınızı Doğrulayın',
      text: `Merhaba ${name},\n\nHesabınızı doğrulamak için aşağıdaki bağlantıya tıklayın:\n\n${verificationUrl}`,
    });

    return NextResponse.json({ message: 'Kayıt başarılı! Lütfen e-postanızı doğrulayın.' });

  } catch (error) {
    console.error("❌ Kayıt hatası:", error);
    return NextResponse.json({ message: 'Sunucu hatası' }, { status: 500 });
  }
}
