// "use client";

// import { Button } from "./ui/button";
// import Link from "next/link";
// import Image from "next/image";
// import { useState, useEffect } from "react";

// type Product = {
//   id: number;
//   name: string;
//   slug: string;
//   banner: string;
//   price: number | null;
// };

// type CarouselProps = {
//   data: Product[];
//   carouselId: string;
//   initialIndex: number;
// };

// const Carousel = ({ data, carouselId, initialIndex }: CarouselProps) => {
//   const [currentIndex, setCurrentIndex] = useState<number>(initialIndex);

//   const showSlide = (index: number) => {
//     setCurrentIndex(index % data.length);
//   };

//   return (
//     <div id={carouselId} className="relative mx-auto w-full max-w-4xl h-auto">
//       {/* Carousel Wrapper */}
//       <div className="relative h-auto overflow-hidden rounded-lg shadow-md">
//         {data.map((product, index) => (
//           <div
//             key={product.id}
//             className={`${
//               currentIndex === index ? "block" : "hidden"
//             } transition-opacity duration-700 ease-in-out`}
//           >
//             <div className="max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
//               <Link href={`/product/${product.slug}`}>
//                 <Image
//                   src={product.banner}
//                   alt={product.name}
//                   width={384}
//                   height={150}
//                   className="w-full h-auto rounded-t-lg object-cover"
//                 />
//               </Link>
//               <div className="p-4">
//                 <Link href={`/product/${product.slug}`}>
//                   <h5 className="mb-2 text-sm font-bold tracking-tight text-gray-900 dark:text-white md:text-base lg:text-lg">
//                     {product.name}
//                   </h5>
//                 </Link>
//                 <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
//                   {product.price ? `$${product.price}` : "Fiyat Bilgisi Yok"}
//                 </p>
//                 <div className="flex justify-center items-center">
//                   <Link
//                     href={`/product/${product.slug}`}
//                     className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//                   >
//                     View Product
//                     <svg
//                       className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
//                       aria-hidden="true"
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 14 10"
//                     >
//                       <path
//                         stroke="currentColor"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M1 5h12m0 0L9 1m4 4L9 9"
//                       />
//                     </svg>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Controls */}
//       <div className="absolute flex space-x-3 -translate-x-1/2 bottom-4 left-1/2">
//         {data.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => showSlide(index)}
//             className={`w-3 h-3 rounded-full ${
//               currentIndex === index ? "bg-blue-500" : "bg-gray-300"
//             }`}
//             aria-label={`Slide ${index + 1}`}
//           ></button>
//         ))}
//       </div>
//     </div>
//   );
// };

// const CarouselWithButton = ({ data }: { data: Product[] }) => {
//   const [initialIndices, setInitialIndices] = useState<number[]>([]);

//   useEffect(() => {
//     const selectedIndices: Set<number> = new Set();

//     while (selectedIndices.size < 4) {
//       const randomIndex = Math.floor(Math.random() * data.length);
//       selectedIndices.add(randomIndex);
//     }

//     setInitialIndices(Array.from(selectedIndices));
//   }, [data.length]);

//   if (initialIndices.length === 0) {
//     return null;
//   }

//   return (
//     <div className="relative w-full h-auto px-4">
//       {/* Carousel Container */}
//       <div className="flex flex-wrap justify-center gap-6">
//         {initialIndices.map((index, carouselIndex) => (
//           <Carousel
//             key={carouselIndex}
//             data={data}
//             carouselId={`carousel-${carouselIndex}`}
//             initialIndex={index}
//           />
//         ))}
//       </div>

//       {/* View All Products Button */}
//       <div className="flex justify-center mt-6">
//         <Button
//           asChild
//           className="px-6 py-3 text-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 rounded-lg"
//         >
//           <Link href="/search">View All Products</Link>
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default CarouselWithButton;


//  "use client";

//  import { Button } from "./ui/button";
//  import Link from "next/link";
//  import Image from "next/image";
//  import { useState, useEffect } from "react";

//  type Product = {
//    id: number;
//    name: string;
//    slug: string;
//    banner: string;
//    price: number | null;
//  };

//  type CarouselProps = {
//    data: Product[];
//    carouselId: string;
//    initialIndex: number; };


// const Carousel = ({ data, carouselId, initialIndex }: CarouselProps) => {
//   const [currentIndex, setCurrentIndex] = useState<number>(initialIndex);

//   const showSlide = (index: number) => {
//     setCurrentIndex(index % data.length);
//   };

//   return (
//     <div id={carouselId} className="relative w-auto mx-4 h-auto">
//       {/* Carousel Wrapper */}
//       <div className="relative h-auto overflow-hidden rounded-lg shadow-md m-auto">
//         {data.map((product, index) => (
//           <div
//             key={product.id}
//             className={`${
//               currentIndex === index ? "block" : "hidden"
//             } duration-700 ease-in-out`}
//           >
//             <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
//               <Link href={`/product/${product.slug}`}>
//                 <Image
//                   src={product.banner}
//                   alt={product.name}
//                   width={384}
//                   height={150}
//                   className="rounded-t-lg object-cover w-full h-auto "
//                 />
//               </Link>
//               <div className="p-2 mt-0">
//                 <Link href={`/product/${product.slug}`}>
//                   <h5 className="mb-2 text-sm font-bold tracking-tight text-gray-900 dark:text-white">
//                     {product.name}
//                   </h5>
//                 </Link>
//                 <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
//                   {product.price ? `$${product.price}` : "Fiyat Bilgisi Yok"}
//                 </p>
//                 <div className="flex justify-center items-center">
//                 <Link
//                   href={`/product/${product.slug}`}
//                   className="inline-flex items-center px-2 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
//                 >
//                   View Product
//                   <svg
//                     className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
//                     aria-hidden="true"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 14 10"
//                   >
//                     <path
//                       stroke="currentColor"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M1 5h12m0 0L9 1m4 4L9 9"
//                     />
//                   </svg>
//                 </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Controls */}
//       <div className="absolute flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
//         {data.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => showSlide(index)}
//             className={`w-3 h-3 rounded-full ${currentIndex === index}`}
//             aria-label={`Slide ${index + 1}`}
//           ></button>
//           //   <button
//           //   key={index}
//           //   onClick={() => showSlide(index)}
//           //   className={`w-3 h-3 rounded-full ${
//           //     currentIndex === index ? "bg-blue-500" : "bg-gray-300"
//           //   }`}
//           //   aria-label={`Slide ${index + 1}`}
//           // ></button>
//         ))}
//       </div>
//     </div>
//   );
// };

