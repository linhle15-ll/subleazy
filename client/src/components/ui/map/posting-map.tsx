import { House } from '@/lib/types/house.types';
import { Post } from '@/lib/types/post.types';
import {
  AdvancedMarker,
  ControlPosition,
  Map,
  MapCameraChangedEvent,
  MapCameraProps,
  MapControl,
} from '@vis.gl/react-google-maps';
import { ShoppingCart, Train } from 'lucide-react';
import { useState } from 'react';
import { AmenityPlaceMarker } from './amenity-place-marker';

export function PostingMap({
  post,
  className,
}: {
  post: Post;
  className?: string;
}) {
  const [cameraProps, setCameraProps] = useState<MapCameraProps>({
    center: { lat: post.lat, lng: post.long },
    zoom: 12,
  });
  const [showSupermarket, setShowSupermarket] = useState(false);
  const [showPublicTransport, setShowPublicTransport] = useState(false);

  const handleCameraChange = (e: MapCameraChangedEvent) =>
    setCameraProps(e.detail);

  const house = post.house as House;

  return (
    <Map
      mapId={'12b033e06f8b8b2463b91f1e'}
      className={className}
      {...cameraProps}
      onCameraChanged={handleCameraChange}
      reuseMaps={true}
    >
      <MapControl position={ControlPosition.BOTTOM_LEFT}>
        <div className="flex gap-3 mb-2">
          <button
            className="bg-white rounded-md p-2 flex items-center justify-center"
            onClick={() => setShowSupermarket(!showSupermarket)}
          >
            <ShoppingCart
              className={`w-6 h-6 ${showSupermarket && 'text-primaryOrange'}`}
            />
          </button>
          <button
            className="bg-white rounded-md p-2 flex items-center justify-center"
            onClick={() => setShowPublicTransport(!showPublicTransport)}
          >
            <Train
              className={`w-6 h-6 ${showPublicTransport && 'text-primaryOrange'}`}
            />
          </button>
        </div>
      </MapControl>
      <AdvancedMarker position={{ lat: post.lat, lng: post.long }} />
      {showSupermarket &&
        house.nearbyAmenities?.supermarkets.map((place, index) => (
          <AmenityPlaceMarker
            key={index}
            place={place}
            amenityType={'supermarket'}
          />
        ))}
      {showPublicTransport &&
        house.nearbyAmenities?.publicTransports.map((place, index) => (
          <AmenityPlaceMarker
            key={index}
            place={place}
            amenityType={'publicTransport'}
          />
        ))}
    </Map>
  );
}
