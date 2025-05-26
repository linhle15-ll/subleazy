'use client';

import { useState } from 'react';
import {
  Wifi,
  Tv,
  Snowflake,
  Thermometer,
  Utensils,
  WashingMachine,
  ParkingCircle,
  WavesLadder,
  Dog,
  Coffee,
  CookingPot,
  Microwave,
  Landmark,
  Dumbbell,
  Laptop,
  Fan,
  Shirt,
  Flame,
  UtensilsCrossed,
  AlarmSmoke,
  FireExtinguisher,
  Bandage,
  Camera,
  Lock,
  DoorOpen,
} from 'lucide-react';
import LogoAndExitButton from '@/components/ui/commons/logo-and-exit-button';
import ProgressBar from '@/components/ui/progress-bar/progress-bar';
import { SelectionBox } from '@/components/ui/selection-box/selection-box';

const favorites = [
  { label: 'Wifi', value: 'wifi', icon: Wifi },
  { label: 'TV', value: 'tv', icon: Tv },
  { label: 'Air conditioning', value: 'ac', icon: Snowflake },
  { label: 'Heating', value: 'heating', icon: Thermometer },
  { label: 'Kitchen', value: 'kitchen', icon: Utensils },
  { label: 'Washer', value: 'washer', icon: WashingMachine },
  { label: 'Dryer', value: 'dryer', icon: WashingMachine },
  { label: 'Free parking', value: 'parking', icon: ParkingCircle },
  { label: 'Pool', value: 'pool', icon: WavesLadder },
  { label: 'Pet friendly', value: 'pet', icon: Dog },
];

const niceToHaves = [
  { label: 'Coffee maker', value: 'coffee', icon: Coffee },
  { label: 'CookingPot', value: 'CookingPot', icon: CookingPot },
  { label: 'Microwave', value: 'microwave', icon: Microwave },
  { label: 'Balcony', value: 'balcony', icon: Landmark },
  { label: 'Gym', value: 'gym', icon: Dumbbell },
  { label: 'Workspace', value: 'workspace', icon: Laptop },
  { label: 'Hair dryer', value: 'hairdryer', icon: Fan },
  { label: 'Shirt', value: 'Shirt', icon: Shirt },
  { label: 'Fireplace', value: 'fireplace', icon: Flame },
  { label: 'Outdoor dining', value: 'outdoor', icon: UtensilsCrossed },
];

const safety = [
  { label: 'Smoke alarm', value: 'smoke', icon: AlarmSmoke },
  { label: 'CO alarm', value: 'co', icon: AlarmSmoke },
  { label: 'Fire extinguisher', value: 'extinguisher', icon: FireExtinguisher },
  { label: 'First aid kit', value: 'firstaid', icon: Bandage },
  { label: 'Security cameras', value: 'camera', icon: Camera },
  { label: 'Lock on bedroom', value: 'lock', icon: Lock },
  { label: 'Emergency exit', value: 'exit', icon: DoorOpen },
];

export default function SubleaseStep9() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (value: string) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
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
        <div className="form-h2">Tell us what your place has to offer</div>
        <div className="mb-11">
          You can add more amenities after you publish your listing
        </div>

        {/* Favorites */}
        <div className="mb-9">
          <div className="form-h2">Guests' favorites</div>
          <div className="flex flex-wrap gap-4">
            {favorites.map((item) => {
              const Icon = item.icon;
              const active = selected.includes(item.value);
              return (
                <SelectionBox
                  key={item.value}
                  active={active}
                  onClick={() => {
                    toggle(item.value);
                    console.log('selected amenities: ', selected);
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

        {/* Nice-to-haves */}
        <div className="mb-9">
          <div className="form-h2">Nice-to-haves</div>
          <div className="flex flex-wrap gap-4">
            {niceToHaves.map((item) => {
              const Icon = item.icon;
              const active = selected.includes(item.value);
              return (
                <SelectionBox
                  key={item.value}
                  active={active}
                  onClick={() => {
                    toggle(item.value);
                    console.log('selected amenities: ', selected);
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

        {/* Safety details */}
        <div className="mb-9">
          <div className="form-h2">Safety details</div>
          <div className="flex flex-wrap gap-4">
            {safety.map((item) => {
              const Icon = item.icon;
              const active = selected.includes(item.value);
              return (
                <SelectionBox
                  key={item.value}
                  active={active}
                  onClick={() => {
                    toggle(item.value);
                    console.log('selected amenities: ', selected);
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
        totalSteps={11}
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
