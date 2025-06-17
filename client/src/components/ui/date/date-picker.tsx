'use client';

import { addDays, format } from 'date-fns';

import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/date/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/commons/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/commons/select';
import { CalendarIcon } from 'lucide-react';
import { useFilterDate } from '@/hooks/use-filter-date';
import { usePostEditorStore } from '@/stores/post-edit.store';

export function DatePickerWithPresets({
  field,
}: {
  field: 'startDate' | 'endDate';
}) {
  const { date, setDate } = useFilterDate(field);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'flex w-[11vw] justify-start text-left font-normal focus:outline-none border-transparent rounded-md pr-2 py-1 pl-0',
            !date && 'text-muted-foreground'
          )}
        >
          {date ? (
            format(date, 'PPP')
          ) : (
            <span className="suggestion-text">Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="flex w-auto flex-col bg-white space-y-2 p-2"
      >
        <Select
          onValueChange={(value) =>
            setDate(addDays(new Date(), parseInt(value)))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="popper" className="bg-white cursor-pointer">
            <SelectItem value="0" className="cursor-pointer">
              Today
            </SelectItem>
            <SelectItem value="1" className="cursor-pointer">
              Tomorrow
            </SelectItem>
            <SelectItem value="3" className="cursor-pointer">
              In 3 days
            </SelectItem>
            <SelectItem value="7" className="cursor-pointer">
              In a week
            </SelectItem>
          </SelectContent>
        </Select>
        <div className="rounded-md border">
          <Calendar mode="single" selected={date} onSelect={setDate} />
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function DatePickerButton({
  text,
  date,
  setDate,
  className,
}: {
  text: string;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  className?: string;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className={className}>
          <CalendarIcon />
          {date ? format(date, 'PPP') : text}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="flex w-auto flex-col bg-white space-y-2 p-2"
      >
        <Calendar mode="single" selected={date} onSelect={setDate} />
      </PopoverContent>
    </Popover>
  );
}

export function DatePickerPostEditor({
  field,
}: {
  field: 'startDate' | 'endDate';
}) {
  const { post, setPost } = usePostEditorStore();

  const dateValue = post?.availability?.[field]
    ? new Date(post.availability[field] as string)
    : undefined;

  const handleDateChange = (date: Date | undefined) => {
    setPost({
      availability: {
        ...post.availability,
        [field]: date ? date.toISOString() : undefined,
      },
    });
  };

  return (
    <div className="rounded-md border p-2 bg-white">
      <Calendar
        mode="single"
        selected={dateValue}
        onSelect={handleDateChange}
      />
    </div>
  );
}
