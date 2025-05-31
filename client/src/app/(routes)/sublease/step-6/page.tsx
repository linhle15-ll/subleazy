'use client';

import { useState } from 'react';
import { PlusCircle, MinusCircle } from 'lucide-react';
import LogoAndExitButton from '@/components/ui/commons/logo-and-exit-button';
import ProgressBar from '@/components/ui/progress-bar/progress-bar';

export default function SubleaseStep6() {
  const [guests, setGuests] = useState(1);
  const [bedrooms, setBedrooms] = useState(0);
  const [beds, setBeds] = useState(0);
  const [hasLock, setHasLock] = useState('no');

  return (
    <div className="form-border flex flex-col gap-6 relative">
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
                  const newValue = Math.max(1, guests - 1);
                  setGuests(newValue);
                  console.log('Guests decreased to:', newValue);
                }}
                className="disabled:opacity-50"
                disabled={guests <= 1}
              >
                <MinusCircle className="w-7 h-7 text-gray-400 hover:text-primaryOrange" />
              </button>
              <span className="w-8 text-center ">{guests}</span>
              <button
                type="button"
                aria-label="Increase guests"
                onClick={() => {
                  const newValue = guests + 1;
                  setGuests(newValue);
                  console.log('Guests increased to:', newValue);
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
                  const newValue = Math.max(0, bedrooms - 1);
                  setBedrooms(newValue);
                  console.log('Bedrooms decreased to:', newValue);
                }}
                className="disabled:opacity-50"
                disabled={bedrooms <= 0}
              >
                <MinusCircle className="w-7 h-7 text-gray-400 hover:text-primaryOrange" />
              </button>
              <span className="w-8 text-center">{bedrooms}</span>
              <button
                type="button"
                aria-label="Increase bedrooms"
                onClick={() => {
                  const newValue = bedrooms + 1;
                  setBedrooms(newValue);
                  console.log('Bedrooms increased to:', newValue);
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
                  const newValue = Math.max(0, beds - 1);
                  setBeds(newValue);
                  console.log('Beds decreased to:', newValue);
                }}
                className="disabled:opacity-50"
                disabled={beds <= 0}
              >
                <MinusCircle className="w-7 h-7 text-gray-400 hover:text-primaryOrange" />
              </button>
              <span className="w-8 text-center">{beds}</span>
              <button
                type="button"
                aria-label="Increase beds"
                onClick={() => {
                  const newValue = beds + 1;
                  setBeds(newValue);
                  console.log('Beds increased to:', newValue);
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
              checked={hasLock === 'yes'}
              onChange={() => {
                setHasLock('yes');
                console.log('Lock status changed to: yes');
              }}
              className="accent-primaryOrange w-5 h-5 border-2 border-gray-200"
            />
            Yes
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="hasLock"
              value="no"
              checked={hasLock === 'no'}
              onChange={() => {
                setHasLock('no');
                console.log('Lock status changed to: no');
              }}
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
