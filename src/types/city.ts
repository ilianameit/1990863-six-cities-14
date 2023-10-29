import { CityName } from '../const/const';
import { Location } from './location';

export type City = {
  name: keyof typeof CityName;
  location: Location;
}
