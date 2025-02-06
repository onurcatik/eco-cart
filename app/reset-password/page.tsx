// "use client";
// import { useState } from 'react';
// import { useSearchParams } from 'next/navigation';

// export default function ResetPassword() {
//   const searchParams = useSearchParams();
//   const token = searchParams.get('token');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const res = await fetch('/api/reset-password', { // ✅ DOĞRU API ROUTE
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ token, password }),
//     });

//     const data = await res.json();
//     setMessage(data.message);
//   };

//   return (
//     <div>
//       <h2>Şifre Sıfırla</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="password"
//           placeholder="Yeni Şifre"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Şifreyi Güncelle</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// }


// "use client";
// import { useState } from "react";
// import { useSearchParams } from "next/navigation";

// export default function ResetPassword() {
//   const searchParams = useSearchParams();
//   const token = searchParams.get("token");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const res = await fetch("/api/reset-password", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ token, password }),
//     });

//     const data = await res.json();
//     setMessage(data.message);
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-md w-96">
//         <h2 className="text-2xl font-semibold text-center mb-6">Şifre Sıfırla</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-gray-700">Yeni Şifre</label>
//             <input
//               type="password"
//               placeholder="Yeni Şifre"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-200"
//           >
//             Şifreyi Güncelle
//           </button>
//         </form>
//         {message && (
//           <p className="mt-4 text-center text-green-600 font-medium">{message}</p>
//         )}
//       </div>
//     </div>
//   );
// }


"use client";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const router = useRouter(); // ✅ Using useRouter
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    const data = await res.json();
    setMessage(data.message);

    // ✅ Redirect upon successful password reset
    if (res.ok) {
      setTimeout(() => {
        router.push("/"); // Redirect to home page
      }, 2000); // Redirect after 2 seconds
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">Reset Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">New Password</label>
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-200"
          >
            Update Password
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-green-600 font-medium">{message}</p>
        )}
      </div>
    </div>
  );
}
