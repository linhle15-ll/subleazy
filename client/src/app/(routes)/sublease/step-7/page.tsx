'use client';

import { useState } from 'react';
import { PlusCircle, MinusCircle } from 'lucide-react';
import LogoAndExitButton from '@/components/ui/commons/logo-and-exit-button';
import ProgressBar from '@/components/ui/progress-bar/progress-bar';

export default function SubleaseStep7() {
  const [privateAttached, setPrivateAttached] = useState(1);
  const [privateShared, setPrivateShared] = useState(0);
  const [shared, setShared] = useState(0);

  return (
    <div className="form-border flex flex-col gap-6 relative">
      <LogoAndExitButton buttonName="Save & Exit" />

      <div className="flex items-center gap-4">
        <div className="form-heading-number-orange">1</div>
        <div className="form-h1">Basic information - Bathrooms</div>
      </div>

      {/* Bathroom info */}
      <div className="pl-14 pr-14">
        <div className="divide-y divide-gray-200">
          {/* Private attached */}
          <div className="form-des-inc-button">
            <span>Private and attached to guests' room</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Decrease private attached"
                onClick={() =>
                  setPrivateAttached(Math.max(0, privateAttached - 1))
                }
                className="disabled:opacity-50"
                disabled={privateAttached <= 0}
              >
                <MinusCircle className="w-7 h-7 text-gray-400 hover:text-primaryOrange" />
              </button>
              <span className="w-8 text-center">{privateAttached}</span>
              <button
                type="button"
                aria-label="Increase private attached"
                onClick={() => setPrivateAttached(privateAttached + 1)}
              >
                <PlusCircle className="w-7 h-7 text-primaryOrange" />
              </button>
            </div>
          </div>
          {/* Private shared */}
          <div className="form-des-inc-button">
            <span>
              Private but accessible through shared place, like hall ways
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Decrease private shared"
                onClick={() => setPrivateShared(Math.max(0, privateShared - 1))}
                className="disabled:opacity-50"
                disabled={privateShared <= 0}
              >
                <MinusCircle className="w-7 h-7 text-gray-400 hover:text-primaryOrange" />
              </button>
              <span className="w-8 text-center">{privateShared}</span>
              <button
                type="button"
                aria-label="Increase private shared"
                onClick={() => setPrivateShared(privateShared + 1)}
              >
                <PlusCircle className="w-7 h-7 text-primaryOrange" />
              </button>
            </div>
          </div>
          {/* Shared */}
          <div className="form-des-inc-button">
            <span>Shared</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Decrease shared"
                onClick={() => setShared(Math.max(0, shared - 1))}
                className="disabled:opacity-50"
                disabled={shared <= 0}
              >
                <MinusCircle className="w-7 h-7 text-gray-400 hover:text-primaryOrange" />
              </button>
              <span className="w-8 text-center">{shared}</span>
              <button
                type="button"
                aria-label="Increase shared"
                onClick={() => setShared(shared + 1)}
              >
                <PlusCircle className="w-7 h-7 text-primaryOrange" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation buttons and progress bar */}
      <ProgressBar
        currentStep={6}
        totalSteps={12}
        buttons={[
          {
            text: 'Back',
            url: '/sublease/step-6',
            variant: 'secondary',
          },
          {
            text: 'Next',
            url: '/sublease/step-8',
            variant: 'primary',
          },
        ]}
      />
    </div>
  );
}
