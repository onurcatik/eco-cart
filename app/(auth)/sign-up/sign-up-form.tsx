// 'use client';

// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import Link from 'next/link';
// import { useActionState } from 'react';
// import { useFormStatus } from 'react-dom';
// import { signUpUser } from '@/lib/actions/user.action';
// import { useSearchParams } from 'next/navigation';
// import { signUpDefaultValues } from '@/lib/constants';
// import Image from 'next/image';

// const SignUpForm = () => {
//   const [data, action] = useActionState(signUpUser, {
//     success: false,
//     message: '',
//   });

//   const searchParams = useSearchParams();
//   const callbackUrl = searchParams.get('callbackUrl') || '/';

//   const SignUpButton = () => {
//     const { pending } = useFormStatus();

//     return (
//       <Button
//         disabled={pending}
//         className=' bg-red-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-[300px]'
//       >
//         {pending ? 'Submitting...' : 'Sign Up'}
//       </Button>
//     );
//   };

//   return (
//     <div className='bg-white flex justify-center items-center w-full lg:h-96 '>

// <div className='absolute top-4 right-4'>
//         <Link href='/' title='Go to Home'>
//           {/* Using a custom SVG icon */}
//           <svg
//             xmlns='http://www.w3.org/2000/svg'
//             className='h-8 w-8 text-black-500 hover:text-blue-700 cursor-pointer '
//             fill='none'
//             viewBox='0 0 24 24'
//             stroke='currentColor'
//           >
//             <path
//               strokeLinecap='round'
//               strokeLinejoin='round'
//               strokeWidth={2}
//               d='M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z'
//             />
//             <path
//               strokeLinecap='round'
//               strokeLinejoin='round'
//               strokeWidth={2}
//               d='M9 22V12h6v10'
//             />
//           </svg>
//           {/* Alternatively, using react-icons:
//               <FaHome className='h-8 w-8 text-blue-500 hover:text-blue-700 cursor-pointer' />
//           */}
//         </Link>
//       </div>
//       {/* Left: Image */}
//       <div className="hidden lg:w-[1500px] lg:h-screen lg:block xl:w-[2000px] ">
//         <Image
//           src='/images/cart-2.jpg'
//           alt='Placeholder Image'
//           className='object-fill h-full w-full'
//           width={1080} // Add the intrinsic width of the image
//           height={1080} // Add the intrinsic height of the image
//           priority // Optional: Use if this image is above the fold (e.g., hero image)
//         />
//       </div>

//       {/* Right: Sign Up Form */}
//       <div className="flex justify-end lg:pl-0 md:pl-36 sm:p-48 p-8 w-full lg:w-[1500px] relative right-12 ml-8 lg:right-48 xl:right-48">
//         <h1 className='text-3xl font-semibold mb-0 relative bottom-16 left-[115px]'>Register</h1>
//         <form action={action}>
//           <input type='hidden' name='callbackUrl' value={callbackUrl} />
//           <div className='mb-4'>
//             <Label htmlFor='fullName' className='block text-gray-600 pt-12'>
//               Full Name
//             </Label>
//             <Input
//               id='name'
//               name='name'
//               type='text'
//               className=' border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 mt-3 w-[300px]'
//               autoComplete='name'
//               defaultValue={signUpDefaultValues.name}
//             />
//           </div>
//           <div className='mb-4'>
//             <Label htmlFor='email' className='block text-gray-600'>
//               Email
//             </Label>
//             <Input
//               id='email'
//               name='email'
//               type='email'
//               className=' border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 mt-3 w-[300px]'
//               autoComplete='email'
//               defaultValue={signUpDefaultValues.email}
//             />
//           </div>
//           <div className='mb-4'>
//             <Label htmlFor='password' className='block text-gray-800'>
//               Password
//             </Label>
//             <Input
//               id='password'
//               name='password'
//               type='password'
//               className=' border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 mt-3 w-[300px]'
//               autoComplete='new-password'
//               defaultValue={signUpDefaultValues.password}
//             />
//           </div>
//           <div className='mb-4'>
//             <Label htmlFor='confirmPassword' className='block text-gray-800'>
//               Confirm Password
//             </Label>
//             <Input
//               id='confirmPassword'
//               name='confirmPassword'
//               type='password'
//               className=' border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 mt-3 w-[300px]'
//               autoComplete='new-password'
//               defaultValue={signUpDefaultValues.confirmPassword}
//               required
//             />
//           </div>

