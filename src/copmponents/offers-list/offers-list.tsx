import Card from '../card';;
import { OfferType } from '../../mocks/offers';

type ListOfOffersProps = {
  offers: OfferType[];
  forFavoriteList: boolean;
}

function ListOfOffers({offers, forFavoriteList}: ListOfOffersProps): JSX.Element {
  return (
    <div className={forFavoriteList ? 'favorites__places' : 'cities__places-list places__list tabs__content'}>
      {
        offers.map((offer, id) => <Card forFavoriteList={forFavoriteList} offer={offers[id]} key={offer.id}/>)
      }
    </div>
  );
}

export default ListOfOffers;