import { ChangeEvent, useState, FormEvent, Fragment } from 'react';
import { useAppDispatch } from '../../hooks';
import { sendCommentAction } from '../../store/api-actions.ts';

type CommentFromProps = {
  id: string;
};
type Rating = {
  rating: string;
  comment: string;
}
function CommentSubmissionForm({ id }: CommentFromProps) {
  const [formState, setFormState] = useState<Rating>({
    rating: '',
    comment: '',
  });
  const dispatch = useAppDispatch();

  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      comment: e.target.value,
    });
  };

  const handleRatingChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      rating: e.target.value,
    });
  };

  const isValid = () => formState.comment.trim().length >= 50 && formState.comment.trim().length <= 300 && formState.rating !== '';

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(
      sendCommentAction({
        id,
        comment: {
          comment: formState.comment,
          rating: Number(formState.rating),
        },
      })
    );

    setFormState({
      rating: '',
      comment: '',
    });
  };

  function getTitleForRating(rating: number): string {
    switch (rating) {
      case 5: return 'perfect';
      case 4: return 'good';
      case 3: return 'not bad';
      case 2: return 'badly';
      case 1: return 'terribly';
      default: return '';
    }
  }

  return (
    <form className="reviews__form form" onSubmit={handleFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {[5, 4, 3, 2, 1].map((rating) => (
          <Fragment key={rating}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={rating.toString()}
              id={`${rating}-stars`}
              type="radio"
              onChange={handleRatingChange}
              checked={formState.rating === rating.toString()}
            />
            <label htmlFor={`${rating}-stars`} className="reviews__rating-label form__rating-label" title={getTitleForRating(rating)}>
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        value={formState.comment}
        onChange={handleCommentChange}
        placeholder="Tell how was your stay, what you like and what can be improved"
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay with at least{' '}
          <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!isValid()}>Submit</button>
      </div>
    </form>
  );
}
export default CommentSubmissionForm;
