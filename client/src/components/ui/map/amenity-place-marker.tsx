import { Place } from '@/lib/types/house.types';
import { getMarkerColor } from '@/lib/utils/marker-color';
import {
  AdvancedMarker,
  InfoWindow,
  Pin,
  useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';

export function AmenityPlaceMarker({
  place,
  amenityType,
}: {
  place: Place;
  amenityType: string;
}) {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infoShown, setInfoShown] = useState(false);
  const [markerColor, setMarkerColor] = useState<{
    background: string;
    border: string;
  }>();

  useEffect(() => {
    const color = getMarkerColor(
      amenityType === 'supermarket' ? 'blue' : 'purple'
    );
    setMarkerColor(color);
  }, [amenityType]);

  return (
    <>
      <AdvancedMarker
        position={{ lat: place.lat, lng: place.long }}
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
          <div className="mt-1">{place.shortAddress}</div>
        </InfoWindow>
      )}
    </>
  );
}
