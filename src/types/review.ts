import { User } from './user';

export type ReviewShortType = {
  comment: string;
  rating: number;
}
export type ReviewType = ReviewShortType &{
  id: string;
  date: string;
  user: User;
}
