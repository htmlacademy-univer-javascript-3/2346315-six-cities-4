import OfferCardsSorting from '../offer-cards-sorting/offer-cards-sorting.tsx';
import { OffersListMemo } from '../offers-list/offers-list.tsx';
import { Offer } from '../../types/offer.ts';


type CityPlacesProps = {
  city: string;
  offers: Offer[];
}

function CityPlaces({city, offers}: CityPlacesProps): JSX.Element {
  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{`${offers.length} places to stay in ${city}`}</b>
      <OfferCardsSorting/>
      <OffersListMemo offers={offers} listType={'typical'} />
    </section>
  );
}

export default CityPlaces;
