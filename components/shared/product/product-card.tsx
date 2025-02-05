// import Link from "next/link";
// import Image from "next/image";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { Product } from "@/types";

// import ProductPrice from "./product-price";

// const ProductCard = ({ product }: { product: Product }) => {
//   return (
//     <Card className="w-full max-w-sm">
//       <CardHeader className="p-0 items-center">
//         <Link href={`/product/${product.slug}`}>
//           <Image
//             src={product.images[0]}
//             alt={product.name}
//             height={300}
//             width={300}
//             priority={true}
//           />
//         </Link>
//       </CardHeader>
//       <CardContent className="p-4 grid gap-4">
//         <div className="text-xs">{product.brand}</div>
//         <Link href={`/product/${product.slug}`}>
//           <h2 className="text-xs font-medium">{product.name}</h2>
//         </Link>
//         <div className="flex-between gap-4">
//           <p>{product.rating} Stars</p>
//           {product.stock > 0 ? (
//             <ProductPrice value={Number(product.price)}
//             className="text-red-500"/>
//           ) : (
//             <p className="text-destructive">Out Of Stock</p>
//           )}
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default ProductCard;

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Product } from "@/types";

import ProductPrice from "./product-price";

const ProductCard = ({ product }: { product: Product }) => {
  // Function to render stars based on the rating
  const renderStars = (rating: number) => {
    const totalStars = 5; // Total number of stars
    const filledStars = Math.round(rating); // Number of filled stars
    const emptyStars = totalStars - filledStars; // Number of empty stars

    return (
      <>
        {Array.from({ length: filledStars }).map((_, i) => (
          <span key={`filled-${i}`} className="text-yellow-500">
            &#9733;
          </span> // Filled star
        ))}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <span key={`empty-${i}`} className="text-gray-300">
            &#9734;
          </span> // Empty star
        ))}
      </>
    );
  };

  return (
    <Card className="bg-white rounded-lg overflow-hidden shadow-lg  max-w-sm">
      <CardHeader className="relative">
        <Link href={`/product/${product.slug}`}>
          <Image
            src={product.images[0]}
            alt={product.name}
            width={384}
            height={224}
            className="w-96 h-56 object-cover rounded-lg shadow-lg group-hover:opacity-80 transition-opacity duration-300"
          />
        </Link>
        {/* {product.isOnSale && (
          <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 m-2 rounded-md text-sm font-medium">
            SALE
          </div>
        )} */}
      </CardHeader>
      <CardContent className="p-4">
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-lg font-medium mb-2">{product.name}</h3>
        </Link>
        {/* <p className="text-gray-600 text-sm mb-4">
          {product.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae ante vel eros fermentum faucibus sit amet euismod lorem."}
        </p> */}
        <div className="flex items-center mb-4">
          {renderStars(Number(product.rating))} {/* Render the stars */}
          <span className="ml-2 text-sm text-gray-600">({product.rating})</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-bold text-lg">
            <ProductPrice value={Number(product.price)} />
          </span>
          {product.stock <= 0 && (
            <span className="text-red-600 font-medium">Out Of Stock</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
