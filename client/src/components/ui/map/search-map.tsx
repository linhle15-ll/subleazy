'use client';

import { useSortStore } from '@/stores/sort.store';
import { Post } from '@/lib/types/post.types';
import {
  Map,
  MapCameraChangedEvent,
  MapCameraProps,
} from '@vis.gl/react-google-maps';
import { ElementType, useEffect, useState } from 'react';
import { TextSearchPlaceMarker } from './text-search-place-marker';

export function SearchMap({
  marker: PostingMarker,
  posts,
  className,
}: {
  marker: ElementType;
  posts: Post[];
  className?: string;
}) {
  const places = useSortStore((state) => state.places);
  const center = useSortStore((state) => state.center);
  const [cameraProps, setCameraProps] = useState<MapCameraProps>({
    center: { lat: 38.907, lng: -77.036 },
    zoom: 12,
  });

  useEffect(() => {
    if (posts?.length == 0 || !center.lat || !center.lng) return;

    const { lat, lng } = center;

    setCameraProps({
      ...cameraProps,
      center: { lat, lng },
    });
  }, [center]);

  const handleCameraChange = (e: MapCameraChangedEvent) =>
    setCameraProps(e.detail);

  return (
    posts?.length > 0 && (
      <Map
        mapId={'12b033e06f8b8b2463b91f1e'}
        {...cameraProps}
        onCameraChanged={handleCameraChange}
        className={className}
        reuseMaps={true}
      >
        {posts.map((post, index) => (
          <PostingMarker key={index} post={post} />
        ))}
        {places.map((place, index) => (
          <TextSearchPlaceMarker key={index} place={place} />
        ))}
      </Map>
    )
  );
}
