export type OfferType = {
    id: string;
    title: string;
    type: string;
    price: number;
    city: {
      name: string;
      location: {
        latitude: number;
        longitude: number;
        zoom: number;
      };};
    location: {
      latitude: number;
      longitude: number;
      zoom: number;
    };
    isFavorite: boolean;
    isPremium: boolean;
    rating: number;
    previewImage: string;
  };
  
  export const offers: OfferType[] = [
    {
      id: 'dbd2cc98-9146-45e3-b4ed-384780dbc16c',
      title: 'Amazing house for you and your family',
      type: 'house',
      price: 1489,
      city: {
        name: 'Amsterdam',
        location: {
          latitude: 52.37454,
          longitude: 4.911976,
          zoom: 13
        }},
      location: {
        latitude: 52.868610000000004,
        longitude: 4.342499,
        zoom: 16,
      },
      isFavorite: false,
      isPremium: true,
      rating: 4.1,
      previewImage: 'https://14.design.htmlacademy.pro/static/hotel/8.jpg',
    }, {
      id: 'f4e0244a-69a7-431c-b071-29c687695890',
      title: 'Strange place',
      type: 'house',
      price: 228,
      previewImage: 'https://14.design.htmlacademy.pro/static/hotel/14.jpg',
      city: {
        name: 'Amsterdam',
        location: {
          latitude: 52.37454,
          longitude: 4.911976,
          zoom: 13
        }},
      location: {
        latitude: 52.858610000000006,
        longitude: 4.330499,
        zoom: 16
      },
      isFavorite: false,
      isPremium: true,
      rating: 1.6
    }, {
      id: '6af6f711-c28d-4121-82cd-e0b462a27f00',
      title: 'Awesome apartment at great location',
      type: 'apartment',
      price: 1200,
      city: {
        name: 'Amsterdam',
        location: {
          latitude: 52.37454,
          longitude: 4.911976,
          zoom: 13
        }},
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 8
      },
      isFavorite: true,
      isPremium: true,
      rating: 5,
      previewImage: 'https://14.design.htmlacademy.pro/static/hotel/15.jpg'
    }
  ];
  export const CITY = {
    title: offers[0].city.name,
    lat: offers[0].city.location.latitude,
    lng: offers[0].city.location.longitude,
    zoom: offers[0].city.location.zoom,
  };
  
  export const POINTS = offers.map((offer) => ({title: offer.title, lat: offer.location.latitude, lng: offer.location.longitude}));