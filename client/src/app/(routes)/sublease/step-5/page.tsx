'use client';

import Link from 'next/link';

export default function SubleaseStep5() {
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
        <div className="text-xl font-bold">Basic information - Location</div>
      </div>

      {/* Map Pin Section */}
      <div className="mb-8">
        <div className="font-semibold text-lg mb-2">
          Is this pin the right spot?
        </div>
        <div className="text-gray-400 text-sm mb-8">
          Your address will only be shared with guests once they have confirmed
          a reservation
        </div>
        <div className="flex justify-center items-center h-64 border border-dashed border-gray-300 rounded-xl bg-gray-50">
          <span className="text-gray-500">google map pin</span>
        </div>
      </div>

      {/* Navigation buttons and progress bar */}
      <div className="flex flex-col gap-4 mt-auto">
        <div className="flex justify-end gap-4">
          <Link href="/sublease/step-4" className="btn-secondary w-32">
            Back
          </Link>
          <Link
            href="/sublease/step-6"
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
                style={{ width: '41%' }}
              />
            </div>
          </div>
          <span className="text-gray-500 text-sm min-w-fit">Step 5 of 12</span>
        </div>
      </div>
    </div>
  );
}
