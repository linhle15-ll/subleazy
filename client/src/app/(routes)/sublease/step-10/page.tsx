'use client';

import LogoAndExitButton from '@/components/ui/commons/logo-and-exit-button';
import { ProgressBar } from '@/components/ui/post-form/progress-bar';
import UploadMedias from '@/components/ui/commons/upload-medias';
import { usePostCreateStore } from '@/stores/post-create.store';

export default function SubleaseStep10() {
  const post = usePostCreateStore((state) => state.post);
  const setPost = usePostCreateStore((state) => state.setPost);

  const handleMediaChange = (mediaUrls: string[]) => {
    setPost({
      ...post,
      media: mediaUrls,
    });
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

      <UploadMedias
        initialMedia={(post.media || []).filter(
          (url): url is string => url !== undefined
        )}
        onMediaChange={handleMediaChange}
        maxFiles={10}
        className="ml-48 mr-48"
      />

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
