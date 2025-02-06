// 'use server';

// import { signInFormSchema, signUpFormSchema, shippingAddressSchema, paymentMethodSchema, updateUserSchema } from '../validators';
// import { auth, signIn, signOut } from '@/auth';
// import { hashSync, compareSync } from 'bcrypt-ts-edge';
// // Replace with the correct function if available
// import { formatError } from '@/lib/utils';
// import { prisma } from "@/db/prisma";
// import { z } from 'zod';
// import { ShippingAddress } from '@/types';
// import { PAGE_SIZE } from '../constants';
// import { Prisma } from '@prisma/client';
// import { revalidatePath } from 'next/cache';
// import { isRedirectError } from 'next/dist/client/components/redirect';
// import { randomBytes } from 'crypto';
// import { sendEmail } from '../mail';

// // Sign in the user with credentials
// export async function signInWithCredentials(
//   prevState: unknown,
//   formData: FormData
// ) {
//   try {
//     const user = signInFormSchema.parse({
//       email: formData.get('email') as string,
//       password: formData.get('password') as string,
//     });

//     // Kullanıcıyı veritabanında bul
//     const existingUser = await prisma.user.findUnique({
//       where: { email: user.email },
//     });

//     console.log("🔍 Kullanıcı bulundu:", existingUser);

//     if (!existingUser) {
//       return { success: false, message: 'Invalid email or password' };
//     }

//     // **HESAP DOĞRULAMASI KONTROLÜ**
//     if (!existingUser.isVerified) {
//       console.log("⛔ Kullanıcı doğrulanmamış, giriş reddedildi.");
//       return {
//         success: false,
//         message: 'Hesabınızı doğrulamanız gerekiyor. Lütfen e-postanızı kontrol edin.',
//       };
//     }

//     console.log("✅ Kullanıcı doğrulandı, giriş yapılıyor...");

//     // Kullanıcı doğrulanmışsa giriş yap
//     await signIn('credentials', user);

//     return { success: true, message: 'Signed in successfully' };
//   } catch (error) {
//     console.error("❌ Giriş hatası:", error);

//     if (isRedirectError(error)) {
//       throw error;
//     }

//     return { success: false, message: 'Invalid email or password' };
//   }
// }
// export async function signOutUser(){
//   await signOut();
// }

// export async function signUpUser(prevState: unknown, formData: FormData) {
//   try {
//     // Form verisini doğruluyoruz
//     const user = signUpFormSchema.parse({
//       name: formData.get('name') as string,
//       email: formData.get('email') as string,
//       password: formData.get('password') as string,
//       confirmPassword: formData.get('confirmPassword') as string,
//     });

//     const plainPassword = user.password;
//     user.password = hashSync(user.password, 10); // Şifreyi hashliyoruz

//     // Aynı email'e sahip kullanıcı var mı kontrolü
//     const existingUser = await prisma.user.findUnique({
//       where: { email: user.email },
//     });

//     if (existingUser) {
//       return {
//         success: false,
//         message: 'Bu e-posta zaten kayıtlı. Lütfen farklı bir e-posta kullanın.',
//       };
//     }

//     // Aktivasyon için rastgele token oluştur
//     const verificationToken = randomBytes(32).toString('hex');

//     // Kullanıcıyı oluşturuyoruz
//     const newUser = await prisma.user.create({
//       data: {
//         name: user.name,
//         email: user.email,
//         password: user.password,
//         verificationToken, // ✅ Aktivasyon için token ekledik
//         isVerified: false,  // ✅ Kullanıcı başlangıçta doğrulanmamış olacak
//       },
//     });

//     // Aktivasyon bağlantısı oluştur
//     const verificationUrl = `${process.env.NEXTAUTH_URL}/verify-email?token=${verificationToken}`;

//     console.log("📩 Aktivasyon bağlantısı:", verificationUrl);

//     // Kullanıcıya e-posta gönder
//     await sendEmail({
//       to: user.email,
//       subject: 'Hesabınızı Doğrulayın',
//       text: `Merhaba ${user.name},\n\nHesabınızı doğrulamak için aşağıdaki bağlantıya tıklayın:\n\n${verificationUrl}`,
//     });

