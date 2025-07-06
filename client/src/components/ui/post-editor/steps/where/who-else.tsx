'use client';

import { User, Users, UserPlus } from 'lucide-react';
import { SelectionBox } from '@/components/ui/post-form/selection-box';
import { WhoElse } from '@/lib/types/enums';
import { usePostEditStore } from '@/stores/post-edit.store';
import { usePostSetters } from '@/hooks/use-post-setters';

const options = [
  { label: 'Me', value: WhoElse.ME, icon: User },
  { label: 'My family', value: WhoElse.FAM, icon: Users },
  { label: 'Other guests', value: WhoElse.GUESTS, icon: Users },
  { label: 'Roommates', value: WhoElse.ROOMMATES, icon: UserPlus },
];

export default function SubleaseFormWhoElse() {
  const post = usePostEditStore((state) => state.post);
  const setPost = usePostEditStore((state) => state.setPost);
  const { setWhoElse } = usePostSetters(setPost);

  return (
    <div className="flex flex-col gap-6 relative mb-15 mr-8">
      {/* Who else will be there? */}
      <div className="form-h1">Who Else Will Be There?</div>
      <div className="-mt-5 mb-5">
        Let your guests know who else will be there during their stay. This
        helps them understand the environment and who they might interact with.
      </div>
      <div className="flex flex-wrap gap-6">
        {options.map((opt) => {
          const Icon = opt.icon;
          const active = post.whoElse?.includes(opt.value) || false;
          return (
            <SelectionBox
              key={opt.value}
              active={active}
              onClick={() => setWhoElse(opt.value)}
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
  );
}
