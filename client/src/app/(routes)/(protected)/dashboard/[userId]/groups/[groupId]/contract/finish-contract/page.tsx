'use client';
import { HomeIcon, CheckCircle2, Share2, FileText } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useEditorStore } from '@/stores/editor.store';
import React from 'react';

export default function FinishContractPage() {
  const { documentData } = useEditorStore();

  console.log(documentData);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Contract Completed',
        text: 'I have successfully completed my contract using Subleazy!',
        url: window.location.origin,
      });
    } else {
      navigator.clipboard.writeText(window.location.origin);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50">
      <div className="flex flex-col items-center justify-center px-6 py-12 lg:px-20 gap-12 lg:gap-16 w-full max-w-6xl mx-auto animate-fade-in">
        <CheckCircle2 className="w-24 h-24 text-green-500" />

        <div className="text-center space-y-6 max-w-4xl animate-slide-up">
          <div className="space-y-4">
            <div className="font-semibold sm:text-6xl text-4xl text-primaryOrange">
              Congratulations!
            </div>
            <div className="text-xl lg:text-2xl font-medium">
              Your contract has been successfully completed!
            </div>
            <div className="text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
              You've successfully navigated through the contract creation
              process. Your legal document is now ready and professionally
              formatted.
            </div>
          </div>
        </div>

        {/* Contract Summary */}

        {/* Navigation Options */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <Button
            onClick={handleShare}
            variant={'outline'}
            className="btn-secondary w-50"
          >
            <Share2 size={20} />
            Share
          </Button>

          <Link href={`/dashboard/${userId}/groups/final-contract?contractId=${documentData?.contractId}&groupId=${groupId}`} className="flex-1">
            <Button className="btn-primary w-50">
              <FileText size={20} />
              View Final Contract
            </Button>
          </Link>

          <Link href="/" className="flex-1">
            <Button className="btn-secondary w-50">
              <HomeIcon size={20} />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