//     return { success: true, message: 'Kayıt başarılı! Lütfen e-postanızı doğrulayın.' };
//   } catch (error) {
//     if (isRedirectError(error)) {
//       throw error;
//     }
//     if (error instanceof z.ZodError) {
//       return { success: false, message: error.errors.map((err) => err.message).join(', ') };
//     }
//     return { success: false, message: 'Internal server error' };
//   }
// }

// export async function getUserById(userId: string) {
//   const user = await prisma.user.findFirst({
//     where: { id: userId },
//   });
//   if (!user) throw new Error('User not found');
//   return user;
// }



// export async function updateUserAddress(data: ShippingAddress) {
//   try {
//     const session = await auth();

//     const currentUser = await prisma.user.findFirst({
//       where: { id: session?.user?.id },
//     });

//     if (!currentUser) throw new Error('User not found');

//     const address = shippingAddressSchema.parse(data);

//     await prisma.user.update({
//       where: { id: currentUser.id },
//       data: { address },
//     });

//     return {
//       success: true,
//       message: 'User updated successfully',
//     };
//   } catch (error) {
//     return { success: false, message: formatError(error) };
//   }
// }

// export async function updateUserPaymentMethod(
//   data: z.infer<typeof paymentMethodSchema>
// ) {
//   try {
//     const session = await auth();
//     const currentUser = await prisma.user.findFirst({
//       where: { id: session?.user?.id },
//     });

//     if (!currentUser) throw new Error('User not found');

//     const paymentMethod = paymentMethodSchema.parse(data);

//     await prisma.user.update({
//       where: { id: currentUser.id },
//       data: { paymentMethod: paymentMethod.type },
//     });

//     return {
//       success: true,
//       message: 'User updated successfully',
//     };
//   } catch (error) {
//     return { success: false, message: formatError(error) };
//   }
// }

// // Update the user profile
// // export async function updateProfile(user: { name: string; email: string }) {
// //   try {
// //     const session = await auth();

// //     const currentUser = await prisma.user.findFirst({
// //       where: {
// //         id: session?.user?.id,
// //       },
// //     });

// //     if (!currentUser) throw new Error('User not found');

// //     await prisma.user.update({
// //       where: {
// //         id: currentUser.id,
// //       },
// //       data: {
// //         name: user.name,
// //         email: user.email, // Email güncellemesi eklendi
// //       },
// //     });

// //     return {
// //       success: true,
// //       message: 'User updated successfully',
// //     };
// //   } catch (error) {
// //     return { success: false, message: formatError(error) };
// //   }
// // }

// export async function updateProfile(user: { 
//   name: string; 
//   email: string; 
//   currentPassword?: string; 
//   newPassword?: string; 
// }) {
//   try {
//     const session = await auth();

//     // Oturum bilgisi alınamadıysa hata döndür
//     if (!session?.user?.id) {
//       throw new Error("Unauthorized");
//     }

//     // Mevcut kullanıcıyı bul
//     const currentUser = await prisma.user.findUnique({
//       where: { id: session.user.id },
//     });

//     if (!currentUser) throw new Error("User not found");

//     const updates: { name?: string; email?: string; password?: string } = {
//       name: user.name,
//       email: user.email, 
//     };

//     // Eğer yeni şifre girildiyse mevcut şifre doğrulanmalı
//     if (user.currentPassword && user.newPassword) {
//       if (!currentUser.password) {
//         throw new Error("User password is missing");
//       }
//       const isMatch = compareSync(user.currentPassword, currentUser.password);
//       if (!isMatch) {
//         throw new Error("Mevcut şifre hatalı");
//       }

//       // Yeni şifreyi hashle
//       updates.password = await hashSync(user.newPassword, 10);
//     }

//     // Kullanıcıyı güncelle
//     await prisma.user.update({
//       where: { id: currentUser.id },
//       data: updates,
//     });

//     return {
//       success: true,
//       message: "Kullanıcı bilgileri başarıyla güncellendi",
//     };
//   } catch (error) {
//     return { success: false, message: formatError(error) };
//   }
// }



// // Get all the users
// export async function getAllUsers({
//   limit = PAGE_SIZE,
//   page,
//   query,
// }: {
//   limit?: number;
//   page: number;
//   query: string;
// }) {
//   const queryFilter: Prisma.UserWhereInput =
//     query && query !== 'all'
//       ? {
//           name: {
//             contains: query,
//             mode: 'insensitive',
//           } as Prisma.StringFilter,
//         }
//       : {};

