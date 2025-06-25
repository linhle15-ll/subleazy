'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import ContentMediaFolder from '@/public/content-media-folder.png';
import { usePostEditStore } from '@/stores/post-edit.store';

export default function SubleaseFormPhotos() {
  const [photos, setPhotos] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const post = usePostEditStore((state) => state.post);
  const setPost = usePostEditStore((state) => state.setPost);

  useEffect(() => {
    setPost({
      ...post,
      media: [
        'https://cdn.discordapp.com/attachments/888258860727562271/953957803616264242/meo-toat-mo-hoi-khong-biet-noi-gi.png?ex=684df2b0&is=684ca130&hm=ad0929ad7dc3eb1b9ef7485075eff11854a2c471d7bc345634db5681c09e124e&',
        'link',
        'link',
        'link',
        'link',
      ],
    });
    // TODO: remove this part and set up cloudinary for photos
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhotos(Array.from(e.target.files));
    }
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col gap-6 relative mb-15 mr-8">
      <div className="form-h1">Photos</div>
      <div className="-mt-5 mb-5">
        High-quality photos attract more interest. Feel free to update or add
        more below. At lease 5 photos are required.
      </div>

      {/* Photo upload box */}
      <div className="flex flex-col items-center justify-center border border-gray-700 rounded-2xl min-h-[320px] ml-24 mr-24 relative">
        <input
          type="file"
          accept="image/*"
          multiple
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />
        <button
          type="button"
          className="btn-primary px-6 py-2 mb-4 mt-8"
          onClick={openFilePicker}
        >
          Edit your photos
        </button>
        {/* Placeholder illustration */}
        <div className="flex flex-col items-center justify-center">
          <Image
            src={ContentMediaFolder}
            alt="Upload illustration"
            width={120}
            height={120}
          />
        </div>
        {/* Show selected file names (optional) */}
        {photos.length > 0 && (
          <div className="mt-4 text-sm text-gray-600">
            {photos.length} photo{photos.length > 1 ? 's' : ''} selected
          </div>
        )}
      </div>
    </div>
  );
}
