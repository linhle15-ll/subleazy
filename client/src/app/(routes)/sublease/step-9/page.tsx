'use client';

import { useEffect } from 'react';
import {
  Wifi,
  Utensils,
  WashingMachine,
  ParkingCircle,
  Snowflake,
  LucideIcon,
} from 'lucide-react';
import LogoAndExitButton from '@/components/ui/commons/logo-and-exit-button';
import ProgressBar from '@/components/ui/progress-bar/progress-bar';
import { SelectionBox } from '@/components/ui/selection-box/selection-box';
import { useFormStore } from '@/components/store/formStore';

type AmenityKey =
  | 'wifi'
  | 'kitchen'
  | 'laundry'
  | 'parking'
  | 'airConditioning';

const amenities: { label: string; value: AmenityKey; icon: LucideIcon }[] = [
  { label: 'Wifi', value: 'wifi', icon: Wifi },
  { label: 'Kitchen', value: 'kitchen', icon: Utensils },
  { label: 'Laundry', value: 'laundry', icon: WashingMachine },
  { label: 'Parking', value: 'parking', icon: ParkingCircle },
  { label: 'Air conditioning', value: 'airConditioning', icon: Snowflake },
];

export default function SubleaseStep9() {
  const { amenities: selectedAmenities, setField } = useFormStore();

  // Log the current state whenever it changes
  useEffect(() => {
    console.log('Current form state:', useFormStore.getState());
  }, [selectedAmenities]);

  const toggle = (value: AmenityKey) => {
    setField('amenities', {
      ...selectedAmenities,
      [value]: !selectedAmenities?.[value],
    });
  };

  return (
    <div className="form-border flex flex-col gap-6 relative mb-15">
      <LogoAndExitButton buttonName="Save & Exit" />

      {/* Step indicator and title */}
      <div className="flex items-center gap-4">
        <div className="form-heading-number-orange">2</div>
        <div className="form-h1">Make your place stand out: Amenities</div>
      </div>

      {/* Amenities section */}
      <div className="mb-8">
        <div className="form-h2 mb-8">Tell us what your place has to offer</div>

        {/* Amenities */}
        <div className="mb-9">
          <div className="form-h2">Available amenities</div>
          <div className="flex flex-wrap gap-4">
            {amenities.map((item) => {
              const Icon = item.icon;
              const active = selectedAmenities?.[item.value] || false;
              return (
                <SelectionBox
                  key={item.value}
                  active={active}
                  onClick={() => {
                    toggle(item.value);
                    console.log('selected amenities: ', selectedAmenities);
                  }}
                >
                  <Icon
                    className={`w-8 h-8 ${active ? 'text-primaryOrange' : 'text-gray-500'}`}
                  />
                  {item.label}
                </SelectionBox>
              );
            })}
          </div>
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
