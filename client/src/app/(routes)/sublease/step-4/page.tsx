'use client';

import LogoAndExitButton from '@/components/ui/commons/logo-and-exit-button';
import { ProgressBar } from '@/components/ui/post-form/progress-bar';
import { PlaceAutocomplete } from '@/components/ui/map/place-autocomplete';
import { usePostCreateStore } from '@/stores/post-create.store';

export default function SubleaseStep4() {
  const post = usePostCreateStore((state) => state.post);
  const setPost = usePostCreateStore((state) => state.setPost);

  const handleChange = (
    key: 'city' | 'state' | 'zip' | 'suites',
    value: string
  ) => {
    setPost({
      ...post,
      [key]: value,
    });
  };

  const handleAddressChange = (place: google.maps.places.Place | null) => {
    if (!place) return;

    const lat = place.location?.lat();
    const long = place.location?.lng();
    let address = '';
    let city = '';
    let state = '';
    let zip = '';

    for (const component of place.addressComponents || []) {
      if (component.types.includes('street_number')) {
        address += component.longText + ' ';
      } else if (component.types.includes('route')) {
        address += component.shortText;
      } else if (
        component.types.includes('neighborhood') ||
        component.types.includes('locality')
      ) {
        city += component.longText;
      } else if (component.types.includes('administrative_area_level_1')) {
        state += component.shortText;
      } else if (component.types.includes('postal_code')) {
        zip += component.longText;
      }
    }

    if (lat && long && address && city && state && zip) {
      setPost({
        ...post,
        lat,
        long,
        address,
        suites: '',
        city,
        state,
        zip,
      });
    }
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
          <PlaceAutocomplete
            onPlaceSelect={handleAddressChange}
            className="text-field w-full"
          />
          <input
            className="text-field"
            placeholder="Apt, suite, unit (if applicable)"
            value={post.suites || ''}
            onChange={(e) => handleChange('suites', e.target.value)}
          />
          <input
            className="text-field"
            placeholder="City / Town"
            value={post.city || ''}
            onChange={(e) => handleChange('city', e.target.value)}
          />
          <input
            className="text-field"
            placeholder="State / Territory"
            value={post.state || ''}
            onChange={(e) => handleChange('state', e.target.value)}
          />
          <input
            className="text-field"
            placeholder="ZIP code"
            value={post.zip || ''}
            onChange={(e) => handleChange('zip', e.target.value)}
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
