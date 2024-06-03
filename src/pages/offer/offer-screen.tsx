import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/index.ts';
import { useEffect } from 'react';
import { fetchOfferDataAction } from '../../store/api-actions.ts';
import { getRating } from '../../utils.ts';

import ReviewsList from '../../components/reviews-list/reviews-list.tsx';
import CommentSubmissionForm from '../../components/comment-submission-form/comment-submission-form.tsx';
import Map from '../../components/map/map.tsx';
import OffersList from '../../components/offers-list/offers-list.tsx';
import Header from '../../components/header/header.tsx';

import { Offer } from '../../types/offer.ts';
import { Points } from '../../types/points.ts';
import { AuthorizationStatus } from '../../components/constants/constants.ts';

type OfferScreenProps = {
  favorites: Offer[];
}

function OfferScreen({favorites}: OfferScreenProps): JSX.Element {
  const { id } = useParams<{ id: string }>();

  const user = useAppSelector((state) => state.authorizationStatus);

  const { selectedOffer, nearbyOffers, reviews } = useAppSelector(({ currentOffer }) => ({
    selectedOffer: currentOffer.offerInfo,
    nearbyOffers: currentOffer.nearestOffers,
    reviews: currentOffer.reviews,
  }));

  const points: Points[] = nearbyOffers.map((offer) => ({
    id: offer.id,
    location: offer.location,
  }));

  const mapPoints: Points[] = selectedOffer
    ? [...points.slice(0, 3), { id: selectedOffer.id, location: selectedOffer.location }]
    : points.slice(0, 3);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchOfferDataAction({ id }));
    }
  }, [dispatch, id]);

  if (!selectedOffer) {
    return <div className="container">Loading...</div>;
  }

  return(
    <div className="page">
      <Header favorites={favorites}/>
      <main className="page__main page__main--offer">
        <section className="offer" />
        <div className="offer__gallery-container container">
          <div className="offer__gallery">
            {selectedOffer.images.map((url) => (
              <div className="offer__image-wrapper" key={url}>
                <img className="offer__image" src={url} alt="Photo studio" />
              </div>
            ))}
          </div>
        </div>
        <div className="offer__container container">
          <div className="offer__wrapper">
            <div className="offer__mark">
              {selectedOffer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
            </div>
            <div className="offer__name-wrapper">
              <h1 className="offer__name">{selectedOffer.title}</h1>
              <button className="offer__bookmark-button button" type="button">
                <svg className="offer__bookmark-icon" width="31" height="33">
                  <use xlinkHref="#icon-bookmark"></use>
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            </div>
            <div className="offer__rating rating">
              <div className="offer__stars rating__stars">
                <span style={{ width: `${getRating(selectedOffer.rating)}` }} />
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="offer__rating-value rating__value">{selectedOffer.rating}</span>
            </div>
            <ul className="offer__features">
              <li className="offer__feature offer__feature--entire">{selectedOffer.type}</li>
              <li className="offer__feature offer__feature--bedrooms">{`${selectedOffer.bedrooms} Bedrooms`}</li>
              <li className="offer__feature offer__feature--adults">{`Max ${selectedOffer.maxAdults} adults`}</li>
            </ul>
            <div className="offer__price">
              <b className="offer__price-value">&euro;{selectedOffer.price}</b>
              <span className="offer__price-text">&nbsp;night</span>
            </div>
            <div className="offer__inside">
              <h2 className="offer__inside-title">What&apos;s inside</h2>
              <ul className="offer__inside-list">
                {selectedOffer.goods.map((item) => (
                  <li className="offer__inside-item" key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="offer__host">
              <h2 className="offer__host-title">Meet the host</h2>
              <div className="offer__host-user user">
                <div className={`offer__avatar-wrapper ${selectedOffer.host.isPro ? 'offer__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>
                  <img className="offer__avatar user__avatar" src={selectedOffer.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                </div>
                <span className="offer__user-name">{selectedOffer.host.name}</span>
                {selectedOffer.host.isPro && <span className="offer__user-status">Pro</span>}
              </div>
              <div className="offer__description">
                <p className="offer__text">{selectedOffer.description}</p>
              </div>
            </div>
            <section className="offer__reviews reviews">
              <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
              <ReviewsList reviews={reviews}/>
              {user === AuthorizationStatus.Auth && <CommentSubmissionForm id={id!} />}
            </section>
          </div>
        </div>
        <section className="offer__map map">
          <Map city={selectedOffer.city} points={mapPoints} specialCaseId={selectedOffer.id} isMainPage={false} />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OffersList offers={nearbyOffers.slice(0, 3)} listType="near" />
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferScreen;
