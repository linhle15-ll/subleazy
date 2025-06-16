'use client';

import { User, Users, UserPlus } from 'lucide-react';
import LogoAndExitButton from '@/components/ui/commons/logo-and-exit-button';
import { ProgressBar } from '@/components/ui/post-form/progress-bar';
import { SelectionBox } from '@/components/ui/post-form/selection-box';
import { WhoElse } from '@/lib/types/enums';
import { usePostCreateStore } from '@/stores/post-create.store';

const options = [
  { label: 'Me', value: WhoElse.ME, icon: User },
  { label: 'My family', value: WhoElse.FAM, icon: Users },
  { label: 'Other guests', value: WhoElse.GUESTS, icon: Users },
  { label: 'Roommates', value: WhoElse.ROOMMATES, icon: UserPlus },
];

export default function SubleaseStep8() {
  const post = usePostCreateStore((state) => state.post);
  const setPost = usePostCreateStore((state) => state.setPost);

  const handleSelect = (value: WhoElse) => {
    const curValues = post.whoElse || [];
    const newValues = curValues.includes(value)
      ? curValues.filter((item) => item !== value)
      : [...curValues, value];

    setPost({
      ...post,
      whoElse: newValues,
    });
  };

  return (
    <div className="form-border flex flex-col gap-6 relative mb-15">
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
            const active = post.whoElse?.includes(opt.value) || false;
            return (
              <SelectionBox
                key={opt.value}
                active={active}
                onClick={() => handleSelect(opt.value)}
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
