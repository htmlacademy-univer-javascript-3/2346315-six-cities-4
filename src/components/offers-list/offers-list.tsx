import { Offer } from '../../types/offer';
import OfferCard from '../card/card';

type OffersListProps = {
  offers: Offer[];
  listType: 'typical' | 'near';
  setActiveOfferId(id:number): void;
};

function OffersList({ offers, listType, setActiveOfferId }: OffersListProps) {
  const baseClass = 'places__list';
  const additionalClass = listType === 'typical' ? 'cities__places-list tabs__content' : 'near-places__list';

  return (
    <div className={`${additionalClass} ${baseClass}`}>
      {offers.map((offer) => (
        <OfferCard key={offer.id} offer={offer} cardType={listType} setActiveOfferId={setActiveOfferId}/>
      ))}
    </div>
  );
}

export default OffersList;
