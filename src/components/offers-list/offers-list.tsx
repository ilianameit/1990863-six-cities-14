import classNames from 'classnames';
import { OfferPreview } from '../../types/offer-preview';
import OfferCard from '../offer-card/offer-card';
import { Blocks } from '../../types/blocks';

type OffersListProps = {
  block: Blocks;
  offers: OfferPreview[];
  onCardHover?: (offer: OfferPreview['id']| null) => void;
};
export function OffersList({block, offers, onCardHover}: OffersListProps): JSX.Element {
  return(
    <div className={classNames(
      'places__list',
      {
        'tabs__content cities__places-list': block === 'cities',
        'near-places__list': block === 'near'
      }
    )}
    >
      {
        offers.map((offer) => (
          <OfferCard key={offer.id} offer={offer} block={block} onCardHover={() => onCardHover?.(offer.id)} />
        ))
      }
    </div>
  );
}
