'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, Building } from 'lucide-react';

const placeOptions = [
  { label: 'House', value: 'house', icon: Home },
  { label: 'Apartment', value: 'apartment', icon: Building },
];

const typeOptions = [
  { label: 'An entire place', value: 'entire' },
  { label: 'A private room and some shared places', value: 'private' },
  { label: 'A shared room', value: 'shared' },
];

export default function SubleaseStep3() {
  const [place, setPlace] = useState<string | null>(null);
  const [type, setType] = useState<string | null>(null);

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl border-2 border-primaryOrange p-10 mt-12 shadow-lg flex flex-col gap-8 relative min-h-[80vh]">
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
          1
        </div>
        <div className="text-xl font-bold">Basic information</div>
      </div>

      {/* Place options */}
      <div className="mb-8">
        <div className="font-semibold text-lg mb-4">
          Which best describes your place?
        </div>
        <div className="flex flex-wrap gap-6">
          {placeOptions.map((opt) => {
            const Icon = opt.icon;
            const active = place === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => setPlace(opt.value)}
                className={`flex flex-col items-center justify-center gap-2 w-48 h-28 border-2 rounded-xl text-lg font-medium transition-all duration-200
                  ${active ? 'border-primaryOrange bg-orange-50 shadow-lg' : 'border-gray-300 bg-white hover:border-primaryOrange'}
                `}
              >
                <Icon
                  className={`w-8 h-8 ${active ? 'text-primaryOrange' : 'text-gray-500'}`}
                />
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Type options */}
      <div className="mb-8">
        <div className="font-semibold text-lg mb-4">
          Which type of place will your guests have?
        </div>
        <div className="flex flex-wrap gap-6">
          {typeOptions.map((opt) => {
            const active = type === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => setType(opt.value)}
                className={`flex items-center justify-center w-64 h-20 border-2 rounded-xl text-base font-medium transition-all duration-200
                  ${active ? 'border-primaryOrange bg-orange-50 shadow-lg' : 'border-gray-300 bg-white hover:border-primaryOrange'}
                `}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation buttons and progress bar */}
      <div className="flex flex-col gap-4 mt-auto">
        <div className="flex justify-end gap-4">
          <Link href="/sublease/step-2" className="btn-secondary w-32">
            Back
          </Link>
          <Link
            href="/sublease/step-4"
            className={`btn-primary w-32 text-center ${!place || !type ? 'opacity-50 pointer-events-none' : ''}`}
          >
            Next
          </Link>
        </div>
        <div className="flex items-center gap-4 mt-2">
          <div className="flex-1">
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-primaryOrange"
                style={{ width: '25%' }}
              />
            </div>
          </div>
          <span className="text-gray-500 text-sm min-w-fit">Step 3 of 12</span>
        </div>
      </div>
    </div>
  );
}
