'use client';

import LogoAndExitButton from '@/components/ui/commons/logo-and-exit-button';
import { ProgressBar } from '@/components/ui/post-form/progress-bar';
import { usePostCreateStore } from '@/stores/post-create.store';
import { BathroomInfo } from '@/lib/types/post.types';
import { NumberButton } from '@/components/ui/post-form/number-button';

export default function SubleaseStep7() {
  const post = usePostCreateStore((state) => state.post);
  const setPost = usePostCreateStore((state) => state.setPost);

  const { privateAttached, privateAccessible, shared } =
    post.bathroomInfo ?? {};

  const handleChange = (key: keyof BathroomInfo, value: number) => {
    setPost({
      ...post,
      bathroomInfo: {
        ...post.bathroomInfo,
        [key]: value,
      },
    });
  };

  return (
    <div className="form-border flex flex-col gap-6 relative mb-15">
      <LogoAndExitButton buttonName="Save & Exit" />

      <div className="flex items-center gap-4">
        <div className="form-heading-number-orange">1</div>
        <div className="form-h1">Basic information - Bathrooms</div>
      </div>

      {/* Bathroom info */}
      <div className="pl-14 pr-14">
        <div className="divide-y divide-gray-200">
          <NumberButton
            text="Private and attached to guests' room"
            data={privateAttached}
            minValue={0}
            onChange={(value) => handleChange('privateAttached', value)}
          />
          <NumberButton
            text="Private but accessible through shared place, like hall ways"
            data={privateAccessible}
            minValue={0}
            onChange={(value) => handleChange('privateAccessible', value)}
          />
          <NumberButton
            text="Shared"
            data={shared}
            minValue={0}
            onChange={(value) => handleChange('shared', value)}
          />
        </div>
      </div>

      {/* Navigation buttons and progress bar */}
      <ProgressBar
        currentStep={6}
        totalSteps={12}
        buttons={[
          {
            text: 'Back',
            url: '/sublease/step-6',
            variant: 'secondary',
          },
          {
            text: 'Next',
            url: '/sublease/step-8',
            variant: 'primary',
          },
        ]}
      />
    </div>
  );
}
