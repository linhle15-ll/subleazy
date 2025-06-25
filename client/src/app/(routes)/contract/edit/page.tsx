'use client';
import React from 'react';
import EditorWithComment from '@/components/tiptap/index';

export default function ContractEditPage() {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-10 lg:gap-16 max-w-7xl w-screen mx-auto overflow-y-auto">
      <EditorWithComment />
    </div>
 );
}
