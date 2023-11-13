import { User } from './user';

export type ReviewType = {
  id: string;
  date: string;
  comment: string;
  rating: number;
  user: User;
}
