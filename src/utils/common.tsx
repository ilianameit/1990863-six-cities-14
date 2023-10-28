function insertPlural(objectLength: number) {
  return objectLength === 1 ? '' : 's';
}

function getRatingWidth(rating: number): string {
  const starsRaring = 5;
  return `${(rating * 100) / starsRaring}%`;
}

function capitalize(word: string) {
  return word[0].toUpperCase() + word.slice(1);
}

export {insertPlural, getRatingWidth, capitalize};
