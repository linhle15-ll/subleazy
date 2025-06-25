import Link from 'next/link';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/commons/tooltip"


const options = [
    {
        label: "Contract template",
        description: "We provide you with a Sublease Contract Template to edit on.",
        link: "/contract/edit",
    },
    {
        label: "Scan your contract",
        description: "You can scan your PDF/DOCX contract, paper contract, or write a contract from scratch.",
        link: "/contract/scan",
    },
    {
        label: "Write your contract",
        description: "You can write your own contract from scratch.",
        link: "/contract/edit",
    },
]
export default function ContractScanPage() {
  return (
     <div className="flex flex-col items-center justify-center px-6 py-12 lg:px-20 gap-10 lg:gap-16 w-full max-w-4xl mx-auto">
            {/* Heading */}
            <div className="text-center space-y-4">
        <div className="text-4xl lg:text-5xl font-medium">
          Let us walk you through{' '}
          <span className="text-primaryOrange"> Contract Process! </span>
        </div>
        <div className="text-lg font-medium">
          We understand that contract process is a "sore", so let Subleazy make
          it easy for you.
        </div>
        <div>
          As a <span className="font-medium"> sublessor </span>, you have the
          right to set up the contract before sending out to your sublessees.{' '}
          <br />
          Start this process by choosing which way do you like to proceed with
          your contract setup.
        </div>
      </div>

      {/* Options */}
      <div className="flex flex-col gap-5 justify-center items-center">
        <div className="text-2xl items-center font-semibold mb-5">
          Start your contract process with:
        </div>
        {/* Options */}
        <div className="flex lg:flex-row flex-col lg:gap-20 gap-5 justify-center align-middle items-center">
            {options.map((option, index) => (
                <Tooltip key={index}>
                    <TooltipTrigger asChild>
                        <button className="btn-primary">
                            <Link href={option.link}>{option.label}</Link>
                        </button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{option.description}</p>
                    </TooltipContent>
                </Tooltip>
            ))}
        </div>
      </div>
    </div>
  );
}
