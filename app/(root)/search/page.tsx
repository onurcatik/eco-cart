// import ProductCard from '@/components/shared/product/product-card';
// import { Button } from '@/components/ui/button';
// import {
//   getAllProducts,
//   getAllCategories,
// } from '@/lib/actions/product.actions';
// import Link from 'next/link';

// const prices = [
//   {
//     name: '$1 to $50',
//     value: '1-50',
//   },
//   {
//     name: '$51 to $100',
//     value: '51-100',
//   },
//   {
//     name: '$101 to $200',
//     value: '101-200',
//   },
//   {
//     name: '$201 to $500',
//     value: '201-500',
//   },
//   {
//     name: '$501 to $1000',
//     value: '501-1000',
//   },
// ];

// const ratings = [4, 3, 2, 1];

// const sortOrders = ['newest', 'lowest', 'highest', 'rating'];

// export async function generateMetadata(props: {
//   searchParams: Promise<{
//     q: string;
//     category: string;
//     price: string;
//     rating: string;
//   }>;
// }) {
//   const {
//     q = 'all',
//     category = 'all',
//     price = 'all',
//     rating = 'all',
//   } = await props.searchParams;

//   const isQuerySet = q && q !== 'all' && q.trim() !== '';
//   const isCategorySet =
//     category && category !== 'all' && category.trim() !== '';
//   const isPriceSet = price && price !== 'all' && price.trim() !== '';
//   const isRatingSet = rating && rating !== 'all' && rating.trim() !== '';

//   if (isQuerySet || isCategorySet || isPriceSet || isRatingSet) {
//     return {
//       title: `
//       Search ${isQuerySet ? q : ''} 
//       ${isCategorySet ? `: Category ${category}` : ''}
//       ${isPriceSet ? `: Price ${price}` : ''}
//       ${isRatingSet ? `: Rating ${rating}` : ''}`,
//     };
//   } else {
//     return {
//       title: 'Search Products',
//     };
//   }
// }

// const SearchPage = async (props: {
//   searchParams: Promise<{
//     q?: string;
//     category?: string;
//     price?: string;
//     rating?: string;
//     sort?: string;
//     page?: string;
//   }>;
// }) => {
//   const {
//     q = 'all',
//     category = 'all',
//     price = 'all',
//     rating = 'all',
//     sort = 'newest',
//     page = '1',
//   } = await props.searchParams;

//   // Construct filter url
//   const getFilterUrl = ({
//     c,
//     p,
//     s,
//     r,
//     pg,
//   }: {
//     c?: string;
//     p?: string;
//     s?: string;
//     r?: string;
//     pg?: string;
//   }) => {
//     const params = { q, category, price, rating, sort, page };

//     if (c) params.category = c;
//     if (p) params.price = p;
//     if (s) params.sort = s;
//     if (r) params.rating = r;
//     if (pg) params.page = pg;

//     return `/search?${new URLSearchParams(params).toString()}`;
//   };

//   const products = await getAllProducts({
//     query: q,
//     category,
//     price,
//     rating,
//     sort,
//     page: Number(page),
//   });

//   const categories = await getAllCategories();

