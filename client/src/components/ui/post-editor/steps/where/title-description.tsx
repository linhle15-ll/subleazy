'use client';

// import Link from 'next/link';
import { usePostEditStore } from '@/stores/post-edit.store';
import { usePostSetters } from '@/hooks/use-post-setters';

const TITLE_MAX = 50;
const DESC_MAX = 1500;

export default function SubleaseFormDescription() {
  const post = usePostEditStore((state) => state.post);
  const setPost = usePostEditStore((state) => state.setPost);
  const { setTitleDescription } = usePostSetters(setPost);
  const { title, description } = post;

  return (
    <div className="flex flex-col gap-6 relative mb-15 mr-8">
      <div className="form-h1">Title and description</div>
      <div className="-mt-5 mb-5">
        A good title and description can help your post stand out.
      </div>

      {/* Title input */}
      <div className="mb-6">
        <label htmlFor="title" className="form-h2 block mb-1">
          Title
        </label>
        <input
          id="title"
          className="text-field w-full sm:border-r sm:items-start"
          maxLength={TITLE_MAX}
          value={title || ''}
          onChange={(e) => setTitleDescription('title', e.target.value)}
          required
        />
        <div className="text-xs text-gray-400 mt-1">
          {title?.length || 0}/{TITLE_MAX} character
        </div>
      </div>

      {/* Description input */}
      <div className="mb-6">
        <label htmlFor="desc" className="form-h2 block mb-1">
          Description
        </label>
        <textarea
          id="desc"
          className="text-field w-full min-h-[120px] sm:pr-4 sm:border-r sm:items-start"
          maxLength={DESC_MAX}
          value={description || ''}
          onChange={(e) => setTitleDescription('description', e.target.value)}
          required
        />
        <div className="text-xs text-gray-400 mt-1">
          {description?.length || 0}/{DESC_MAX} character
        </div>
      </div>
    </div>
  );
}
