// import { auth } from '@/auth';
// import { getMyCart } from '@/lib/actions/cart.actions';
// import { getUserById } from '@/lib/actions/user.action';
// import { ShippingAddress } from '@/types';
// import { Metadata } from 'next';
// import { redirect } from 'next/navigation';
// import CheckoutSteps from '@/components/shared/checkout-steps';
// import { Card, CardContent } from '@/components/ui/card';
// import Link from 'next/link';
// import { Button } from '@/components/ui/button';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table';
// import Image from 'next/image';
// import { formatCurrency } from '@/lib/utils';
// import PlaceOrderForm from './place-order-form';

// export const metadata: Metadata = {
//   title: 'Place Order',
// };

// const PlaceOrderPage = async () => {
//   const cart = await getMyCart();
//   const session = await auth();
//   const userId = session?.user?.id;

//   if (!userId) throw new Error('User not found');

//   const user = await getUserById(userId);

//   if (!cart || cart.items.length === 0) redirect('/cart');
//   if (!user.address) redirect('/shipping-address');
//   if (!user.paymentMethod) redirect('/payment-method');

//   const userAddress = user.address as ShippingAddress;

//   return (
//     <>
//       <CheckoutSteps current={3} />
//       <h1 className='py-4 text-2xl'>Place Order</h1>
//       <div className='grid md:grid-cols-3 md:gap-5'>
//         <div className='md:col-span-2 overflow-x-auto space-y-4'>
//           <Card>
//             <CardContent className='p-4 gap-4'>
//               <h2 className='text-xl pb-4'>Shipping Address</h2>
//               <p>{userAddress.fullName}</p>
//               <p>
//                 {userAddress.streetAddress}, {userAddress.city}{' '}
//                 {userAddress.postalCode}, {userAddress.country}{' '}
//               </p>
//               <div className='mt-3'>
//                 <Link href='/shipping-address'>
//                   <Button variant='outline'>Edit</Button>
//                 </Link>
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardContent className='p-4 gap-4'>
//               <h2 className='text-xl pb-4'>Payment Method</h2>
//               <p>{user.paymentMethod}</p>
//               <div className='mt-3'>
//                 <Link href='/payment-method'>
//                   <Button variant='outline'>Edit</Button>
//                 </Link>
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardContent className='p-4 gap-4'>
//               <h2 className='text-xl pb-4'>Order Items</h2>
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Item</TableHead>
//                     <TableHead>Quantity</TableHead>
//                     <TableHead>Price</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {cart.items.map((item) => (
//                     <TableRow key={item.slug}>
//                       <TableCell>
//                         <Link
//                           href={`/product/{item.slug}`}
//                           className='flex items-center'
//                         >
//                           <Image
//                             src={item.image}
//                             alt={item.name}
//                             width={50}
//                             height={50}
//                           />
//                           <span className='px-2'>{item.name}</span>
//                         </Link>
//                       </TableCell>
//                       <TableCell>
//                         <span className='px-2'>{item.qty}</span>
//                       </TableCell>
//                       <TableCell className='text-right'>
//                         ${item.price}
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </CardContent>
//           </Card>
//         </div>
//         <div>
//           <Card>
//             <CardContent className='p-4 gap-4 space-y-4'>
//               <div className='flex justify-between'>
//                 <div>Items</div>
//                 <div>{formatCurrency(cart.itemsPrice)}</div>
//               </div>
//               <div className='flex justify-between'>
//                 <div>Tax</div>
//                 <div>{formatCurrency(cart.taxPrice)}</div>
//               </div>
//               <div className='flex justify-between'>
//                 <div>Shipping</div>
//                 <div>{formatCurrency(cart.shippingPrice)}</div>
//               </div>
//               <div className='flex justify-between'>
//                 <div>Total</div>
//                 <div>{formatCurrency(cart.totalPrice)}</div>
//               </div>
//               <PlaceOrderForm />
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </>
//   );
// };

// export default PlaceOrderPage;

