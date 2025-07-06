'use client';
import React from 'react';
import Editor from '@/components/editor/editor';

export default function ContractEditPage() {
  return (
    <div className="sm:mx-auto items-center justify-center py-12 gap-10 lg:gap-16 max-w-7xl w-screen">
      <Editor />
    </div>
  );
}
