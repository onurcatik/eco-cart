"use client";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [message, setMessage] = useState("Hesabınız doğrulanıyor...");

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setMessage("Doğrulama tokeni eksik.");
        return;
      }

      console.log("📩 Doğrulama token'i alındı:", token);

      const res = await fetch(`/api/verify-email?token=${token}`);

      if (res.ok) {
        setMessage("Hesabınız başarıyla doğrulandı! Giriş yapabilirsiniz.");
      } else {
        const errorData = await res.json();
        console.log("❌ API Hatası:", errorData);
        setMessage(errorData.message || "Doğrulama başarısız oldu. Token süresi dolmuş olabilir.");
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <h2 className="text-xl font-semibold">{message}</h2>
    </div>
  );
}
