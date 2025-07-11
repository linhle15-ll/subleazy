'use client';

import { getMarkerColor } from '@/lib/utils/marker-color';
import { TextSearchPlace, useSortStore } from '@/stores/sort.store';
import {
  AdvancedMarker,
  InfoWindow,
  Pin,
  useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export function TextSearchPlaceMarker({ place }: { place: TextSearchPlace }) {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infoShown, setInfoShown] = useState(false);
  const getColor = useSortStore((state) => state.getColor);
  const [markerColor, setMarkerColor] = useState<{
    background: string;
    border: string;
  }>();

  useEffect(() => {
    const color = getColor(place.query);
    setMarkerColor(getMarkerColor(color));
  }, [place.query]);

  return (
    <>
      <AdvancedMarker
        position={{ lat: place.lat, lng: place.lng }}
        ref={markerRef}
        onMouseEnter={() => setInfoShown(true)}
        onMouseLeave={() => setInfoShown(false)}
        onClick={() =>
          window.open(place.googleMapsUri, '_blank', 'noopener,noreferrer')
        }
      >
        {markerColor && (
          <Pin
            background={markerColor.background}
            borderColor={markerColor.border}
            glyphColor={markerColor.border}
          />
        )}
      </AdvancedMarker>
      {infoShown && (
        <InfoWindow anchor={marker} headerDisabled={true}>
          <div className="bg-white font-medium">{place.displayName}</div>
          {place.photo && (
            <Image
              src={place.photo}
              alt={place.query}
              width={150}
              height={150}
              className="mt-1"
            />
          )}
        </InfoWindow>
      )}
    </>
  );
}
