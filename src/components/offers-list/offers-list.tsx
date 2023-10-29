import { useState } from 'react';
import { OfferPreview } from '../../types/offer-preview';
import OfferCard from '../offer-card/offer-card';

type OffersListProps = {
  offers: OfferPreview[];
};
export function OffersList({offers}: OffersListProps): JSX.Element {
  const [, setActiveCard] = useState<OfferPreview['id'] | null>(null);

  function handleCardHover(id: OfferPreview['id'] | null) {
    setActiveCard(id);
  }

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
