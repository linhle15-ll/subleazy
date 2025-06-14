import Link from 'next/link';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  buttons?: {
    text: string;
    url: string;
    variant?: 'primary' | 'secondary';
  }[];
}

export function ProgressBar({
  currentStep,
  totalSteps,
  buttons = [],
}: ProgressBarProps) {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="flex flex-row items-center justify-between mt-8">
      <div className="flex flex-col w-[80%] gap-2">
        <span className="text-gray-500 text-sm">
          Step {currentStep} of {totalSteps}
        </span>
        <div className="w-full h-3 bg-gray-200 rounded-full">
          <div
            className="h-full bg-primaryOrange transition-all duration-300 rounded-full"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
      <div className="flex flex-row gap-4 ml-16">
        {buttons.map((button, index) => (
          <Link
            key={index}
            href={button.url}
            className={`w-40 text-center ${
              button.variant === 'secondary' ? 'btn-secondary' : 'btn-primary'
            }`}
          >
            {button.text}
          </Link>
        ))}
      </div>
    </div>
  );
}
