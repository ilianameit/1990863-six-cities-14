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

function roundRating(rating: number) {
  return Math.round(rating);
}

function formatDate(date: string) {
  const options: Intl.DateTimeFormatOptions = {
    month: 'long',
    year: 'numeric',
  };
  return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
}

export {insertPlural, getRatingWidth, capitalize, roundRating, formatDate};
