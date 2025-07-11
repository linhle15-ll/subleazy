import Image, { StaticImageData } from 'next/image';
import placeholder from '@/public/placeholder-image-person.webp';

interface ProfileAvatarProps {
  src?: string | null | StaticImageData;
  alt?: string;
  size?: number;
}

export const ProfileAvatar = ({
  src,
  alt = 'Profile image',
  size,
}: ProfileAvatarProps) => {
  const imageSrc = src || placeholder;

  return (
    <div
      className="relative rounded-full overflow-hidden"
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <Image
        src={imageSrc}
        alt={alt}
        fill
        sizes={`${size}px`}
        className="object-cover"
        // Handle potential loading errors by falling back to the placeholder
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.srcset = placeholder.src;
        }}
      />
    </div>
  );
};