// import { auth } from '@/auth';
// import { getMyCart } from '@/lib/actions/cart.actions';
// import { getUserById } from '@/lib/actions/user.action';
// import { ShippingAddress } from '@/types';
// import { Metadata } from 'next';
// import { redirect } from 'next/navigation';
// import Image from 'next/image';
// import Link from 'next/link';
// import { formatCurrency } from '@/lib/utils';

// export const metadata: Metadata = {
//   title: 'Place Order',
// };

// const PlaceOrderPage = async () => {
//   const cart = await getMyCart();
//   const session = await auth();
//   const userId = session?.user?.id;

//   if (!userId) throw new Error('User not found');

//   const user = await getUserById(userId);

//   if (!cart || cart.items.length === 0) redirect('/cart');
//   if (!user.address) redirect('/shipping-address');
//   if (!user.paymentMethod) redirect('/payment-method');

//   const userAddress = user.address as ShippingAddress;

//   return (
//     <div className="min-h-screen bg-white text-gray-800">
//       {/* Header */}
//       {/* <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-6 shadow-md">
//         <h1 className="text-center text-4xl font-extrabold">Place Your Order</h1>
//       </header> */}

//       {/* Main Content */}
//       <main className="container mx-auto px-6 py-10 space-y-8">
//         {/* Shipping Address Section */}
//         <section className="bg-white rounded-lg shadow-lg p-6">
//           <h2 className="text-2xl font-bold mb-4">Shipping Address</h2>
//           {/* <p className="text-gray-800">{userAddress.fullName}</p> */}
//           <p className="text-gray-600">
//             {userAddress.streetAddress}, {userAddress.city},{' '}
//             {userAddress.postalCode}, {userAddress.country}
//           </p>
//           <Link
//             href="/shipping-address"
//             className="mt-4 inline-block text-blue-600 hover:underline"
//           >
//             Edit Address
//           </Link>
//         </section>

//         {/* Payment Method Section */}
//         <section className="bg-white rounded-lg shadow-lg p-6">
//           <h2 className="text-2xl font-bold mb-4">Payment Method</h2>
//           <p className="text-gray-800">{user.paymentMethod}</p>
//           <Link
//             href="/payment-method"
//             className="mt-4 inline-block text-blue-600 hover:underline"
//           >
//             Edit Payment Method
//           </Link>
//         </section>

//         {/* Order Items Section */}
//         <section className="bg-white rounded-lg shadow-lg p-6">
//           <h2 className="text-2xl font-bold mb-4">Order Items</h2>
//           <ul className="divide-y divide-gray-200">
//             {cart.items.map((item) => (
//               <li
//                 key={item.slug}
//                 className="flex items-center justify-between py-4"
//               >
//                 <div className="flex items-center">
//                   <Image
//                     src={item.image}
//                     alt={item.name}
//                     width={200}
//                     height={200}
//                     className="rounded"
//                   />
//                   <span className="ml-3 text-gray-800 font-medium">
//                     {item.name}
//                   </span>
//                 </div>
//                 <div>
//                   <span>{item.qty} x </span>
//                   <span>{formatCurrency(item.price)}</span>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </section>

//         {/* Order Summary Section */}
//         <section className="bg-white rounded-lg shadow-lg p-6">
//           <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
//           <div className="space-y-3">
//             <div className="flex justify-between">
//               <span>Items</span>
//               <span>{formatCurrency(cart.itemsPrice)}</span>
//             </div>
//             <div className="flex justify-between">
//               <span>Tax</span>
//               <span>{formatCurrency(cart.taxPrice)}</span>
//             </div>
//             <div className="flex justify-between">
//               <span>Shipping</span>
//               <span>{formatCurrency(cart.shippingPrice)}</span>
//             </div>
//             <div className="flex justify-between text-lg font-bold">
//               <span>Total</span>
//               <span>{formatCurrency(cart.totalPrice)}</span>
//             </div>
//           </div>
//         </section>
//       </main>

//       {/* Sticky Place Order Button */}
//       <div className=" bottom-0  bg-white  py-4 ">
//         <div className="container mx-auto px-96">
//           <button className="w-96  bg-blue-500 text-white py-3 rounded-lg text-xl font-semibold hover:bg-indigo-600">
//             Place Order
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PlaceOrderPage;

