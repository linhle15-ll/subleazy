'use client';
import {
  Wifi,
  Utensils,
  WashingMachine,
  ParkingCircle,
  Snowflake,
  LucideIcon,
  Accessibility,
} from 'lucide-react';
import { SelectionBox } from '@/components/ui/post-form/selection-box';
import { Amenities } from '@/lib/types/post.types';
import { usePostEditStore } from '@/stores/post-edit.store';
import { usePostSetters } from '@/hooks/use-post-setters';

const options: { label: string; key: keyof Amenities; icon: LucideIcon }[] = [
  { label: 'Wifi', key: 'wifi', icon: Wifi },
  { label: 'Kitchen', key: 'kitchen', icon: Utensils },
  { label: 'Laundry', key: 'laundry', icon: WashingMachine },
  { label: 'Parking', key: 'parking', icon: ParkingCircle },
  { label: 'Air conditioning', key: 'airConditioning', icon: Snowflake },
];

export default function SubleaseFormAmenities() {
  const post = usePostEditStore((state) => state.post);
  const setPost = usePostEditStore((state) => state.setPost);
  const { setAmenities, setConvenience } = usePostSetters(setPost);

  return (
    <div className="flex flex-col gap-6 relative mb-15 mr-8">
      <div className="form-h1">Amenities</div>
      <div className="-mt-5 mb-5">Tell us what your place has to offer.</div>
      {/* Amenities section */}
      <div className="mb-8">
        {/* Amenities */}
        <div className="mb-9">
          <div className="form-h2">Select available amenities</div>
          <div className="flex flex-wrap gap-4">
            {options.map((opt) => {
              const Icon = opt.icon;
              const active = post.amenities?.[opt.key] || false;
              return (
                <SelectionBox
                  key={opt.key}
                  active={active}
                  onClick={() => {
                    setAmenities(opt.key);
                  }}
                  className={`text-base ml-10 ${active ? 'font-medium' : 'font-normal'}`}
                >
                  <Icon
                    className={`w-8 h-8 ${active ? 'text-primaryOrange' : 'text-gray-500'}`}
                  />
                  {opt.label}
                </SelectionBox>
              );
            })}
          </div>
        </div>

        {/* Convenience */}
        <div className="mb-9">
          <div className="form-h2">Select available convenience</div>
          <div className="flex flex-wrap gap-4">
            <SelectionBox
              active={post.convenience?.disabilityFriendly || false}
              onClick={() => setConvenience('disabilityFriendly')}
              className={`text-base ml-10 ${post.convenience?.disabilityFriendly ? 'font-medium' : 'font-normal'}`}
            >
              <Accessibility
                className={`w-8 h-8 ${post.convenience?.disabilityFriendly ? 'text-primaryOrange' : 'text-gray-500'}`}
              />
              Disability friendly
            </SelectionBox>
          </div>
        </div>
      </div>
    </div>
  );
}
