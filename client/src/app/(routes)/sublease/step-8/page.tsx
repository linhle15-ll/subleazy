'use client';

import { useState } from 'react';
import { User, Users, UserPlus } from 'lucide-react';
import LogoAndExitButton from '@/components/ui/commons/logo-and-exit-button';
import ProgressBar from '@/components/ui/progress-bar/progress-bar';
import { SelectionBox } from '@/components/ui/selection-box/selection-box';

const options = [
  { label: 'Me', value: 'me', icon: User },
  { label: 'My family', value: 'family', icon: Users },
  { label: 'Other guests', value: 'other', icon: Users },
  { label: 'Roommates', value: 'roommates', icon: UserPlus },
];

export default function SubleaseStep8() {
  const [selected, setSelected] = useState<string>('');

  return (
    <div className="form-border flex flex-col gap-6 relative">
      <LogoAndExitButton buttonName="Save & Exit" />

      {/* Step indicator and title */}
      <div className="flex items-center gap-4">
        <div className="form-heading-number-orange">1</div>
        <div className="form-h1">Basic information</div>
      </div>

      {/* Who else will be there? */}
      <div className="mb-8">
        <div className="form-h2">Who else will be there?</div>
        <div className="text-gray-400 text-sm mb-8">
          Guests need to be informed who they will encounter during their stay.
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {options.map((opt) => {
            const Icon = opt.icon;
            const active = selected.includes(opt.value);
            return (
              <SelectionBox
                key={opt.value}
                active={active}
                onClick={() => {
                  setSelected(opt.value);
                  console.log('selected: ', selected);
                }}
              >
                <Icon
                  className={`w-8 h-8 ${active ? 'text-primaryOrange' : 'text-gray-500'}`}
                />
                {opt.label}
              </SelectionBox>
            );
          })}
        </div>
      </div>

      {/* Navigation buttons and progress bar */}
      <ProgressBar
        currentStep={7}
        totalSteps={12}
        buttons={[
          {
            text: 'Back',
            url: '/sublease/step-7',
            variant: 'secondary',
          },
          {
            text: 'Next',
            url: '/sublease/step-9',
            variant: 'primary',
          },
        ]}
      />
    </div>
  );
}
