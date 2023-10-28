import { COUNT_OFFER_IMAGES } from '../../const/const';
import { Image } from '../../types/offer';

type ImagesContainerProps = {
  images: Image[];
}

export function ImagesContainer({images}: ImagesContainerProps): JSX.Element {
  return(
    <div className="offer__gallery-container container">
      <div className="offer__gallery">
        {images.slice(0, COUNT_OFFER_IMAGES).map((image) => (
          <div key={image} className="offer__image-wrapper">
            <img className="offer__image" src={image} alt="Photo studio"/>
          </div>
        ))}
      </div>
    </div>
  );
}
