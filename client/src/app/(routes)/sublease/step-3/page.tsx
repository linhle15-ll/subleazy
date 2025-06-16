'use client';

import { Home, Building } from 'lucide-react';
import LogoAndExitButton from '@/components/ui/commons/logo-and-exit-button';
import { ProgressBar } from '@/components/ui/post-form/progress-bar';
import { SelectionBox } from '@/components/ui/post-form/selection-box';
import { HouseType, PlaceType } from '@/lib/types/enums';
import { usePostCreateStore } from '@/stores/post-create.store';
import { HouseInfo } from '@/lib/types/post.types';

const placeOptions = [
  { label: 'House', value: HouseType.HOUSE, icon: Home },
  { label: 'Apartment', value: HouseType.APT, icon: Building },
];

const typeOptions = [
  { label: 'An entire place', value: PlaceType.ENTIRE },
  { label: 'Private room with shared spaces', value: PlaceType.PRV },
  { label: 'A shared room', value: PlaceType.SHARED },
];

export default function SubleaseStep3() {
  const post = usePostCreateStore((state) => state.post);
  const setPost = usePostCreateStore((state) => state.setPost);

  const { houseType, placeType } = post.houseInfo ?? {};

  const handleSelect = (key: keyof HouseInfo, value: HouseType | PlaceType) => {
    setPost({
      ...post,
      houseInfo: {
        ...post.houseInfo,
        [key]: value,
      },
    });
  };

  return (
    <div className="form-border flex flex-col gap-6 relative mb-15">
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
            const active = houseType === opt.value;
            return (
              <SelectionBox
                key={opt.value}
                active={active}
                onClick={() => handleSelect('houseType', opt.value)}
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
            const active = placeType === opt.value;
            return (
              <SelectionBox
                key={opt.value}
                active={active}
                onClick={() => handleSelect('placeType', opt.value)}
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