//   const data = await prisma.user.findMany({
//     where: {
//       ...queryFilter,
//     },
//     orderBy: { createdAt: 'desc' },
//     take: limit,
//     skip: (page - 1) * limit,
//   });

//   const dataCount = await prisma.user.count();

//   return {
//     data,
//     totalPages: Math.ceil(dataCount / limit),
//   };
// }

// // Delete a user
// export async function deleteUser(id: string) {
//   try {
//     await prisma.user.delete({ where: { id } });

//     revalidatePath('/admin/users');

//     return {
//       success: true,
//       message: 'User deleted successfully',
//     };
//   } catch (error) {
//     return {
//       success: false,
//       message: formatError(error),
//     };
//   }
// }

// // Update a user
// export async function updateUser(user: z.infer<typeof updateUserSchema>) {
//   try {
//     await prisma.user.update({
//       where: { id: user.id },
//       data: {
//         name: user.name,
//         role: user.role,
//       },
//     });

//     revalidatePath('/admin/users');

//     return {
//       success: true,
//       message: 'User updated successfully',
//     };
//   } catch (error) {
//     return { success: false, message: formatError(error) };
//   }
// }


'use server';

import { signInFormSchema, signUpFormSchema, shippingAddressSchema, paymentMethodSchema, updateUserSchema } from '../validators';
import { auth, signIn, signOut } from '@/auth';
import { hashSync, compareSync } from 'bcrypt-ts-edge';
// Replace with the correct function if available
import { formatError } from '@/lib/utils';
import { prisma } from "@/db/prisma";
import { z } from 'zod';
import { ShippingAddress } from '@/types';
import { PAGE_SIZE } from '../constants';
import { Prisma } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { isRedirectError } from 'next/dist/client/components/redirect';
import { randomBytes } from 'crypto';
import { sendEmail } from '../mail';

// Sign in the user with credentials
export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData
) {
  try {
    const user = signInFormSchema.parse({
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    });

    // Kullanıcıyı veritabanında bul
    const existingUser = await prisma.user.findUnique({
      where: { email: user.email },
    });

    console.log("🔍 User found:", existingUser);

    if (!existingUser) {
      return { success: false, message: 'Invalid email or password' };
    }

    // **HESAP DOĞRULAMASI KONTROLÜ**
    if (!existingUser.isVerified) {
      console.log("⛔ User not verified, login denied.");
      return {
        success: false,
        message: 'You need to verify your account. Please check your email.',
      };
    }

    console.log("✅ User verified, logging in...");

    // Kullanıcı doğrulanmışsa giriş yap
    await signIn('credentials', user);

    return { success: true, message: 'Signed in successfully' };
  } catch (error) {
    console.error("❌ Input error", error);

    if (isRedirectError(error)) {
      throw error;
    }

    return { success: false, message: 'Invalid email or password' };
  }
}
export async function signOutUser(){
  await signOut();
}

export async function signUpUser(prevState: unknown, formData: FormData) {
  try {
    // Form verisini doğruluyoruz
    const user = signUpFormSchema.parse({
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
    });

    user.password = hashSync(user.password, 10); // Şifreyi hashliyoruz

    // Aynı email'e sahip kullanıcı var mı kontrolü
    const existingUser = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (existingUser) {
      return {
        success: false,
        message: 'This e-mail is already registered. Please use a different e-mail.',
      };
    }

    // Aktivasyon için rastgele token oluştur
    const verificationToken = randomBytes(32).toString('hex');

    // Kullanıcıyı oluşturuyoruz
    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
        verificationToken, // ✅ Aktivasyon için token ekledik
        isVerified: false,  // ✅ Kullanıcı başlangıçta doğrulanmamış olacak
      },
    });

    // Aktivasyon bağlantısı oluştur
    const verificationUrl = `${process.env.NEXTAUTH_URL}/verify-email?token=${verificationToken}`;

    console.log("📩 Activation link:", verificationUrl);

    // Kullanıcıya e-posta gönder
    await sendEmail({
      to: user.email,
      subject: 'Activation link:',
      text: `Hello ${user.name},\n\nClick on the following link to verify your account:\n\n${verificationUrl}`,
    });

    return { success: true, message: 'Registration successful! Please verify your e-mail.' };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    if (error instanceof z.ZodError) {
      return { success: false, message: error.errors.map((err) => err.message).join(', ') };
    }
    return { success: false, message: 'Internal server error' };
  }
}

