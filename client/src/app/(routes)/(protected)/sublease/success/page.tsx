'use client';

import { CheckCircle2 } from 'lucide-react';
import LogoAndExitButton from '@/components/ui/commons/logo-and-exit-button';

export default function SubleaseSuccess() {
  return (
    <div className="form-border flex flex-col gap-6 relative mb-15">
      <LogoAndExitButton buttonName="Exit" />

      <div className="flex flex-col items-center justify-center py-16">
        <CheckCircle2 className="w-24 h-24 text-primaryOrange mb-8" />
        <h1 className="text-3xl font-medium mb-4 text-center">
          Your listing has been published successfully!
        </h1>
        <p className="text-gray-500 text-center mb-8 max-w-md">
          Your sublease listing is now live and visible to potential tenants.
          You can manage your listing from your dashboard.
        </p>
      </div>
    </div>
  );
}
