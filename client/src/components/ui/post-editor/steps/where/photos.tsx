'use client';

import { useRef, useState } from 'react';
// import Link from 'next/link';
import Image from 'next/image';
import ContentMediaFolder from '@/public/content-media-folder.png';

export default function SubleaseFormPhotos() {
  const [photos, setPhotos] = useState<File[]>([]);
  //   const { setPost } = usePostEditorStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  //   const existingMedia = usePostEditorStore((state) => state.post.media);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setPhotos(files);
      //   setPost({
      //     media: {
      //       ...existingMedia,
      //       files,
      //   }});
    }
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col gap-6 relative mb-15">
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
