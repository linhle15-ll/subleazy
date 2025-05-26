export function getData() {
  const data = Array.from({ length: 20 }, (_, i) => ({
    title: `New House ${i + 101}`,
    description: `Spacious and sunny ${2 + (i % 3)}-bedroom house near downtown.`,
    media: [
      `https://example.com/image${i + 1}.jpg`,
      `https://example.com/image${i + 2}.jpg`,
      `https://example.com/image${i + 3}.jpg`,
      `https://example.com/image${i + 4}.jpg`,
      `https://example.com/image${i + 5}.jpg`,
      `https://example.com/image${i + 6}.jpg`,
    ],
    sublessees: [
      `6638a3a36e5b5e001f86b12${i % 9}`,
      `6638a3a36e5b5e001f86b13${i % 9}`,
    ],
    house: `6638a3a36e5b5e001f86b14${i}`,
    houseInfo: {
      houseType: i % 2 === 0 ? 'apartment' : 'house',
      placeType: i % 3 === 0 ? 'private' : 'shared',
    },
    suites: `Suite ${i + 1} with ${i % 2 === 0 ? 'private bath' : 'shared bath'}`,
    city: 'Springfield',
    state: 'MA',
    zip: `011${(i + 1).toString().padStart(2, '0')}`,
    lat: 42.1 + i * 0.01,
    long: -72.58 - i * 0.01,
    bedroomInfo: {
      maxGuests: 2 + (i % 2),
      bedrooms: 1 + (i % 2),
      beds: 1 + (i % 3),
      lock: i % 2 === 0,
    },
    bathroomInfo: {
      privateAttached: 1,
      privateAccessible: i % 2,
      shared: i % 2,
    },
    whoElse: ['me', ...(i % 2 === 0 ? ['friends'] : ['family'])],
    amenities: {
      wifi: true,
      kitchen: i % 3 !== 0,
      laundry: i % 2 === 0,
      parking: true,
      airConditioning: i % 2 === 0,
    },
    convenience: {
      publicTransport: i % 2 === 0,
      supermarket: true,
      disabilityFriendly: i % 4 === 0,
    },
    price: 1000 + i * 50,
    rules: {
      noGuest: i % 2 === 0,
      npParty: i % 3 === 0,
      quietHours: {
        from: '8',
        to: '10',
      },
      noSmoking: false,
      noDrug: true,
      noPet: i % 2 !== 0,
    },
    availability: {
      startDate: `2025-0${(i % 12) + 1}-01T00:00:00Z`,
      endDate: `2026-0${(i % 12) + 1}-01T00:00:00Z`,
      checkinTime: '4:00 PM',
      checkoutTime: '11:00 AM',
    },
    status: i % 2 === 0 ? 'open' : 'closed',
    address: `${100 + i} Main Street`,
    minPrice: 0,
    maxPrice: 0,
  }));

  return data;
}
