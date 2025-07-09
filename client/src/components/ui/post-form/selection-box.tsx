import { cn } from '@/lib/utils/cn';

interface SelectionBoxProps {
  active: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function SelectionBox({
  active,
  children,
  className,
  onClick,
}: SelectionBoxProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'flex flex-row items-center justify-center gap-4 w-64 h-28 pl-5 pr-5 border-2 rounded-xl text-lg text-center font-normal',
        'transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl cursor-pointer',
        active
          ? 'border-primaryOrange bg-orange-50 shadow-lg scale-105 font-medium'
          : 'border-gray-400 bg-white hover:border-primaryOrange hover:bg-orange-50/30',
        className
      )}
    >
      {children}
    </div>
  );
}
