'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ContentMediaFolder from '@/public/content-media-folder.png';

export default function SubleaseStep10() {
  const [photos, setPhotos] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhotos(Array.from(e.target.files));
    }
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl border-2 border-primaryOrange p-10 mt-12 shadow-lg flex flex-col gap-8 relative min-h-[80vh]">
      {/* Save & Exit button */}
      <Link
        href="/"
        className="absolute top-6 right-6 flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
      >
        Save & Exit
      </Link>

      {/* Step indicator and title */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center justify-center w-10 h-10 border-2 border-primaryOrange rounded-full text-xl font-bold text-primaryOrange">
          2
        </div>
        <div className="text-xl font-bold">
          Make your place stand out - Photos
        </div>
      </div>
      <div className="mb-2 font-bold text-lg">
        Add some photos of your place
      </div>
      <div className="text-gray-400 text-sm mb-8">
        Add 5 photos to get started. You can add more or edit them after
        publishing your post.
      </div>

      {/* Photo upload box */}
      <div className="flex flex-col items-center justify-center border border-gray-700 rounded-2xl min-h-[320px] mb-8 relative">
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
          Add your photos
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

      {/* Navigation buttons and progress bar */}
      <div className="flex flex-col gap-4 mt-auto">
        <div className="flex justify-end gap-4">
          <Link href="/sublease/step-9" className="btn-secondary w-32">
            Back
          </Link>
          <Link
            href="/sublease/step-11"
            className={`btn-primary w-32 text-center ${photos.length < 5 ? 'opacity-50 pointer-events-none' : ''}`}
          >
            Next
          </Link>
        </div>
        <div className="flex items-center gap-4 mt-2">
          <div className="flex-1">
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-primaryOrange"
                style={{ width: '83%' }}
              />
            </div>
          </div>
          <span className="text-gray-500 text-sm min-w-fit">Step 10 of 12</span>
        </div>
      </div>
    </div>
  );
}
