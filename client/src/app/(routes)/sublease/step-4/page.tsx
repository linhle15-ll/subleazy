'use client';

import { useState } from 'react';
import { US_CITIES, USCity } from '@/lib/utils/us-cities';
import LogoAndExitButton from '@/components/ui/commons/logo-and-exit-button';
import ProgressBar from '@/components/ui/progress-bar/progress-bar';

export default function SubleaseStep4() {
  const [city, setCity] = useState<USCity | ''>('');
  const [street, setStreet] = useState('');
  const [apt, setApt] = useState('');
  const [town, setTown] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');

  return (
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
          Your address will only be shared with guests once they have confirmed
          a reservation
        </div>
        <div className="flex flex-col gap-4">
          <select
            className="text-field"
            value={city}
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
              </option>
            ))}
          </select>
          <input
            className="text-field"
            placeholder="Street address"
            value={street}
            onChange={(e) => {
              setStreet(e.target.value);
              console.log('Street:', e.target.value);
            }}
          />
          <input
            className="text-field"
            placeholder="Apt, suite, unit (if applicable)"
            value={apt}
            onChange={(e) => {
              setApt(e.target.value);
              console.log('Apt:', e.target.value);
            }}
          />
          <input
            className="text-field"
            placeholder="City / Town"
            value={town}
            onChange={(e) => {
              setTown(e.target.value);
              console.log('Town:', e.target.value);
            }}
          />
          <input
            className="text-field"
            placeholder="State / Territory"
            value={state}
            onChange={(e) => {
              setState(e.target.value);
              console.log('State:', e.target.value);
            }}
          />
          <input
            className="text-field"
            placeholder="ZIP code"
            value={zip}
            onChange={(e) => {
              setZip(e.target.value);
              console.log('Zip:', e.target.value);
            }}
          />
        </div>
      </div>

      {/* Navigation buttons and progress bar */}
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
    </div>
  );
}
