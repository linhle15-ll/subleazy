'use client';

import { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

interface GoogleMapProps {
  address: string;
  className?: string;
}

export default function GoogleMap({ address, className = '' }: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const map = useRef<google.maps.Map | null>(null);
  const marker = useRef<google.maps.Marker | null>(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
        version: 'weekly',
      });

      const { Map } = await loader.importLibrary('maps');
      const { Geocoder } = await loader.importLibrary('geocoding');

      const geocoder = new Geocoder();
      geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK' && results && results[0]) {
          const position = results[0].geometry.location;
          if (mapRef.current) {
            map.current = new Map(mapRef.current, {
              center: position,
              zoom: 15,
              disableDefaultUI: true,
              styles: [
                {
                  featureType: 'poi',
                  elementType: 'labels',
                  stylers: [{ visibility: 'off' }],
                },
              ],
            });

            marker.current = new google.maps.Marker({
              position,
              map: map.current,
              title: address,
            });
          }
        }
      });
    };

    initMap();
  }, [address]);

  return <div ref={mapRef} className={`w-full h-full ${className}`} />;
}