export async function getUserById(userId: string) {
  const user = await prisma.user.findFirst({
    where: { id: userId },
  });
  if (!user) throw new Error('User not found');
  return user;
}



export async function updateUserAddress(data: ShippingAddress) {
  try {
    const session = await auth();

    const currentUser = await prisma.user.findFirst({
      where: { id: session?.user?.id },
    });

    if (!currentUser) throw new Error('User not found');

    const address = shippingAddressSchema.parse(data);

    await prisma.user.update({
      where: { id: currentUser.id },
      data: { address },
    });

    return {
      success: true,
      message: 'User updated successfully',
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

export async function updateUserPaymentMethod(
  data: z.infer<typeof paymentMethodSchema>
) {
  try {
    const session = await auth();
    const currentUser = await prisma.user.findFirst({
      where: { id: session?.user?.id },
    });

    if (!currentUser) throw new Error('User not found');

    const paymentMethod = paymentMethodSchema.parse(data);

    await prisma.user.update({
      where: { id: currentUser.id },
      data: { paymentMethod: paymentMethod.type },
    });

    return {
      success: true,
      message: 'User updated successfully',
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// Update the user profile
// export async function updateProfile(user: { name: string; email: string }) {
//   try {
//     const session = await auth();

//     const currentUser = await prisma.user.findFirst({
//       where: {
//         id: session?.user?.id,
//       },
//     });

//     if (!currentUser) throw new Error('User not found');

//     await prisma.user.update({
//       where: {
//         id: currentUser.id,
//       },
//       data: {
//         name: user.name,
//         email: user.email, // Email güncellemesi eklendi
//       },
//     });

//     return {
//       success: true,
//       message: 'User updated successfully',
//     };
//   } catch (error) {
//     return { success: false, message: formatError(error) };
//   }
// }

export async function updateProfile(user: { 
  name: string; 
  email: string; 
  currentPassword?: string; 
  newPassword?: string; 
}) {
  try {
    const session = await auth();

    // Oturum bilgisi alınamadıysa hata döndür
    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    // Mevcut kullanıcıyı bul
    const currentUser = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!currentUser) throw new Error("User not found");

    const updates: { name?: string; email?: string; password?: string } = {
      name: user.name,
      email: user.email, 
    };

    // Eğer yeni şifre girildiyse mevcut şifre doğrulanmalı
    if (user.currentPassword && user.newPassword) {
      if (!currentUser.password) {
        throw new Error("User password is missing");
      }
      const isMatch = compareSync(user.currentPassword, currentUser.password);
      if (!isMatch) {
        throw new Error("Mevcut şifre hatalı");
      }

      // Yeni şifreyi hashle
      updates.password = await hashSync(user.newPassword, 10);
    }

    // Kullanıcıyı güncelle
    await prisma.user.update({
      where: { id: currentUser.id },
      data: updates,
    });

    return {
      success: true,
      message: "User information has been successfully updated",
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}



// Get all the users
export async function getAllUsers({
  limit = PAGE_SIZE,
  page,
  query,
}: {
  limit?: number;
  page: number;
  query: string;
}) {
  const queryFilter: Prisma.UserWhereInput =
    query && query !== 'all'
      ? {
          name: {
            contains: query,
            mode: 'insensitive',
          } as Prisma.StringFilter,
        }
      : {};

  const data = await prisma.user.findMany({
    where: {
      ...queryFilter,
    },
    orderBy: { createdAt: 'desc' },
    take: limit,
    skip: (page - 1) * limit,
  });

  const dataCount = await prisma.user.count();

  return {
    data,
    totalPages: Math.ceil(dataCount / limit),
  };
}

// Delete a user
export async function deleteUser(id: string) {
  try {
    await prisma.user.delete({ where: { id } });

    revalidatePath('/admin/users');

    return {
      success: true,
      message: 'User deleted successfully',
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

// Update a user
export async function updateUser(user: z.infer<typeof updateUserSchema>) {
  try {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        name: user.name,
        role: user.role,
      },
    });

    revalidatePath('/admin/users');

    return {
      success: true,
      message: 'User updated successfully',
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
