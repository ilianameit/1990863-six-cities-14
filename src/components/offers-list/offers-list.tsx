import { useState } from 'react';
import { OfferPreview } from '../../types/offer-preview';
import OfferCard from '../offer-card/offer-card';

type OffersListProps = {
  offers: OfferPreview[];
};
export function OffersList({offers}: OffersListProps): JSX.Element {
  const [, setActiveCard] = useState<number | null>(null);

  return(
    <div className="cities__places-list places__list tabs__content">
      {
        offers.map((offer) => (
          <OfferCard key={offer.id} offer={offer} block='cities' handleMouseEnter={(id) => setActiveCard(id)} /> // не уверена, что правильная концепция передачи параметра
        ))
      }
    </div>
  );
}
