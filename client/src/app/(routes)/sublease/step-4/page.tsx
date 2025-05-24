'use client';

import { useState } from 'react';
<<<<<<< HEAD
import { US_CITIES, USCity } from '@/lib/utils/us-cities';
import LogoAndExitButton from '@/components/ui/commons/logo-and-exit-button';
import ProgressBar from '@/components/ui/progress-bar/progress-bar';

export default function SubleaseStep4() {
  const [city, setCity] = useState<USCity | ''>('');
=======
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
>>>>>>> 0e31831 (Almost done for page 3, in progress adding small adjustment for selection-box component)
  const [street, setStreet] = useState('');
  const [apt, setApt] = useState('');
  const [town, setTown] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');

  return (
<<<<<<< HEAD
    <div className="form-border flex flex-col gap-6 relative">
      <LogoAndExitButton buttonName="Save & Exit" />

      {/* Step indicator and title */}
      <div className="flex items-center gap-4">
        <div className="form-heading-number-orange">1</div>
        <div className="form-h1">Basic information - Location</div>
      </div>

      {/* Location form */}
      <div className="mb-8 -mt-3">
        <div className="mb-8">Where is your place located?</div>
        <div className="form-h2">Address</div>
        <div className="mb-8">
=======
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
>>>>>>> 0e31831 (Almost done for page 3, in progress adding small adjustment for selection-box component)
          Your address will only be shared with guests once they have confirmed
          a reservation
        </div>
        <div className="flex flex-col gap-4">
          <select
            className="text-field"
            value={city}
<<<<<<< HEAD
            onChange={(e) => {
              setCity(e.target.value as USCity);
              console.log('City:', e.target.value);
            }}
            title="Select a city"
          >
            <option value="">Select a city</option>
            {US_CITIES.map((city) => (
              <option key={city} value={city}>
                {city}
=======
            onChange={(e) => setCity(e.target.value)}
          >
            <option value="">Country/Region</option>
            {cityOptions.map((opt, idx) => (
              <option key={idx} value={opt.name}>
                {opt.name} ({opt.country === 'US' ? 'USA' : 'Canada'})
>>>>>>> 0e31831 (Almost done for page 3, in progress adding small adjustment for selection-box component)
              </option>
            ))}
          </select>
          <input
            className="text-field"
            placeholder="Street address"
            value={street}
<<<<<<< HEAD
            onChange={(e) => {
              setStreet(e.target.value);
              console.log('Street:', e.target.value);
            }}
=======
            onChange={(e) => setStreet(e.target.value)}
>>>>>>> 0e31831 (Almost done for page 3, in progress adding small adjustment for selection-box component)
          />
          <input
            className="text-field"
            placeholder="Apt, suite, unit (if applicable)"
            value={apt}
<<<<<<< HEAD
            onChange={(e) => {
              setApt(e.target.value);
              console.log('Apt:', e.target.value);
            }}
=======
            onChange={(e) => setApt(e.target.value)}
>>>>>>> 0e31831 (Almost done for page 3, in progress adding small adjustment for selection-box component)
          />
          <input
            className="text-field"
            placeholder="City / Town"
            value={town}
<<<<<<< HEAD
            onChange={(e) => {
              setTown(e.target.value);
              console.log('Town:', e.target.value);
            }}
=======
            onChange={(e) => setTown(e.target.value)}
>>>>>>> 0e31831 (Almost done for page 3, in progress adding small adjustment for selection-box component)
          />
          <input
            className="text-field"
            placeholder="State / Territory"
            value={state}
<<<<<<< HEAD
            onChange={(e) => {
              setState(e.target.value);
              console.log('State:', e.target.value);
            }}
=======
            onChange={(e) => setState(e.target.value)}
>>>>>>> 0e31831 (Almost done for page 3, in progress adding small adjustment for selection-box component)
          />
          <input
            className="text-field"
            placeholder="ZIP code"
            value={zip}
<<<<<<< HEAD
            onChange={(e) => {
              setZip(e.target.value);
              console.log('Zip:', e.target.value);
            }}
=======
            onChange={(e) => setZip(e.target.value)}
>>>>>>> 0e31831 (Almost done for page 3, in progress adding small adjustment for selection-box component)
          />
        </div>
      </div>

      {/* Navigation buttons and progress bar */}
<<<<<<< HEAD
      <ProgressBar
        currentStep={3}
        totalSteps={11}
        buttons={[
          {
            text: 'Back',
            url: '/sublease/step-3',
            variant: 'secondary',
          },
          {
            text: 'Next',
            url: '/sublease/step-5',
            variant: 'primary',
          },
        ]}
      />
=======
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
>>>>>>> 0e31831 (Almost done for page 3, in progress adding small adjustment for selection-box component)
    </div>
  );
}
