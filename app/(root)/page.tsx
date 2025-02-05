import React from 'react';

import ProductList from '@/components/shared/product/product-list';
import {
  getLatestProducts,
  getFeaturedProducts,
} from '@/lib/actions/product.actions';
import ProductCarousel from '@/components/shared/product/product-carousel';
// import ViewAllProductsButton from '@/components/view-all-products-button';
import IconBoxes from '@/components/icon-boxes';
import DealCountdown from '@/components/deal-countdown';
import CarouselButton from '@/components/view-all-products-button';
import CategoryPicture from '@/components/CategoryPicture'

const Homepage = async () => {
  const latestProducts = (await getLatestProducts()).map(product => ({
    ...product,
    id: product.id,
    price: product.price.toString(),
    rating: product.rating.toString(),
  }));

  const featuredProducts = (await getFeaturedProducts()).map(product => ({
    ...product,
    id: String(product.id),
    price: product.price.toString(),
    rating: product.rating.toString(),
  }));
  
  return (
    <>
      {featuredProducts.length > 0 && (
        <ProductCarousel data={featuredProducts} />
      )}
      <ProductList data={latestProducts} title="Newest Arrivals" limit={4} />
      <CategoryPicture />
      <CarouselButton data={featuredProducts.map(product => ({ ...product, id: Number(product.id), price: Number(product.price), banner: product.banner || '' }))} />
      <DealCountdown />
      <IconBoxes />
    </>
  );
};

export default Homepage;

