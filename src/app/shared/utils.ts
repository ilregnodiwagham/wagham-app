export const findPrevious = (vector: number[], element: number): number => {
  if (vector.length === 1) {return vector[0];}
  const middle = Math.floor(vector.length / 2);
  if (vector[middle] === element) {return vector[middle];}
  else if (vector[middle] > element) {return findPrevious(vector.slice(0, middle), element);}
  else {return findPrevious(vector.slice(middle, vector.length), element);}
};
