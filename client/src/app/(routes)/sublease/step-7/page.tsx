'use client';

import { useEffect } from 'react';
import { PlusCircle, MinusCircle } from 'lucide-react';
import LogoAndExitButton from '@/components/ui/commons/logo-and-exit-button';
import ProgressBar from '@/components/ui/progress-bar/progress-bar';
import { useFormStore } from '@/components/store/formStore';

export default function SubleaseStep7() {
  const { bathroomInfo, setField } = useFormStore();

  // Log the current state whenever it changes
  useEffect(() => {
    console.log('Current form state:', useFormStore.getState());
  }, [bathroomInfo]);

  const handlePrivateAttachedChange = (newValue: number) => {
    setField('bathroomInfo', {
      ...bathroomInfo,
      privateAttached: newValue,
    });
  };

  const handlePrivateAccessibleChange = (newValue: number) => {
    setField('bathroomInfo', {
      ...bathroomInfo,
      privateAccessible: newValue,
    });
  };

  const handleSharedChange = (newValue: number) => {
    setField('bathroomInfo', {
      ...bathroomInfo,
      shared: newValue,
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
          {/* Private attached */}
          <div className="form-des-inc-button">
            <span>Private and attached to guests' room</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Decrease private attached"
                onClick={() => {
                  const newValue = Math.max(
                    0,
                    (bathroomInfo?.privateAttached || 0) - 1
                  );
                  handlePrivateAttachedChange(newValue);
                }}
                className="disabled:opacity-50"
                disabled={(bathroomInfo?.privateAttached || 0) <= 0}
              >
                <MinusCircle className="w-7 h-7 text-gray-400 hover:text-primaryOrange" />
              </button>
              <span className="w-8 text-center">
                {bathroomInfo?.privateAttached || 0}
              </span>
              <button
                type="button"
                aria-label="Increase private attached"
                onClick={() => {
                  const newValue = (bathroomInfo?.privateAttached || 0) + 1;
                  handlePrivateAttachedChange(newValue);
                }}
              >
                <PlusCircle className="w-7 h-7 text-primaryOrange" />
              </button>
            </div>
          </div>
          {/* Private shared */}
          <div className="form-des-inc-button">
            <span>
              Private but accessible through shared place, like hall ways
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Decrease private shared"
                onClick={() => {
                  const newValue = Math.max(
                    0,
                    (bathroomInfo?.privateAccessible || 0) - 1
                  );
                  handlePrivateAccessibleChange(newValue);
                }}
                className="disabled:opacity-50"
                disabled={(bathroomInfo?.privateAccessible || 0) <= 0}
              >
                <MinusCircle className="w-7 h-7 text-gray-400 hover:text-primaryOrange" />
              </button>
              <span className="w-8 text-center">
                {bathroomInfo?.privateAccessible || 0}
              </span>
              <button
                type="button"
                aria-label="Increase private shared"
                onClick={() => {
                  const newValue = (bathroomInfo?.privateAccessible || 0) + 1;
                  handlePrivateAccessibleChange(newValue);
                }}
              >
                <PlusCircle className="w-7 h-7 text-primaryOrange" />
              </button>
            </div>
          </div>
          {/* Shared */}
          <div className="form-des-inc-button">
            <span>Shared</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Decrease shared"
                onClick={() => {
                  const newValue = Math.max(0, (bathroomInfo?.shared || 0) - 1);
                  handleSharedChange(newValue);
                }}
                className="disabled:opacity-50"
                disabled={(bathroomInfo?.shared || 0) <= 0}
              >
                <MinusCircle className="w-7 h-7 text-gray-400 hover:text-primaryOrange" />
              </button>
              <span className="w-8 text-center">
                {bathroomInfo?.shared || 0}
              </span>
              <button
                type="button"
                aria-label="Increase shared"
                onClick={() => {
                  const newValue = (bathroomInfo?.shared || 0) + 1;
                  handleSharedChange(newValue);
                }}
              >
                <PlusCircle className="w-7 h-7 text-primaryOrange" />
              </button>
            </div>
          </div>
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