//           <div>
//             <SignUpButton />
//           </div>
//           {data && !data.success && (
//             <div className='text-center text-destructive '>{data.message}</div>
//           )}
//           <div className='mt-6 text--500 text-center absolute font-bold text-blue-500'>
//             {/* Already have an account?{' '} */}
//             <Link href='/sign-in' className='hover:underline'>
//               Sign In Here
//             </Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignUpForm;


// 'use client';

// import { useEffect } from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import Link from 'next/link';
// import { useActionState } from 'react';
// import { useFormStatus } from 'react-dom';
// import { signUpUser } from '@/lib/actions/user.action';
// import { useSearchParams, useRouter } from 'next/navigation';
// import { signUpDefaultValues } from '@/lib/constants';
// import Image from 'next/image';

// const SignUpForm = () => {
//   // useRouter ile yönlendirme işlemi için router örneğini alıyoruz
//   const router = useRouter();

//   const [data, action] = useActionState(signUpUser, {
//     success: false,
//     message: '',
//   });

//   const searchParams = useSearchParams();
//   const callbackUrl = searchParams.get('callbackUrl') || '/';

//   // data.success true olduğunda kullanıcının yönlendirilmesi için useEffect kullanıyoruz.
//   useEffect(() => {
//     if (data && data.success) {
//       router.push(callbackUrl);
//     }
//   }, [data, router, callbackUrl]);

//   const SignUpButton = () => {
//     const { pending } = useFormStatus();

//     return (
//       <Button
//         disabled={pending}
//         className='bg-red-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-[300px]'
//       >
//         {pending ? 'Submitting...' : 'Sign Up'}
//       </Button>
//     );
//   };

//   return (
//     <div className='bg-white flex justify-center items-center w-full lg:h-96'>
//       <div className='absolute top-4 right-4'>
//         <Link href='/' title='Go to Home'>
//           <svg
//             xmlns='http://www.w3.org/2000/svg'
//             className='h-8 w-8 text-black-500 hover:text-blue-700 cursor-pointer'
//             fill='none'
//             viewBox='0 0 24 24'
//             stroke='currentColor'
//           >
//             <path
//               strokeLinecap='round'
//               strokeLinejoin='round'
//               strokeWidth={2}
//               d='M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z'
//             />
//             <path
//               strokeLinecap='round'
//               strokeLinejoin='round'
//               strokeWidth={2}
//               d='M9 22V12h6v10'
//             />
//           </svg>
//         </Link>
//       </div>

//       {/* Left: Image */}
//       <div className="hidden lg:w-[1500px] lg:h-screen lg:block xl:w-[2000px]">
//         <Image
//           src='/images/cart-2.jpg'
//           alt='Placeholder Image'
//           className='object-fill h-full w-full'
//           width={1080}
//           height={1080}
//           priority
//         />
//       </div>

//       {/* Right: Sign Up Form */}
//       <div className="flex justify-end lg:pl-0  md:pl-36 sm:p-48 p-8 w-full lg:w-[1500px] relative right-12 ml-8 lg:right-24 xl:right-36">
//         <h1 className='text-3xl font-semibold mb-0 relative bottom-16 left-[115px]'>Register</h1>
//         <form action={action}>
//           <input type='hidden' name='callbackUrl' value={callbackUrl} />
//           <div className='mb-4'>
//             <Label htmlFor='fullName' className='block text-gray-600 pt-12'>
//               Full Name
//             </Label>
//             <Input
//               id='name'
//               name='name'
//               type='text'
//               className='border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 mt-3 w-[300px]'
//               autoComplete='name'
//               defaultValue={signUpDefaultValues.name}
//             />
//           </div>
//           <div className='mb-4'>
//             <Label htmlFor='email' className='block text-gray-600'>
//               Email
//             </Label>
//             <Input
//               id='email'
//               name='email'
//               type='email'
//               className='border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 mt-3 w-[300px]'
//               autoComplete='email'
//               defaultValue={signUpDefaultValues.email}
//             />
//           </div>
//           <div className='mb-4'>
//             <Label htmlFor='password' className='block text-gray-800'>
//               Password
//             </Label>
//             <Input
//               id='password'
//               name='password'
//               type='password'
//               className='border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 mt-3 w-[300px]'
//               autoComplete='new-password'
//               defaultValue={signUpDefaultValues.password}
//             />
//           </div>
//           <div className='mb-4'>
//             <Label htmlFor='confirmPassword' className='block text-gray-800'>
//               Confirm Password
//             </Label>
//             <Input
//               id='confirmPassword'
//               name='confirmPassword'
//               type='password'
//               className='border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 mt-3 w-[300px]'
//               autoComplete='new-password'
//               defaultValue={signUpDefaultValues.confirmPassword}
//               required
//             />
//           </div>