//   return (
//     <div className='grid md:grid-cols-5 md:gap-5'>
//       <div className='filter-links'>
//         {/* Category Links */}
//         <div className='text-xl mb-2 mt-3'>Department</div>
//         <div>
//           <ul className='space-y-1'>
//             <li>
//               <Link
//                 className={`${
//                   (category === 'all' || category === '') && 'font-bold'
//                 }`}
//                 href={getFilterUrl({ c: 'all' })}
//               >
//                 Any
//               </Link>
//             </li>
//             {categories.map((x) => (
//               <li key={x.category}>
//                 <Link
//                   className={`${category === x.category && 'font-bold'}`}
//                   href={getFilterUrl({ c: x.category })}
//                 >
//                   {x.category}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>
//         {/* Price Links */}
//         <div className='text-xl mb-2 mt-8'>Price</div>
//         <div>
//           <ul className='space-y-1'>
//             <li>
//               <Link
//                 className={`${price === 'all' && 'font-bold'}`}
//                 href={getFilterUrl({ p: 'all' })}
//               >
//                 Any
//               </Link>
//             </li>
//             {prices.map((p) => (
//               <li key={p.value}>
//                 <Link
//                   className={`${price === p.value && 'font-bold'}`}
//                   href={getFilterUrl({ p: p.value })}
//                 >
//                   {p.name}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>
//         {/* Rating Links */}
//         <div className='text-xl mb-2 mt-8'>Customer Ratings</div>
//         <div>
//           <ul className='space-y-1'>
//             <li>
//               <Link
//                 className={`${rating === 'all' && 'font-bold'}`}
//                 href={getFilterUrl({ r: 'all' })}
//               >
//                 Any
//               </Link>
//             </li>
//             {ratings.map((r) => (
//               <li key={r}>
//                 <Link
//                   className={`${rating === r.toString() && 'font-bold'}`}
//                   href={getFilterUrl({ r: `${r}` })}
//                 >
//                   {`${r} stars & up`}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//       <div className='md:col-span-4 space-y-4'>
//         <div className='flex-between flex-col md:flex-row my-4'>
//           <div className='flex items-center'>
//             {q !== 'all' && q !== '' && 'Query: ' + q}
//             {category !== 'all' && category !== '' && 'Category: ' + category}
//             {price !== 'all' && ' Price: ' + price}
//             {rating !== 'all' && ' Rating: ' + rating + ' stars & up'}
//             &nbsp;
//             {(q !== 'all' && q !== '') ||
//             (category !== 'all' && category !== '') ||
//             rating !== 'all' ||
//             price !== 'all' ? (
//               <Button variant={'link'} asChild>
//                 <Link href='/search'>Clear</Link>
//               </Button>
//             ) : null}
//           </div>
//           <div>
//             Sort by{' '}
//             {sortOrders.map((s) => (
//               <Link
//                 key={s}
//                 className={`mx-2 ${sort == s && 'font-bold'}`}
//                 href={getFilterUrl({ s })}
//               >
//                 {s}
//               </Link>
//             ))}
//           </div>
//         </div>
//         <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
//           {products.data.length === 0 && <div>No products found</div>}
//           {products.data.map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SearchPage;


import ProductCard from '@/components/shared/product/product-card';
import { Button } from '@/components/ui/button';
import {
  getAllProducts,
  getAllCategories,
} from '@/lib/actions/product.actions';
import Link from 'next/link';

const prices = [
  { name: '$1 to $50', value: '1-50' },
  { name: '$51 to $100', value: '51-100' },
  { name: '$101 to $200', value: '101-200' },
  { name: '$201 to $500', value: '201-500' },
  { name: '$501 to $1000', value: '501-1000' },
];

const ratings = [4, 3, 2, 1];
const sortOrders = ['Newest', 'Lowest', 'Highest', 'Rating'];

export async function generateMetadata(props: { searchParams: Promise<{ q: string; category: string; price: string; rating: string }> }) {
  const { q = 'all', category = 'all', price = 'all', rating = 'all' } =
    await props.searchParams;

  const isQuerySet = q && q !== 'all' && q.trim() !== '';
  const isCategorySet =
    category && category !== 'all' && category.trim() !== '';
  const isPriceSet = price && price !== 'all' && price.trim() !== '';
  const isRatingSet = rating && rating !== 'all' && rating.trim() !== '';

  if (isQuerySet || isCategorySet || isPriceSet || isRatingSet) {
    return {
      title: `Search ${isQuerySet ? q : ''} 
      ${isCategorySet ? `: Category ${category}` : ''}
      ${isPriceSet ? `: Price ${price}` : ''}
      ${isRatingSet ? `: Rating ${rating}` : ''}`,
    };
  } else {
    return { title: 'Search Products' };
  }
}

