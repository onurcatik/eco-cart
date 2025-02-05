// import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { getProductBySlug } from '@/lib/actions/product.actions';
import ProductPrice from '@/components/shared/product/product-price';
import ProductImages from '@/components/shared/product/product-images';
import AddToCart from '@/components/shared/product/add-to-cart';
import { getMyCart } from '@/lib/actions/cart.actions';
import ReviewList from './review-list';
import { auth } from '@/auth';
// import Rating from '@/components/shared/product/rating';
import CollapsibleSection from '@/components/CollapsileSection';

const renderStars = (rating: number) => {
  const totalStars = 5; // Total number of stars
  const filledStars = Math.round(rating); // Number of filled stars
  const emptyStars = totalStars - filledStars; // Number of empty stars

  const stars = [];

  // Add filled stars
  for (let i = 0; i < filledStars; i++) {
    stars.push('★');
  }

  // Add empty stars
  for (let i = 0; i < emptyStars; i++) {
    stars.push('☆');
  }

  // Rating description
  let description = '';
  if (rating >= 4.5) {
    description = 'Excellent';
  } else if (rating >= 3.5) {
    description = 'Good';
  } else if (rating >= 2.5) {
    description = 'Average';
  } else if (rating >= 1.5) {
    description = 'Below Average';
  } else {
    description = 'Poor';
  }

  return {
    stars: stars.join(' '), // Join the stars into a single string with spaces
    description, // Rating description
  };
};

const ProductDetailsPage = async (props: { params: Promise<{ slug: string }> }) => {
  const { slug } = await props.params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return <div>Product not found</div>;
  }

  const session = await auth();
  const userId = session?.user?.id;
  const cart = await getMyCart();

  // Get the rating stars and description
  const { stars, description } = renderStars(Number(product.rating));

  return (
    <>
      <section className="max-w-7xl mx-auto px-4 py-10 bg-white">
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
    {/* Image Column */}
    <div className="flex justify-center mb-6 lg:mb-0">
      <ProductImages images={product.images} />
    </div>

    {/* Details Column */}
    <div className="col-span-2 space-y-6">
      <div>
        <p className="text-sm text-gray-500">{product.brand} {product.category}</p>
        <h1 className="text-2xl lg:text-4xl font-bold">{product.name}</h1>
        <p className="text-sm text-gray-700">{product.numReviews} reviews</p>

        {/* Rating */}
        <div className="flex items-center space-x-2 mt-4">
          <span className="text-yellow-500">{stars}</span>
          <span className="text-sm text-gray-600">{description}</span>
        </div>
      </div>

      <div className="space-y-4">
        <CollapsibleSection title="Product Features">
          <p>{product.description || 'Product features will be listed here.'}</p>
        </CollapsibleSection>
        <CollapsibleSection title="Payment Options">
          <p>Paypal, Stripe, Cash on Delivery</p>
        </CollapsibleSection>
        <CollapsibleSection title="Guarantee and Delivery">
          <p>2 years warranty. Delivery within 2-5 business days.</p>
        </CollapsibleSection>
      </div>
    </div>
  </div>

  {/* Price and Add to Cart Section */}
  <Card className="mt-10 lg:mt-12 p-6 rounded-lg shadow-md lg:absolute lg:right-4 lg:top-20 lg:w-80">
    <CardContent>
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-lg font-semibold">Price:</span>
          <ProductPrice value={Number(product.price)} />
        </div>
        <div className="flex justify-between">
          <span className="text-lg font-semibold">Status:</span>
          {product.stock > 0 ? (
            <span className="text-green-600">In Stock</span>
          ) : (
            <span className="text-red-600">Out of Stock</span>
          )}
        </div>
        <div>
          <label className="block text-lg font-semibold">Quantity:</label>
          <input
            type="number"
            min="1"
            defaultValue="1"
            className="mt-2 w-full border border-gray-300 p-2 rounded-lg"
            placeholder="Enter quantity"
          />
        </div>
        {product.stock > 0 && (
          <AddToCart
            cart={cart}
            item={{
              productId: product.id,
              name: product.name,
              slug: product.slug,
              price: product.price.toString(),
              qty: 1,
              image: product.images![0],
            }}
          />
        )}
      </div>
    </CardContent>
  </Card>

  {/* Reviews Section */}
  <section className="bg-gray-50 py-12 mt-16">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-xl lg:text-2xl font-bold mb-6">Customer Reviews</h2>
      <ReviewList
        userId={userId || ''}
        productId={product.id}
        productSlug={product.slug}
      />
    </div>
  </section>
</section>

    </>
  );
};

