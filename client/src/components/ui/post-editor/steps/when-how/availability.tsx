'use client';

import { DatePickerButton } from '@/components/ui/date/date-picker';
import { usePostEditStore } from '@/stores/post-edit.store';
import { usePostSetters } from '@/hooks/use-post-setters';

export default function SubleaseFormAvailability() {
  const post = usePostEditStore((state) => state.post);
  const setPost = usePostEditStore((state) => state.setPost);
  const { setDate } = usePostSetters(setPost);
  const availability = post.availability;

  return (
    <div className="flex flex-col gap-6 relative mb-15">
      <div className="form-h1">Availability</div>
      <div className="-mt-5 mb-4">
        You might expect this price to have included amenity prices like water
        and electricity.
      </div>
      <div className="flex justify-stretch">
        <div className="flex flex-col sm:flex-row justify-between gap-4 w-full mb-4">
          <DatePickerButton
            text="Move-in date"
            date={availability?.startDate as Date}
            setDate={(date) => setDate('startDate', date)}
            className="flex-grow h-28 border-2 rounded-xl text-lg text-center font-medium border-gray-400"
          />
          <DatePickerButton
            text="Move-out date"
            date={availability?.endDate as Date}
            setDate={(date) => setDate('endDate', date)}
            className="flex-grow h-28 border-2 rounded-xl text-lg text-center font-medium border-gray-400"
          />
        </div>
      </div>
    </div>
  );
}
