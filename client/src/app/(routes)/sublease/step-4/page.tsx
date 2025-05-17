'use client';

import { useState } from 'react';
import Link from 'next/link';

const cityOptions = [
  // US Cities
  { country: 'US', name: 'New York' },
  { country: 'US', name: 'Los Angeles' },
  { country: 'US', name: 'Chicago' },
  { country: 'US', name: 'San Francisco' },
  { country: 'US', name: 'Boston' },
  { country: 'US', name: 'Seattle' },
  // Canada Cities
  { country: 'CA', name: 'Toronto' },
  { country: 'CA', name: 'Vancouver' },
  { country: 'CA', name: 'Montreal' },
  { country: 'CA', name: 'Calgary' },
  { country: 'CA', name: 'Ottawa' },
  { country: 'CA', name: 'Edmonton' },
];

export default function SubleaseStep4() {
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [apt, setApt] = useState('');
  const [town, setTown] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');

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

      {/* Location form */}
      <div className="mb-8">
        <div className="font-semibold text-lg mb-2">
          Where is your place located?
        </div>
        <div className="font-bold mb-1">Address</div>
        <div className="text-gray-400 text-sm mb-4">
          Your address will only be shared with guests once they have confirmed
          a reservation
        </div>
        <div className="flex flex-col gap-4">
          <select
            className="text-field"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          >
            <option value="">Country/Region</option>
            {cityOptions.map((opt, idx) => (
              <option key={idx} value={opt.name}>
                {opt.name} ({opt.country === 'US' ? 'USA' : 'Canada'})
              </option>
            ))}
          </select>
          <input
            className="text-field"
            placeholder="Street address"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
          <input
            className="text-field"
            placeholder="Apt, suite, unit (if applicable)"
            value={apt}
            onChange={(e) => setApt(e.target.value)}
          />
          <input
            className="text-field"
            placeholder="City / Town"
            value={town}
            onChange={(e) => setTown(e.target.value)}
          />
          <input
            className="text-field"
            placeholder="State / Territory"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          <input
            className="text-field"
            placeholder="ZIP code"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
          />
        </div>
      </div>

      {/* Navigation buttons and progress bar */}
      <div className="flex flex-col gap-4 mt-auto">
        <div className="flex justify-end gap-4">
          <Link href="/sublease/step-3" className="btn-secondary w-32">
            Back
          </Link>
          <Link
            href="/sublease/step-5"
            className={`btn-primary w-32 text-center ${city === '' || street === '' || town === '' || state === '' || zip === '' ? 'opacity-50 pointer-events-none' : ''}`}
          >
            Next
          </Link>
        </div>
        <div className="flex items-center gap-4 mt-2">
          <div className="flex-1">
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-primaryOrange"
                style={{ width: '33%' }}
              />
            </div>
          </div>
          <span className="text-gray-500 text-sm min-w-fit">Step 4 of 12</span>
        </div>
      </div>
    </div>
  );
}
