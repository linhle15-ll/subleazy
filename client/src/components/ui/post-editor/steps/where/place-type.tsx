'use client';

import { Home, Building } from 'lucide-react';
import { SelectionBox } from '@/components/ui/post-form/selection-box';
import { usePostEditStore } from '@/stores/post-edit.store';
import { usePostSetters } from '@/hooks/use-post-setters';
import { HouseType, PlaceType } from '@/lib/types/enums';

const placeOptions = [
  { label: 'House', value: HouseType.HOUSE, icon: Home },
  { label: 'Apartment', value: HouseType.APT, icon: Building },
];

const typeOptions = [
  { label: 'An entire place', value: PlaceType.ENTIRE },
  { label: 'Private room with shared spaces', value: PlaceType.PRV },
  { label: 'A shared room', value: PlaceType.SHARED },
];

export default function SubleaseFormPlaceType() {
  const post = usePostEditStore((state) => state.post);
  const setPost = usePostEditStore((state) => state.setPost);
  const { setHouseInfo } = usePostSetters(setPost);
  const { houseType, placeType } = post.houseInfo ?? {};

  return (
    <div className="flex flex-col gap-6 relative mb-15 mr-8">
      <div className="form-h1">Type of place</div>
      <div className="-mt-5 mb-5">
        Let your guests know what to expect from your place.
      </div>
      {/* Place options */}
      <div className="mb-8">
        <div className="font-medium text-lg mb-4">
          Which best describes your place?
        </div>
        <div className="flex gap-6">
          {placeOptions.map((opt) => {
            const Icon = opt.icon;
            const active = houseType === opt.value;
            return (
              <SelectionBox
                key={opt.value}
                active={active}
                onClick={() => setHouseInfo('houseType', opt.value)}
                className={`text-base ml-10 ${active ? 'font-medium' : 'font-normal'}`}
              >
                <Icon
                  className={`w-9 h-9 ${active ? 'text-primaryOrange' : 'text-gray-500'}`}
                />
                {opt.label}
              </SelectionBox>
            );
          })}
        </div>
      </div>

      {/* Type options */}
      <div className="mb-8">
        <div className="font-medium text-lg mb-4">
          Which type of place will your guests have?
        </div>
        <div className="flex gap-4">
          {typeOptions.map((opt) => {
            const active = placeType === opt.value;
            return (
              <SelectionBox
                key={opt.value}
                active={active}
                onClick={() => setHouseInfo('placeType', opt.value)}
                className={`text-base ml-10 ${active ? 'font-medium' : 'font-normal'}`}
              >
                {opt.label}
              </SelectionBox>
            );
          })}
        </div>
      </div>
    </div>
  );
}