//           <div>
//             <SignUpButton />
//           </div>
//           {data && !data.success && (
//             <div className='text-center text-destructive'>{data.message}</div>
//           )}
//           <div className='mt-6 text--500 text-center absolute font-bold text-blue-500'>
//             <Link href='/sign-in' className='hover:underline'>
//               Sign In Here
//             </Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignUpForm;


// 'use client';

// import { useEffect } from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import Link from 'next/link';
// import { useActionState } from 'react';
// import { useFormStatus } from 'react-dom';
// import { signUpUser } from '@/lib/actions/user.action';
// import { useSearchParams, useRouter } from 'next/navigation';
// import { signUpDefaultValues } from '@/lib/constants';
// import Image from 'next/image';

// const SignUpForm = () => {
//   const router = useRouter();
//   const [data, action] = useActionState(signUpUser, {
//     success: false,
//     message: '',
//   });

//   const searchParams = useSearchParams();
//   const callbackUrl = searchParams.get('callbackUrl') || '/';

//   useEffect(() => {
//     if (data && data.success) {
//       setTimeout(() => {
//         router.push(callbackUrl);
//       }, 2000);
//     }
//   }, [data, router, callbackUrl]);

//   const SignUpButton = () => {
//     const { pending } = useFormStatus();
//     return (
//       <Button
//         disabled={pending}
//         className='bg-red-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-[300px]'
//       >
//         {pending ? 'Submitting...' : 'Sign Up'}
//       </Button>
//     );
//   };

//   return (
//     <div className='bg-white flex justify-center items-center w-full lg:h-96'>
//       <div className='absolute top-4 right-4'>
//         <Link href='/' title='Go to Home'>
//           <svg
//             xmlns='http://www.w3.org/2000/svg'
//             className='h-8 w-8 text-black-500 hover:text-blue-700 cursor-pointer'
//             fill='none'
//             viewBox='0 0 24 24'
//             stroke='currentColor'
//           >
//             <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z' />
//             <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 22V12h6v10' />
//           </svg>
//         </Link>
//       </div>

//       <div className="hidden lg:w-[1500px] lg:h-screen lg:block xl:w-screen">
//         <Image
//           src='/images/cart-2.jpg'
//           alt='Placeholder Image'
//           className='object-fill h-full w-full'
//           width={1080}
//           height={1080}
//           priority
//         />
//       </div>

//       <div className="flex justify-end lg:pl-0 md:pl-36 sm:p-48 p-8 w-full lg:w-[1500px] relative right-12 ml-8 lg:right-24 xl:right-36">
//         <h1 className='text-3xl font-semibold mb-0 relative bottom-16 left-[115px]'>Register</h1>
//         <form action={action}>
//           <input type='hidden' name='callbackUrl' value={callbackUrl} />
//           <div className='mb-4'>
//             <Label htmlFor='fullName' className='block text-gray-600 pt-12'>
//               Full Name
//             </Label>
//             <Input
//               id='name'
//               name='name'
//               type='text'
//               className='border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 mt-3 w-[300px]'
//               autoComplete='name'
//               defaultValue={signUpDefaultValues.name}
//             />
//           </div>
//           <div className='mb-4'>
//             <Label htmlFor='email' className='block text-gray-600'>
//               Email
//             </Label>
//             <Input
//               id='email'
//               name='email'
//               type='email'
//               className='border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 mt-3 w-[300px]'
//               autoComplete='email'
//               defaultValue={signUpDefaultValues.email}
//             />
//           </div>
//           <div className='mb-4'>
//             <Label htmlFor='password' className='block text-gray-800'>
//               Password
//             </Label>
//             <Input
//               id='password'
//               name='password'
//               type='password'
//               className='border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 mt-3 w-[300px]'
//               autoComplete='new-password'
//               defaultValue={signUpDefaultValues.password}
//             />
//           </div>
//           <div className='mb-4'>
//             <Label htmlFor='confirmPassword' className='block text-gray-800'>
//               Confirm Password
//             </Label>
//             <Input
//               id='confirmPassword'
//               name='confirmPassword'
//               type='password'
//               className='border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 mt-3 w-[300px]'
//               autoComplete='new-password'
//               defaultValue={signUpDefaultValues.confirmPassword}
//               required
//             />
//           </div>

