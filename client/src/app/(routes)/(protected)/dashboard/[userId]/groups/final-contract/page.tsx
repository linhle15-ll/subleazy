'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';

const contractContentStyles = `
  .prose {
    color: #374151;
    line-height: 1.6;
  }
  .content-truncated {
    position: relative;
  }
  .content-truncated::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60px;
    background: linear-gradient(transparent, white);
    pointer-events: none;
  }
  .prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
    color: #111827;
    font-weight: 600;
    margin-top: 1.5em;
    margin-bottom: 0.5em;
  }
  .prose h1 { font-size: 1.5rem; }
  .prose h2 { font-size: 1.25rem; }
  .prose h3 { font-size: 1.125rem; }
  .prose p {
    margin-bottom: 1em;
  }
  .prose ul, .prose ol {
    margin-bottom: 1em;
    padding-left: 1.5em;
  }
  .prose li {
    margin-bottom: 0.25em;
  }
  .prose strong {
    font-weight: 600;
  }
  .prose em {
    font-style: italic;
  }
  .prose table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1em;
  }
  .prose th, .prose td {
    border: 1px solid #d1d5db;
    padding: 0.5rem;
    text-align: left;
  }
  .prose th {
    background-color: #f9fafb;
    font-weight: 600;
  }
  @media print {
    .print-content {
      font-size: 12pt;
      line-height: 1.4;
    }
    .print-content h1 { font-size: 18pt; }
    .print-content h2 { font-size: 16pt; }
    .print-content h3 { font-size: 14pt; }
  }
`;
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card/card';
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
  Printer,
  FileDown,
} from 'lucide-react';
import Link from 'next/link';
import contractService from '@/services/contract.service';
import { ContractStatus } from '@/lib/types/contract.types';

// Use the Contract type from the service
type Contract = NonNullable<
  Awaited<ReturnType<typeof contractService.getContractByGroupId>>['data']
>;

