'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { CircleArrowLeft } from 'lucide-react';
import { usePostEditorStore } from '@/lib/stores/post.editor.store';
import PostEditorSidebar from '@/components/ui/post-editor/sidebar';
import PostEditorEditPanel from '@/components/ui/post-editor/edit-panel';
import Loading from '@/components/ui/commons/loading';
import postService from '@/services/post.service';
import { Post } from '@/lib/types/post.types';

export default function PostEditorPage() {
  const { post, setPost } = usePostEditorStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const postId = params.postId as string;
  const router = useRouter();

  useEffect(() => {
    try {
      const fetchPost = postService.getPostById(postId);
      fetchPost.then((result) => {
        setPost(result.data as Post);
      });
    } catch {
      // router.push('/404');
    } finally {
      setLoading(false);
    }
  }, [postId, setPost]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const editPost = await postService.editPost(postId, post as Post);
      if (editPost.success) {
        router.push('/posts/edit/success');
      }
    } catch (error) {
      setError(error as any);
    } finally {
      setLoading(false);
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
            <div className="flex self-end justify-end mt-6">
              {error && (
                <p className="text-sm text-red-500 whitespace-pre-wrap">
                  {error}
                </p>
              )}
              <button className="btn-primary text-base">Save</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
