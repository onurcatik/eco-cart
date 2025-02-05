// "use client";

// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import { formatCurrency, formatDateTime, formatId } from "@/lib/utils";
// import { Order } from "@/types";
// import Link from "next/link";
// import Image from "next/image";
// import { useToast } from "@/hooks/use-toast";
// import { useTransition } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faCheck,
//   faTruck,
//   faCreditCard,
//   faShoppingBag,
//   faAddressBook,
//   faLock,
// } from "@fortawesome/free-solid-svg-icons";
// import StripePayment from "./stripe-payment";
// import {
//   deliverOrder,
//   updateOrderToPaidCOD,
// } from "@/lib/actions/order.actions";

// const OrderDetailsTable = ({
//   order,
//   paypalClientId,
//   isAdmin,
//   stripeClientSecret,
// }: {
//   order: Omit<Order, "paymentResult">;
//   paypalClientId: string;
//   isAdmin: boolean;
//   stripeClientSecret: string | null;
// }) => {
//   const {
//     id,
//     shippingAddress,
//     orderitems,
//     itemsPrice,
//     shippingPrice,
//     taxPrice,
//     totalPrice,
//     paymentMethod,
//     isDelivered,
//     isPaid,
//     paidAt,
//     deliveredAt,
//   } = order;

//   const { toast } = useToast();

//   const MarkAsPaidButton = () => {
//     const [isPending, startTransition] = useTransition();

//     return (
//       <Button
//         type="button"
//         disabled={isPending}
//         onClick={() =>
//           startTransition(async () => {
//             const res = await updateOrderToPaidCOD(order.id);
//             toast({
//               variant: res.success ? "default" : "destructive",
//               description: res.message,
//             });
//           })
//         }
//         className="hover:bg-blue-100"
//       >
//         {isPending ? "Processing..." : "Mark As Paid"}
//       </Button>
//     );
//   };

//   const MarkAsDeliveredButton = () => {
//     const [isPending, startTransition] = useTransition();

//     return (
//       <Button
//         type="button"
//         disabled={isPending}
//         onClick={() =>
//           startTransition(async () => {
//             const res = await deliverOrder(order.id);
//             toast({
//               variant: res.success ? "default" : "destructive",
//               description: res.message,
//             });
//           })
//         }
//         className="hover:bg-blue-100"
//       >
//         {isPending ? "Processing..." : "Mark As Delivered"}
//       </Button>
//     );
//   };
 

//   return (
//     <div className="max-w-7xl mx-auto p-6 space-y-8">

//       <h1 className="text-3xl pl-0 font-bold"> Order {formatId(id)}</h1>
     
//       {/* <h1 className="text-3xl font-bold text-gray-800">Finalize Your Order</h1> */}
//       <div className="relative space-y-12">
//         {/* Vertical Timeline */}
//         <div className="relative border-l-4 border-black">
//           {/* Shipping Address */}
//           <div className="pl-8 pb-8 relative">
//             {/* Payment Method */}
//             <Card className="bg-white shadow-md rounded-lg transition hover:shadow-lg mt-12">
//               <CardContent className="p-6">
//                 <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
//                   <FontAwesomeIcon
//                     icon={faAddressBook}
//                     className="text-black w-5"
//                   />
//                   Shipping Address
//                 </h2>
//                 <p className="text-gray-600">
//                   {shippingAddress.fullName}, {shippingAddress.streetAddress}, {shippingAddress.city}, {shippingAddress.postalCode}, {shippingAddress.country}
//                 </p>
//                 <div className="mt-4">
//                 {isPaid ? (
//                   <Badge variant="secondary">
//                     Paid at {formatDateTime(paidAt!).dateTime}
//                   </Badge>
//                 ) : (
//                   <Badge variant="destructive">Not Paid</Badge>
//                 )}
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Shipping Address */}

