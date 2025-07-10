'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import { useDocumentData, useHasDocument } from '@/stores/editor.store';
import Editor from '@/components/editor/editor';

export default function ContractEditPage() {
  const { contractId } = useParams<{ contractId: string}>()
  const documentData = useDocumentData();
  const hasDocument = useHasDocument();

  return (
    <div className="sm:mx-auto items-center justify-center py-12 gap-10 lg:gap-16 max-w-7xl w-screen pl-9 pr-9">
      {hasDocument && documentData && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg w-full">
          <div className="flex items-center gap-2">
            <span className="text-green-600">📄</span>
            <span className="text-green-800 text-sm">
              Editing: <strong>{documentData.filename}</strong>
              <span className="text-gray-600 text-xs block">
                {documentData.contentType === 'docx' ? 'Imported' : 'Template'}{' '}
                •{documentData.uploadedAt.toLocaleString()}
              </span>
            </span>
          </div>
        </div>
      )}

      <Editor
        initialContent={documentData?.content}
        contractId={contractId || undefined}
      />
    </div>
  );
}
