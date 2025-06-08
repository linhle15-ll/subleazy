'use client';

import { useEffect } from 'react';
import { US_CITIES, USCity } from '@/lib/utils/us-cities';
import LogoAndExitButton from '@/components/ui/commons/logo-and-exit-button';
import ProgressBar from '@/components/ui/progress-bar/progress-bar';
import { PlaceAutocomplete } from '@/components/ui/map/place-autocomplete';
import { useFormStore } from '@/components/store/formStore';

export default function SubleaseStep4() {
  const { setField, setPartial, city, address, suites, state, zip, lat, long } =
    useFormStore();

  // Log the current state whenever it changes
  useEffect(() => {
    console.log('Current form state:', useFormStore.getState());
  }, [city, address, suites, state, zip, lat, long]);

  const handleCityChange = (city: USCity) => {
    setField('city', city);
  };

  const handleAddressChange = (place: google.maps.places.Place | null) => {
    if (place) {
      const location = place.location;
      let cityName = '';
      let stateCode = '';
      let zipCode = '';

      // Extract address components
      place.addressComponents?.forEach((component) => {
        const types = component.types;
        if (types.includes('locality')) {
          cityName = component.longText || '';
        } else if (types.includes('administrative_area_level_1')) {
          stateCode = component.shortText || '';
        } else if (types.includes('postal_code')) {
          zipCode = component.longText || '';
        }
      });

      // Update all fields at once
      setPartial({
        address: place.formattedAddress || '',
        city: cityName,
        state: stateCode,
        zip: zipCode,
        lat: location ? location.lat() : null,
        long: location ? location.lng() : null,
      });
    }
  };

  const handleAptChange = (apt: string) => {
    setField('suites', apt);
  };

  const handleTownChange = (town: string) => {
    setField('city', town);
  };

  const handleStateChange = (state: string) => {
    setField('state', state);
  };

  const handleZipChange = (zip: string) => {
    setField('zip', zip);
  };

  return (
    <div className="form-border flex flex-col gap-6 relative mb-15">
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
            onChange={(e) => handleCityChange(e.target.value as USCity)}
            title="Select a city"
          >
            <option value="">Select a city</option>
            {US_CITIES.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          <PlaceAutocomplete
            onPlaceSelect={handleAddressChange}
            className="text-field w-full"
          />
          <input
            className="text-field"
            placeholder="Apt, suite, unit (if applicable)"
            value={suites || ''}
            onChange={(e) => handleAptChange(e.target.value)}
          />
          <input
            className="text-field"
            placeholder="City / Town"
            value={city || ''}
            onChange={(e) => handleTownChange(e.target.value)}
          />
          <input
            className="text-field"
            placeholder="State / Territory"
            value={state || ''}
            onChange={(e) => handleStateChange(e.target.value)}
          />
          <input
            className="text-field"
            placeholder="ZIP code"
            value={zip || ''}
            onChange={(e) => handleZipChange(e.target.value)}
          />
        </div>
      </div>

      {/* Navigation buttons and progress bar */}
      <ProgressBar
        currentStep={3}
        totalSteps={12}
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
