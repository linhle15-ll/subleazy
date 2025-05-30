import Link from 'next/link';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  buttonText: string;
  nextStepUrl: string;
}

export function ProgressBar({
  currentStep,
  totalSteps,
  buttonText,
  nextStepUrl,
}: ProgressBarProps) {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="flex flex-row items-center justify-between mt-8">
      <div className="flex flex-col w-[80%] gap-2">
        <span className="text-gray-500 text-sm">
          Step {currentStep} of {totalSteps}
        </span>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-primaryOrange transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
      <Link href={nextStepUrl} className="btn-primary w-40 text-center">
        {buttonText}
      </Link>
    </div>
  );
}