// const CarouselWithButton = ({ data }: { data: Product[] }) => {
//   const [initialIndices, setInitialIndices] = useState<number[]>([]);

//   useEffect(() => {
//     const selectedIndices: Set<number> = new Set();

//     while (selectedIndices.size < 4) {
//       const randomIndex = Math.floor(Math.random() * data.length);
//       selectedIndices.add(randomIndex);
//     }

//     setInitialIndices(Array.from(selectedIndices));
//   }, [data.length]);

//   if (initialIndices.length === 0) {
//     return null; // Indices belirlenene kadar boş döndür
//   }

//   return (
//     <div className="relative w-full h-auto">
//       {/* Carousel Container */}
//       <div className="flex flex-row justify-center space-x-6">
//         {initialIndices.map((index, carouselIndex) => (
//           <Carousel
//             key={carouselIndex}
//             data={data}
//             carouselId={`carousel-${carouselIndex}`}
//             initialIndex={index}
//           />
//         ))}
//       </div>

//       {/* View All Products Button */}
//       <div className="flex justify-center mt-6">
//         <Button
//           asChild
//           className="px-6 py-3 text-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 rounded-lg"
//         >
//           <Link href="/search">View All Products</Link>
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default CarouselWithButton;

"use client";

import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

type Product = {
  id: number;
  name: string;
  slug: string;
  banner: string;
  price: number | null;
};

type CarouselProps = {
  data: Product[];
  carouselId: string;
  initialIndex: number;
};

const Carousel = ({ data, carouselId, initialIndex }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(initialIndex);

  const showSlide = (index: number) => {
    if (data.length > 0) {
      setCurrentIndex(index % data.length);
    }
  };

  return (
    <div id={carouselId} className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto h-auto">
      {/* Carousel Wrapper */}
      <div className="relative h-auto overflow-hidden rounded-lg shadow-md mx-auto">
        {data.map((product, index) => (
          <div
            key={product.id}
            className={`${
              currentIndex === index ? "block" : "hidden"
            } duration-700 ease-in-out`}
          >
            <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <Link href={`/product/${product.slug}`}>
                <Image
                  src={product.banner || "/default-placeholder.png"} // Default placeholder image
                  alt={product.name}
                  width={384}
                  height={150}
                  className="rounded-t-lg object-cover w-full h-auto"
                />
              </Link>
              <div className="p-4">
                <Link href={`/product/${product.slug}`}>
                  <h5 className="mb-2 text-sm font-bold tracking-tight text-gray-900 dark:text-white">
                    {product.name}
                  </h5>
                </Link>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {product.price ? `$${product.price}` : "Price Not Available"}
                </p>
                <div className="flex justify-center items-center">
                  <Link
                    href={`/product/${product.slug}`}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    View Product
                    <svg
                      className="rtl:rotate-180 w-4 h-4 ml-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="absolute flex space-x-2 -translate-x-1/2 bottom-5 left-1/2">
        {data.map((_, index) => (
          <button
            key={index}
            onClick={() => showSlide(index)}
            aria-label={`Slide ${index + 1}`}
          ></button>
          // <button
          //   key={index}
          //   onClick={() => showSlide(index)}
          //   className={`w-3 h-3 rounded-full ${
          //     currentIndex === index ? "bg-blue-500" : "bg-gray-300"
          //   }`}
          //   aria-label={`Slide ${index + 1}`}
          // ></button>
        ))}
      </div>
    </div>
  );
};

const CarouselButton = ({ data }: { data: Product[] }) => {
  const [initialIndices, setInitialIndices] = useState<number[]>([]);

  useEffect(() => {
    if (data.length > 0) {
      const selectedIndices: Set<number> = new Set();

      while (selectedIndices.size < Math.min(4, data.length)) {
        const randomIndex = Math.floor(Math.random() * data.length);
        selectedIndices.add(randomIndex);
      }

      setInitialIndices(Array.from(selectedIndices));
    }
  }, [data]);

  if (initialIndices.length === 0) {
    return <div className="text-center mt-6">Loading...</div>; // Loading state
  }

  return (
    <div className="relative w-full h-auto px-4">
      {/* Carousel Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {initialIndices.map((index, carouselIndex) => (
          <Carousel
            key={carouselIndex}
            data={data}
            carouselId={`carousel-${carouselIndex}`}
            initialIndex={index}
          />
        ))}
      </div>

      {/* View All Products Button */}
      <div className="flex justify-center mt-6">
        <Button className="px-6 py-3 text-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 rounded-lg">
          <Link href="/search">View All Products</Link>
        </Button>
      </div>
    </div>
  );
};

export default CarouselButton;
