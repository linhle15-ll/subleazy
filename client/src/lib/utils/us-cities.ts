export const US_CITIES = [
  // Northeast
  'New York City, NY',
  'Boston, MA',
  'Philadelphia, PA',
  'Washington, DC',
  'Baltimore, MD',

  // Southeast
  'Miami, FL',
  'Atlanta, GA',
  'Charlotte, NC',
  'Nashville, TN',
  'Orlando, FL',

  // Midwest
  'Chicago, IL',
  'Detroit, MI',
  'Minneapolis, MN',
  'Indianapolis, IN',
  'Cleveland, OH',

  // Southwest
  'Houston, TX',
  'Dallas, TX',
  'Austin, TX',
  'Phoenix, AZ',
  'Las Vegas, NV',

  // West Coast
  'Los Angeles, CA',
  'San Francisco, CA',
  'Seattle, WA',
  'Portland, OR',
  'San Diego, CA',

  // Additional Major Cities
  'Denver, CO',
  'New Orleans, LA',
  'Pittsburgh, PA',
  'St. Louis, MO',
  'Kansas City, MO',
  'Cincinnati, OH',
  'Tampa, FL',
  'San Antonio, TX',
  'Sacramento, CA',
  'Salt Lake City, UT',
] as const; // Add this line to make the array readonly, can't be modified

export type USCity = (typeof US_CITIES)[number];
