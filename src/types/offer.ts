import { User } from '../types/user.ts';
import { City } from '../types/city.ts';
import { Location } from '../types/location.ts';

export type Offer = {
  id: string;
  previewImage: string;
  city: City;
  title: string;
  description: string;
  isPremium: boolean;
  type: string;
  rating: number;
  bedrooms: number;
  maxAdults: number;
  price: number;
  owner: User;
  isFavorite: boolean;
  location: Location;
};