'use client';

import { NumberButton } from '@/components/ui/post-form/number-button';
import { usePostEditStore } from '@/stores/post-edit.store';
import { usePostSetters } from '@/hooks/use-post-setters';

export default function SubleaseFormBedrooms() {
  const post = usePostEditStore((state) => state.post);
  const setPost = usePostEditStore((state) => state.setPost);
  const { setBedroomInfo } = usePostSetters(setPost);
  const { maxGuests, bedrooms, beds, lock } = post.bedroomInfo ?? {};

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
          <NumberButton
            text="Max guests number"
            data={maxGuests}
            minValue={1}
            onChange={(value) => setBedroomInfo('maxGuests', value)}
          />
          <NumberButton
            text="Bedrooms"
            data={bedrooms}
            minValue={1}
            onChange={(value) => setBedroomInfo('bedrooms', value)}
          />
          <NumberButton
            text="Beds"
            data={beds}
            minValue={0}
            onChange={(value) => setBedroomInfo('beds', value)}
          />
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
                checked={lock || false}
                onChange={() => setBedroomInfo('lock', true)}
                className="accent-primaryOrange w-5 h-5 border-2 border-gray-200"
              />
              Yes
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="hasLock"
                value="no"
                checked={!lock}
                onChange={() => setBedroomInfo('lock', false)}
                className="accent-primaryOrange w-5 h-5 border-2 border-gray-200"
              />
              No
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
