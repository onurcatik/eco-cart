import Link from 'next/link';
import {
  getAllProducts,
  getAllCategories,
} from '@/lib/actions/product.actions';
import Image from 'next/image';

// Define placeholder variables for query parameters
const q = '';
const category = '';
const price = '';
const rating = '';
const sort = '';
const page = 1;

// Fetch products and categories
const products = await getAllProducts({
  query: q,
  category,
  price,
  rating,
  sort,
  page: Number(page),
});

const categories = await getAllCategories();

const CategoryCards = () => {
  // Helper function to get a random image for a category
  const getCategoryImage = (categoryName: string) => {
    const matchingProducts = products.data.filter(
      (product) => product.category === categoryName
    );

    if (matchingProducts.length > 0) {
      const randomIndex = Math.floor(Math.random() * matchingProducts.length);
      return (
        matchingProducts[randomIndex].images[0] || '/path/to/default-image.jpg'
      );
    }

    return '/path/to/default-image.jpg'; // Fallback image
  };

  return (
    <div className='mb-8'>
      <h3 className='text-xl font-bold text-gray-800 mb-6'>
        Explore Categories
      </h3>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {categories.slice(0, 3).map((categoryItem) => (
          <div
            key={categoryItem.category}
            className='bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 duration-200'
          >
            {/* Display random category image */}
            <Image
              src={getCategoryImage(categoryItem.category)}
              alt={categoryItem.category}
              className='w-full h-48 object-cover'
              width={500} // Set the width of the image (required)
              height={300} // Set the height of the image (required)
              loading='lazy' // Optional: lazy loading is enabled by default in Next.js
            />
            <div className='p-4'>
              <h4 className='text-lg font-semibold text-gray-900'>
                {categoryItem.category}
              </h4>
              <p className='text-sm text-gray-600 mt-2'>
                Discover top products in the {categoryItem.category} category.
              </p>
              <Link
                href={`/search?category=${categoryItem.category}`}
                className='inline-block mt-4 text-indigo-600 hover:text-indigo-800 font-medium'
              >
                Explore {categoryItem.category}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryCards;
