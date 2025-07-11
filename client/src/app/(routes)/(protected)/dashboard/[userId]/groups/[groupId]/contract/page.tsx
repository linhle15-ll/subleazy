'use client';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card/card';
import { Button } from '@/components/ui/button';
import { ScanLine, PenTool, ArrowRight, BrainCircuitIcon, FileText  } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useUserStore } from '@/stores/user.store';
import { useEffect, useState } from 'react';
import contractService from '@/services/contract.service';

export default function ContractScanPage() {
  const { groupId } = useParams<{ groupId: string }>();
  const currentUser = useUserStore((state) => state.user);
  const userId = currentUser?._id;
  const [existingContract, setExistingContract] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkExistingContract = async () => {
      if (!groupId) return;
      
      try {
        const result = await contractService.getContractByGroupId(groupId);
        if (result.success && result.data) {
          setExistingContract(result.data);
        }
      } catch (error) {
        console.error('Error checking existing contract:', error);
      } finally {
        setLoading(false);
      }
    };

    checkExistingContract();
  }, [groupId]);

  const options = [
    {
      label: 'Scan your contract',
      description:
        "Upload your DOCX contract or scan a paper contract. We'll help you digitize and process it quickly.",
      link: `dashboard/${userId}/groups/${groupId}/contract/edit`,
      icon: ScanLine,
      color: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      label: 'Write your contract',
      description:
        'Create a new contract from scratch using our guided template system and legal frameworks.',
      link: `/dashboard/${userId}/groups/${groupId}/contract/edit`,
      icon: PenTool,
      color: 'bg-green-50 border-green-200 hover:bg-green-100',
      iconColor: 'text-green-600',
    },
    {
      label: 'Use AI Assistant',
      description:
        'Leverage our smart contract editor powered by AI to get suggestions to improve your contract.',
      link: `dashboard/${userId}/groups/${groupId}/contract/edit`,
      icon: BrainCircuitIcon,
      color: 'bg-purple-50 border-purple-200 hover:bg-purple-100',
      iconColor: 'text-purple-600',
    },

  ];

  // Add option to view final contract if one exists
  if (existingContract && !loading) {
    options.push({
      label: 'View Final Contract',
      description:
        'View the completed contract with all signatures and final content.',
      link: `/dashboard/${userId}/groups/final-contract?contractId=${existingContract._id}&groupId=${groupId}`,
      icon: FileText,
      color: 'bg-purple-50 border-purple-200 hover:bg-purple-100',
      iconColor: 'text-purple-600',
    });
  }
  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl flex flex-col items-center justify-center px-6 py-12 lg:px-20 gap-12 lg:gap-16 w-full mx-auto">
        {/* Heading Section */}
        <div className="text-center space-y-6 max-w-3xl leading-normal">
          <div className="space-y-2">
            <h1 className="text-3xl lg:text-5xl font-medium leading-tight">
              Let us walk you through the <br />
              <span className="font-semibold text-primaryOrange relative">
                Contract Process
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-orange-200 rounded-full"></div>
              </span>
            </h1>
          </div>

          <p className="text-xl lg:text-2xl text-gray-600 font-medium">
            We understand that contract process can be complex, so let Subleazy
            make it easy for you.
          </p>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 text-left">
            <p className="text-gray-700 leading-relaxed text-center">
              As a{' '}
              <span className="font-semibold text-orange-700">sublessor</span>,
              you have the right to set up the contract before sending it out to
              your sublessees. Start this process by choosing how you'd like to
              proceed with your contract setup.
            </p>
          </div>
        </div>

        {/* Options Section */}
        <div className="w-full space-y-8">
          <div className="text-center">
            <h2 className="text-2xl lg:text-3xl font-semibold text-gray-800 mb-2">
              Choose your preferred method
            </h2>
            <p className="text-gray-600">
              Select the option that works best for your situation
            </p>
          </div>

          {/* Option Cards */}
          <div className="grid lg:grid-cols-3 gap-5 lg:gap-9">
            {options.map((option, index) => {
              const IconComponent = option.icon;
              return (
                <Card
                  key={index}
                  className={`${option.color} transition-all duration-300 hover:shadow-lg hover:scale-105 border-2`}
                >
                  <CardHeader className="text-center pb-4">
                    <div
                      className={`w-16 h-16 mx-auto mb-4 rounded-full bg-white flex items-center justify-center shadow-md`}
                    >
                      <IconComponent
                        className={`w-8 h-8 ${option.iconColor}`}
                      />
                    </div>
                    <CardTitle className="text-xl lg:text-2xl font-semibold text-gray-800">
                      {option.label}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-6">
                    <CardDescription className="text-gray-600 text-base leading-relaxed">
                      {option.description}
                    </CardDescription>
                    <Link href={option.link} className="block">
                      <Button className="btn-primary w-full">
                        Get Started
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
