'use client'
import Image from 'next/image';
import React from 'react';
import { X } from 'lucide-react';

export const GalleryModal = ({
    data,
    onClose,
  }: {
    data: string[];
    onClose: () => void;
  }) => {
    React.useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }, [onClose]);
    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col p-4 animate-fade-in"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex justify-end mb-4">
          <button
            onClick={onClose}
            className="text-white p-2 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Close image gallery"
          >
            <X size={32} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto space-y-4">
            {data.map((src: string, index: any) => (
              <div key={index} className="relative w-full aspect-video bg-black/20 rounded-lg overflow-hidden">
                <Image
                  src={src}
                  alt={`Listing image ${index + 1}`}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };