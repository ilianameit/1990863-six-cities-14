import { MAX_COMMENT_COUNT} from '../../const/const';
import { reviews } from '../../mocks/reviews';
import { ReviewForm } from '../review-from/review-form';
import { Review } from '../review/review';

export function ReviewsList(): JSX.Element{
  const reviewsToRender = [...reviews]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, MAX_COMMENT_COUNT);
  return(
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {reviewsToRender.map((review) => (
          <Review key={review.id} review={review}/>
        ))}
      </ul>
      {1 && <ReviewForm />}
    </section>
  );
}