//             {/* <div className="absolute -left-6 top-0 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg">
//               <span className="font-bold text-lg">2</span>
//             </div> */}
//             <Card className="bg-white shadow-md rounded-lg transition hover:shadow-lg mt-12">
//               <CardContent className="p-6">
//                 <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
//                   <FontAwesomeIcon
//                     icon={faCreditCard}
//                     className="text-black w-6"
//                   />
//                   Payment Method
//                 </h2>
//                 {/* <p className='text-gray-600'>{shippingAddress.fullName}</p> */}
//                 <p className="text-gray-600">
//                   {paymentMethod}
//                 </p>
//                 <div className="mt-4">
//                 {isDelivered ? (
//                   <Badge variant="secondary">
//                     Delivered at {formatDateTime(deliveredAt!).dateTime}
//                   </Badge>
//                 ) : (
//                   <Badge variant="destructive">Not Delivered</Badge>
//                 )}
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Order Items */}
//             <Card className="bg-white shadow-md rounded-lg transition hover:shadow-lg mt-12">

//               <CardContent className="p-6">
//                 <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
//                   <FontAwesomeIcon icon={faLock} className="text-black w-5" />
//                   Order Items
//                 </h2>
//                 <Table>
//                   <TableHeader>
//                     <TableRow>
//                       <TableHead>Item</TableHead>
//                       <TableHead>Quantity</TableHead>
//                       <TableHead>Price</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {orderitems.map((item) => (
//                       <TableRow key={item.slug}>
//                         <TableCell className="flex items-center">
//                           <Image
//                             src={item.image}
//                             alt={item.name}
//                             width={150}
//                             height={150}
//                             className="rounded-md"
//                           />
//                           <span className="ml-4 text-gray-700">
//                             {item.name}
//                           </span>
//                         </TableCell>
//                         <TableCell>{item.qty}</TableCell>
//                         <TableCell>{formatCurrency(item.price)}</TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </CardContent>
//             </Card>
//           </div>
//         </div>

//         {/* Order Summary */}
//         <div className="relative bottom-12 left-8 bg-gray-50 rounded-lg shadow-lg p-6 space-y-4">
//           <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
//             <FontAwesomeIcon icon={faCheck} className="text-black w-6" />
//             Order Summary
//           </h2>
//           <div className="flex justify-between text-gray-600">
//             <span>Items</span>
//             <span>{formatCurrency(itemsPrice)}</span>
//           </div>
//           <div className="flex justify-between text-gray-600">
//             <span>Tax</span>
//             <span>{formatCurrency(taxPrice)}</span>
//           </div>
//           <div className="flex justify-between text-gray-600">
//             <span>Shipping</span>
//             <span>{formatCurrency(shippingPrice)}</span>
//           </div>
//           <div className="flex justify-between text-gray-900 font-bold">
//             <span>Total</span>
//             <span>{formatCurrency(totalPrice)}</span>
//           </div>
//           {!isPaid && paymentMethod === "Stripe" && stripeClientSecret && (
//             <StripePayment
//               priceInCents={Number(order.totalPrice) * 100}
//               orderId={order.id}
//               clientSecret={stripeClientSecret}
//             />
//           )}
//           {isAdmin && !isPaid && paymentMethod === "CashOnDelivery" && (
//             <MarkAsPaidButton />
//           )}
//           {isAdmin && isPaid && !isDelivered && <MarkAsDeliveredButton />}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderDetailsTable;


"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatDateTime, formatId } from "@/lib/utils";
import { Order } from "@/types";
// import Link from "next/link";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { useTransition } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  // faTruck,
  faCreditCard,
  // faShoppingBag,
  faAddressBook,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import StripePayment from "./stripe-payment";
import {
  deliverOrder,
  updateOrderToPaidCOD,
} from "@/lib/actions/order.actions";

