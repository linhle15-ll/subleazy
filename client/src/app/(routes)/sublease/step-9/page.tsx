'use client';

import { useState } from 'react';
import Link from 'next/link';
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

function AmenityGrid({ items, selected, toggle }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-6">
      {items.map((item) => {
        const Icon = item.icon;
        const active = selected.includes(item.value);
        return (
          <button
            key={item.value}
            type="button"
            onClick={() => toggle(item.value)}
            className={`flex flex-col items-center justify-center gap-2 border-2 rounded-xl text-base font-medium transition-all duration-200 h-20
              ${active ? 'border-primaryOrange bg-orange-50 shadow-lg' : 'border-gray-300 bg-white hover:border-primaryOrange'}
            `}
          >
            <Icon
              className={`w-7 h-7 ${active ? 'text-primaryOrange' : 'text-gray-500'}`}
            />
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

export default function SubleaseStep9() {
  const [selected, setSelected] = useState<string[]>([]);
  const toggle = (value: string) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-2xl border-2 border-primaryOrange p-10 mt-12 shadow-lg flex flex-col gap-8 relative min-h-[90vh]">
      {/* Save & Exit button */}
      <Link
        href="/"
        className="absolute top-6 right-6 flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
      >
        Save & Exit
      </Link>

      {/* Step indicator and title */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center justify-center w-10 h-10 border-2 border-primaryOrange rounded-full text-xl font-bold text-primaryOrange">
          2
        </div>
        <div className="text-xl font-bold">
          Make your place stand out: Amenities
        </div>
      </div>
      <div className="mb-2 font-semibold text-lg">
        Tell us what your place has to offer
      </div>
      <div className="text-gray-400 text-sm mb-8">
        You can add more amenities after you publish your listing
      </div>

      {/* Favorites */}
      <div className="mb-2 font-bold">Guests' favorites</div>
      <AmenityGrid items={favorites} selected={selected} toggle={toggle} />

      {/* Nice-to-haves */}
      <div className="mb-2 font-bold">Nice-to-haves</div>
      <AmenityGrid items={niceToHaves} selected={selected} toggle={toggle} />

      {/* Safety details */}
      <div className="mb-2 font-bold">Safety details</div>
      <AmenityGrid items={safety} selected={selected} toggle={toggle} />

      {/* Navigation buttons and progress bar */}
      <div className="flex flex-col gap-4 mt-auto">
        <div className="flex justify-end gap-4">
          <Link href="/sublease/step-8" className="btn-secondary w-32">
            Back
          </Link>
          <Link
            href="/sublease/step-10"
            className={`btn-primary w-32 text-center ${selected.length === 0 ? 'opacity-50 pointer-events-none' : ''}`}
          >
            Next
          </Link>
        </div>
        <div className="flex items-center gap-4 mt-2">
          <div className="flex-1">
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-primaryOrange"
                style={{ width: '75%' }}
              />
            </div>
          </div>
          <span className="text-gray-500 text-sm min-w-fit">Step 9 of 12</span>
        </div>
      </div>
    </div>
  );
}