export default function FinalContractPage() {
  const { userId } = useParams<{ userId: string }>();
  const searchParams = useSearchParams();
  const groupId = searchParams.get('groupId');

  const [contract, setContract] = useState<Contract | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFullContent, setShowFullContent] = useState(false);
  const [generatingPDF, setGeneratingPDF] = useState(false);

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
      } catch (error) {
        console.error('Error fetching contract:', error);
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
      <span
        className={`text-xs font-medium px-3 py-1 rounded-full border flex items-center gap-1 ${config.color}`}
      >
        <IconComponent className="w-3 h-3" />
        {config.label}
      </span>
    );
  };

  const getUserDisplayName = (
    user: string | { firstName: string; lastName: string; email: string }
  ): string => {
    if (typeof user === 'string') {
      return user;
    }
    return `${user.firstName} ${user.lastName}`;
  };

  const getUserEmail = (
    user: string | { firstName: string; lastName: string; email: string }
  ): string => {
    if (typeof user === 'string') {
      return '';
    }
    return user.email;
  };

  const handleDownload = () => {
    if (!contract) return;

    // Strip HTML tags for plain text download
    const stripHtml = (html: string) => {
      const tmp = document.createElement('div');
      tmp.innerHTML = html;
      return tmp.textContent || tmp.innerText || '';
    };

    const contractText = `
CONTRACT: ${contract.title}

STATUS: ${contract.status.toUpperCase()}

PARTIES:
Sublessor: ${getUserDisplayName(contract.sublessor)}
Sublessees: ${contract.sublessees.map((sublessee) => getUserDisplayName(sublessee)).join(', ')}

CONTENT:
${stripHtml(contract.content)}

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

  const handleDownloadPDF = async () => {
    if (!contract) return;

    setGeneratingPDF(true);
    try {
      // Dynamic import to avoid SSR issues
      const { jsPDF } = await import('jspdf');
      const { html2canvas } = await import('html2canvas');

      // Create a temporary container for the PDF content
      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'absolute';
      tempContainer.style.left = '-9999px';
      tempContainer.style.top = '0';
      tempContainer.style.width = '800px';
      tempContainer.style.padding = '40px';
      tempContainer.style.backgroundColor = 'white';
      tempContainer.style.fontFamily = 'Arial, sans-serif';
      tempContainer.style.fontSize = '12px';
      tempContainer.style.lineHeight = '1.4';
      tempContainer.style.color = '#333';

      // Create PDF content with better styling
      const pdfContent = `
        <div style="margin-bottom: 30px; font-family: Arial, sans-serif;">
          <h1 style="font-size: 24px; color: #1f2937; margin-bottom: 10px; border-bottom: 2px solid #f59e0b; padding-bottom: 10px; font-weight: bold;">
            ${contract.title}
          </h1>
          <div style="display: flex; justify-content: space-between; margin-bottom: 20px; font-size: 11px; color: #6b7280; flex-wrap: wrap;">
            <span style="margin-right: 15px;">Status: <strong>${contract.status.toUpperCase()}</strong></span>
            <span style="margin-right: 15px;">Created: ${new Date(contract.createdAt).toLocaleDateString()}</span>
            <span>Updated: ${new Date(contract.updatedAt).toLocaleDateString()}</span>
          </div>
        </div>

        <div style="margin-bottom: 30px;">
          <h2 style="font-size: 16px; color: #1f2937; margin-bottom: 15px; font-weight: bold; border-left: 4px solid #f59e0b; padding-left: 10px;">
            Contract Parties
          </h2>
          <div style="margin-bottom: 10px; padding: 10px; background-color: #f9fafb; border-radius: 4px;">
            <strong>Sublessor:</strong> ${getUserDisplayName(contract.sublessor)}
          </div>
          <div style="margin-bottom: 10px; padding: 10px; background-color: #f9fafb; border-radius: 4px;">
            <strong>Sublessees:</strong> ${contract.sublessees.map((sublessee) => getUserDisplayName(sublessee)).join(', ')}
          </div>
        </div>

        <div style="margin-bottom: 30px;">
          <h2 style="font-size: 16px; color: #1f2937; margin-bottom: 15px; font-weight: bold; border-left: 4px solid #f59e0b; padding-left: 10px;">
            Contract Content
          </h2>
          <div style="border: 1px solid #e5e7eb; padding: 20px; background-color: #fafafa; border-radius: 8px; line-height: 1.6;">
            ${contract.content}
          </div>
        </div>

        <div style="margin-bottom: 30px;">
          <h2 style="font-size: 16px; color: #1f2937; margin-bottom: 15px; font-weight: bold; border-left: 4px solid #f59e0b; padding-left: 10px;">
            Signatures
          </h2>
          <div style="margin-bottom: 10px; padding: 10px; background-color: #f9fafb; border-radius: 4px;">
            <strong>Sublessor:</strong> ${contract.sublessorSignature || 'Not signed'}
          </div>
          <div style="margin-bottom: 10px; padding: 10px; background-color: #f9fafb; border-radius: 4px;">
            <strong>Sublessees:</strong> ${contract.sublesseesSignatures?.join(', ') || 'Not signed'}
          </div>
        </div>

        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 10px; color: #6b7280; text-align: center;">
          <p>Generated by Subleazy on ${new Date().toLocaleDateString()}</p>
        </div>
      `;

      tempContainer.innerHTML = pdfContent;
      document.body.appendChild(tempContainer);

      // Convert to canvas
      const canvas = await html2canvas(tempContainer, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: 800,
        height: tempContainer.scrollHeight,
      });

      // Remove temporary container
      document.body.removeChild(tempContainer);

      // Create PDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add additional pages if needed
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Download PDF
      pdf.save(`contract-${contract._id}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setGeneratingPDF(false);
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
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Contract Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            {error || 'The requested contract could not be found.'}
          </p>
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
    <>
      <style dangerouslySetInnerHTML={{ __html: contractContentStyles }} />
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
              {getStatusBadge(contract.status as ContractStatus)}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mb-8">
            <Button onClick={handleDownload} className="btn-secondary">
              <Download className="w-4 h-4 mr-2" />
              Download TXT
            </Button>
            <Button
              onClick={handleDownloadPDF}
              className="btn-secondary"
              disabled={generatingPDF}
            >
              {generatingPDF ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Generating PDF...
                </>
              ) : (
                <>
                  <FileDown className="w-4 h-4 mr-2" />
                  Download PDF
                </>
              )}
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
                    <span className="text-sm font-medium text-gray-700">
                      Sublessor:
                    </span>
                    <span className="text-sm text-gray-600">
                      {getUserDisplayName(contract.sublessor)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">
                      Sublessees:
                    </span>
                    <span className="text-sm text-gray-600">
                      {contract.sublessees.length}
                    </span>
                  </div>
                </div>

                {/* Detailed Sublessees Information */}
                {contract.sublessees.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-medium text-gray-800 mb-2">
                      Sublessee Details
                    </h4>
                    <div className="space-y-2">
                      {contract.sublessees.map((sublessee, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-sm"
                        >
                          <span className="text-gray-600">
                            • {getUserDisplayName(sublessee)}
                          </span>
                          {getUserEmail(sublessee) && (
                            <span className="text-gray-500">
                              ({getUserEmail(sublessee)})
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Contract Content */}
            <Card>
              <CardHeader>
                <CardTitle>Contract Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  {contract.content === 'blank' ? (
                    <div className="text-center text-gray-500 py-8">
                      <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>Contract content is being prepared...</p>
                    </div>
                  ) : (
                    <div>
                      <div
                        className={`prose prose-sm max-w-none text-gray-800 leading-relaxed print-content ${
                          !showFullContent && contract.content.length > 1000
                            ? 'max-h-96 overflow-hidden content-truncated'
                            : ''
                        }`}
                        dangerouslySetInnerHTML={{ __html: contract.content }}
                      />
                      {contract.content.length > 1000 && (
                        <div className="mt-4 text-center">
                          <Button
                            onClick={() => setShowFullContent(!showFullContent)}
                            variant="outline"
                            className="text-blue-600 hover:text-blue-700"
                          >
                            {showFullContent ? 'Show Less' : 'Read More'}
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
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
                  <h4 className="font-medium text-gray-800 mb-2">
                    Sublessor Signature
                  </h4>
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
                  <h4 className="font-medium text-gray-800 mb-2">
                    Sublessee Signatures
                  </h4>
                  <div className="space-y-2">
                    {contract.sublesseesSignatures &&
                    contract.sublesseesSignatures.length > 0 ? (
                      contract.sublesseesSignatures.map((signature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          {signature ? (
                            <>
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="text-sm text-green-600">
                                Sublessee {index + 1} - Signed
                              </span>
                            </>
                          ) : (
                            <>
                              <Clock className="w-4 h-4 text-yellow-500" />
                              <span className="text-sm text-yellow-600">
                                Sublessee {index + 1} - Pending
                              </span>
                            </>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm text-yellow-600">
                          No signatures yet
                        </span>
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
                    <Link
                      href={`/dashboard/${userId}/groups/${groupId}/contract/edit`}
                    >
                      <Button className="btn-primary">
                        <FileText className="w-4 h-4 mr-2" />
                        Edit Contract
                      </Button>
                    </Link>
                    <Link
                      href={`/dashboard/${userId}/groups/${groupId}/contract/finish-contract`}
                    >
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
    </>
  );
}
