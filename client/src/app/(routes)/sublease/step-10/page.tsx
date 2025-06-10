'use client';

import { useRef, useState } from 'react';
// import Link from 'next/link';
import Image from 'next/image';
import ContentMediaFolder from '@/public/content-media-folder.png';
import LogoAndExitButton from '@/components/ui/commons/logo-and-exit-button';
import ProgressBar from '@/components/ui/progress-bar/progress-bar';

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
    <div className="form-border flex flex-col gap-6 relative mb-15">
      <LogoAndExitButton buttonName="Save & Exit" />

      <div className="flex items-center gap-4">
        <div className="form-heading-number-orange">2</div>
        <div className="form-h1">Make your place stand out - Photos</div>
      </div>
      <div className="form-h2">Add some photos of your place</div>
      <div className="-mt-5 mb-5">
        Add 5 photos to get started. You can add more or edit them after
        publishing your post.
      </div>

      {/* Photo upload box */}
      <div className="flex flex-col items-center justify-center border border-gray-700 rounded-2xl min-h-[320px] ml-48 mr-48 mb-8 relative">
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

      <ProgressBar
        currentStep={9}
        totalSteps={12}
        buttons={[
          {
            text: 'Back',
            url: '/sublease/step-9',
            variant: 'secondary',
          },
          {
            text: 'Next',
            url: '/sublease/step-11',
            variant: 'primary',
          },
        ]}
      />
    </div>
  );
}
