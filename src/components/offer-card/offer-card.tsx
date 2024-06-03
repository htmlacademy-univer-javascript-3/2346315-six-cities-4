import { Offer } from '../../types/offer';
import { Link } from 'react-router-dom';
import { CARD_WIDTH, CARD_HEIGHT, BOOKMARK_ICON_WIDTH, BOOKMARK_ICON_HEIGHT } from '../../constants/constants.ts';
import { getRating } from '../../utils';
import { useAppDispatch } from '../../hooks/index.ts';
import { setCurrentMarker } from '../../store/offers-slice/offers-slice.ts';

type OfferCardProps = {
  offer: Offer;
  cardType: 'typical' | 'near';
};

function OfferCard({offer, cardType}: OfferCardProps): JSX.Element {
  const {
    id,
    previewImage,
    title,
    isPremium,
    type,
    rating,
    price,
    isFavorite
  } = offer;

  const cardClass = cardType === 'typical' ? 'cities__card place-card' : 'near-places__card place-card';

  const dispatch = useAppDispatch();

  return (
    <div onMouseOver={() => dispatch(setCurrentMarker({id}))}
      onMouseLeave={() => dispatch(setCurrentMarker(null))}
    >
      <Link to={`/offer/${id}`} state={offer}>
        <article className={`${cardClass}`} onClick={() => window.scrollTo(0, 0)}>
          {isPremium && (
            <div className="place-card__mark">
              <span>Premium</span>
            </div>
          )}
          <div className="cities__image-wrapper place-card__image-wrapper">
            <img className="place-card__image" src={previewImage} width={CARD_WIDTH} height={CARD_HEIGHT}
              alt="Place image"
            />
          </div>
          <div className="place-card__info">
            <div className="place-card__price-wrapper">
              <div className="place-card__price">
                <b className="place-card__price-value">&euro;{price}</b>
                <span className="place-card__price-text">&#47;&nbsp;night</span>
              </div>
              <button
                className="place-card__bookmark-button place-card__bookmark-button--active button"
                type="button"
              >
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
              {title}
            </h2>
            <p className="place-card__type">{type}</p>
          </div>
        </article>
      </Link>
    </div>
  );
}

export default OfferCard;
