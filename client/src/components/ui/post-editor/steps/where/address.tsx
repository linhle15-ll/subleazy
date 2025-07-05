'use client';

import { House } from '@/lib/types/house.types';
import { usePostEditStore } from '@/stores/post-edit.store';

export default function SubleaseFormAddress() {
  const { post } = usePostEditStore();
  const { house, city, suites, state, zip } = post;

  return (
    <div className="flex flex-col gap-6 relative mb-15 mr-8">
      <div className="form-h1">Address</div>
      <div className="-mt-5 mb-5 text-primaryOrange">
        To change your address, please delete and re-create the post.
      </div>
      {/* Location form */}
      <div className="mb-8 -mt-3">
        <div className="flex flex-col gap-4 ml-10">
          <input
            className="text-field"
            value={(house as House).address || ''}
            title="Street address"
            readOnly
          ></input>
          <input
            className="text-field"
            value={suites || ''}
            title="Apartment / Suite"
            readOnly
          />
          <input
            className="text-field"
            value={city}
            title="City"
            readOnly
          ></input>
          <input className="text-field" value={state} title="State" readOnly />
          <input className="text-field" value={zip} title="ZIP code" readOnly />
        </div>
      </div>
    </div>
  );
}
