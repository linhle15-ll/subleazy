export const cosineSimilarity = (
  vector1: number[],
  vector2: number[]
): number => {
  if (vector1.length !== vector2.length) {
    throw new Error('Vectors must be of the same length');
  }

  let dotProduct = 0;
  let magnitude1 = 0;
  let magnitude2 = 0;

  for (let i = 0; i < vector1.length; i++) {
    dotProduct += vector1[i] * vector2[i];
    magnitude1 += vector1[i] * vector1[i];
    magnitude2 += vector2[i] * vector2[i];
  }

  const denominator = Math.sqrt(magnitude1) * Math.sqrt(magnitude2);
  return denominator === 0 ? 0 : dotProduct / denominator;
};
