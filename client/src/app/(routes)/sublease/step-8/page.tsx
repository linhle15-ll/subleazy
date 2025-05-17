'use client';

import { useState } from 'react';
import Link from 'next/link';
import { User, Users, UserPlus } from 'lucide-react';

const options = [
  { label: 'Me', value: 'me', icon: User },
  { label: 'My family', value: 'family', icon: Users },
  { label: 'Other guests', value: 'other', icon: Users },
  { label: 'Roommates', value: 'roommates', icon: UserPlus },
];

export default function SubleaseStep8() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (value: string) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

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

      {/* Who else will be there? */}
      <div className="mb-8">
        <div className="font-semibold text-lg mb-2">
          Who else will be there?
        </div>
        <div className="text-gray-400 text-sm mb-6">
          Guests need to be informed who they will encounter during their stay.
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {options.map((opt) => {
            const Icon = opt.icon;
            const active = selected.includes(opt.value);
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => toggle(opt.value)}
                className={`flex flex-col items-center justify-center gap-2 border-2 rounded-xl text-lg font-medium transition-all duration-200 h-24
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

      {/* Navigation buttons and progress bar */}
      <div className="flex flex-col gap-4 mt-auto">
        <div className="flex justify-end gap-4">
          <Link href="/sublease/step-7" className="btn-secondary w-32">
            Back
          </Link>
          <Link
            href="/sublease/step-9"
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
                style={{ width: '66%' }}
              />
            </div>
          </div>
          <span className="text-gray-500 text-sm min-w-fit">Step 8 of 12</span>
        </div>
      </div>
    </div>
  );
}
