import { Post } from '../types/post.types';

function normalize(val: number, min: number, max: number) {
  return max === min ? 1 : (val - min) / (max - min);
}

function distanceDiff(lat1: number, lng1: number, lat2: number, lng2: number) {
  return Math.abs(lat1 - lat2) + Math.abs(lng1 - lng2);
}

export function scoreAndSortPosts(
  posts: Post[],
  places: { lat: number; lng: number; query: string }[],
  queries: string[],
  price: boolean
) {
  const distancePerQuery: { [key: string]: { min: number; max: number } } =
    Object.fromEntries(
      queries.map((query) => [query, { min: Infinity, max: -Infinity }])
    );

  // Calculate minimum distance from each post to any places of each query
  const postDistances = posts.map((post) => {
    const distance: { [key: string]: number } = {};

    for (const q of queries) {
      const filteredPlaces = places.filter((place) => place.query === q);
      const minDist = Math.min(
        ...filteredPlaces.map((place) =>
          distanceDiff(post.lat, post.long, place.lat, place.lng)
        )
      );

      distance[q] = minDist;
      distancePerQuery[q].min = Math.min(distancePerQuery[q].min, minDist);
      distancePerQuery[q].max = Math.max(distancePerQuery[q].max, minDist);
    }

    return distance;
  });

  let minPrice = Infinity;
  let maxPrice = -Infinity;

  if (price) {
    minPrice = Math.min(...posts.map((post) => post.price));
    maxPrice = Math.max(...posts.map((post) => post.price));
  }

  // Calculate score for each post based on their minimum distance to each query
  const postScores = postDistances.map((postDistance, index) => {
    let score = 0;

    for (const q of queries) {
      const { min, max } = distancePerQuery[q];
      const normalizedScore = normalize(postDistance[q], min, max);
      score += 1 - normalizedScore;
    }

    if (price) score += 1 - normalize(posts[index].price, minPrice, maxPrice);

    return { index, score };
  });

  return postScores.sort((a, b) => b.score - a.score);
}
