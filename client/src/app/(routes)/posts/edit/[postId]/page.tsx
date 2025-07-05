'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { CircleArrowLeft } from 'lucide-react';
import PostEditorSidebar from '@/components/ui/post-editor/sidebar';
import PostEditorEditPanel from '@/components/ui/post-editor/edit-panel';
import Loading from '@/components/ui/commons/loading';
import postService from '@/services/post.service';
import { Post } from '@/lib/types/post.types';
import { usePostEditStore } from '@/stores/post-edit.store';
import { usePost } from '@/hooks/use-post';
import { useQueryClient } from '@tanstack/react-query';

export default function PostEditorPage() {
  const { postId } = useParams<{ postId: string }>();
  const { result, isFetching } = usePost(postId);
  const router = useRouter();
  const post = usePostEditStore((state) => state.post);
  const setPost = usePostEditStore((state) => state.setPost);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (isFetching || !result) return;
    if (result.success) setPost(result.data!);
  }, [result]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await postService.editPost(postId, post as Partial<Post>);
    if (res.success) {
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
      setPost({});
      router.push('/posts/edit/success');
    }
  };

  if (isFetching || !result) return <Loading />;
  if (!result.success)
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-medium text-gray-900 mb-4">
            Post could not be found
          </h2>
          <button
            onClick={() => router.push('/')}
            className="text-primaryOrange hover:text-orange-600"
          >
            Return to home
          </button>
        </div>
      </div>
    );

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
