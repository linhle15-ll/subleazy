'use client';

import LogoAndExitButton from '@/components/ui/commons/logo-and-exit-button';
import { ProgressBar } from '@/components/ui/post-form/progress-bar';
import {
  AdvancedMarker,
  Map,
  MapCameraChangedEvent,
  MapCameraProps,
} from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';
import { usePostCreateStore } from '@/stores/post-create.store';

export default function SubleaseStep5() {
  const post = usePostCreateStore((state) => state.post);

  const { lat, long, address, city, state, zip, suites } = post;

  const [cameraProps, setCameraProps] = useState<MapCameraProps>({
    center: { lat: 38.907, lng: -77.036 },
    zoom: 15,
  });

  useEffect(() => {
    if (lat && long) {
      setCameraProps({
        ...cameraProps,
        center: { lat, lng: long },
      });
    }
  }, [lat, long]);

  const handleCameraChange = (e: MapCameraChangedEvent) =>
    setCameraProps(e.detail);

  return (
    <div className="form-border flex flex-col gap-6 relative mb-15">
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
              {address}, {suites ? `${suites},` : ''} {city}, {state} {zip}
            </div>
          </div>
        </div>
      </div>

      {/* Map Pin Section */}
      <div className="h-[400px] w-full rounded-lg overflow-hidden">
        <Map
          mapId={'12b033e06f8b8b2463b91f1e'}
          {...cameraProps}
          onCameraChanged={handleCameraChange}
        >
          {lat && long && <AdvancedMarker position={{ lat, lng: long }} />}
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
