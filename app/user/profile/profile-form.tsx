// "use client";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { useToast } from "@/hooks/use-toast";
// import { updateProfile } from "@/lib/actions/user.action";
// import { updateProfileSchema } from "@/lib/validators";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useSession } from "next-auth/react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";

// const ProfileForm = () => {
//   const { data: session, update } = useSession();

//   const form = useForm<z.infer<typeof updateProfileSchema>>({
//     resolver: zodResolver(updateProfileSchema),
//     defaultValues: {
//       name: session?.user?.name ?? "",
//       email: session?.user?.email ?? "",
//     },
//   });

//   const { toast } = useToast();

//   const onSubmit = async (values: z.infer<typeof updateProfileSchema>) => {
//     const res = await updateProfile(values);

//     if (!res.success) {
//       return toast({
//         variant: "destructive",
//         description: res.message,
//       });
//     }

//     const newSession = {
//       ...session,
//       user: {
//         ...session?.user,
//         name: values.name,
//       },
//     };

//     await update(newSession);

//     toast({
//       description: res.message,
//     });
//   };

//   return (
//     <Form {...form}>
//       <form
//         className="flex flex-col gap-5"
//         onSubmit={form.handleSubmit(onSubmit)}
//       >
//         <div className="flex flex-col gap-5">
//           <FormField
//             control={form.control}
//             name="email"
//             render={({ field }) => (
//               <FormItem className="w-full">
//                 <FormControl>
//                   <Input
//                     placeholder="Email"
//                     className="input-field"
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="name"
//             render={({ field }) => (
//               <FormItem className="w-full">
//                 <FormControl>
//                   <Input
//                     placeholder="Name"
//                     className="input-field"
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>
//         <Button
//           type="submit"
//           size="lg"
//           className="button col-span-2 w-full"
//           disabled={form.formState.isSubmitting}
//         >
//           {form.formState.isSubmitting ? "Submitting..." : "Update Profile"}
//         </Button>
//       </form>
//     </Form>
//   );
// };

// export default ProfileForm;


"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { updateProfile } from "@/lib/actions/user.action";
import { updateProfileSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";

const extendedProfileSchema = updateProfileSchema.extend({
  email: z.string().email("Geçerli bir email adresi giriniz"),
  currentPassword: z.string().min(6, "Mevcut şifre en az 6 karakter olmalıdır"),
  newPassword: z
    .string()
    .min(6, "Yeni şifre en az 6 karakter olmalıdır")
    .optional(),
});

const ProfileForm = () => {
  const { data: session, update } = useSession();

  console.log("📌 Session Data:", session);
  console.log("📌 User Data:", session?.user);
  console.log("📌 Email from Session:", session?.user?.email);

  const form = useForm<z.infer<typeof extendedProfileSchema>>({
    resolver: zodResolver(extendedProfileSchema),
    defaultValues: {
      name: session?.user?.name ?? "",
      currentPassword: "",
      newPassword: "",
    },
  });

  const { toast } = useToast();

  const onSubmit = async (values: z.infer<typeof extendedProfileSchema>) => {
    console.log("✅ Submitting Form with Values:", values);

    const res = await updateProfile({
      name: values.name,
      email: values.email,
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
    });

    console.log("🔄 Update Profile Response:", res);

    if (!res.success) {
      console.log("❌ Update Failed:", res.message);
      return toast({
        variant: "destructive",
        description: res.message,
      });
    }

    const newSession = {
      ...session,
      user: {
        ...session?.user,
        name: values.name,
        email: values.email,
      },
    };

    console.log("🔄 Updating Session with:", newSession);
    await update(newSession);

    toast({
      description: "Profile Updated!",
    });
  };

  useEffect(() => {
    if (session?.user?.email) {
      console.log("✅ Setting Email in Form:", session.user.email);
      form.setValue("email", session.user.email);
    } else {
      console.log("⚠️ session?.user.email is undefined");
    }
  }, [session?.user?.email, form]);

  console.log("📌 Current Form Values:", form.getValues());

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-5">
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Email"
                    className="input-field"
                    {...field} // field değerlerini inputa bağlar
                    onChange={(e) => field.onChange(e.target.value)} // Kullanıcı değişiklik yapabilsin
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Name"
                    className="input-field"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Mevcut Şifre Alanı */}
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Current Password"
                    className="input-field"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Yeni Şifre Alanı */}
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    type="password"
                    placeholder="New Password"
                    className="input-field"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <Button
          type="submit"
          size="lg"
          className="button col-span-2 w-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Updating..." : "Profile Updated"}
        </Button>
      </form>
    </Form>
  );
};

export default ProfileForm;
