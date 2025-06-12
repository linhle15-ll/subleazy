'use client';

import { User, Users, UserPlus } from 'lucide-react';
import { SelectionBox } from '@/components/ui/selection-box/selection-box';
import { WhoElse } from '@/lib/types/enums';
import { usePostEditorStore } from '@/lib/stores/post.editor.store';

const options = [
  { label: 'Me', value: WhoElse.ME, icon: User },
  { label: 'My family', value: WhoElse.FAM, icon: Users },
  { label: 'Other guests', value: WhoElse.GUESTS, icon: Users },
  { label: 'Roommates', value: WhoElse.ROOMMATES, icon: UserPlus },
];

export default function SubleaseFormWhoElse() {
  const { setPost } = usePostEditorStore();
  const whoElse = usePostEditorStore((state) => state.post.whoElse);

  const handleSelection = (value: WhoElse) => {
    const currentSelection = whoElse || [];
    const newSelection = currentSelection.includes(value)
      ? currentSelection.filter((item) => item !== value)
      : [...currentSelection, value];
    setPost({
      whoElse: newSelection,
    });
  };

  return (
    <div className="flex flex-col gap-6 relative mb-15">
      {/* Who else will be there? */}
      <div className="form-h1">Who Else Will Be There?</div>
      <div className="-mt-5 mb-5">
        Let your guests know who else will be there during their stay. This
        helps them understand the environment and who they might interact with.
      </div>
      <div className="flex flex-wrap gap-6">
        {options.map((opt) => {
          const Icon = opt.icon;
          const active = whoElse?.includes(opt.value) || false;
          return (
            <SelectionBox
              key={opt.value}
              active={active}
              onClick={() => handleSelection(opt.value)}
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
