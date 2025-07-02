'use client';

import { useState } from 'react';
import UploadMedias from './upload-medias';

// Example component showing how to use UploadMedias for post editing
export default function PostEditExample() {
  const [post, setPost] = useState({
    id: '123',
    title: 'Sample Post',
    media: ['https://example.com/image1.jpg', 'https://example.com/video1.mp4'],
  });

  const handleMediaChange = (mediaUrls: string[]) => {
    setPost((prev) => ({
      ...prev,
      media: mediaUrls,
    }));

    // In a real app, you would also call your API to update the post
    console.log('Updated media URLs:', mediaUrls);
  };

  const handleSave = async () => {
    try {
      // Simulate API call to update post
      console.log('Saving post with media:', post.media);
      // await updatePostAPI(post.id, post);
      alert('Post updated successfully!');
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Error updating post');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Post Media</h1>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">
          Current Post: {post.title}
        </h2>
        <p className="text-gray-600">
          You can remove existing photos/videos and add new ones. The upload
          button will only appear when you add new files.
        </p>
      </div>

      <UploadMedias
        initialMedia={post.media}
        onMediaChange={handleMediaChange}
        maxFiles={10}
        className="mb-6"
      />

      <div className="flex gap-4">
        <button onClick={handleSave} className="btn-primary px-6 py-2">
          Save Changes
        </button>

        <button
          onClick={() => setPost((prev) => ({ ...prev, media: [] }))}
          className="btn-secondary px-6 py-2"
        >
          Clear All Media
        </button>
      </div>

      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <h3 className="font-semibold mb-2">Current Media URLs:</h3>
        <pre className="text-sm overflow-auto">
          {JSON.stringify(post.media, null, 2)}
        </pre>
      </div>
    </div>
  );
}
