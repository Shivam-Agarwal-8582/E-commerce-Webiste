import React, { useRef } from 'react';
import { HiOutlinePhoto, HiOutlineTrash, HiOutlinePlus } from 'react-icons/hi2';

export const ImageUploadPreview = ({ images = [], onChange, maxImages = 6 }) => {
  const fileInputRef = useRef(null);

  const handleFilesSelected = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    // Convert local files to base64 or object URLs for instant preview & persistence
    const readers = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then((newImages) => {
      const combined = [...images, ...newImages].slice(0, maxImages);
      onChange(combined);
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    const updated = images.filter((_, idx) => idx !== indexToRemove);
    onChange(updated);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
          Product Images (Max {maxImages})
        </label>
        <span className="text-xs text-slate-400">{images.length} / {maxImages} uploaded</span>
      </div>

      {/* Grid of uploaded images */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
        {images.map((img, idx) => (
          <div
            key={idx}
            className="group relative aspect-square rounded-xl overflow-hidden border border-slate-200 bg-slate-50 shadow-sm"
          >
            <img
              src={img}
              alt={`Product preview ${idx + 1}`}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button
                type="button"
                onClick={() => handleRemoveImage(idx)}
                className="p-1.5 rounded-lg bg-rose-600 text-white hover:bg-rose-700 transition-colors shadow-md"
                title="Remove image"
              >
                <HiOutlineTrash className="h-4 w-4" />
              </button>
            </div>
            {idx === 0 && (
              <span className="absolute bottom-1 left-1 bg-slate-900/80 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                Cover
              </span>
            )}
          </div>
        ))}

        {images.length < maxImages && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="aspect-square rounded-xl border-2 border-dashed border-slate-300 hover:border-indigo-500 hover:bg-indigo-50/40 transition-colors flex flex-col items-center justify-center text-slate-400 hover:text-indigo-600 gap-1"
          >
            <HiOutlinePlus className="h-6 w-6" />
            <span className="text-[11px] font-bold">Add Image</span>
          </button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleFilesSelected}
        className="hidden"
      />
    </div>
  );
};

export default ImageUploadPreview;
