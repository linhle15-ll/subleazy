'use client';

import LogoAndExitButton from '@/components/ui/commons/logo-and-exit-button';
import { ProgressBar } from '@/components/ui/post-form/progress-bar';
import { usePostCreateStore } from '@/stores/post-create.store';
import { BedroomInfo } from '@/lib/types/post.types';
import { NumberButton } from '@/components/ui/post-form/number-button';

export default function SubleaseStep6() {
  const post = usePostCreateStore((state) => state.post);
  const setPost = usePostCreateStore((state) => state.setPost);

  const { maxGuests, bedrooms, beds, lock } = post.bedroomInfo ?? {};

  const handleChange = (key: keyof BedroomInfo, value: number) => {
    setPost({
      ...post,
      bedroomInfo: {
        ...post.bedroomInfo,
        [key]: value,
      },
    });
  };

  const handleLockChange = (value: string) => {
    setPost({
      ...post,
      bedroomInfo: {
        ...post.bedroomInfo,
        lock: value === 'yes',
      },
    });
  };

  return (
    <div className="form-border flex flex-col gap-6 relative mb-15">
      <LogoAndExitButton buttonName="Save & Exit" />

      <div className="flex items-center gap-4">
        <div className="form-heading-number-orange">1</div>
        <div className="form-h1">Basic information - Bedroom</div>
      </div>

      {/* Bedroom info */}
      <div className="pl-14 pr-14">
        <div className="divide-y divide-gray-200">
          <NumberButton
            text="Max guests number"
            data={maxGuests}
            minValue={1}
            onChange={(value) => handleChange('maxGuests', value)}
          />
          <NumberButton
            text="Bedrooms"
            data={bedrooms}
            minValue={1}
            onChange={(value) => handleChange('bedrooms', value)}
          />
          <NumberButton
            text="Beds"
            data={beds}
            minValue={0}
            onChange={(value) => handleChange('beds', value)}
          />
        </div>
      </div>

      {/* Lock question */}
      <div className="mb-8 pl-8">
        <div className="form-h2 pb-6">
          Does every bedroom has a lock? Guests would expect a lock for their
          room.
        </div>
        <div className="flex gap-8 items-center pl-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="hasLock"
              value="yes"
              checked={lock || false}
              onChange={() => handleLockChange('yes')}
              className="accent-primaryOrange w-5 h-5 border-2 border-gray-200"
            />
            Yes
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="hasLock"
              value="no"
              checked={!lock}
              onChange={() => handleLockChange('no')}
              className="accent-primaryOrange w-5 h-5 border-2 border-gray-200"
            />
            No
          </label>
        </div>
      </div>

      {/* Navigation buttons and progress bar */}
      <ProgressBar
        currentStep={5}
        totalSteps={12}
        buttons={[
          {
            text: 'Back',
            url: '/sublease/step-5',
            variant: 'secondary',
          },
          {
            text: 'Next',
            url: '/sublease/step-7',
            variant: 'primary',
          },
        ]}
      />
    </div>
  );
}
