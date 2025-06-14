'use client';

import LogoAndExitButton from '@/components/ui/commons/logo-and-exit-button';
import { ProgressBar } from '@/components/ui/post-form/progress-bar';
import { usePostCreateStore } from '@/stores/post-create.store';

export default function SubleaseStep12() {
  const post = usePostCreateStore((state) => state.post);
  const setPost = usePostCreateStore((state) => state.setPost);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Only allow numbers
    if (/^\d+$/.test(value)) {
      const num = parseInt(value, 10);
      const price = num < 0 ? 0 : num;

      setPost({
        ...post,
        price,
      });
    }
  };

  return (
    <div className="form-border flex flex-col gap-6 relative mb-15">
      <LogoAndExitButton buttonName="Save & Exit" />

      <div className="flex items-center gap-4">
        <div className="form-heading-number-orange">3</div>
        <div className="form-h1">Review and publish</div>
      </div>
      <div className="form-h2">Set your price</div>
      <div className="-mt-5 mb-8">
        You can change the price anytime. You might expect this price to have
        included amenity prices like water and electricity.
      </div>

      {/* Price input */}
      <div className="flex flex-col items-center justify-center my-12">
        <div className="flex items-center text-5xl font-medium">
          <span className="mr-2">$</span>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            className="w-32 text-5xl font-medium text-center border-none outline-none bg-transparent focus:ring-0"
            value={post.price || ''}
            onChange={handlePriceChange}
            maxLength={6}
            aria-label="Price per month"
          />
          <span className="ml-2 text-5xl font-medium">/ month</span>
        </div>
      </div>

      <ProgressBar
        currentStep={11}
        totalSteps={12}
        buttons={[
          {
            text: 'Back',
            url: '/sublease/step-11',
            variant: 'secondary',
          },
          {
            text: 'Next',
            url: '/sublease/step-13',
            variant: 'primary',
          },
        ]}
      />
    </div>
  );
}
