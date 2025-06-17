'use client';

import Image from 'next/image';
import designerWorking from '@/public/designer-working.png';
import { ProgressBar } from '@/components/ui/post-form/progress-bar';
import LogoAndExitButton from '@/components/ui/commons/logo-and-exit-button';

function MainContent() {
  return (
    <div className="flex flex-row gap-6 relative mb-15">
      {/* Left column */}
      <div className="flex-2 flex flex-col justify-center">
        <h1 className="text-3xl font-medium mb-4">
          Let's get your place listed - it only takes a few steps.
        </h1>
        <div className="flex-1 flex ml-11 items-center">
          <Image
            src={designerWorking}
            alt="designer working"
            width={300}
            height={300}
          />
        </div>
      </div>
      {/* Right column */}
      <div className="flex flex-col items-start gap-0">
        <div className="space-y-8">
          <div className="flex items-start gap-4">
            <div className="items-center justify-center border-primaryOrange text-2xl font-bold text-primaryOrange">
              1
            </div>
            <div>
              <div className="font-medium text-2xl pb-4">
                Gather basic information about your place
              </div>
              <div className="text-gray-700 text-sm">
                Share key details like what type of space you're offering, where
                it's located, and how many guests it can host.
              </div>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="items-center justify-center border-primaryOrange text-2xl font-bold text-primaryOrange">
              2
            </div>
            <div>
              <div className="font-medium text-2xl pb-4">
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
            <div className="items-center justify-center border-primaryOrange text-2xl font-bold text-primaryOrange">
              3
            </div>
            <div>
              <div className="font-medium text-2xl pb-4">
                Review and publish
              </div>
              <div className="text-gray-700 text-sm">
                Choose your nightly rate and review your listing before
                publishing it to Subleazy.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SubleaseStep2() {
  return (
    <div className="form-border flex flex-col gap-6 relative">
      <LogoAndExitButton buttonName="Exit" />
      <MainContent />
      <ProgressBar
        currentStep={1}
        totalSteps={12}
        buttons={[
          {
            text: 'Get started',
            url: '/sublease/step-3',
          },
        ]}
      />
    </div>
  );
}

export default SubleaseStep2;
