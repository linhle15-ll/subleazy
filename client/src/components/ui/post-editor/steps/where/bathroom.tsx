'use client';

import { PlusCircle, MinusCircle } from 'lucide-react';
import { usePostEditorStore } from '@/lib/stores/post.editor.store';

export default function SubleaseFormBathrooms() {
  const { post, setPost } = usePostEditorStore();
  const bathroomInfo = usePostEditorStore((state) => state.post.bathroomInfo);

  const handlePrivateAttachedChange = (value: number) => {
    setPost({
      bathroomInfo: {
        ...post.bathroomInfo,
        privateAttached: value,
      },
    });
  };

  const handlePrivateAccessibleChange = (value: number) => {
    setPost({
      bathroomInfo: {
        ...post.bathroomInfo,
        privateAccessible: value,
      },
    });
  };

  const handleSharedChange = (value: number) => {
    setPost({
      bathroomInfo: {
        ...post.bathroomInfo,
        shared: value,
      },
    });
  };

  return (
    <div className="flex flex-col gap-6 relative mb-15 mr-8">
      <div className="form-h1">Bathrooms</div>
      <div className="-mt-5 mb-5">
        Students might need to share bathrooms with roommates (although we don't
        always like that). Let your guests know how many bathrooms are available
        in your place.
      </div>
      {/* Bathroom info */}
      <div className="pl-14 pr-14">
        <div className="divide-y divide-gray-200">
          {/* Private attached */}
          <div className="form-des-inc-button">
            <span>Private and attached to guests' room</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Decrease private attached"
                onClick={() => {
                  const value = Math.max(
                    0,
                    (bathroomInfo?.privateAttached || 0) - 1
                  );
                  handlePrivateAttachedChange(value);
                }}
                className="disabled:opacity-50"
                disabled={(bathroomInfo?.privateAttached || 0) <= 0}
              >
                <MinusCircle className="w-7 h-7 text-gray-400 hover:text-primaryOrange" />
              </button>
              <span className="w-8 text-center">
                {bathroomInfo?.privateAttached || 0}
              </span>
              <button
                type="button"
                aria-label="Increase private attached"
                onClick={() => {
                  const value = (bathroomInfo?.privateAttached || 0) + 1;
                  handlePrivateAttachedChange(value);
                }}
              >
                <PlusCircle className="w-7 h-7 text-primaryOrange" />
              </button>
            </div>
          </div>
          {/* Private shared */}
          <div className="form-des-inc-button">
            <span>
              Private but accessible through shared place, like hall ways
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Decrease private shared"
                onClick={() => {
                  const value = Math.max(
                    0,
                    (bathroomInfo?.privateAccessible || 0) - 1
                  );
                  handlePrivateAccessibleChange(value);
                }}
                className="disabled:opacity-50"
                disabled={(bathroomInfo?.privateAccessible || 0) <= 0}
              >
                <MinusCircle className="w-7 h-7 text-gray-400 hover:text-primaryOrange" />
              </button>
              <span className="w-8 text-center">
                {bathroomInfo?.privateAccessible || 0}
              </span>
              <button
                type="button"
                aria-label="Increase private shared"
                onClick={() => {
                  const value = (bathroomInfo?.privateAccessible || 0) + 1;
                  handlePrivateAccessibleChange(value);
                }}
              >
                <PlusCircle className="w-7 h-7 text-primaryOrange" />
              </button>
            </div>
          </div>
          {/* Shared */}
          <div className="form-des-inc-button">
            <span>Shared</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Decrease shared"
                onClick={() => {
                  const value = Math.max(0, (bathroomInfo?.shared || 0) - 1);
                  handleSharedChange(value);
                }}
                className="disabled:opacity-50"
                disabled={(bathroomInfo?.shared || 0) <= 0}
              >
                <MinusCircle className="w-7 h-7 text-gray-400 hover:text-primaryOrange" />
              </button>
              <span className="w-8 text-center">
                {bathroomInfo?.shared || 0}
              </span>
              <button
                type="button"
                aria-label="Increase shared"
                onClick={() => {
                  const value = (bathroomInfo?.shared || 0) + 1;
                  handleSharedChange(value);
                }}
              >
                <PlusCircle className="w-7 h-7 text-primaryOrange" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