//           <div>
//             <SignUpButton />
//           </div>
//           {data && !data.success && (
//             <div className='text-center text-destructive'>{data.message}</div>
//           )}
//           <div className='mt-6 text--500 text-center absolute font-bold text-blue-500'>
//             <Link href='/sign-in' className='hover:underline'>
//               Sign In Here
//             </Link>
            

//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignUpForm;

'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { signUpUser } from '@/lib/actions/user.action';
import { useSearchParams, useRouter } from 'next/navigation';
import { signUpDefaultValues } from '@/lib/constants';
import Image from 'next/image';

const SignUpForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';


  const [message, setMessage] = useState('');

  const [data, action] = useActionState(signUpUser, {
    success: false,
    message: '',
  });

  useEffect(() => {
    if (data && data.success) {
      setMessage('Kayıt başarılı! Lütfen e-postanızı kontrol edip hesabınızı onaylayın.');
      setTimeout(() => {
        router.push(callbackUrl);
      }, 3000);
    }
  }, [data, router, callbackUrl]);

  const SignUpButton = () => {
    const { pending } = useFormStatus();
    return (
      <Button
        disabled={pending}
        className='bg-red-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-[300px]'
      >
        {pending ? 'Submitting...' : 'Sign Up'}
      </Button>
    );
  };

  return (
    <div className='bg-white flex justify-center items-center w-full lg:h-96'>
      {/* Home Icon */}
      <div className='absolute top-4 right-4'>
        <Link href='/' title='Go to Home'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-8 w-8 text-black-500 hover:text-blue-700 cursor-pointer'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z' />
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 22V12h6v10' />
          </svg>
        </Link>
      </div>

      {/* Left Image */}
      <div className="hidden lg:w-[1500px] lg:h-screen lg:block xl:w-screen">
        <Image
          src='/images/cart-2.jpg'
          alt='Placeholder Image'
          className='object-fill h-full w-full'
          width={1080}
          height={1080}
          priority
        />
      </div>

      {/* Right Form */}
      <div className="flex justify-end lg:pl-0 md:pl-36 sm:p-48 p-8 w-full lg:w-[1500px] relative right-12 ml-8 lg:right-24 xl:right-36">
        <h1 className='text-3xl font-semibold mb-0 relative bottom-16 left-[115px]'>Register</h1>
        
        <form action={action}>
          <input type='hidden' name='callbackUrl' value={callbackUrl} />
          
          {/* Full Name Field */}
          <div className='mb-4'>
            <Label htmlFor='fullName' className='block text-gray-600 pt-12'>
              Full Name
            </Label>
            <Input
              id='name'
              name='name'
              type='text'
              className='border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 mt-3 w-[300px]'
              autoComplete='name'
              defaultValue={signUpDefaultValues.name}
            />
          </div>

          {/* Email Field */}
          <div className='mb-4'>
            <Label htmlFor='email' className='block text-gray-600'>
              Email
            </Label>
            <Input
              id='email'
              name='email'
              type='email'
              className='border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 mt-3 w-[300px]'
              autoComplete='email'
              defaultValue={signUpDefaultValues.email}
            />
          </div>

          {/* Password Field */}
          <div className='mb-4'>
            <Label htmlFor='password' className='block text-gray-800'>
              Password
            </Label>
            <Input
              id='password'
              name='password'
              type='password'
              className='border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 mt-3 w-[300px]'
              autoComplete='new-password'
              defaultValue={signUpDefaultValues.password}
            />
          </div>

          {/* Confirm Password Field */}
          <div className='mb-4'>
            <Label htmlFor='confirmPassword' className='block text-gray-800'>
              Confirm Password
            </Label>
            <Input
              id='confirmPassword'
              name='confirmPassword'
              type='password'
              className='border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 mt-3 w-[300px]'
              autoComplete='new-password'
              defaultValue={signUpDefaultValues.confirmPassword}
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <SignUpButton />
          </div>

          {/* Success Message */}
          {data && data.success && (
            <p className='text-green-500 mt-4 text-center font-semibold'>
              {message}
            </p>
          )}

          {/* Error Message */}
          {data && !data.success && (
            <div className='text-center text-red-500 mt-4'>{data.message}</div>
          )}

          {/* Redirect to Sign In */}
          <div className='mt-6 text--500 text-center absolute font-bold text-blue-500'>
            <Link href='/sign-in' className='hover:underline'>
              Sign In Here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
