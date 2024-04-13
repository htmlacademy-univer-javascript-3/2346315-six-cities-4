import { Link } from 'react-router-dom';
import { OfferType } from '../mocks/offers';
import { AppRoute } from '../routes';

type CardProps = {
    offer: OfferType;
    forFavoriteList: boolean;
    onMouseEnter: (title: string) => void;
  }
  
  function Card({offer, forFavoriteList, onMouseEnter}: CardProps): JSX.Element {
    const {id, title, type, price, rating, isPremium, isFavorite, previewImage} = offer;
    const handleItemHover = () => {
      onMouseEnter(title);
    };
    const handleItemNotHover = () => {
      onMouseEnter('');
    };
    return (
      <article onMouseOver={handleItemHover} onMouseOut={handleItemNotHover} className={forFavoriteList ? 'favorites__card place-card' : 'cities__card place-card'}>
        {
          isPremium &&
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
        }
        <div className={forFavoriteList ? 'favorites__image-wrapper place-card__image-wrapper' : 'cities__image-wrapper place-card__image-wrapper'}>
          <Link to={`${AppRoute.Offer}${id}`}>
            <img className="place-card__image" src={previewImage} width={forFavoriteList ? '150' : '260'} height={forFavoriteList ? '110' : '200'} alt="Place image"/>
          </Link>
        </div>
        <div className="favorites__card-info place-card__info">
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">&euro;{price}</b>
              <span className="place-card__price-text">&#47;&nbsp;night</span>
            </div>
            <button className={isFavorite ? 'place-card__bookmark-button place-card__bookmark-button--active button' : 'place-card__bookmark-button button'} type="button">
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">{isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
            </button>
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style={{width: `${(rating * 20).toString() }%`}}></span>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name">
            <Link to={`${AppRoute.Offer}${id}`}>{title}</Link>
          </h2>
          <p className="place-card__type">{type}</p>
        </div>
      </article>
    );
  }
  
  export default Card;