import { auth } from "@/auth";
import { getMyCart } from "@/lib/actions/cart.actions";
import { getUserById } from "@/lib/actions/user.action";
import { ShippingAddress } from "@/types";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import CheckoutSteps from "@/components/shared/checkout-steps";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import PlaceOrderForm from "./place-order-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Ensure this import is correct
// import { faAddressBook } from "@fortawesome/free-regular-svg-icons"; // Import the specific icon
import { faLock, faAddressBook, faCheck, faCreditCard } from "@fortawesome/free-solid-svg-icons";

export const metadata: Metadata = {
  title: "Place Order",
};

const PlaceOrderPage = async () => {
  const cart = await getMyCart();
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) throw new Error("User not found");

  const user = await getUserById(userId);

  if (!cart || cart.items.length === 0) redirect("/cart");
  if (!user.address) redirect("/shipping-address");
  if (!user.paymentMethod) redirect("/payment-method");

  const userAddress = user.address as ShippingAddress;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <CheckoutSteps current={3} />
      {/* <h1 className="text-3xl font-bold text-gray-800">Finalize Your Order</h1> */}
      <div className="relative space-y-12">
        {/* Vertical Timeline */}
        <div className="relative border-l-4 border-black">
          {/* Shipping Address */}
          <div className="pl-8 pb-8 relative">
            {/* <div className="absolute -left-6 top-0 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg">
              <span className="font-bold text-lg">1</span>
            </div> */}
            <Card className="bg-white shadow-md rounded-lg transition hover:shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faAddressBook}
                    className="text-black w-5"
                  />
                  Shipping Address
                </h2>

                {/* <p className="text-gray-600">{userAddress.fullName}</p> */}
                <p className="text-gray-600">
                  {userAddress.streetAddress}, {userAddress.city}{" "}
                  {userAddress.postalCode}, {userAddress.country}
                </p>
                <div className="mt-4">
                  <Link href="/shipping-address">
                    <Button variant="outline" className="hover:bg-blue-100">
                      Edit Address
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Method */}
          <div className="pl-8 pb-8 relative">
            {/* <div className="absolute -left-6 top-0 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg">
              <span className="font-bold text-lg">2</span>
            </div> */}
            <Card className="bg-white shadow-md rounded-lg transition hover:shadow-lg">
              <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faCreditCard}
                    className="text-black w-6"
                  />
                  Payment Method
                </h2>
                <p className="text-gray-600">{user.paymentMethod}</p>
                <div className="mt-4">
                  <Link href="/payment-method">
                    <Button variant="outline" className="hover:bg-blue-100">
                      Edit Payment Method
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Items */}
          <div className="pl-8 pb-8 relative">
            {/* <div className="absolute -left-6 top-0 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg">
              <span className="font-bold text-lg">3</span>
            </div> */}
            <Card className="bg-white shadow-md rounded-lg transition hover:shadow-lg">
              <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faLock}
                    className="text-black w-5"
                  />
                  Order Items
                </h2>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead className="relative right-6">Quantity</TableHead>
                      <TableHead>Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cart.items.map((item) => (
                      <TableRow key={item.slug}>
                        <TableCell className="flex items-center">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={150}
                            height={150}
                            className="rounded-md"
                          />
                          <span className="ml-4 text-gray-700">
                            {item.name}
                          </span>
                        </TableCell>
                        <TableCell className="text-left relative bottom-12">{item.qty}</TableCell>
                        <TableCell className="text-left relative bottom-12">
                          {formatCurrency(item.price)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Sticky Order Summary */}
        <div className="sticky top-6 bg-gray-50 rounded-lg shadow-lg p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="text-black w-5"
                  />
                  Order Summary
                </h2>
          <div className="flex justify-between text-gray-600">
            <span>Items</span>
            <span>{formatCurrency(cart.itemsPrice)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Tax</span>
            <span>{formatCurrency(cart.taxPrice)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span>{formatCurrency(cart.shippingPrice)}</span>
          </div>
          <div className="flex justify-between text-gray-900 font-bold">
            <span>Total</span>
            <span>{formatCurrency(cart.totalPrice)}</span>
          </div>
          <PlaceOrderForm />
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderPage;
