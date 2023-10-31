import { City } from './city';
import { Location } from './location';

export type OfferPreview = {
  id: number;
  city: City;
  previewImage: string;
  title: string;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  type: string;
  price: number;
  goods: string[];
  location: Location;
}
