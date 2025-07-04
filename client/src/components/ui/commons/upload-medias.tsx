'use client';

/**
 * UploadMedias Component
 *
 * 1. For new post creation:
 * ```tsx
 * <UploadMedias
 *   onMediaChange={(mediaUrls) => {
 *     setPost({ ...post, media: mediaUrls });
 *   }}
 *   maxFiles={10}
 * />
 * ```
 *
 * 2. For editing existing post:
 * ```tsx
 * <UploadMedias
 *   initialMedia={existingPost.media || []}
 *   onMediaChange={(mediaUrls) => {
 *     // Update post with new media URLs
 *     updatePost({ ...post, media: mediaUrls });
 *   }}
 *   maxFiles={10}
 * />
 * ```
 *
 * 3. For read-only view:
 * ```tsx
 * <UploadMedias
 *   initialMedia={post.media || []}
 *   disabled={true}
 *   maxFiles={10}
 * />
 * ```
 */

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import ContentMediaFolder from '@/public/content-media-folder.png';
import { uploadToCloudinary } from '@/lib/utils/cloudinary';

interface MediaFile {
  file: File | null;
  preview: string;
  type: 'image' | 'video';
  uploaded?: boolean;
  url?: string;
  isExisting?: boolean;
}

interface UploadMediasProps {
  initialMedia?: string[];
  onMediaChange?: (mediaUrls: string[]) => void;
  maxFiles?: number;
  className?: string;
  disabled?: boolean;
}

export function UploadMedias({
  initialMedia = [],
  onMediaChange,
  maxFiles = 10,
  className = '',
  disabled = false,
}: UploadMediasProps) {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load initial media when component mounts or initialMedia changes
  useEffect(() => {
    if (
      initialMedia &&
      Array.isArray(initialMedia) &&
      initialMedia.length > 0
    ) {
      const loadedMedia: MediaFile[] = initialMedia
        .filter((url): url is string => url !== undefined && url !== null)
        .map((url) => ({
          file: null,
          preview: url,
          type: url.match(/\.(mp4|mov)$/i) ? 'video' : 'image',
          uploaded: true,
          url,
          isExisting: true,
        }));
      setMediaFiles(loadedMedia);
    } else {
      setMediaFiles([]);
    }
  }, [initialMedia]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const newMediaFiles: MediaFile[] = [];

      // Check if adding new files would exceed maxFiles
      if (mediaFiles.length + files.length > maxFiles) {
        alert(`You can only upload up to ${maxFiles} files.`);
        return;
      }

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
          isExisting: false,
        });
      }

      setMediaFiles((prev) => [...prev, ...newMediaFiles]);
    }
  };

  const uploadFiles = async () => {
    const filesToUpload = mediaFiles.filter(
      (file) => !file.uploaded && file.file
    );

    if (filesToUpload.length === 0) {
      // If no new files to upload, just call onMediaChange with existing URLs
      const allUrls = mediaFiles
        .map((file) => file.url || file.preview)
        .filter(Boolean);
      onMediaChange?.(allUrls);
      return;
    }

    setIsUploading(true);

    try {
      const updatedMediaFiles = [...mediaFiles];

      for (let i = 0; i < updatedMediaFiles.length; i++) {
        const mediaFile = updatedMediaFiles[i];

        if (mediaFile.uploaded || !mediaFile.file) {
          continue;
        }

        const url = await uploadToCloudinary(mediaFile.file);
        updatedMediaFiles[i] = { ...mediaFile, uploaded: true, url };
      }

      setMediaFiles(updatedMediaFiles);

      // Call onMediaChange with all URLs (existing + newly uploaded)
      const allUrls = updatedMediaFiles
        .map((file) => file.url || file.preview)
        .filter(Boolean);
      onMediaChange?.(allUrls);
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
      // Revoke the preview URL to free memory (only for new files)
      if (!prev[index].isExisting) {
        URL.revokeObjectURL(prev[index].preview);
      }
      return newFiles;
    });
  };

  const openFilePicker = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  const hasNewFiles = mediaFiles.some((file) => !file.uploaded && file.file);
  const totalFiles = mediaFiles.length;

  return (
    <div className={className}>
      {/* Media upload box */}
      <div className="flex flex-col items-center justify-center border border-gray-700 rounded-2xl min-h-[320px] mb-8 relative">
        <input
          type="file"
          accept="image/*,video/mp4,video/quicktime"
          multiple
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
          aria-label="Upload photos and videos"
          disabled={disabled}
        />
        <button
          type="button"
          className={`btn-primary px-6 py-2 mb-4 mt-8 ${
            disabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={openFilePicker}
          disabled={disabled}
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
        {totalFiles > 0 && (
          <div className="mt-4 text-sm text-gray-600">
            {totalFiles} file{totalFiles > 1 ? 's' : ''} selected
            {maxFiles && ` (max ${maxFiles})`}
          </div>
        )}
      </div>

      {/* Media preview grid */}
      {totalFiles > 0 && (
        <div className="grid grid-cols-3 gap-4 mb-8">
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

              {/* Remove button */}
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label={`Remove file ${index + 1}`}
              >
                ×
              </button>

              {/* Status indicators */}
              {mediaFile.uploaded && (
                <div className="absolute bottom-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                  {mediaFile.isExisting ? 'Existing' : 'Uploaded'}
                </div>
              )}

              {mediaFile.isExisting && (
                <div className="absolute bottom-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                  Current
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Upload button - only show if there are new files to upload */}
      {hasNewFiles && (
        <div className="flex justify-center mb-8">
          <button
            type="button"
            onClick={uploadFiles}
            disabled={isUploading || disabled}
            className="btn-primary px-6 py-2 disabled:opacity-50"
          >
            {isUploading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      )}
    </div>
  );
}
