'use client';
import {
  Wifi,
  Utensils,
  WashingMachine,
  ParkingCircle,
  Snowflake,
  LucideIcon,
} from 'lucide-react';
import { SelectionBox } from '@/components/ui/selection-box/selection-box';
import { usePostEditorStore } from '@/lib/stores/post.editor.store';

type AmenityKey =
  | 'wifi'
  | 'kitchen'
  | 'laundry'
  | 'parking'
  | 'airConditioning';

const amenities: { label: string; value: AmenityKey; icon: LucideIcon }[] = [
  { label: 'Wifi', value: 'wifi', icon: Wifi },
  { label: 'Kitchen', value: 'kitchen', icon: Utensils },
  { label: 'Laundry', value: 'laundry', icon: WashingMachine },
  { label: 'Parking', value: 'parking', icon: ParkingCircle },
  { label: 'Air conditioning', value: 'airConditioning', icon: Snowflake },
];

export default function SubleaseFormAmenities() {
  const { setPost } = usePostEditorStore();
  const selectedAmenities = usePostEditorStore((state) => state.post.amenities);

  const handleAmenitiesChange = (value: AmenityKey) => {
    setPost({
      amenities: {
        ...selectedAmenities,
        [value]: !selectedAmenities?.[value],
      },
    });
  };

  return (
    <div className="flex flex-col gap-6 relative mb-15">
      <div className="form-h1">Amenities</div>
      <div className="-mt-5 mb-5">Tell us what your place has to offer.</div>
      {/* Amenities section */}
      <div className="mb-8">
        {/* Amenities */}
        <div className="mb-9">
          <div className="form-h2">Select available amenities</div>
          <div className="flex flex-wrap gap-4">
            {amenities.map((item) => {
              const Icon = item.icon;
              const active = selectedAmenities?.[item.value] || false;
              return (
                <SelectionBox
                  key={item.value}
                  active={active}
                  onClick={() => {
                    handleAmenitiesChange(item.value);
                  }}
                  className={`text-base ml-10 ${active ? 'font-medium' : 'font-normal'}`}
                >
                  <Icon
                    className={`w-8 h-8 ${active ? 'text-primaryOrange' : 'text-gray-500'}`}
                  />
                  {item.label}
                </SelectionBox>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