export default ProductDetailsPage;



// import { Badge } from '@/components/ui/badge';
// import { Card, CardContent } from '@/components/ui/card';
// import { getProductBySlug } from '@/lib/actions/product.actions';
// import ProductPrice from '@/components/shared/product/product-price';
// import ProductImages from '@/components/shared/product/product-images';
// import AddToCart from '@/components/shared/product/add-to-cart';
// import { getMyCart } from '@/lib/actions/cart.actions';
// import ReviewList from './review-list';
// import { auth } from '@/auth';
// import Rating from '@/components/shared/product/rating';

// const ProductDetailsPage = async (props: { params: Promise<{ slug: string }> }) => {
//   const { slug } = await props.params;
//   const product = await getProductBySlug(slug);

//   if (!product) {
//     return <div>Product not found</div>;
//   }

//   const session = await auth();
//   const userId = session?.user?.id;
//   const cart = await getMyCart();

//   return (
//     <>
//       {/* Hero Section */}
//       <section className="relative bg-gradient-to-r from-purple-600 to-blue-500 text-white py-20">
//         <div className="absolute inset-0 bg-black opacity-40"></div>
//         <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
//           <h1 className="text-5xl font-extrabold leading-tight">{product.name}</h1>
//           <p className="mt-4 text-xl font-light">{product.brand} - {product.category}</p>
//           <Rating value={Number(product.rating)} />
//           <div className="mt-6 flex items-center justify-center gap-6">
//             <ProductPrice value={Number(product.price)} className="text-3xl font-bold bg-yellow-300 px-6 py-2 rounded-full shadow-lg" />
//             {product.stock > 0 ? (
//               <Badge className="bg-green-500 text-white px-4 py-2 rounded-full shadow-lg">In Stock</Badge>
//             ) : (
//               <Badge className="bg-red-500 text-white px-4 py-2 rounded-full shadow-lg">Out Of Stock</Badge>
//             )}
//           </div>
//         </div>
//       </section>

//       {/* Product Info Section */}
//       <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 py-12">
//         <div className="flex justify-center items-center">
//           <ProductImages images={product.images} />
//         </div>
//         <div className="flex flex-col justify-between p-6">
//           <div className="space-y-4">
//             <h2 className="text-2xl font-semibold">Description</h2>
//             <p className="text-lg text-gray-700">{product.description}</p>
//           </div>

//           {/* Add to Cart */}
//           <Card className="mt-6 shadow-2xl border border-gray-300 rounded-xl overflow-hidden relative bottom-">
//             <CardContent className="p-4">
//               <div className="flex justify-between items-center mb-12">
//                 <div className="text-lg font-semibold">Price</div>
//                 <div>
//                   <ProductPrice value={Number(product.price)} />
//                 </div>
//               </div>
//               {product.stock > 0 && (
//                 <div className="mt-4">
//                   <AddToCart
//                     cart={cart}
//                     item={{
//                       productId: product.id,
//                       name: product.name,
//                       slug: product.slug,
//                       price: product.price.toString(),
//                       qty: 1,
//                       image: product.images![0],
//                     }}
//                   />
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </div>
//       </section>

//       {/* Interactive Reviews Section */}
//       <section className="bg-gray-100 py-20">
//         <div className="max-w-7xl mx-auto text-center">
//           <h2 className="text-4xl font-bold mb-8">Customer Reviews</h2>
//           <ReviewList
//             userId={userId || ''}
//             productId={product.id}
//             productSlug={product.slug}
//             className="space-y-6"
//           />
//         </div>
//       </section>
//     </>
//   );
// };

// export default ProductDetailsPage;

