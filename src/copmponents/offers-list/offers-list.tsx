import Card from '../card';;
import { OfferType } from '../../mocks/offers';

type ListOfOffersProps = {
    offers: OfferType[];
    forFavoriteList: boolean;
    onListItemHover?: (listItemName: string) => void;
  }
  
  function ListOfOffers({offers, forFavoriteList, onListItemHover}: ListOfOffersProps): JSX.Element {
    const handleListItemHover = (title: string) => {
      if (onListItemHover) {
        onListItemHover(title);
      }
    };
    return (
      <div className={forFavoriteList ? 'favorites__places' : 'cities__places-list places__list tabs__content'}>
        {
          offers.map((offer, id) => <Card onMouseEnter={handleListItemHover} forFavoriteList={forFavoriteList} offer={offers[id]} key={offer.id}/>)
        }
      </div>
    );
  }
  
  export default ListOfOffers;