const SearchPage = async (props: { searchParams: Promise<{ q?: string; category?: string; price?: string; rating?: string; sort?: string; page?: string }> }) => {
  const { q = 'all', category = 'all', price = 'all', rating = 'all', sort = 'newest', page = '1' } =
    await props.searchParams;

  const getFilterUrl = ({ c, p, s, r, pg }: { c?: string; p?: string; s?: string; r?: string; pg?: string }) => {
    const params = { q, category, price, rating, sort, page };
    if (c) params.category = c;
    if (p) params.price = p;
    if (s) params.sort = s;
    if (r) params.rating = r;
    if (pg) params.page = pg;
    return `/search?${new URLSearchParams(params).toString()}`;
  };

  const products = await getAllProducts({ query: q, category, price, rating, sort, page: Number(page) });
  const categories = await getAllCategories();

  return (
    <div className="p-6 sm:p-8 md:p-12 min-h-screen w-full">
      {/* Sidebar and Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Sidebar */}
        <aside className="p-4 bg-white rounded-lg shadow md:col-span-1">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">Filters</h2>
          {/* Categories */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-700">Department</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  className={`block py-2 px-4 rounded-lg ${
                    category === 'all' ? 'bg-indigo-100 text-indigo-600 font-bold' : 'hover:bg-gray-100'
                  }`}
                  href={`/search?category=all`}
                >
                  Any
                </Link>
              </li>
              {categories.map((x) => (
                <li key={x.category}>
                  <Link
                    className={`block py-2 px-4 rounded-lg ${
                      category === x.category ? 'bg-indigo-100 text-indigo-600 font-bold' : 'hover:bg-gray-100'
                    }`}
                    href={`/search?category=${x.category}`}
                  >
                    {x.category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Price */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-700">Price</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  className={`block py-2 px-4 rounded-lg ${
                    price === 'all' ? 'bg-indigo-100 text-indigo-600 font-bold' : 'hover:bg-gray-100'
                  }`}
                  href={`/search?price=all`}
                >
                  Any
                </Link>
              </li>
              {prices.map((p) => (
                <li key={p.value}>
                  <Link
                    className={`block py-2 px-4 rounded-lg ${
                      price === p.value ? 'bg-indigo-100 text-indigo-600 font-bold' : 'hover:bg-gray-100'
                    }`}
                    href={`/search?price=${p.value}`}
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Ratings */}
          <div>
            <h3 className="text-lg font-medium text-gray-700">Customer Ratings</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  className={`block py-2 px-4 rounded-lg ${
                    rating === 'all' ? 'bg-indigo-100 text-indigo-600 font-bold' : 'hover:bg-gray-100'
                  }`}
                  href={`/search?rating=all`}
                >
                  Any
                </Link>
              </li>
              {ratings.map((r) => (
                <li key={r}>
                  <Link
                    className={`block py-2 px-4 rounded-lg ${
                      rating === r.toString() ? 'bg-indigo-100 text-indigo-600 font-bold' : 'hover:bg-gray-100'
                    }`}
                    href={`/search?rating=${r}`}
                  >
                    {r} stars & up
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <main className="md:col-span-4">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <div>
              {q !== 'all' && <span className="text-gray-700">Query: {q}</span>}
              {category !== 'all' && <span className="ml-2 text-gray-700">Category: {category}</span>}
              {price !== 'all' && <span className="ml-2 text-gray-700">Price: {price}</span>}
              {rating !== 'all' && <span className="ml-2 text-gray-700">Rating: {rating} stars & up</span>}
              {(q !== 'all' || category !== 'all' || price !== 'all' || rating !== 'all') && (
                <Button variant="link" asChild>
                  <Link href="/search" className="ml-4 text-red-500">
                    Clear All
                  </Link>
                </Button>
              )}
            </div>
            <div className="mt-4 sm:mt-0">
              <span className="text-gray-700">Sort by:</span>
              {sortOrders.map((s) => (
                <Link
                  key={s}
                  className={`ml-4 text-gray-700 ${
                    sort === s ? 'font-bold text-black underline' : ''
                  }`}
                  href={getFilterUrl({ s })}
                >
                  {s}
                </Link>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.data.length === 0 ? (
              <div className="col-span-full text-center text-gray-500">No products found</div>
            ) : (
              products.data.map((product) => (
                <ProductCard
                  key={product.id}
                  product={{ ...product, price: product.price.toString(), rating: product.rating.toString() }}
                />
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SearchPage;
