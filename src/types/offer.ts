import { User } from '../types/user.ts';
import { City } from '../types/city.ts';
import { Location } from '../types/location.ts';
import { Host } from './host.ts';

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

export type ExtendedOffer = Omit<Offer, 'previewImage'> & {
  description: string;
  bedrooms: number;
  goods: string[];
  host: Host;
  maxAdults: number;
  images: string[];
}
