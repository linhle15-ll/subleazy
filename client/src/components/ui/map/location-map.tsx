import { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

interface LocationMapProps {
  center?: {
    lat: number;
    lng: number;
  };
  onLocationSelect?: (location: { lat: number; lng: number }) => void;
}

export default function LocationMap({
  center,
  onLocationSelect,
}: LocationMapProps) {
  const [, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.LatLng | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const handleMapClick = useCallback(
    (e: google.maps.MapMouseEvent) => {
      if (e.latLng) {
        setMarker(e.latLng);
        onLocationSelect?.({
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
        });
      }
    },
    [onLocationSelect]
  );

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center || { lat: 37.7749, lng: -122.4194 }} // Default to San Francisco
      zoom={13}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onClick={handleMapClick}
    >
      {marker && <Marker position={marker} />}
      {center && !marker && <Marker position={center} />}
    </GoogleMap>
  );
}
