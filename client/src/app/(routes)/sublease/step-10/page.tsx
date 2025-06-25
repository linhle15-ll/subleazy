'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import ContentMediaFolder from '@/public/content-media-folder.png';
import LogoAndExitButton from '@/components/ui/commons/logo-and-exit-button';
import { ProgressBar } from '@/components/ui/post-form/progress-bar';
import { usePostCreateStore } from '@/stores/post-create.store';

export default function SubleaseStep10() {
  const [photos, setPhotos] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const post = usePostCreateStore((state) => state.post);
  const setPost = usePostCreateStore((state) => state.setPost);

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
        {photos?.length > 0 && (
          <div className="mt-4 text-sm text-gray-600">
            {photos?.length} photo {photos?.length > 1 ? 's' : ''} selected
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
