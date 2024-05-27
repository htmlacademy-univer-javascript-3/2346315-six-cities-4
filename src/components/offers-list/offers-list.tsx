import { Offer } from '../../types/offer';
import { useAppSelector } from '../../hooks';
import { getSorting } from '../../utils.ts';

import OfferCard from '../offer-card/offer-card.tsx';

type OffersListProps = {
  offers: Offer[];
  listType: 'typical' | 'near';
};

function OffersList({ offers, listType }: OffersListProps) {
  const selectedSortType = useAppSelector((state) => state.sortType);
  const sortedOffers = getSorting(offers, selectedSortType);

  const baseClass = 'places__list';
  const listClassMapping = {
    typical: `${baseClass} cities__places-list tabs__content`,
    near: `${baseClass} near-places__list`
  };

  const listClass = listClassMapping[listType];

  return (
    <div className={`${listClass}`}>
      {sortedOffers.map((offer) => (
        <OfferCard key={offer.id} offer={offer} cardType={listType} />
      ))}
    </div>
  );
}

export default OffersList;