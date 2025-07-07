'use client';

import { NumberButton } from '@/components/ui/post-form/number-button';
import { usePostEditStore } from '@/stores/post-edit.store';
import { usePostSetters } from '@/hooks/use-post-setters';

export default function SubleaseFormBathrooms() {
  const post = usePostEditStore((state) => state.post);
  const setPost = usePostEditStore((state) => state.setPost);
  const { setBathroomInfo } = usePostSetters(setPost);
  const { privateAttached, privateAccessible, shared } =
    post.bathroomInfo ?? {};

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
          <NumberButton
            text="Private and attached to guests' room"
            data={privateAttached}
            minValue={0}
            onChange={(value) => setBathroomInfo('privateAttached', value)}
          />
          <NumberButton
            text="Private but accessible through shared place, like hall ways"
            data={privateAccessible}
            minValue={0}
            onChange={(value) => setBathroomInfo('privateAccessible', value)}
          />
          <NumberButton
            text="Shared"
            data={shared}
            minValue={0}
            onChange={(value) => setBathroomInfo('shared', value)}
          />
        </div>
      </div>
    </div>
  );
}
