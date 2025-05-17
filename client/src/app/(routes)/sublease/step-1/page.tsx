'use client';

import { CheckCircle, AlertTriangle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import projectTimeline from '@/public/project-timeline.png';

export default function SubleaseStep1() {
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl border-2 border-primaryOrange p-8 mt-12 shadow-lg flex flex-col gap-6 relative">
      <div className="absolute top-8 right-8">
        <AlertTriangle className="w-16 h-16 text-primaryOrange" />
      </div>
      <h1 className="text-3xl font-bold text-primaryOrange mb-2">Subleazy</h1>
      <h2 className="text-xl font-semibold mb-4">
        Before you sublease, make sure you have permission!
      </h2>
      <p className="mb-2">
        Subleasing is exciting — but also a legal responsibility. Before you
        post, please confirm:
      </p>
      <ul className="mb-4 space-y-2">
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
      <div className="mb-4">
        <p>
          If you're unsure, check with your landlord or housing office before
          continuing.
        </p>
        <ul className="list-disc list-inside text-sm text-gray-700 mt-2 space-y-1">
          <li>Does your lease or housing contract allow subleasing?</li>
          <li>
            Do you need written approval from your landlord or property manager?
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
      <div className="flex justify-between items-center mt-6">
        <Link href="/" className="btn-secondary w-1/3">
          Cancel
        </Link>
        <Link href="/sublease/step-2" className="btn-primary w-2/3">
          I confirm my permission to sublease and continue
        </Link>
      </div>
      <div className="absolute bottom-8 right-8">
        {/* Replace with actual illustration or use a placeholder image */}
        <Image
          src={projectTimeline}
          alt="project timeline"
          width={120}
          height={120}
        />
      </div>
    </div>
  );
}
