'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card/card';
import { Button } from '@/components/ui/button';

import { 
  Download, 
  Share2, 
  FileText, 
  User, 
  Users, 
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
  ArrowLeft,
  Printer
} from 'lucide-react';
import Link from 'next/link';
import contractService from '@/services/contract.service';
import { ContractStatus } from '@/lib/types/contract.types';
import { useUserStore } from '@/stores/user.store';

interface Contract {
  _id: string;
  title: string;
  content: string;
  status: ContractStatus;
  post: string;
  sublessor: string;
  sublessees: string[];
  group: string;
  sublessorSignature?: string;
  sublesseesSignatures?: string[];
  createdAt: string;
  updatedAt: string;
}

export default function FinalContractPage() {
  const { userId } = useParams<{ userId: string }>();
  const searchParams = useSearchParams();
  const contractId = searchParams.get('contractId');
  const groupId = searchParams.get('groupId');
  
  const [contract, setContract] = useState<Contract | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const currentUser = useUserStore((state) => state.user);

  useEffect(() => {
    const fetchContract = async () => {
      if (!groupId) {
        setError('Group ID is required');
        setLoading(false);
        return;
      }

      try {
        const result = await contractService.getContractByGroupId(groupId);
        if (result.success && result.data) {
          setContract(result.data);
        } else {
          setError(result.error || 'Failed to fetch contract');
        }
      } catch (err) {
        setError('An error occurred while fetching the contract');
      } finally {
        setLoading(false);
      }
    };

    fetchContract();
  }, [groupId]);

  const getStatusBadge = (status: ContractStatus) => {
    const statusConfig = {
      [ContractStatus.PENDING]: {
        label: 'Pending',
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        icon: Clock,
      },
      [ContractStatus.COMPLETED]: {
        label: 'Completed',
        color: 'bg-green-100 text-green-800 border-green-200',
        icon: CheckCircle,
      },
      [ContractStatus.TERMINATED]: {
        label: 'Terminated',
        color: 'bg-red-100 text-red-800 border-red-200',
        icon: XCircle,
      },
    };

    const config = statusConfig[status];
    const IconComponent = config.icon;

    return (
      <span className={`text-xs font-medium px-3 py-1 rounded-full border flex items-center gap-1 ${config.color}`}>
        <IconComponent className="w-3 h-3" />
        {config.label}
      </span>
    );
  };

  const handleDownload = () => {
    if (!contract) return;
    
    const contractText = `
CONTRACT: ${contract.title}

STATUS: ${contract.status.toUpperCase()}

CONTENT:
${contract.content}

SIGNATURES:
Sublessor: ${contract.sublessorSignature || 'Not signed'}
Sublessees: ${contract.sublesseesSignatures?.join(', ') || 'Not signed'}

Created: ${new Date(contract.createdAt).toLocaleDateString()}
Updated: ${new Date(contract.updatedAt).toLocaleDateString()}
    `;

    const blob = new Blob([contractText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contract-${contract._id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Sublease Contract',
        text: `View the contract: ${contract?.title}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // You could add a toast notification here
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primaryOrange mx-auto mb-4"></div>
          <p className="text-gray-600">Loading contract...</p>
        </div>
      </div>
    );
  }

  if (error || !contract) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Contract Not Found</h2>
          <p className="text-gray-600 mb-6">{error || 'The requested contract could not be found.'}</p>
          <Link href={`/dashboard/${userId}/groups`}>
            <Button className="btn-primary">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Groups
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link href={`/dashboard/${userId}/groups`}>
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Groups
            </Button>
          </Link>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {contract.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Created: {new Date(contract.createdAt).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Updated: {new Date(contract.updatedAt).toLocaleDateString()}
                </div>
              </div>
            </div>
            {getStatusBadge(contract.status)}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          <Button onClick={handleDownload} className="btn-secondary">
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
          <Button onClick={handlePrint} className="btn-secondary">
            <Printer className="w-4 h-4 mr-2" />
            Print
          </Button>
          <Button onClick={handleShare} className="btn-secondary">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>

        {/* Contract Details */}
        <div className="grid gap-6">
          {/* Contract Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Contract Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Sublessor:</span>
                  <span className="text-sm text-gray-600">{contract.sublessor}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Sublessees:</span>
                  <span className="text-sm text-gray-600">{contract.sublessees.length}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contract Content */}
          <Card>
            <CardHeader>
              <CardTitle>Contract Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <pre className="whitespace-pre-wrap text-sm text-gray-800 font-sans leading-relaxed">
                  {contract.content === 'blank' ? (
                    <div className="text-center text-gray-500 py-8">
                      <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>Contract content is being prepared...</p>
                    </div>
                  ) : (
                    contract.content
                  )}
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* Signatures */}
          <Card>
            <CardHeader>
              <CardTitle>Signatures</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Sublessor Signature */}
              <div className="border-b border-gray-200 pb-4">
                <h4 className="font-medium text-gray-800 mb-2">Sublessor Signature</h4>
                <div className="flex items-center gap-2">
                  {contract.sublessorSignature ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-green-600">Signed</span>
                    </>
                  ) : (
                    <>
                      <Clock className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm text-yellow-600">Pending</span>
                    </>
                  )}
                </div>
              </div>

              {/* Sublessees Signatures */}
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Sublessee Signatures</h4>
                <div className="space-y-2">
                  {contract.sublesseesSignatures && contract.sublesseesSignatures.length > 0 ? (
                    contract.sublesseesSignatures.map((signature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        {signature ? (
                          <>
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-sm text-green-600">Sublessee {index + 1} - Signed</span>
                          </>
                        ) : (
                          <>
                            <Clock className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm text-yellow-600">Sublessee {index + 1} - Pending</span>
                          </>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm text-yellow-600">No signatures yet</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contract Actions */}
          {contract.status === ContractStatus.PENDING && (
            <Card>
              <CardHeader>
                <CardTitle>Contract Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  <Link href={`/dashboard/${userId}/groups/${groupId}/contract/edit`}>
                    <Button className="btn-primary">
                      <FileText className="w-4 h-4 mr-2" />
                      Edit Contract
                    </Button>
                  </Link>
                  <Link href={`/dashboard/${userId}/groups/${groupId}/contract/finish-contract`}>
                    <Button className="btn-secondary">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Finalize Contract
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
