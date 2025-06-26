'use client';

import { useRef, useState, useEffect } from 'react';
// import Link from 'next/link';
import Image from 'next/image';
import ContentMediaFolder from '@/public/content-media-folder.png';
import LogoAndExitButton from '@/components/ui/commons/logo-and-exit-button';
import ProgressBar from '@/components/ui/progress-bar/progress-bar';
import { uploadToCloudinary } from '@/lib/utils/cloudinary';
import { toast } from 'sonner';
import { useFormStore } from '@/components/store/formStore';

export default function SubleaseStep10() {
  const [photos, setPhotos] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { media, setField } = useFormStore();

  // Reset media field when component mounts
  useEffect(() => {
    setField('media', []);
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newPhotos = Array.from(e.target.files);
      setPhotos(newPhotos);

      // Upload photos to Cloudinary
      setIsUploading(true);
      try {
        const uploadPromises = newPhotos.map((photo) =>
          uploadToCloudinary(photo)
        );
        const urls = await Promise.all(uploadPromises);

        // Update form store with new URLs
        setField('media', urls);

        toast.success('Photos uploaded successfully!');
      } catch (error) {
        console.error('Error uploading photos:', error);
        toast.error('Failed to upload photos. Please try again.');
      } finally {
        setIsUploading(false);
      }
    }
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleRemovePhoto = (indexToRemove: number) => {
    const updatedMedia = media.filter((_, index) => index !== indexToRemove);
    setField('media', updatedMedia);
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
          aria-label="Upload photos"
        />
        <button
          type="button"
          className="btn-primary px-6 py-2 mb-4 mt-8"
          onClick={openFilePicker}
          disabled={isUploading}
        >
          {isUploading ? 'Uploading...' : 'Add your photos'}
        </button>

        {/* Show uploaded photos */}
        {media.length > 0 && (
          <div className="grid grid-cols-3 gap-4 p-4 w-full">
            {media.map((url, index) => (
              <div key={index} className="relative aspect-square group">
                <Image
                  src={url}
                  alt={`Uploaded photo ${index + 1}`}
                  fill
                  className="object-cover rounded-lg"
                />
                <button
                  onClick={() => handleRemovePhoto(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Remove photo"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Placeholder illustration */}
        {media.length === 0 && (
          <div className="flex flex-col items-center justify-center">
            <Image
              src={ContentMediaFolder}
              alt="Upload illustration"
              width={120}
              height={120}
            />
          </div>
        )}

        {/* Show selected file names */}
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
