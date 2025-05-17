'use client';

import Link from 'next/link';
import Image from 'next/image';
import { X } from 'lucide-react';
import designerWorking from '@/public/designer-working.png';

export default function SubleaseStep2() {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl border-2 border-primaryOrange p-10 mt-12 shadow-lg flex flex-col gap-8 relative min-h-[80vh]">
      {/* Exit button */}
      <Link
        href="/"
        className="absolute top-6 right-6 flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
      >
        <X className="w-5 h-5" />
        Exit
      </Link>

      {/* Main content */}
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-4 text-primaryOrange">
            Let's get your place listed - it only takes a few steps.
          </h1>
          <div className="space-y-8 mt-6">
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-10 h-10 border-2 border-primaryOrange rounded-full text-xl font-bold text-primaryOrange">
                1
              </div>
              <div>
                <div className="font-bold text-lg">
                  Gather basic information about your place
                </div>
                <div className="text-gray-700 text-sm">
                  Share key details like what type of space you're offering,
                  where it's located, and how many guests it can host.
                </div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-10 h-10 border-2 border-primaryOrange rounded-full text-xl font-bold text-primaryOrange">
                2
              </div>
              <div>
                <div className="font-bold text-lg">
                  Make your place stand out
                </div>
                <div className="text-gray-700 text-sm">
                  Upload great photos, select amenities, and write a short
                  description to help your place stand out to the right
                  subtenants.
                </div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-10 h-10 border-2 border-primaryOrange rounded-full text-xl font-bold text-primaryOrange">
                3
              </div>
              <div>
                <div className="font-bold text-lg">Review and publish</div>
                <div className="text-gray-700 text-sm">
                  Choose your nightly rate and review your listing before
                  publishing it to Subleazy.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 flex justify-center items-center">
          {/* Replace with actual illustration or use a placeholder image */}
          <Image
            src={designerWorking}
            alt="designer working"
            width={220}
            height={220}
          />
        </div>
      </div>

      {/* Progress bar and continue button */}
      <div className="flex flex-col gap-4 mt-8">
        <div className="flex items-center justify-between">
          <span className="text-gray-500 text-sm">Step 2 of 12</span>
          <Link
            href="/sublease/step-3"
            className="btn-primary w-40 text-center"
          >
            Get started
          </Link>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-primaryOrange" style={{ width: '16.6%' }} />
        </div>
      </div>
    </div>
  );
}
