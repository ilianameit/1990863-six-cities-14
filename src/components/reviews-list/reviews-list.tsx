import { useAppSelector } from '../../hooks';
import { reviewsSelector } from '../../store/selectors';
import { OfferPreview } from '../../types/offer-preview';
import { checkAuthorizationStatus } from '../../utils/authorization-status/check-authorization-status';
import { ReviewForm } from '../review-from/review-form';
import { Review } from '../review/review';

type ReviewListProps = {
  idOffer: OfferPreview['id'];
}

export function ReviewsList({idOffer}: ReviewListProps): JSX.Element{
  const reviews = useAppSelector((state) => state.reviews);
  const reviewsToRender = reviewsSelector(reviews);

  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isLogged = checkAuthorizationStatus(authorizationStatus);
  return(
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {reviewsToRender.map((review) => (
          <Review key={review.id} review={review}/>
        ))}
      </ul>
      {isLogged && <ReviewForm idOffer={idOffer}/>}
    </section>
  );
}
