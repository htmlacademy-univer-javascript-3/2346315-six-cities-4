import { ReviewType } from '../../mocks/reviews';
import Review from '../review/review';

type ListOfReviewsProps = {
  reviews: ReviewType[];
}

function ListOfReviews({reviews}: ListOfReviewsProps): JSX.Element {
  return (
    <ul className="reviews__list">
      {
        reviews.map((review) => <Review review={review} key={review.id}/>)
      }
    </ul>
  );
}

export default ListOfReviews;