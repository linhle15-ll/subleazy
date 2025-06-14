'use client';

import { PlusCircle, MinusCircle } from 'lucide-react';
import { usePostEditorStore } from '@/lib/stores/post.editor.store';

export default function SubleaseFormBedrooms() {
  const { post, setPost } = usePostEditorStore();
  const bedroomInfo = usePostEditorStore((state) => state.post.bedroomInfo);

  const handleGuestsChange = (value: number) => {
    setPost({
      bedroomInfo: {
        ...post.bedroomInfo,
        maxGuests: value,
      },
    });
  };

  const handleBedroomsChange = (value: number) => {
    setPost({
      bedroomInfo: {
        ...post.bedroomInfo,
        bedrooms: value,
      },
    });
  };

  const handleBedsChange = (value: number) => {
    setPost({
      bedroomInfo: {
        ...post.bedroomInfo,
        beds: value,
      },
    });
  };

  const handleLockChange = (value: string) => {
    setPost({
      bedroomInfo: {
        ...post.bedroomInfo,
        lock: value === 'yes',
      },
    });
  };

  return (
    <div className="flex flex-col gap-6 relative mb-15 mr-8">
      <div className="form-h1">Bedrooms</div>
      <div className="-mt-5 mb-5">
        As students, we often share our rooms with roommates. Let your guests
        know how many bedrooms are available in your place.
      </div>
      {/* Bedroom info */}
      <div className="pl-14 pr-14">
        <div className="divide-y divide-gray-200">
          {/* Max guests */}
          <div className="form-des-inc-button">
            <span>Max guests number</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Decrease guests"
                onClick={() => {
                  const value = Math.max(1, (bedroomInfo?.maxGuests || 1) - 1);
                  handleGuestsChange(value);
                }}
                className="disabled:opacity-50"
                disabled={(bedroomInfo?.maxGuests || 1) <= 1}
              >
                <MinusCircle className="w-7 h-7 text-gray-400 hover:text-primaryOrange" />
              </button>
              <span className="w-8 text-center">
                {bedroomInfo?.maxGuests || 1}
              </span>
              <button
                type="button"
                aria-label="Increase guests"
                onClick={() => {
                  const value = (bedroomInfo?.maxGuests || 1) + 1;
                  handleGuestsChange(value);
                }}
              >
                <PlusCircle className="w-7 h-7 text-primaryOrange" />
              </button>
            </div>
          </div>
          {/* Bedrooms */}
          <div className="form-des-inc-button">
            <span>Bedrooms</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Decrease bedrooms"
                onClick={() => {
                  const value = Math.max(0, (bedroomInfo?.bedrooms || 0) - 1);
                  handleBedroomsChange(value);
                }}
                className="disabled:opacity-50"
                disabled={(bedroomInfo?.bedrooms || 0) <= 0}
              >
                <MinusCircle className="w-7 h-7 text-gray-400 hover:text-primaryOrange" />
              </button>
              <span className="w-8 text-center">
                {bedroomInfo?.bedrooms || 0}
              </span>
              <button
                type="button"
                aria-label="Increase bedrooms"
                onClick={() => {
                  const value = (bedroomInfo?.bedrooms || 0) + 1;
                  handleBedroomsChange(value);
                }}
              >
                <PlusCircle className="w-7 h-7 text-primaryOrange" />
              </button>
            </div>
          </div>
          {/* Beds */}
          <div className="form-des-inc-button">
            <span>Beds</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Decrease beds"
                onClick={() => {
                  const value = Math.max(0, (bedroomInfo?.beds || 0) - 1);
                  handleBedsChange(value);
                }}
                className="disabled:opacity-50"
                disabled={(bedroomInfo?.beds || 0) <= 0}
              >
                <MinusCircle className="w-7 h-7 text-gray-400 hover:text-primaryOrange" />
              </button>
              <span className="w-8 text-center">{bedroomInfo?.beds || 0}</span>
              <button
                type="button"
                aria-label="Increase beds"
                onClick={() => {
                  const value = (bedroomInfo?.beds || 0) + 1;
                  handleBedsChange(value);
                }}
              >
                <PlusCircle className="w-7 h-7 text-primaryOrange" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lock question */}
      <div className="mb-8 pl-8">
        <div className="form-h2 pb-6">
          Does every bedroom has a lock? Guests would expect a lock for their
          room.
        </div>
        <div className="flex gap-8 items-center pl-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="hasLock"
              value="yes"
              checked={bedroomInfo?.lock || false}
              onChange={() => handleLockChange('yes')}
              className="accent-primaryOrange w-5 h-5 border-2 border-gray-200"
            />
            Yes
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="hasLock"
              value="no"
              checked={!bedroomInfo?.lock}
              onChange={() => handleLockChange('no')}
              className="accent-primaryOrange w-5 h-5 border-2 border-gray-200"
            />
            No
          </label>
        </div>
      </div>
    </div>
  );
}
