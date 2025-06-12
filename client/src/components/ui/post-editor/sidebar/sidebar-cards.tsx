'use client';

import { StepKeys } from '@/lib/stores/post.editor.store';

export type CardProps = {
  key: StepKeys;
  layout: 'single' | 'double';
  title?: string;
  summary?: string;
  items?: { title: string; summary: string }[];
};

type SidebarCardProps = CardProps & {
  active: boolean;
  onClick: () => void;
};

export function SidebarCardSingle({
  title,
  summary,
  active,
  onClick,
}: SidebarCardProps) {
  return (
    <div
      className={`p-4 rounded-xl cursor-pointer transition whitespace-pre-line hover:border-primaryOrange hover:shadow-md
        ${active ? 'border-black border-2 bg-white shadow-md' : 'border-gray-400 border'}`}
      onClick={onClick}
    >
      <div className={`text-sm ${active ? 'font-semibold' : 'font-medium'}`}>
        {title}
      </div>
      <div className={`text-xs mt-1 ${active ? 'font-md' : 'text-gray-500'}`}>
        {summary}
      </div>
    </div>
  );
}

export function SidebarCardDouble({
  items,
  active,
  onClick,
}: SidebarCardProps) {
  return (
    <div
      className={`p-4 rounded-xl cursor-pointer transition whitespace-pre-line hover:border-primaryOrange hover:shadow-md
        ${active ? 'border-black border-2 bg-white shadow-md' : 'border-gray-400 border'}`}
      onClick={onClick}
    >
      <div className="flex justify-around">
        {items?.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={`text-sm ${active ? 'font-semibold' : 'font-medium'}`}
            >
              {item.title}
            </div>
            <div
              className={`text-xs mt-1 ${active ? 'font-md' : 'text-gray-500'}`}
            >
              {item.summary}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
