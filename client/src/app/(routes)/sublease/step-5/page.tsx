'use client';

import LogoAndExitButton from '@/components/ui/commons/logo-and-exit-button';
import ProgressBar from '@/components/ui/progress-bar/progress-bar';
import { Map, Marker } from '@vis.gl/react-google-maps';
import { useFormStore } from '@/components/store/formStore';

export default function SubleaseStep5() {
  const { lat, long, suites, address } = useFormStore();

  // Default center to San Francisco if no coordinates are available
  const defaultCenter =
    lat && long ? { lat, lng: long } : { lat: 37.7749, lng: -122.4194 };

  return (
    <div className="form-border flex flex-col gap-6 relative">
      <LogoAndExitButton buttonName="Save & Exit" />

      {/* Step indicator and title */}
      <div className="flex items-center gap-4">
        <div className="form-heading-number-orange">1</div>
        <div className="form-h1">Basic information - Location</div>
      </div>

      <div className="mb-8">
        <div className="form-h2">Is this pin the right spot?</div>
        <div className="mb-8">
          Please check your address carefully. Address cannot be edited once
          post is created.
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="form-h3">Address</div>
            <div className="text-field">
              Apt {suites}, {address}
            </div>
          </div>
        </div>
      </div>

      {/* Map Pin Section */}
      <div className="h-[400px] w-full rounded-lg overflow-hidden">
        <Map
          defaultCenter={defaultCenter}
          defaultZoom={15}
          gestureHandling={'greedy'}
          disableDefaultUI={true}
          mapId="posting-map"
        >
          {lat && long && <Marker position={{ lat, lng: long }} />}
        </Map>
      </div>

      {/* Navigation buttons and progress bar */}
      <ProgressBar
        currentStep={4}
        totalSteps={12}
        buttons={[
          {
            text: 'Back',
            url: '/sublease/step-4',
            variant: 'secondary',
          },
          {
            text: 'Next',
            url: '/sublease/step-6',
            variant: 'primary',
          },
        ]}
      />
    </div>
  );
}
