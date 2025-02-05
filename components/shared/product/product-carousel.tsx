'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Product } from '@/types';
import Autoplay from 'embla-carousel-autoplay';
import Link from 'next/link';
import Image from 'next/image';

const ProductCarousel = ({ data }: { data: Product[] }) => {
  // İlk 3 indeksi sabit tut
  const fixedProducts = [data[0], data[1], data[2]].filter(Boolean);

  return (
    <Carousel
      className="w-full mb-12"
      opts={{
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 10000,
          stopOnInteraction: true,
          stopOnMouseEnter: true,
        }),
      ]}
    >
      <CarouselContent>
        {fixedProducts.map((product: Product) => (
          <CarouselItem key={product.id}>
            <Link href={`/product/${product.slug}`}>
              <div className="relative mx-auto group">
                {product.banner && (
                  <Image
                    src={product.banner}
                    alt={product.name}
                    height="150"
                    width="0"
                    sizes="100vw"
                    className="w-auto h-96 object-cover rounded-lg shadow-lg group-hover:opacity-80 transition-opacity duration-300"
                  />
                )}
                <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-gray-900 via-transparent to-transparent group-hover:from-gray-800">
                  <div className="text-center p-4">
                    <h2 className="text-2xl font-bold text-white group-hover:scale-105 transition-transform duration-300">
                      {product.name}
                    </h2>
                    <p className="mt-2 text-lg font-medium text-gray-300">
                      {product.price ? `$${product.price}` : ''}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default ProductCarousel;
