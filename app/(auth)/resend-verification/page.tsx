// 'use client';

// import { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';

// const ResendVerificationPage = () => {
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');

//   const handleResendVerification = async () => {
//     if (!email) {
//       setMessage('Lütfen e-posta adresinizi girin.');
//       return;
//     }

//     try {
//       const response = await fetch('/api/resend-verification', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email }),
//       });

//       const result = await response.json();
//       setMessage(result.message);
//     } catch (error) {
//       console.error('Doğrulama hatası:', error);
//       setMessage('Bir hata oluştu, lütfen tekrar deneyin.');
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-6 rounded-lg shadow-md w-96">
//         <h2 className="text-xl font-bold mb-4">E-posta Doğrulamasını Yeniden Gönder</h2>
        
//         <Label htmlFor="email">E-posta Adresiniz</Label>
//         <Input
//           id="email"
//           type="email"
//           placeholder="E-posta adresinizi girin"
//           className="border border-gray-300 rounded-md py-2 px-3 mt-3 w-full"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
        
//         <Button onClick={handleResendVerification} className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md">
//           Doğrulama E-postasını Gönder
//         </Button>

//         {message && <p className="text-red-500 mt-3">{message}</p>}
//       </div>
//     </div>
//   );
// };

// export default ResendVerificationPage;


'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ResendVerificationPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleResendVerification = async () => {
    if (!email) {
      setMessage('Lütfen e-posta adresinizi girin.');
      return;
    }

    try {
      const response = await fetch('/api/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();
      setMessage(result.message);
    } catch (error) {
      console.error('Doğrulama hatası:', error);
      setMessage('Bir hata oluştu, lütfen tekrar deneyin.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">E-posta Doğrulamasını Yeniden Gönder</h2>
        
        <Label htmlFor="email">E-posta Adresiniz</Label>
        <Input
          id="email"
          type="email"
          placeholder="E-posta adresinizi girin"
          className="border border-gray-300 rounded-md py-2 px-3 mt-3 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <Button onClick={handleResendVerification} className="mt-4 w-full bg-red-500 text-white py-2 rounded-md">
          Doğrulama E-postasını Gönder
        </Button>

        {message && <p className="text-red-500 mt-3">{message}</p>}
      </div>
    </div>
  );
};

export default ResendVerificationPage;
