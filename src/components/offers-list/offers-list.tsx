import { OfferPreview } from '../../types/offer-preview';
import OfferCard from '../offer-card/offer-card';

type OffersListProps = {
  offers: OfferPreview[];
  handleCardHover?: (offer: OfferPreview| null) => void;
};
export function OffersList({offers, handleCardHover}: OffersListProps): JSX.Element {
  return(
    <div className="cities__places-list places__list tabs__content">
      {
        offers.map((offer) => (
          <OfferCard key={offer.id} offer={offer} block='cities' onCardHover={handleCardHover} />
        ))
      }
    </div>
  );
}
