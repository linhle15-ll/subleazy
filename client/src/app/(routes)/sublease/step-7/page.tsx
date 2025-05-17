'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PlusCircle, MinusCircle } from 'lucide-react';

export default function SubleaseStep7() {
  const [privateAttached, setPrivateAttached] = useState(1);
  const [privateShared, setPrivateShared] = useState(0);
  const [shared, setShared] = useState(0);

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
        <div className="text-xl font-bold">Basic information - Bathrooms</div>
      </div>

      {/* Bathroom info */}
      <div className="mb-8">
        <div className="divide-y divide-gray-200">
          {/* Private attached */}
          <div className="flex items-center justify-between py-4">
            <span>Private and attached to guests' room</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Decrease private attached"
                onClick={() =>
                  setPrivateAttached(Math.max(0, privateAttached - 1))
                }
                className="disabled:opacity-50"
                disabled={privateAttached <= 0}
              >
                <MinusCircle className="w-7 h-7 text-gray-400 hover:text-primaryOrange" />
              </button>
              <span className="w-8 text-center">{privateAttached}</span>
              <button
                type="button"
                aria-label="Increase private attached"
                onClick={() => setPrivateAttached(privateAttached + 1)}
              >
                <PlusCircle className="w-7 h-7 text-primaryOrange" />
              </button>
            </div>
          </div>
          {/* Private shared */}
          <div className="flex items-center justify-between py-4">
            <span>
              Private but accessible through shared place, like hall ways
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Decrease private shared"
                onClick={() => setPrivateShared(Math.max(0, privateShared - 1))}
                className="disabled:opacity-50"
                disabled={privateShared <= 0}
              >
                <MinusCircle className="w-7 h-7 text-gray-400 hover:text-primaryOrange" />
              </button>
              <span className="w-8 text-center">{privateShared}</span>
              <button
                type="button"
                aria-label="Increase private shared"
                onClick={() => setPrivateShared(privateShared + 1)}
              >
                <PlusCircle className="w-7 h-7 text-primaryOrange" />
              </button>
            </div>
          </div>
          {/* Shared */}
          <div className="flex items-center justify-between py-4">
            <span>Shared</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Decrease shared"
                onClick={() => setShared(Math.max(0, shared - 1))}
                className="disabled:opacity-50"
                disabled={shared <= 0}
              >
                <MinusCircle className="w-7 h-7 text-gray-400 hover:text-primaryOrange" />
              </button>
              <span className="w-8 text-center">{shared}</span>
              <button
                type="button"
                aria-label="Increase shared"
                onClick={() => setShared(shared + 1)}
              >
                <PlusCircle className="w-7 h-7 text-primaryOrange" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation buttons and progress bar */}
      <div className="flex flex-col gap-4 mt-auto">
        <div className="flex justify-end gap-4">
          <Link href="/sublease/step-6" className="btn-secondary w-32">
            Back
          </Link>
          <Link
            href="/sublease/step-8"
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
                style={{ width: '58%' }}
              />
            </div>
          </div>
          <span className="text-gray-500 text-sm min-w-fit">Step 7 of 12</span>
        </div>
      </div>
    </div>
  );
}
