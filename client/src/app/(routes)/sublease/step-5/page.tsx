'use client';

import LogoAndExitButton from '@/components/ui/commons/logo-and-exit-button';
import ProgressBar from '@/components/ui/progress-bar/progress-bar';
import LocationMap from '@/components/ui/map/location-map';

export default function SubleaseStep5() {
  return (
    <div className="form-border flex flex-col gap-6 relative">
      <LogoAndExitButton buttonName="Save & Exit" />

      {/* Step indicator and title */}
      <div className="flex items-center gap-4">
        <div className="form-heading-number-orange">1</div>
        <div className="form-h1">Basic information - Location</div>
      </div>

      {/* Map Pin Section */}
      <div className="mb-8">
        <div className="form-h2">Is this pin the right spot?</div>
        <div className="mb-8">
          Please check your address carefully. Address cannot be edited once
          post is created.
        </div>
        <div className="flex justify-center items-center h-64 border mt-32">
          <LocationMap />
        </div>
      </div>

      {/* Navigation buttons and progress bar */}
      <ProgressBar
        currentStep={4}
        totalSteps={11}
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
