'use client';

import { useEffect } from 'react';
import { PlusCircle, MinusCircle } from 'lucide-react';
import LogoAndExitButton from '@/components/ui/commons/logo-and-exit-button';
import ProgressBar from '@/components/ui/progress-bar/progress-bar';
import { useFormStore } from '@/components/store/formStore';

export default function SubleaseStep6() {
  const { bedroomInfo, setField } = useFormStore();

  // Log the current state whenever it changes
  useEffect(() => {
    console.log('Current form state:', useFormStore.getState());
  }, [bedroomInfo]);

  const handleGuestsChange = (newValue: number) => {
    setField('bedroomInfo', {
      ...bedroomInfo,
      maxGuests: newValue,
    });
  };

  const handleBedroomsChange = (newValue: number) => {
    setField('bedroomInfo', {
      ...bedroomInfo,
      bedrooms: newValue,
    });
  };

  const handleBedsChange = (newValue: number) => {
    setField('bedroomInfo', {
      ...bedroomInfo,
      beds: newValue,
    });
  };

  const handleLockChange = (value: string) => {
    setField('bedroomInfo', {
      ...bedroomInfo,
      lock: value === 'yes',
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
          {/* Max guests */}
          <div className="form-des-inc-button">
            <span>Max guests number</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Decrease guests"
                onClick={() => {
                  const newValue = Math.max(
                    1,
                    (bedroomInfo?.maxGuests || 1) - 1
                  );
                  handleGuestsChange(newValue);
                }}
                className="disabled:opacity-50"
                disabled={(bedroomInfo?.maxGuests || 1) <= 1}
              >
                <MinusCircle className="w-7 h-7 text-gray-400 hover:text-primaryOrange" />
              </button>
              <span className="w-8 text-center">
                {bedroomInfo?.maxGuests || 1}
              </span>
              <button
                type="button"
                aria-label="Increase guests"
                onClick={() => {
                  const newValue = (bedroomInfo?.maxGuests || 1) + 1;
                  handleGuestsChange(newValue);
                }}
              >
                <PlusCircle className="w-7 h-7 text-primaryOrange" />
              </button>
            </div>
          </div>
          {/* Bedrooms */}
          <div className="form-des-inc-button">
            <span>Bedrooms</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Decrease bedrooms"
                onClick={() => {
                  const newValue = Math.max(
                    0,
                    (bedroomInfo?.bedrooms || 0) - 1
                  );
                  handleBedroomsChange(newValue);
                }}
                className="disabled:opacity-50"
                disabled={(bedroomInfo?.bedrooms || 0) <= 0}
              >
                <MinusCircle className="w-7 h-7 text-gray-400 hover:text-primaryOrange" />
              </button>
              <span className="w-8 text-center">
                {bedroomInfo?.bedrooms || 0}
              </span>
              <button
                type="button"
                aria-label="Increase bedrooms"
                onClick={() => {
                  const newValue = (bedroomInfo?.bedrooms || 0) + 1;
                  handleBedroomsChange(newValue);
                }}
              >
                <PlusCircle className="w-7 h-7 text-primaryOrange" />
              </button>
            </div>
          </div>
          {/* Beds */}
          <div className="form-des-inc-button">
            <span>Beds</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Decrease beds"
                onClick={() => {
                  const newValue = Math.max(0, (bedroomInfo?.beds || 0) - 1);
                  handleBedsChange(newValue);
                }}
                className="disabled:opacity-50"
                disabled={(bedroomInfo?.beds || 0) <= 0}
              >
                <MinusCircle className="w-7 h-7 text-gray-400 hover:text-primaryOrange" />
              </button>
              <span className="w-8 text-center">{bedroomInfo?.beds || 0}</span>
              <button
                type="button"
                aria-label="Increase beds"
                onClick={() => {
                  const newValue = (bedroomInfo?.beds || 0) + 1;
                  handleBedsChange(newValue);
                }}
              >
                <PlusCircle className="w-7 h-7 text-primaryOrange" />
              </button>
            </div>
          </div>
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
              checked={bedroomInfo?.lock || false}
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
              checked={!bedroomInfo?.lock}
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
