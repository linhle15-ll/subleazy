interface Coordinates {
  lat: number;
  lng: number;
}

export async function getCoordinatesFromAddress(
  street: string,
  city: string,
  state: string,
  zip: string
): Promise<Coordinates> {
  // Construct the address string
  const address = `${street}, ${city}, ${state} ${zip}`;

  try {
    // Replace YOUR_API_KEY with your actual Google Maps API key
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
    );

    const data = await response.json();

    if (data.status === 'OK' && data.results[0]) {
      const { lat, lng } = data.results[0].geometry.location;
      return { lat, lng };
    } else {
      throw new Error('No results found');
    }
  } catch (error) {
    console.error('Error getting coordinates:', error);
    throw error;
  }
}
