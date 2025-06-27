'use client';

import { Post } from '@/lib/types/post.types';
import {
  AdvancedMarker,
  CollisionBehavior,
  InfoWindow,
  useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps';
import { useState } from 'react';

export function PriceMarker({ post }: { post: Post }) {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infoShown, setInfoShown] = useState(false);

  return (
    <>
      <AdvancedMarker
        position={{ lat: post.lat, lng: post.long }}
        ref={markerRef}
        collisionBehavior={CollisionBehavior.OPTIONAL_AND_HIDES_LOWER_PRIORITY}
        onMouseEnter={() => setInfoShown(true)}
        onMouseLeave={() => setInfoShown(false)}
      >
        <div className="bg-white border border-gray-300 shadow-md p-2 font-medium">
          ${post.price}
        </div>
      </AdvancedMarker>
      {infoShown && (
        <InfoWindow anchor={marker} headerDisabled={true}>
          <div className="bg-white font-medium">{post.title}</div>
        </InfoWindow>
      )}
    </>
  );
}
