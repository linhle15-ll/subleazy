import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/commons/dialog';
import { PostingCard } from '@/components/ui/posting/posting-card';
import { Group } from '@/lib/types/group.types';
import { Post } from '@/lib/types/post.types';
import { User } from '@/lib/types/user.types';
import groupService from '@/services/group.service';
import wishService from '@/services/wish.services';
import { HousePlus } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function PostLinkDialog({
  group,
  user,
}: {
  group: Group;
  user: User;
}) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [fetch, setFetch] = useState(false);

  useEffect(() => {
    if (!fetch) return;

    const fetchPosts = async () => {
      const results = await Promise.all(
        group.members.map((member) =>
          wishService.getWishListByUserId(member._id!)
        )
      );
      const fetchedPosts = results
        .map((result) => (result && result.success ? result.data : []))
        .flatMap((result) => result || [])
        .map((wish) => wish.post) as Post[];
      console.log(results, fetchedPosts);
      const uniquePosts: Post[] = [];
      const seen = new Set<string>();
      for (const post of fetchedPosts) {
        if (seen.has(post._id!)) continue;
        seen.add(post._id!);
        uniquePosts.push(post);
      }
      setPosts(uniquePosts);
      setFetch(false);
    };

    fetchPosts();
  }, [fetch, group]);

  const handleSelect = async (post: Post) => {
    await groupService.linkPost(
      group._id!,
      post,
      `${user.firstName} ${user.lastName}`
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          onClick={() => setFetch(true)}
          className="chat-info-button"
          title={'Link a post'}
          aria-label={'Link a post'}
        >
          <HousePlus className="w-5 h-5" />
          Link a post
        </button>
      </DialogTrigger>
      <DialogContent className="h-[90vh] bg-white border-none outline-none overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Link post</DialogTitle>
          <DialogDescription>
            Choose a post that you're considering to rent
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild className="w-full">
            <div className={`grid grid-cols-1 gap-4`}>
              {posts.map((post, index) => (
                <div key={index} onClick={() => handleSelect(post)}>
                  <PostingCard post={post} isVertical={false} />
                </div>
              ))}
            </div>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
