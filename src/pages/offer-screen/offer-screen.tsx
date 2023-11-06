import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import { Offer } from '../../types/offer';
import { useParams } from 'react-router-dom';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import { OfferDetails } from '../../components/offer-details/offer-details';
import { Map } from '../../components/map/map';
import { MAX_NEAR_PLACES_COUNT } from '../../const/const';
import { OffersList } from '../../components/offers-list/offers-list';

type OfferScreenProps = {
  offers: Offer[];
};
function OfferScreen({offers}: OfferScreenProps): JSX.Element {
  const {id} = useParams();
  const offer = offers.find((item) => item.id === Number(id));

  if(!offer) {
    return <NotFoundScreen />;
  }

  const activeCity = offer?.city;

  const nearOffers = offers.filter((item) => (
    item.id !== Number(id) && item.city.name === activeCity.name
  )).slice(0, MAX_NEAR_PLACES_COUNT);
  const {title} = offer;

  return(
    //header авторизован/неавторизован
    <div className="page">
      <Helmet>
        <title>6 cities: {title}</title>
      </Helmet>

      <Header />

      <main className="page__main page__main--offer">
        <section className="offer">
          <OfferDetails offer={offer}/>
          <Map
            block='offer'
            city={activeCity}
            offers={nearOffers}
            selectedOffer={offer}
          />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OffersList block='near' offers={nearOffers}/>
          </section>
        </div>
      </main>
    </div>
  );
}
export default OfferScreen;
