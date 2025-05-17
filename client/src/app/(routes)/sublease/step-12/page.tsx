'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SubleaseStep12() {
  const [price, setPrice] = useState('');

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers
    const val = e.target.value.replace(/[^0-9]/g, '');
    setPrice(val);
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
          3
        </div>
        <div className="text-xl font-bold">Review and publish</div>
      </div>
      <div className="mb-2 font-bold text-lg">Set your price</div>
      <div className="text-gray-400 text-sm mb-8">
        You can change the price anytime. You might expect this price to have
        included amenity prices like water and electricity.
      </div>

      {/* Price input */}
      <div className="flex flex-col items-center justify-center my-12">
        <div className="flex items-center text-5xl font-bold">
          <span className="mr-2">$</span>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            className="w-32 text-5xl font-bold text-center border-none outline-none bg-transparent focus:ring-0"
            value={price}
            onChange={handlePriceChange}
            maxLength={6}
            aria-label="Price per month"
          />
          <span className="ml-2 text-5xl font-bold">/ month</span>
        </div>
      </div>

      {/* Navigation buttons and progress bar */}
      <div className="flex flex-col gap-4 mt-auto">
        <div className="flex justify-end gap-4">
          <Link href="/sublease/step-11" className="btn-secondary w-32">
            Back
          </Link>
          <Link
            href="/sublease/confirmation"
            className={`btn-primary w-32 text-center ${price.length === 0 ? 'opacity-50 pointer-events-none' : ''}`}
          >
            Next
          </Link>
        </div>
        <div className="flex items-center gap-4 mt-2">
          <div className="flex-1">
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-primaryOrange"
                style={{ width: '100%' }}
              />
            </div>
          </div>
          <span className="text-gray-500 text-sm min-w-fit">Step 12 of 12</span>
        </div>
      </div>
    </div>
  );
}
