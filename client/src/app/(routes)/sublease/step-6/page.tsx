'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PlusCircle, MinusCircle } from 'lucide-react';

export default function SubleaseStep6() {
  const [guests, setGuests] = useState(1);
  const [bedrooms, setBedrooms] = useState(0);
  const [beds, setBeds] = useState(0);
  const [hasLock, setHasLock] = useState('no');

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
        <div className="text-xl font-bold">Basic information - Bedroom</div>
      </div>

      {/* Bedroom info */}
      <div className="mb-8">
        <div className="divide-y divide-gray-200">
          {/* Max guests */}
          <div className="flex items-center justify-between py-4">
            <span>Max guests number</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Decrease guests"
                onClick={() => setGuests(Math.max(1, guests - 1))}
                className="disabled:opacity-50"
                disabled={guests <= 1}
              >
                <MinusCircle className="w-7 h-7 text-gray-400 hover:text-primaryOrange" />
              </button>
              <span className="w-8 text-center">{guests}</span>
              <button
                type="button"
                aria-label="Increase guests"
                onClick={() => setGuests(guests + 1)}
              >
                <PlusCircle className="w-7 h-7 text-primaryOrange" />
              </button>
            </div>
          </div>
          {/* Bedrooms */}
          <div className="flex items-center justify-between py-4">
            <span>Bedrooms</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Decrease bedrooms"
                onClick={() => setBedrooms(Math.max(0, bedrooms - 1))}
                className="disabled:opacity-50"
                disabled={bedrooms <= 0}
              >
                <MinusCircle className="w-7 h-7 text-gray-400 hover:text-primaryOrange" />
              </button>
              <span className="w-8 text-center">{bedrooms}</span>
              <button
                type="button"
                aria-label="Increase bedrooms"
                onClick={() => setBedrooms(bedrooms + 1)}
              >
                <PlusCircle className="w-7 h-7 text-primaryOrange" />
              </button>
            </div>
          </div>
          {/* Beds */}
          <div className="flex items-center justify-between py-4">
            <span>Beds</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Decrease beds"
                onClick={() => setBeds(Math.max(0, beds - 1))}
                className="disabled:opacity-50"
                disabled={beds <= 0}
              >
                <MinusCircle className="w-7 h-7 text-gray-400 hover:text-primaryOrange" />
              </button>
              <span className="w-8 text-center">{beds}</span>
              <button
                type="button"
                aria-label="Increase beds"
                onClick={() => setBeds(beds + 1)}
              >
                <PlusCircle className="w-7 h-7 text-primaryOrange" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lock question */}
      <div className="mb-8">
        <div className="font-medium mb-2">
          Does every bedroom has a lock? Guests would expect a lock for their
          room.
        </div>
        <div className="flex gap-8 items-center">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="hasLock"
              value="yes"
              checked={hasLock === 'yes'}
              onChange={() => setHasLock('yes')}
              className="accent-primaryOrange"
            />
            Yes
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="hasLock"
              value="no"
              checked={hasLock === 'no'}
              onChange={() => setHasLock('no')}
              className="accent-primaryOrange"
            />
            No
          </label>
        </div>
      </div>

      {/* Navigation buttons and progress bar */}
      <div className="flex flex-col gap-4 mt-auto">
        <div className="flex justify-end gap-4">
          <Link href="/sublease/step-5" className="btn-secondary w-32">
            Back
          </Link>
          <Link
            href="/sublease/step-7"
            className="btn-primary w-32 text-center"
          >
            Next
          </Link>
        </div>
        <div className="flex items-center gap-4 mt-2">
          <div className="flex-1">
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-primaryOrange"
                style={{ width: '50%' }}
              />
            </div>
          </div>
          <span className="text-gray-500 text-sm min-w-fit">Step 6 of 12</span>
        </div>
      </div>
    </div>
  );
}
