import { User } from './user';

export type ReviewType = {
  id: number;
  date: string;
  comment: string;
  rating: number;
  user: User;
}
