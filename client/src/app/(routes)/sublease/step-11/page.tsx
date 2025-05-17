'use client';

import { useState } from 'react';
import Link from 'next/link';

const TITLE_MAX = 50;
const DESC_MAX = 500;

export default function SubleaseStep11() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

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
          2
        </div>
        <div className="text-xl font-bold">Make your place stand out</div>
      </div>
      <div className="mb-2 font-bold text-lg">
        Let's give your place a title and share some description
      </div>
      <div className="text-gray-400 text-sm mb-8">
        You can always edit them after publishing your post.
      </div>

      {/* Title input */}
      <div className="mb-6">
        <label htmlFor="title" className="font-semibold block mb-1">
          Title
        </label>
        <input
          id="title"
          className="text-field w-full"
          maxLength={TITLE_MAX}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="text-xs text-gray-400 mt-1">
          {title.length}/{TITLE_MAX} character
        </div>
      </div>

      {/* Description input */}
      <div className="mb-6">
        <label htmlFor="desc" className="font-semibold block mb-1">
          Description
        </label>
        <textarea
          id="desc"
          className="text-field w-full min-h-[120px]"
          maxLength={DESC_MAX}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <div className="text-xs text-gray-400 mt-1">
          {desc.length}/{DESC_MAX} character
        </div>
      </div>

      {/* Navigation buttons and progress bar */}
      <div className="flex flex-col gap-4 mt-auto">
        <div className="flex justify-end gap-4">
          <Link href="/sublease/step-10" className="btn-secondary w-32">
            Back
          </Link>
          <Link
            href="/sublease/step-12"
            className={`btn-primary w-32 text-center ${title.length === 0 || desc.length === 0 ? 'opacity-50 pointer-events-none' : ''}`}
          >
            Next
          </Link>
        </div>
        <div className="flex items-center gap-4 mt-2">
          <div className="flex-1">
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-primaryOrange"
                style={{ width: '91%' }}
              />
            </div>
          </div>
          <span className="text-gray-500 text-sm min-w-fit">Step 11 of 12</span>
        </div>
      </div>
    </div>
  );
}
