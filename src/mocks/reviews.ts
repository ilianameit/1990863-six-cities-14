import { ReviewType } from '../types/review';

export const reviews: ReviewType[] = [
  {
    'id': '1',
    'user': {

      'isPro': true,
      'name': 'Mollie',
      'avatarUrl': 'https://14.react.pages.academy/static/avatar/7.jpg'
    },
    'rating': 5,
    'comment': 'I stayed here for one night and it was an unpleasant experience.',
    'date': '2023-11-04T11:13:12.982Z'
  },
  {
    'id': '2',
    'user': {

      'isPro': false,
      'name': 'Zak',
      'avatarUrl': 'https://14.react.pages.academy/static/avatar/4.jpg'
    },
    'rating': 2,
    'comment': 'The deluxe room was a quite comfortable one with all the adequate facilities. The only thing that made me feel uncomfortable was the rude behavior of an impolite staff at the reception desk.',
    'date': '2023-11-04T11:13:12.982Z'
  },
  {
    'id': '3',
    'user': {

      'isPro': true,
      'name': 'Isaac',
      'avatarUrl': 'https://14.react.pages.academy/static/avatar/3.jpg'
    },
    'rating': 3,
    'comment': 'Beautiful space, fantastic location and atmosphere, really a wonderful place to spend a few days. Will be back.',
    'date': '2023-10-22T11:13:12.982Z'
  }
];
