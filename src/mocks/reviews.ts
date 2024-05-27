import { Review } from '../types/review';

export const reviews: Review[] = [
  {
    id: '0',
    date: '2020-05-08T14:13:56.569Z',
    user: {
      name: 'Happy Cat',
      avatar: 'https://i.pinimg.com/564x/66/6d/e6/666de6b8dd7ee0f64b13ef83196246c5.jpg',
      isPro: true
    },
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    rating: 5
  },

  {
    id: '1',
    date: '2022-09-08T14:13:56.569Z',
    user: {
      name: 'Kitty Tomato',
      avatar: 'https://i.pinimg.com/236x/5a/e6/a3/5ae6a316d8466acf159df558da8ce967.jpg',
      isPro: false
    },
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    rating: 4
  },

  {
    id: '2',
    date: '2024-03-08T14:13:56.569Z',
    user: {
      name: 'Cat Lover',
      avatar: 'https://i.pinimg.com/236x/a6/b4/c1/a6b4c1e69191e62bad5050c7e1bf9747.jpg',
      isPro: false
    },
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    rating: 2
  },

  {
    id: '3',
    date: '2019-06-08T14:13:56.569Z',
    user: {
      name: 'Angry Kit',
      avatar: 'https://i.pinimg.com/236x/6c/39/e6/6c39e6da4034946dd0d339c073913881.jpg',
      isPro: false
    },
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    rating: 1
  },
];
