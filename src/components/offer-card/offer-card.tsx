import { Link } from 'react-router-dom';
import { AppRoutes } from '../../const/const';
import { OfferPreview } from '../../types/offer-preview';
import { capitalize, getRatingWidth } from '../../utils/common';

type Blocks = 'cities' | 'favorites';

type ImageSize = 'small' | 'large';

type OfferProps = {
  offer: OfferPreview;
  block: Blocks;
  onCardHover?: (id: number | null) => void;
  size?: ImageSize;
};

const imageSize: Record<ImageSize, {width: string; height: string}> = {
  small: {width: '150', height: '110'},
  large:{ width: '260', height: '200'},
};


function OfferCard({offer, block, onCardHover, size = 'large'}: OfferProps): JSX.Element {
  const {id, previewImage, title, isFavorite, isPremium, rating, type, price} = offer;

  function handleMouseEnter() {
    onCardHover?.(id);
  }
  function handleMouseLeave() {
    onCardHover?.(null);
  }
  return(
    <article
      className={`${block}__card place-card`}
      onMouseEnter={() => handleMouseEnter}
      onMouseLeave={() => handleMouseLeave}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}

      <div className={`${block}__image-wrapper place-card__image-wrapper`}>
        <Link to={`${AppRoutes.Offer}/${id}`}>
          <img
            className="place-card__image"
            src={previewImage}
            {...imageSize[size]}
            alt={title}
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}&nbsp;</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button button ${isFavorite && 'place-card__bookmark-button--active'}`} type="button" onClick={() => ({/*при авторизации убирать кнопку, иначе направить на стр авторизации */})}>
            <svg className="place-card__bookmark-icon" width={18} height={19}>
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: getRatingWidth(rating)}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoutes.Offer}/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{ capitalize(type)}</p>
      </div>
    </article>

  );
}

export default OfferCard;
