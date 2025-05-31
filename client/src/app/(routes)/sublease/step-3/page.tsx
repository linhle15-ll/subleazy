'use client';

import { useState } from 'react';
import { Home, Building } from 'lucide-react';
import LogoAndExitButton from '@/components/ui/commons/logo-and-exit-button';
import ProgressBar from '@/components/ui/progress-bar/progress-bar';
import { SelectionBox } from '@/components/ui/selection-box/selection-box';

const placeOptions = [
  { label: 'House', value: 'house', icon: Home },
  { label: 'Apartment', value: 'apartment', icon: Building },
];

const typeOptions = [
  { label: 'An entire place', value: 'entire' },
  { label: 'Private room with shared spaces', value: 'private' },
  { label: 'A shared room', value: 'shared' },
];

export default function SubleaseStep3() {
  const [place, setPlace] = useState<string | null>(null);
  const [type, setType] = useState<string | null>(null);

  return (
    <div className="form-border flex flex-col gap-6 relative">
      <LogoAndExitButton buttonName="Save & Exit" />
      {/*Title*/}
      <div className="flex items-center gap-4 mb-6">
        <div className="items-center justify-center border-primaryOrange text-2xl font-bold text-primaryOrange">
          1
        </div>
        <div className="text-2xl font-medium">Basic information</div>
      </div>

      {/* Place options */}
      <div className="mb-8">
        <div className="font-medium text-lg mb-4">
          Which best describes your place?
        </div>
        <div className="flex flex-wrap gap-6">
          {placeOptions.map((opt) => {
            const Icon = opt.icon;
            const active = place === opt.value;
            return (
              <SelectionBox
                key={opt.value}
                active={active}
                onClick={() => setPlace(opt.value)}
              >
                <Icon
                  className={`w-9 h-9 ${active ? 'text-primaryOrange' : 'text-gray-500'}`}
                />
                {opt.label}
              </SelectionBox>
            );
          })}
        </div>
      </div>

      {/* Type options */}
      <div className="mb-8">
        <div className="font-medium text-lg mb-4">
          Which type of place will your guests have?
        </div>
        <div className="flex flex-wrap gap-6">
          {typeOptions.map((opt) => {
            const active = type === opt.value;
            return (
              <SelectionBox
                key={opt.value}
                active={active}
                onClick={() => setType(opt.value)}
              >
                {opt.label}
              </SelectionBox>
            );
          })}
        </div>
      </div>

      {/* Navigation buttons and progress bar */}
      <ProgressBar
        currentStep={2}
        totalSteps={12}
        buttons={[
          {
            text: 'Back',
            url: '/sublease/step-2',
            variant: 'secondary',
          },
          {
            text: 'Next',
            url: '/sublease/step-4',
            variant: 'primary',
          },
        ]}
      />
    </div>
  );
}
