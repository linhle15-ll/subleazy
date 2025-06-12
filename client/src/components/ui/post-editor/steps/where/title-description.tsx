'use client';

// import Link from 'next/link';
import { usePostEditorStore } from '@/lib/stores/post.editor.store';

const TITLE_MAX = 50;
const DESC_MAX = 500;

export default function SubleaseFormDescription() {
  const { post, setPost } = usePostEditorStore();
  const title = usePostEditorStore((state) => state.post.title);
  const description = usePostEditorStore((state) => state.post.description);

  return (
    <div className="flex flex-col gap-6 relative mb-15">
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
          onChange={(e) => setPost({ ...post, title: e.target.value })}
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
          onChange={(e) => setPost({ ...post, description: e.target.value })}
        />
        <div className="text-xs text-gray-400 mt-1">
          {description?.length || 0}/{DESC_MAX} character
        </div>
      </div>
    </div>
  );
}
