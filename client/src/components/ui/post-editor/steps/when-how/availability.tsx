'use client';

import { Calendar } from 'lucide-react';
import { DatePickerPostEditor } from '@/components/ui/date/date-picker';

const SubleaseDateInputField = ({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ElementType;
  label: string;
  children?: React.ReactNode;
}) => (
  <div className="input-field sm:border-r-0">
    <div className="flex flex-row gap-2">
      <Icon />
      <span className="font-medium text-left">{label}</span>
    </div>
    {children}
  </div>
);
export default function SubleaseFormTime() {
  return (
    <div className="flex flex-col gap-6 relative mb-15">
      <div className="form-h1">Availability</div>
      <div className="-mt-5 mb-4">
        You might expect this price to have included amenity prices like water
        and electricity.
      </div>
      <div className="flex justify-stretch">
      {/* Check-in */}
      <SubleaseDateInputField icon={Calendar} label="Start Date">
        <DatePickerPostEditor field="startDate" />
      </SubleaseDateInputField>

      {/* Check-out */}
      <SubleaseDateInputField icon={Calendar} label="End Date">
        <DatePickerPostEditor field="endDate" />
      </SubleaseDateInputField>
      </div>
    </div>
  );
}
