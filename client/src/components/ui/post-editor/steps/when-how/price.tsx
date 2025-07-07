'use client';

import { usePostEditStore } from '@/stores/post-edit.store';
import { usePostSetters } from '@/hooks/use-post-setters';

export default function SubleaseFormPrice() {
  const post = usePostEditStore((state) => state.post);
  const setPost = usePostEditStore((state) => state.setPost);
  const { setPrice } = usePostSetters(setPost);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers
    if (/^\d+$/.test(value)) {
      const num = parseInt(value, 10);
      const price = num < 0 ? 0 : num;
      setPrice('price', price);
    }
  };

  return (
    <div className="flex flex-col gap-6 relative mb-15">
      <div className="form-h1">Set your price</div>
      <div className="-mt-5 mb-8">
        You might expect this price to have included amenity prices like water
        and electricity.
      </div>

      {/* Price input */}
      <div className="flex flex-col items-center justify-center my-12">
        <div className="flex items-center text-5xl font-medium">
          <span className="mr-2">$</span>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            className="w-32 text-5xl font-medium text-center border-none outline-none bg-transparent focus:ring-0"
            value={post.price || ''}
            onChange={handlePriceChange}
            maxLength={6}
            aria-label="Price per month"
            required
          />
          <span className="ml-2 text-5xl font-medium">/ month</span>
        </div>
      </div>
    </div>
  );
}
