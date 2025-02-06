"use client";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [message, setMessage] = useState("Verifying your account...");

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setMessage("Verification token is missing.");
        return;
      }

      console.log("📩 Verification token received:", token);

      const res = await fetch(`/api/verify-email?token=${token}`);

      if (res.ok) {
        setMessage("Your account has been successfully verified! You may now log in.");
      } else {
        const errorData = await res.json();
        console.log("❌ API Error:", errorData);
        setMessage(errorData.message || "Verification failed. The token might have expired.");
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
