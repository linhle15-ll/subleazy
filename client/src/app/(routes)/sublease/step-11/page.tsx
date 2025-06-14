'use client';

import LogoAndExitButton from '@/components/ui/commons/logo-and-exit-button';
import { ProgressBar } from '@/components/ui/post-form/progress-bar';
import { usePostCreateStore } from '@/stores/post-create.store';

const TITLE_MAX = 50;
const DESC_MAX = 1500;

export default function SubleaseStep11() {
  const post = usePostCreateStore((state) => state.post);
  const setPost = usePostCreateStore((state) => state.setPost);

  const { title, description } = post;

  const handleChange = (key: 'title' | 'description', value: string) => {
    setPost({
      ...post,
      [key]: value,
    });
  };

  return (
    <div className="form-border flex flex-col gap-6 relative mb-15">
      <LogoAndExitButton buttonName="Save & Exit" />

      {/* Step indicator and title */}
      <div className="flex items-center gap-4">
        <div className="form-heading-number-orange">2</div>
        <div className="form-h1">Make your place stand out</div>
      </div>
      <div className="form-h2">
        Let's give your place a title and share some description
      </div>
      <div className="-mt-5 mb-5">
        You can always edit them after publishing your post.
      </div>

      {/* Title input */}
      <div className="mb-6">
        <label htmlFor="title" className="form-h2 block mb-1">
          Title
        </label>
        <input
          id="title"
          className="text-field w-full sm:w-2/3 sm:pr-4 sm:border-r sm:items-start"
          maxLength={TITLE_MAX}
          value={title || ''}
          onChange={(e) => handleChange('title', e.target.value)}
        />
        <div className="text-xs text-gray-400 mt-1">
          {title?.length || 0}/{TITLE_MAX} character
        </div>
      </div>

      {/* Description input */}
      <div className="mb-6">
        <label htmlFor="desc" className="form-h2 block mb-1">
          Description
        </label>
        <textarea
          id="desc"
          className="text-field w-full min-h-[120px] sm:w-2/3 sm:pr-4 sm:border-r sm:items-start"
          maxLength={DESC_MAX}
          value={description || ''}
          onChange={(e) => handleChange('description', e.target.value)}
        />
        <div className="text-xs text-gray-400 mt-1">
          {description?.length || 0}/{DESC_MAX} character
        </div>
      </div>

      <ProgressBar
        currentStep={10}
        totalSteps={12}
        buttons={[
          {
            text: 'Back',
            url: '/sublease/step-10',
            variant: 'secondary',
          },
          {
            text: 'Next',
            url: '/sublease/step-12',
            variant: 'primary',
          },
        ]}
      />
    </div>
  );
}
