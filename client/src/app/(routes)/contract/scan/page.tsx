'use client';
import React from 'react';
import { useRouter } from 'next/navigation'
import ContentMediaFolder from '@/public/content-media-folder.png';
import Image from 'next/image';
import { Camera, Upload, ArrowRight } from 'lucide-react';

export default function ContractScanPage() {
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const [document, setDocument] = React.useState<File | null>(null);
    const router = useRouter()

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files?.length > 0) {
            setDocument(e.target.files[0]);
        }
    };

    const openFilePicker = () => {
        fileInputRef.current?.click();
    };

    const submitFile = (e: any) => {
        console.log('File submitted bleh blehhh')
        e.preventDefault()
        router.push('/contract/edit')
    }

    return (
        <div className="flex flex-col items-center justify-center px-6 py-12 lg:px-20 gap-10 lg:gap-16 w-full max-w-4xl mx-auto">
            {/* Heading */}
            <div className="text-center space-y-4">
                <div className="text-4xl lg:text-5xl font-medium">
                    Set up your <span className="text-primaryOrange">Contract</span>
                </div>
                <div className="text-gray-600 text-base lg:text-lg">
                    Upload your contract file (PDF or DOCX).
                </div>
            </div>

            {/* File Upload Section */}
            <form className="w-full border-2 border-dashed border-gray-300 rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-all duration-300">
                <input
                    type="file"
                    accept=".pdf,.doc,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                />

                {/* Upload button */}
                <div className="flex flex-row gap-4 mb-6">
                    <button
                        type="button"
                        className="btn-primary"
                        onClick={openFilePicker}
                    >
                        <Upload size={20}/> Upload Contract Document
                    </button>

                    <button
                        type="button"
                        className="btn-secondary"
                        onClick={openFilePicker}
                    >
                        <Camera size={20}/> Scan your contract
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
                    </div>
                ) : (
                    <p className="text-sm text-gray-400">No file selected</p>
                )}

                <button type='submit' className='btn-secondary mt-5' onClick={submitFile}>
                    <ArrowRight size={20}/> Proceed to editor
                </button>
            </form>
        </div>
    );
}