const OrderDetailsTable = ({
  order,
  // paypalClientId,
  isAdmin,
  stripeClientSecret,
}: {
  order: Omit<Order, "paymentResult">;
  paypalClientId: string;
  isAdmin: boolean;
  stripeClientSecret: string | null;
}) => {
  const {
    id,
    shippingAddress,
    orderitems,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    paymentMethod,
    isDelivered,
    isPaid,
    paidAt,
    deliveredAt,
  } = order;

  const { toast } = useToast();

  const MarkAsPaidButton = () => {
    const [isPending, startTransition] = useTransition();

    return (
      <Button
        type="button"
        disabled={isPending}
        onClick={() =>
          startTransition(async () => {
            const res = await updateOrderToPaidCOD(order.id);
            toast({
              variant: res.success ? "default" : "destructive",
              description: res.message,
            });
          })
        }
        className="hover:bg-blue-100"
      >
        {isPending ? "Processing..." : "Mark As Paid"}
      </Button>
    );
  };

  const MarkAsDeliveredButton = () => {
    const [isPending, startTransition] = useTransition();

    return (
      <Button
        type="button"
        disabled={isPending}
        onClick={() =>
          startTransition(async () => {
            const res = await deliverOrder(order.id);
            toast({
              variant: res.success ? "default" : "destructive",
              description: res.message,
            });
          })
        }
        className="hover:bg-blue-100"
      >
        {isPending ? "Processing..." : "Mark As Delivered"}
      </Button>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">

      <h1 className="text-3xl font-bold">Order {formatId(id)}</h1>

      <div className="relative space-y-12">
        {/* Vertical Timeline */}
        <div className="relative border-l-4 border-black">
          <div className="pl-4 sm:pl-8 pb-8 relative space-y-6">
            {/* Shipping Address */}
            <Card className="bg-white shadow-md rounded-lg transition hover:shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <FontAwesomeIcon icon={faAddressBook} className="text-black w-5" />
                  Shipping Address
                </h2>
                <p className="text-gray-600 text-sm sm:text-base">
                  {shippingAddress.fullName}, {shippingAddress.streetAddress}, {shippingAddress.city}, {shippingAddress.postalCode}, {shippingAddress.country}
                </p>
                <div className="mt-4">
                  {isPaid ? (
                    <Badge variant="secondary">
                      Paid at {formatDateTime(paidAt!).dateTime}
                    </Badge>
                  ) : (
                    <Badge variant="destructive">Not Paid</Badge>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="bg-white shadow-md rounded-lg transition hover:shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <FontAwesomeIcon icon={faCreditCard} className="text-black w-6" />
                  Payment Method
                </h2>
                <p className="text-gray-600 text-sm sm:text-base">{paymentMethod}</p>
                <div className="mt-4">
                  {isDelivered ? (
                    <Badge variant="secondary">
                      Delivered at {formatDateTime(deliveredAt!).dateTime}
                    </Badge>
                  ) : (
                    <Badge variant="destructive">Not Delivered</Badge>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card className="bg-white shadow-md rounded-lg transition hover:shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <FontAwesomeIcon icon={faLock} className="text-black w-5" />
                  Order Items
                </h2>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Price</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orderitems.map((item) => (
                        <TableRow key={item.slug}>
                          <TableCell className="flex items-center">
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={150}
                              height={150}
                              className="rounded-md"
                            />
                            <span className="ml-4 text-gray-700 text-sm sm:text-base">
                              {item.name}
                            </span>
                          </TableCell>
                          <TableCell>{item.qty}</TableCell>
                          <TableCell>{formatCurrency(item.price)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Order Summary */}
        <div className="relative bottom-12 left-0 sm:left-8 bg-gray-50 rounded-lg shadow-lg p-4 sm:p-6 space-y-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <FontAwesomeIcon icon={faCheck} className="text-black w-6" />
            Order Summary
          </h2>
          <div className="flex justify-between text-gray-600">
            <span>Items</span>
            <span>{formatCurrency(itemsPrice)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Tax</span>
            <span>{formatCurrency(taxPrice)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span>{formatCurrency(shippingPrice)}</span>
          </div>
          <div className="flex justify-between text-gray-900 font-bold">
            <span>Total</span>
            <span>{formatCurrency(totalPrice)}</span>
          </div>
          {!isPaid && paymentMethod === "Stripe" && stripeClientSecret && (
            <StripePayment
              priceInCents={Number(order.totalPrice) * 100}
              orderId={order.id}
              clientSecret={stripeClientSecret}
            />
          )}
          {isAdmin && !isPaid && paymentMethod === "CashOnDelivery" && (
            <MarkAsPaidButton />
          )}
          {isAdmin && isPaid && !isDelivered && <MarkAsDeliveredButton />}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsTable;

