import { CityName } from '../const/const';
import { Location } from './location';

export type City = {
  name: typeof CityName[number];
  location: Location;
}
