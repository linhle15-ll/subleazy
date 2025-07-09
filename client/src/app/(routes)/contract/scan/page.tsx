/* eslint-disable prettier/prettier */
'use client';
import React from 'react';
import { useRouter } from 'next/navigation'
import { useEditorStore } from '@/stores/editor.store';
import ContentMediaFolder from '@/public/content-media-folder.png';
import Image from 'next/image';
import { Camera, Upload, ArrowRight } from 'lucide-react';

export default function ContractScanPage() {
    const importRef = React.useRef<HTMLInputElement>(null);
    const [document, setDocument] = React.useState<File | null>(null);
    const router = useRouter();
    
    const { 
        setDocumentData, 
        isLoading, 
        setIsLoading, 
        error, 
        setError, 
        clearError 
    } = useEditorStore();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files?.length > 0) {
            setDocument(e.target.files[0]);
            clearError(); // Clear any previous errors
        }
    };

    const handleImportClick = () => {
        importRef.current?.click();
    };

    const handleImportFilePick = React.useCallback(
        async (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];

            if (importRef.current) {
                importRef.current.value = '';
            }
            if (!file) {
                return;
            }

            if (!file.name.match(/\.(docx|doc)$/i)) {
                setError('Please select a valid DOCX or DOC file');
                return;
            }

            setIsLoading(true);
            clearError();
            setDocument(file);

            try {
                // Import mammoth dynamically (client-side only)
                const mammoth = await import('mammoth');

                // Convert file to array buffer
                const arrayBuffer = await file.arrayBuffer();

                // Convert DOCX to HTML
                const result = await mammoth.convertToHtml(
                    { arrayBuffer },
                    {
                        styleMap: [
                            "p[style-name='Aside Heading'] => div.aside > h2:fresh",
                            "p[style-name='Aside Text'] => div.aside > p:fresh",
                            "p[style-name='Section Title'] => h1:fresh",
                            "p[style-name='Subsection Title'] => h2:fresh"
                        ],
                        includeDefaultStyleMap: false,
                        convertImage: mammoth.images.imgElement(function (image) {
                            return image.read("base64").then(function (imageBuffer) {
                                return {
                                    src: "data:" + image.contentType + ";base64," + imageBuffer
                                };
                            });
                        })
                    },
                );

                // Store in the editor store
                setDocumentData({
                    content: result.value,
                    filename: file.name,
                    originalSize: file.size,
                    uploadedAt: new Date(),
                    contentType: 'docx'
                });

                if (result.messages && result.messages.length > 0) {
                    console.log('Conversion messages:', result.messages);
                }

            } catch (error: any) {
                console.error('Error importing DOCX:', error);
                setError(`Failed to import document: ${error.message}`);
            } finally {
                setIsLoading(false);
            }
        },
        [setDocumentData, setIsLoading, setError, clearError],
    );

    const submitFile = (e: React.FormEvent) => {
        e.preventDefault();

        if (!document) {
            setError('Please select a file first');
            return;
        }

        // Simply navigate to the editor - store will handle the data
        router.push('/contract/edit');
    };

    const handleScanDocument = () => {
        // handle scan document 
    };

    return (
        <form onSubmit={submitFile} className="flex flex-col items-center justify-center px-6 py-12 lg:px-20 gap-10 lg:gap-16 w-full max-w-4xl mx-auto">
            <input
                onChange={handleImportFilePick}
                type="file"
                ref={importRef}
                accept=".docx,.doc,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword"
                style={{ display: 'none' }}
            />
            
            {/* Heading */}
            <div className="text-center space-y-4">
                <div className="text-4xl lg:text-5xl font-medium">
                    Set up your <span className="text-primaryOrange">Contract</span>
                </div>
                <div className="text-gray-600 text-base lg:text-lg">
                    Customize Contract based on your Document (PDF or DOCX).
                </div>
            </div>

            {/* File Upload Section */}
            <div className="w-full border-2 border-dashed border-gray-300 rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-all duration-300">
                {/* Upload button */}
                <div className="flex flex-row gap-4 mb-6">
                    <button
                        type="button"
                        className="btn-primary"
                        onClick={handleImportClick}
                        disabled={isLoading}
                    >
                        <Upload size={20} /> Upload Contract Document
                    </button>

                    <button
                        type="button"
                        className="btn-secondary"
                        onClick={handleScanDocument}
                        disabled={isLoading}
                    >
                        <Camera size={20} /> Scan your contract
                    </button>
                </div>

                {/* Upload Illustration */}
                <Image
                    src={ContentMediaFolder}
                    alt="Upload illustration"
                    width={120}
                    height={120}
                    className="mb-4"
                />

                {/* File name display */}
                {document ? (
                    <div className="mt-2 text-sm text-gray-700">
                        <strong>{document.name}</strong> selected
                        <span className="block text-green-600 text-xs mt-1">
                            ✓ Document processed and ready
                        </span>
                    </div>
                ) : (
                    <p className="text-sm text-gray-400">No file selected</p>
                )}

                {isLoading && <div className="mt-2 text-sm text-gray-700">Processing...</div>}
                {error && <div className="text-sm text-red-500">{error}</div>}

                <button 
                    type='submit' 
                    className='btn-secondary mt-5'
                    disabled={isLoading || !document}
                >
                    <ArrowRight size={20} /> Proceed to editor
                </button>
            </div>
        </form>
    );
}