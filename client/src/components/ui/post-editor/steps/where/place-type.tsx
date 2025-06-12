'use client';

import { Home, Building } from 'lucide-react';
import { SelectionBox } from '@/components/ui/selection-box/selection-box';
import { usePostEditorStore } from '@/lib/stores/post.editor.store';
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
  const { post, setPost } = usePostEditorStore();
  const houseInfo = usePostEditorStore((state) => state.post.houseInfo);

  const handlePlaceSelect = (value: HouseType) => {
    setPost({
      houseInfo: {
        ...post.houseInfo,
        houseType: value,
      },
    });
  };

  const handleTypeSelect = (value: PlaceType) => {
    setPost({
      houseInfo: {
        ...post.houseInfo,
        placeType: value,
      },
    });
  };

  return (
    <div className="flex flex-col gap-6 relative mb-15">
      <div className="form-h1">Type of place</div>
      <div className="-mt-5 mb-5">
        Let your guests know what to expect from your place.
      </div>
      {/* Place options */}
      <div className="mb-8">
        <div className="font-medium text-lg mb-4">
          Which best describes your place?
        </div>
        <div className="flex flex-wrap gap-6">
          {placeOptions.map((opt) => {
            const Icon = opt.icon;
            const active = houseInfo?.houseType === opt.value;
            return (
              <SelectionBox
                key={opt.value}
                active={active}
                onClick={() => handlePlaceSelect(opt.value)}
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
        <div className="flex flex-wrap gap-6">
          {typeOptions.map((opt) => {
            const active = houseInfo?.placeType === opt.value;
            return (
              <SelectionBox
                key={opt.value}
                active={active}
                onClick={() => handleTypeSelect(opt.value)}
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
