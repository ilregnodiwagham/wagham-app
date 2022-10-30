export const findPrevious = (vector: number[], element: number): number => {
  if (vector.length === 1) {return vector[0];}
  const middle = Math.floor(vector.length / 2);
  if (vector[middle] === element) {return vector[middle];}
  else if (vector[middle] > element) {return findPrevious(vector.slice(0, middle), element);}
  else {return findPrevious(vector.slice(middle, vector.length), element);}
};

export const updateSet = <T>(set: Set<T>, value: T[] | T): Set<T> => {
  if(Array.isArray(value)) {
    return new Set([...set, ...value]);
  } else {
    return set.add(value);
  }
};
