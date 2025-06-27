'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import ContentMediaFolder from '@/public/content-media-folder.png';
import LogoAndExitButton from '@/components/ui/commons/logo-and-exit-button';
import { ProgressBar } from '@/components/ui/post-form/progress-bar';
import { usePostCreateStore } from '@/stores/post-create.store';
import { uploadToCloudinary } from '@/lib/utils/cloudinary';

interface MediaFile {
  file: File;
  preview: string;
  type: 'image' | 'video';
  uploaded?: boolean;
  url?: string;
}

export default function SubleaseStep10() {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const post = usePostCreateStore((state) => state.post);
  const setPost = usePostCreateStore((state) => state.setPost);

  useEffect(() => {
    if (post.media && Array.isArray(post.media) && post.media.length > 0) {
      const loadedMedia: MediaFile[] = post.media.map((url) => ({
        file: null as any,
        preview: url,
        type: url.match(/\\.(mp4|mov)$/i) ? 'video' : 'image',
        uploaded: true,
        url,
      }));
      setMediaFiles(loadedMedia);
    }
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const newMediaFiles: MediaFile[] = [];

      for (const file of files) {
        const isVideo = file.type.startsWith('video/');
        const isImage = file.type.startsWith('image/');

        if (!isVideo && !isImage) {
          alert('Please select only image or video files');
          continue;
        }

        // Create preview URL
        const preview = URL.createObjectURL(file);

        newMediaFiles.push({
          file,
          preview,
          type: isVideo ? 'video' : 'image',
          uploaded: false,
        });
      }

      setMediaFiles((prev) => [...prev, ...newMediaFiles]);
    }
  };

  const uploadFiles = async () => {
    if (mediaFiles.length === 0) return;

    setIsUploading(true);
    const uploadedUrls: string[] = [];

    try {
      for (let i = 0; i < mediaFiles.length; i++) {
        const mediaFile = mediaFiles[i];
        if (mediaFile.uploaded) {
          uploadedUrls.push(mediaFile.url!);
          continue;
        }

        const url = await uploadToCloudinary(mediaFile.file);
        uploadedUrls.push(url);

        // Update the media file with uploaded status
        setMediaFiles((prev) =>
          prev.map((file, index) =>
            index === i ? { ...file, uploaded: true, url } : file
          )
        );
      }

      // Update post with uploaded URLs
      setPost({
        ...post,
        media: uploadedUrls,
      });
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Error uploading files. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const removeFile = (index: number) => {
    setMediaFiles((prev) => {
      const newFiles = prev.filter((_, i) => i !== index);
      // Revoke the preview URL to free memory
      URL.revokeObjectURL(prev[index].preview);
      return newFiles;
    });
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="form-border flex flex-col gap-6 relative mb-15">
      <LogoAndExitButton buttonName="Save & Exit" />

      <div className="flex items-center gap-4">
        <div className="form-heading-number-orange">2</div>
        <div className="form-h1">
          Make your place stand out - Photos & Videos
        </div>
      </div>
      <div className="form-h2">Add some photos and videos of your place</div>
      <div className="-mt-5 mb-5">
        Add 5 photos or videos to get started. You can add more or edit them
        after publishing your post.
      </div>

      {/* Media upload box */}
      <div className="flex flex-col items-center justify-center border border-gray-700 rounded-2xl min-h-[320px] ml-48 mr-48 mb-8 relative">
        <input
          type="file"
          accept="image/*,video/mp4,video/quicktime"
          multiple
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
          aria-label="Upload photos and videos"
        />
        <button
          type="button"
          className="btn-primary px-6 py-2 mb-4 mt-8"
          onClick={openFilePicker}
        >
          Add your photos & videos
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
        {/* Show selected file names */}
        {mediaFiles.length > 0 && (
          <div className="mt-4 text-sm text-gray-600">
            {mediaFiles.length} file{mediaFiles.length > 1 ? 's' : ''} selected
          </div>
        )}
      </div>

      {/* Media preview grid */}
      {mediaFiles.length > 0 && (
        <div className="grid grid-cols-3 gap-4 ml-48 mr-48 mb-8">
          {mediaFiles.map((mediaFile, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden border border-gray-300">
                {mediaFile.type === 'image' ? (
                  <Image
                    src={mediaFile.preview}
                    alt={`Preview ${index + 1}`}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <video
                    src={mediaFile.preview}
                    className="w-full h-full object-cover"
                    controls
                    muted
                  />
                )}
              </div>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label={`Remove file ${index + 1}`}
              >
                ×
              </button>
              {mediaFile.uploaded && (
                <div className="absolute bottom-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                  Uploaded
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Upload button */}
      {mediaFiles.length > 0 && (
        <div className="flex justify-center ml-48 mr-48 mb-8">
          <button
            type="button"
            onClick={uploadFiles}
            disabled={isUploading}
            className="btn-primary px-6 py-2 disabled:opacity-50"
          >
            {isUploading ? 'Uploading...' : 'Upload to Cloudinary'}
          </button>
        </div>
      )}

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
