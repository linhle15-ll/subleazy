'use client';

import {
  Wifi,
  Utensils,
  WashingMachine,
  ParkingCircle,
  Snowflake,
  LucideIcon,
  Accessibility,
} from 'lucide-react';
import LogoAndExitButton from '@/components/ui/commons/logo-and-exit-button';
import { ProgressBar } from '@/components/ui/post-form/progress-bar';
import { SelectionBox } from '@/components/ui/post-form/selection-box';
import { Amenities } from '@/lib/types/post.types';
import { usePostCreateStore } from '@/stores/post-create.store';
import { usePostSetters } from '@/hooks/use-post-setters';

const options: { label: string; key: keyof Amenities; icon: LucideIcon }[] = [
  { label: 'Wifi', key: 'wifi', icon: Wifi },
  { label: 'Kitchen', key: 'kitchen', icon: Utensils },
  { label: 'Laundry', key: 'laundry', icon: WashingMachine },
  { label: 'Parking', key: 'parking', icon: ParkingCircle },
  { label: 'Air conditioning', key: 'airConditioning', icon: Snowflake },
];

export default function SubleaseStep9() {
  const post = usePostCreateStore((state) => state.post);
  const setPost = usePostCreateStore((state) => state.setPost);
  const { setAmenities, setConvenience } = usePostSetters(setPost);

  return (
    <div className="form-border flex flex-col gap-6 relative mb-15">
      <LogoAndExitButton buttonName="Save & Exit" />

      {/* Step indicator and title */}
      <div className="flex items-center gap-4">
        <div className="form-heading-number-orange">2</div>
        <div className="form-h1">Make your place stand out: Amenities</div>
      </div>
      <div className="form-h2 mb-8">Tell us what your place has to offer</div>

      {/* Amenities */}
      <div className="mb-6">
        <div className="form-h2">Available amenities</div>
        <div className="flex flex-wrap gap-4">
          {options.map((opt) => {
            const Icon = opt.icon;
            const active = post.amenities?.[opt.key] || false;
            return (
              <SelectionBox
                key={opt.key}
                active={active}
                onClick={() => setAmenities(opt.key)}
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

      {/* Convenience */}
      <div className="mb-6">
        <div className="form-h2">Convenience</div>
        <div className="flex flex-wrap gap-4">
          <SelectionBox
            active={post.convenience?.disabilityFriendly || false}
            onClick={() => setConvenience('disabilityFriendly')}
          >
            <Accessibility
              className={`w-8 h-8 ${post.convenience?.disabilityFriendly ? 'text-primaryOrange' : 'text-gray-500'}`}
            />
            Disability friendly
          </SelectionBox>
        </div>
      </div>

      {/* Navigation buttons and progress bar */}
      <ProgressBar
        currentStep={8}
        totalSteps={12}
        buttons={[
          {
            text: 'Back',
            url: '/sublease/step-8',
            variant: 'secondary',
          },
          {
            text: 'Next',
            url: '/sublease/step-10',
            variant: 'primary',
          },
        ]}
      />
    </div>
  );
}
