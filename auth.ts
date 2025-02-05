// import NextAuth, { NextAuthConfig, User } from 'next-auth';
// import { PrismaAdapter } from '@auth/prisma-adapter';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import { prisma } from './db/prisma'; // Import your Prisma instance
// import { AdapterUser } from 'next-auth/adapters';
// import { JWT } from 'next-auth/jwt';
// import { compareSync } from 'bcrypt-ts-edge';
// import { NextResponse } from 'next/server';
// import { cookies } from 'next/headers';

// // Extend User and AdapterUser types to include role property
// declare module 'next-auth' {
//   interface User {
//     role?: string;
//   }
// }

// declare module 'next-auth/adapters' {
//   interface AdapterUser {
//     role?: string;
//   }
// }

// export const config: NextAuthConfig = {
//   // Pages configuration
//   pages: {
//     signIn: '/sign-in', // Custom sign-in page
//     error: '/sign-in',  // Custom error page
//   },

//   // Session configuration
//   session: {
//     strategy: 'jwt',    // Use JSON Web Tokens for session management
//     maxAge: 30 * 24 * 60 * 60, // Session expiration (30 days in seconds)
//   },

//   // Trust host configuration
//   trustHost: true, // Trust the host in both development and production

//   // Prisma adapter
//   adapter: PrismaAdapter(prisma),

//   // Providers configuration
//   providers: [
//     CredentialsProvider({
//       credentials: {
//         email: { type: 'email' },
//         password: { type: 'password' },
//       },
//       async authorize(credentials) {
//         if (!credentials) return null;

//         const user = await prisma.user.findFirst({
//           where: { email: credentials.email as string },
//         });

//         if (user && user.password) {
//           const isMatch = compareSync(credentials.password as string, user.password);

//           if (isMatch) {
//             return {
//               id: user.id,
//               name: user.name,
//               email: user.email,
//               role: user.role,
//             };
//           }
//         }
//         return null;
//       },
//     }),
//   ],

//   // Callbacks configuration
//   callbacks: {
//     async session({ session, token }: { session: any, token: any }) {
//       session.user = {
//         id: token.id,
//         role: token.role,
//         name: token.name,
//       };
//       return session;
//     },

//     async jwt({ token, user, trigger, session }: { token: JWT, user: User | AdapterUser, trigger?: "update" | "signIn" | "signUp", session?: any }) {
//       if (user) {
//         token.id = user.id;
//         token.role = user.role;

//         if (user.name === 'NO_NAME') {
//           token.name = user.email!.split('@')[0];

//           await prisma.user.update({
//             where: { id: user.id },
//             data: { name: token.name },
//           });
//         }

//         if (trigger === 'signIn' || trigger === 'signUp') {
//           const cookiesObject = await cookies();
//           const sessionCartId = cookiesObject.get('sessionCartId')?.value;

//           if (sessionCartId) {
//             const sessionCart = await prisma.cart.findFirst({
//               where: { sessionCartId },
//             });

//             if (sessionCart) {
//               await prisma.cart.deleteMany({
//                 where: { userId: user.id },
//               });

//               await prisma.cart.update({
//                 where: { id: sessionCart.id },
//                 data: { userId: user.id },
//               });
//             }
//           }
//         }
//       }

//       if (session?.user.name && trigger === 'update') {
//         token.name = session.user.name;
//       }

//       return token;
//     },

//     authorized({ request, auth }) {
//       const protectedPaths = [
//         /\/shipping-address/,
//         /\/payment-method/,
//         /\/place-order/,
//         /\/profile/,
//         /\/user\/(.*)/,
//         /\/order\/(.*)/,
//         /\/admin/,
//       ];

//       const { pathname } = request.nextUrl;

//       if (!auth && protectedPaths.some((p) => p.test(pathname))) return false;

//       if (!request.cookies.get('sessionCartId')) {
//         const sessionCartId = crypto.randomUUID();

//         const newRequestHeaders = new Headers(request.headers);

//         const response = NextResponse.next({
//           request: {
//             headers: newRequestHeaders,
//           },
//         });

//         response.cookies.set('sessionCartId', sessionCartId);

