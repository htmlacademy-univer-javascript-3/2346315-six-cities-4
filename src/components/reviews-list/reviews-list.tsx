import { Review } from '../../types/review.ts';
import OneReview from '../review/review.tsx';

type ReviewListProps = {
  reviews: Review[];
};

function ReviewsList({reviews}: ReviewListProps): JSX.Element {
  const sortedReviews = reviews.slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 10);
  return (
    <ul className="reviews__list">
      {sortedReviews.map((review) => (
        <OneReview key={review.id} review={review}/>
      ))}
    </ul>
  );
}

export default ReviewsList;
