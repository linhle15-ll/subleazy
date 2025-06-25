'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { CircleArrowLeft } from 'lucide-react';
import PostEditorSidebar from '@/components/ui/post-editor/sidebar';
import PostEditorEditPanel from '@/components/ui/post-editor/edit-panel';
import Loading from '@/components/ui/commons/loading';
import postService from '@/services/post.service';
import { Post } from '@/lib/types/post.types';
import { usePostEditStore } from '@/stores/post-edit.store';

export default function PostEditorPage() {
  const params = useParams();
  const postId = params.postId as string;
  const router = useRouter();
  const { post, setPost } = usePostEditStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError(null);

      const res = await postService.getPost(postId);

      if (res.success && res.data) {
        setPost(res.data as Post);
      } else {
        setError(res.error || 'Failed to fetch post');
      }

      setLoading(false);
    };
    fetchPost();
  }, [postId, setPost]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await postService.editPost(postId, post as Partial<Post>);
    if (res.success) {
      setPost({});
      router.push('/posts/edit/success');
    }
  };

  if (loading) return <Loading />;

  return (
    <form onSubmit={(e) => handleSave(e)}>
      <div className="max-h-screen max-w-7xl mx-auto bg-white rounded-3xl p-9 pt-0">
        {/* Post Editor Header */}
        <div className="flex justify-start items-center gap-8 mb-6">
          <button>
            <CircleArrowLeft className="text-gray-500 w-8 h-8 ml-4 hover:text-primaryOrange" />
          </button>
          <div className="form-h1 font-semibold">Post Editor</div>
          <button className="btn-secondary ml-4">Preview</button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 pr-4">
          {/* Left: Sidebar */}
          <div className="hidden lg:block bg-white border-r border-gray-200 pr-4">
            <PostEditorSidebar />
          </div>

          {/* Middle: Edit Panel and Submit Button*/}
          <div className="col-span-2 bg-white rounded-3xl pl-8">
            <div className="h-[calc(100vh-20rem)] overflow-y-auto">
              <PostEditorEditPanel />
            </div>
            <div className="flex items-center justify-end mt-6 space-x-12">
              {error && (
                <p className="text-sm text-red-500 whitespace-pre-wrap">
                  {error}
                </p>
              )}
              <button type="submit" className="btn-primary text-base">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
