'use client';
import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const ProductImages = ({ images }: { images: string[] }) => {
  const [current, setCurrent] = useState(0);

  return (
    <div className='space-y-4'>
  <Image
      src={images[current]}
      alt='product image'
      width={384}
      height={224}
      className="w-96 h-[350px] object-cover rounded-lg shadow-lg group-hover:opacity-80 transition-opacity duration-300"
    />
      <div className='flex'>
        {images.map((image, index) => (
          <div
            key={image}
            onClick={() => setCurrent(index)}
            className={cn(
              'border mr-2 cursor-pointer hover:border-orange-600',
              current === index && 'border-orange-500'
            )}
          >
            <Image src={image} alt='image' width={100} height={100} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
