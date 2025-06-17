import { PlusCircle, MinusCircle } from 'lucide-react';

interface NumberButtonProps {
  text: string;
  data?: number;
  minValue: number;
  onChange: (value: number) => void;
}

export function NumberButton({
  text,
  data,
  minValue,
  onChange,
}: NumberButtonProps) {
  return (
    <div className="form-des-inc-button">
      <span>{text}</span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => {
            const newValue = Math.max(minValue, (data || minValue) - 1);
            onChange(newValue);
          }}
          className="disabled:opacity-50"
          disabled={(data || minValue) <= minValue}
        >
          <MinusCircle className="w-7 h-7 text-gray-400 hover:text-primaryOrange" />
        </button>
        <span className="w-8 text-center">{data || minValue}</span>
        <button
          type="button"
          onClick={() => {
            const newValue = (data || minValue) + 1;
            onChange(newValue);
          }}
        >
          <PlusCircle className="w-7 h-7 text-primaryOrange" />
        </button>
      </div>
    </div>
  );
}
