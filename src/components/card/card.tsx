import { Offer } from '../../types/offer';
import { Link } from 'react-router-dom';
import { CARD_WIDTH, CARD_HEIGHT, BOOKMARK_ICON_WIDTH, BOOKMARK_ICON_HEIGHT } from '../constants/constants';
import { getRating } from '../../utils';


type OfferCardProps = {
  offer: Offer;
  cardType: 'typical' | 'near';
  setActiveOfferId(id:number): void;
};

function OfferCard({offer, cardType, setActiveOfferId}: OfferCardProps): JSX.Element {
  const {
    id, image, title, /*description,*/ isPremium, type, rating, /*bedrooms,*/ price, /*owner,*/ isFavorite
  } = offer;

  const cardClass = cardType === 'typical' ? 'cities__card place-card' : 'near-places__card place-card';

  const handleMouseEnter = () => {
    if (setActiveOfferId) {
      setActiveOfferId(id);
    }
  };

  const handleMouseLeave = () => {
    if (setActiveOfferId) {
      setActiveOfferId(0);
    }
  };

  return (
    <Link to={`/offer/${id}`} state={offer}>
      <article className={`${cardClass}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {isPremium && (
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
        )}
        <div className="cities__image-wrapper place-card__image-wrapper">
          <a href="#">
            <img className="place-card__image" src={image} width={CARD_WIDTH} height={CARD_HEIGHT} alt="Place image" />
          </a>
        </div>
        <div className="place-card__info">
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">&euro;{price}</b>
              <span className="place-card__price-text">&#47;&nbsp;night</span>
            </div>
            <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
              <svg className="place-card__bookmark-icon" width={BOOKMARK_ICON_WIDTH} height={BOOKMARK_ICON_HEIGHT}>
                {isFavorite && <use xlinkHref="#icon-bookmark"></use>}
              </svg>
              <span className="visually-hidden">In bookmarks</span>
            </button>
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style={{width: getRating(rating)}}></span>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name">
            <Link to={`/offer/${id}`} state={offer}>{title}</Link>
          </h2>
          <p className="place-card__type">{type}</p>
        </div>
      </article>
    </Link>
  );
}

export default OfferCard;
