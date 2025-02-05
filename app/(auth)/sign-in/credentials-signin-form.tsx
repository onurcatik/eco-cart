// 'use client';

// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { signUpDefaultValues } from '@/lib/constants/index';
// import Link from 'next/link';
// import Image from 'next/image';
// import { useActionState } from 'react';
// import { useFormStatus } from 'react-dom';
// import { signInWithCredentials } from '@/lib/actions/user.action';
// import { useSearchParams } from 'next/navigation';

// // You can import an icon from react-icons if desired:
// // import { FaHome } from 'react-icons/fa';

// const CredentialsSignInForm = () => {
//   const [data, action] = useActionState(signInWithCredentials, {
//     success: false,
//     message: '',
//   });
//   console.log(data); // Debugging

//   const searchParams = useSearchParams();
//   const callbackUrl = searchParams.get('callbackUrl') || '/';

//   const SignInButton = () => {
//     const { pending } = useFormStatus();

//     return (
//       <Button
//         disabled={pending}
//         className='w-[500px] bg-red-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md'
//         variant='default'
//       >
//         {pending ? 'Signing In...' : 'Sign In'}
//       </Button>
//     );
//   };

//   return (
//     <div className='bg-white flex justify-center items-center'>
//       {/* Home Icon in the top-right corner */}
//       <div className='absolute top-4 right-4'>
//         <Link href='/' title='Go to Home'>
//           {/* Using a custom SVG icon */}
//           <svg
//             xmlns='http://www.w3.org/2000/svg'
//             className='h-16 w-16 text-black-500 hover:text-blue-700 cursor-pointer '
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

//       <div className="hidden lg:block  h-screen mr-36 lg:pt-0 lg:h-screen">
//               <Image
//                 src='/images/ecommerce2.webp'
//                 alt='Placeholder Image'
//                 className='object-fill h-full w-full'
//                 width={2000} // Add the intrinsic width of the image
//                 height={1080} // Add the intrinsic height of the image
//                 priority // Optional: Use if this image is above the fold (e.g., hero image)
//               />
//             </div>
      
//             {/* Right: Sign Up Form */}
//             <div className="flex justify-end lg:p-48 md:p-2 sm:p-48 p-8 w-full lg:w-1/2 relative right-0 ml-64 lg:right-96">
//               <h1 className='text-3xl font-semibold mb-0 relative bottom-16 left-[115px]'>Register</h1>
//               <form action={action}>
//                 <input type='hidden' name='callbackUrl' value={callbackUrl} />
//                 <div className='mb-4'>
//             {/* Email Input */}
//             <div>
//               <Label htmlFor='email' className='block text-gray-600 mb-2'>
//                 Email
//               </Label>
//               <Input
//                 id='email'
//                 name='email'
//                 type='email'
//                 required
//                 autoComplete='email'
//                 defaultValue={signUpDefaultValues.email}
//                 className='w-[500px] border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500'
//               />
//             </div>

//             {/* Password Input */}
//             <div>
//               <Label htmlFor='password' className='block text-gray-800 mb-2'>
//                 Password
//               </Label>
//               <Input
//                 id='password'
//                 name='password'
//                 type='password'
//                 required
//                 autoComplete='password'
//                 defaultValue={signUpDefaultValues.password}
//                 className='w-[500px] border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500'
//               />
//             </div>

//             {/* Sign In Button */}
//             <div>
//               <SignInButton />
//             </div>

//             {/* Error Message */}
//             {data && !data.success && (
//               <div className='text-center text-red-500 mt-4'>
//                 {data.message}
//               </div>
//             )}

//             {/* Sign Up Link */}
//             <div className='text-3lg text-gray-600 font-bold'>
//               <Link
//                 href='/sign-up'
//                 target='_self'
//                 className='text-blue-500 hover:underline'
//               >
//                 Sign Up Here
//               </Link>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CredentialsSignInForm;


'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signUpDefaultValues } from '@/lib/constants/index';
import Link from 'next/link';
import Image from 'next/image';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { signInWithCredentials } from '@/lib/actions/user.action';
import { useSearchParams } from 'next/navigation';

// You can import an icon from react-icons if desired:
// import { FaHome } from 'react-icons/fa';

const CredentialsSignInForm = () => {
  const [data, action] = useActionState(signInWithCredentials, {
    success: false,
    message: '',
  });
  console.log(data); // Debugging

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const SignInButton = () => {
    const { pending } = useFormStatus();

    return (
      <Button
        disabled={pending}
        className=' bg-red-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md'
        variant='default'
      >
        {pending ? 'Signing In...' : 'Sign In'}
      </Button>
    );
  };

  return (
    <div className='bg-white flex justify-center items-center w-full lg:h-96 '>

    <div className='absolute top-4 right-4'>
            <Link href='/' title='Go to Home'>
              {/* Using a custom SVG icon */}
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-8 w-8 text-black-500 hover:text-blue-700 cursor-pointer '
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z'
                />
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 22V12h6v10'
                />
              </svg>
              {/* Alternatively, using react-icons:
                  <FaHome className='h-8 w-8 text-blue-500 hover:text-blue-700 cursor-pointer' />
              */}
            </Link>
          </div>
          {/* Left: Image */}
                <div className="hidden object-fill lg:w-[1500px] lg:h-screen  lg:block xl:w-[2000px] ">
                  <Image
                    src='/images/cart-2.jpg'
                    alt='Placeholder Image'
                    className='object-fill h-full w-screen'
                    width={1080} // Add the intrinsic width of the image
                    height={1080} // Add the intrinsic height of the image
                    priority // Optional: Use if this image is above the fold (e.g., hero image)
                  />
                </div>
          
                {/* Right: Sign Up Form */}
                <div className="flex justify-end lg:pl-0 md:pl-36 sm:p-48 p-8 w-full lg:w-[1500px] relative right-12 ml-8 lg:right-24 xl:right-36">
                  <h1 className='text-3xl font-semibold mb-0 relative bottom-16 left-[78px]'>Login</h1>
                  <form action={action}>
                    <input type='hidden' name='callbackUrl' value={callbackUrl} />
                    <div className='mb-4'>
               
              </div>
              <div className='mb-4'>
                <Label htmlFor='email' className='block text-gray-600'>
                  Email
                </Label>
                <Input
                  id='email'
                  name='email'
                  type='email'
                  required
                  className=' border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 mt-3 w-[300px]'
                  autoComplete='email'
                  defaultValue={signUpDefaultValues.email}
                />
              </div>
              <div className='mb-4'>
                <Label htmlFor='password' className='block text-gray-800'>
                  Password
                </Label>
                <Input
                  id='password'
                  name='password'
                  type='password'
                  required
                  className=' border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 mt-3 w-[300px]'
                  autoComplete='password'
                  defaultValue={signUpDefaultValues.password}
                />
              </div>
              <div className='mb-4'>
           
         
              </div>
              <div>
                <SignInButton />
              </div>
              {data && !data.success && (
                <div className='text-center text-destructive '>{data.message}</div>
              )}
              <div className='mt-6 text--500 text-center absolute font-bold text-blue-500'>
                {/* Already have an account?{' '} */}
                <Link href='/sign-up' className='hover:underline'>
                  Sign Up Here
                </Link>
              </div>
            </form>
          </div>
        </div>
      );
    };

export default CredentialsSignInForm;
