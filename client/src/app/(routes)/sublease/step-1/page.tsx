'use client';

import { CheckCircle, AlertTriangle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import projectTimeline from '@/public/project-timeline.png';
import subleazy_logo from '@/public/subleazy_logo.png';

export default function SubleaseStep1() {
  return (
    <div className="form-border flex flex-row gap-6 relative">
      <div className="max-w-3xl  bg-white flex flex-col items-start gap-0">
        <div className="flex flex-col items-start gap-0">
          <div className="form-brand-logo">
            <Image src={subleazy_logo} alt="subleazy logo" />
          </div>
          <div>
            <h2 className="text-xl mb-4">
              Before you sublease, make sure you have permission!
            </h2>
            <p className="text-sm mb-2">
              Subleasing is exciting — but also a legal responsibility. Before
              you post, please confirm:
            </p>
          </div>
        </div>
        <div>
          <ul className="mb-5 mt-5 space-y-2 pl-9">
            <li className="flex items-center gap-2 text-base">
              <CheckCircle className="text-primaryOrange w-6 h-6" />
              You've reviewed your lease agreement
            </li>
            <li className="flex items-center gap-2 text-base">
              <CheckCircle className="text-primaryOrange w-6 h-6" />
              You have sublease permission from your landlord
            </li>
            <li className="flex items-center gap-2 text-base">
              <CheckCircle className="text-primaryOrange w-6 h-6" />
              Your housing provider is aware of your sublease plans
            </li>
          </ul>
        </div>
        <div className="mb-4">
          <p>
            If you're unsure, check with your landlord or housing office before
            continuing.
          </p>
          <ul className="list-disc list-inside text-sm text-gray-700 mt-2 space-y-1">
            <li>Does your lease or housing contract allow subleasing?</li>
            <li>
              Do you need written approval from your landlord or property
              manager?
            </li>
            <li>Are there specific rules or time limits around subleasing?</li>
          </ul>
        </div>
        <hr className="my-4 border-gray-200" />
        <div className="text-base font-semibold mb-2">
          Subleazy helps connect students, not handle legal agreements.
          <span className="font-normal">
            {' '}
            Having sublease permission means you're complying with your lease
            agreement, your subtenant has a smooth and legal stay, and everyone
            stays protected and informed.
          </span>
        </div>
        <div className="flex flex-row mt-6 gap-4">
          <Link href="/" className="btn-secondary flex-1 w-72">
            Cancel
          </Link>
          <Link href="/sublease/step-2" className="btn-primary flex-1">
            I confirm my permission to sublease and continue
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center ml-4">
        <div className="mb-30">
          <AlertTriangle className="w-30 h-30 text-primaryOrange" />
        </div>
        <div className="bottom-8 right-8">
          <Image
            src={projectTimeline}
            alt="project timeline"
            width={280}
            height={280}
          />
        </div>
      </div>
    </div>
  );
}
