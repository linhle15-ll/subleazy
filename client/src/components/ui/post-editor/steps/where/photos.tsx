'use client';

import { usePostEditStore } from '@/stores/post-edit.store';
import { UploadMedias } from '@/components/ui/commons/upload-medias';

export default function SubleaseFormPhotos() {
  const post = usePostEditStore((state) => state.post);
  const setPost = usePostEditStore((state) => state.setPost);

  const handleMediaChange = (mediaUrls: string[]) => {
    setPost({
      ...post,
      media: mediaUrls,
    });
  };

  return (
    <div className="flex flex-col gap-6 relative mb-15 mr-8">
      <div className="form-h1">Photos</div>
      <div className="-mt-5 mb-5">
        High-quality photos attract more interest. Feel free to update or add
        more below. At lease 5 photos are required.
      </div>

      {/* Photo upload box */}
      <UploadMedias
        initialMedia={(post.media || []).filter(
          (url): url is string => url !== undefined
        )}
        onMediaChange={handleMediaChange}
        maxFiles={10}
        className="mx-20"
      />
    </div>
  );
}
