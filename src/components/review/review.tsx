import { Review } from '../../types/review';
import { getRating } from '../../utils';
import { AVATAR_WIDTH, AVATAR_HEIGHT } from '../constants/constants';

type ReviewProps = {
  review: Review;
};

function OneReview({review}: ReviewProps): JSX.Element {
  const {id, date, user, rating, comment} = review;
  const width: string = getRating(rating);
  return (
    <li className="reviews__item" key={id}>
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={user.avatar} width={AVATAR_WIDTH} height={AVATAR_HEIGHT}
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name"> {user.name} </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: width}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment}
        </p>
        <time className="reviews__time" dateTime={new Date(date).toISOString().split('T')[0]}>{new Date(date).toLocaleDateString()}</time>
      </div>
    </li>
  );
}

export default OneReview;