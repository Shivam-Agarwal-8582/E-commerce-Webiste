import React, { useState } from 'react';

export const ProductImageGallery = ({ images = [], productName = 'Product' }) => {
  const displayImages = images.length > 0
    ? images
    : ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80'];

  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnails */}
      {displayImages.length > 1 && (
        <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[500px] scrollbar-none py-1">
          {displayImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`relative h-20 w-20 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                selectedIndex === idx
                  ? 'border-indigo-600 ring-2 ring-indigo-600/20 shadow-md'
                  : 'border-slate-200 hover:border-slate-300 opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={img}
                alt={`${productName} thumbnail ${idx + 1}`}
                className="h-full w-full object-cover object-center"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main image viewer */}
      <div className="relative flex-1 aspect-square md:aspect-auto md:h-[500px] rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-sm flex items-center justify-center p-4">
        <img
          src={displayImages[selectedIndex]}
          alt={productName}
          className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute bottom-3 right-4 bg-slate-900/60 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
          {selectedIndex + 1} / {displayImages.length}
        </div>
      </div>
    </div>
  );
};

export default ProductImageGallery;