//         return response;
//       } else {
//         return true;
//       }
//     },
//   },
// };

// export const { handlers, auth, signIn, signOut } = NextAuth(config);


import NextAuth, { NextAuthConfig, User } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from './db/prisma'; // Import your Prisma instance
import { AdapterUser } from 'next-auth/adapters';
import { JWT } from 'next-auth/jwt';
import { compareSync } from 'bcrypt-ts-edge';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Extend User and AdapterUser types to include role property
declare module 'next-auth' {
  interface User {
    role?: string;
    email?: string | null; // **✅ Email alanını zorunlu hale getiriyoruz**
  }
}

declare module 'next-auth/adapters' {
  interface AdapterUser {
    role?: string;
    email: string; // **✅ Email alanını zorunlu hale getiriyoruz**
  }
}

export const config: NextAuthConfig = {
  // Pages configuration
  pages: {
    signIn: '/sign-in', // Custom sign-in page
    error: '/sign-in',  // Custom error page
  },

  // Session configuration
  session: {
    strategy: 'jwt',    // Use JSON Web Tokens for session management
    maxAge: 30 * 24 * 60 * 60, // Session expiration (30 days in seconds)
  },

  // Trust host configuration
  trustHost: true, // Trust the host in both development and production

  // Prisma adapter
  adapter: PrismaAdapter(prisma),

  // Providers configuration
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const user = await prisma.user.findFirst({
          where: { email: credentials.email as string },
        });

        if (user && user.password) {
          const isMatch = compareSync(credentials.password as string, user.password);

          if (isMatch) {
            console.log("✅ Kullanıcı bulundu, giriş başarılı:", user);
            return {
              id: user.id,
              name: user.name,
              email: user.email, // **✅ Email zorunlu olarak ekleniyor**
              role: user.role,
            };
          }
        }

        console.log("❌ Kullanıcı bulunamadı veya şifre yanlış!");
        return null;
      },
    }),
  ],

  // Callbacks configuration
  callbacks: {
    async session({ session, token }: { session: any, token: any }) {
      console.log("🔄 Session Callback Çalışıyor...");
      session.user = {
        id: token.id,
        role: token.role,
        name: token.name,
        email: token.email, // **✅ Email ekleniyor**
      };
      console.log("✅ Güncellenmiş Session:", session);
      return session;
    },

    async jwt({ token, user, trigger, session }: { token: JWT, user: User | AdapterUser, trigger?: "update" | "signIn" | "signUp", session?: any }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.email = user.email; // **✅ Email ekleniyor**

        if (user.name === 'NO_NAME') {
          token.name = user.email!.split('@')[0];

          await prisma.user.update({
            where: { id: user.id },
            data: { name: token.name },
          });
        }

        if (trigger === 'signIn' || trigger === 'signUp') {
          const cookiesObject = await cookies();
          const sessionCartId = cookiesObject.get('sessionCartId')?.value;

          if (sessionCartId) {
            const sessionCart = await prisma.cart.findFirst({
              where: { sessionCartId },
            });

            if (sessionCart) {
              await prisma.cart.deleteMany({
                where: { userId: user.id },
              });

              await prisma.cart.update({
                where: { id: sessionCart.id },
                data: { userId: user.id },
              });
            }
          }
        }
      }

      if (session?.user.name && trigger === 'update') {
        token.name = session.user.name;
      }

      console.log("✅ Güncellenmiş JWT Token:", token);
      return token;
    },

    authorized({ request, auth }) {
      const protectedPaths = [
        /\/shipping-address/,
        /\/payment-method/,
        /\/place-order/,
        /\/profile/,
        /\/user\/(.*)/,
        /\/order\/(.*)/,
        /\/admin/,
      ];

      const { pathname } = request.nextUrl;

      if (!auth && protectedPaths.some((p) => p.test(pathname))) return false;

      if (!request.cookies.get('sessionCartId')) {
        const sessionCartId = crypto.randomUUID();

        const newRequestHeaders = new Headers(request.headers);

        const response = NextResponse.next({
          request: {
            headers: newRequestHeaders,
          },
        });

        response.cookies.set('sessionCartId', sessionCartId);

        return response;
      } else {
        return true;
      }
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);
