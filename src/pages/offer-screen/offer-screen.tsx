import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import { useParams } from 'react-router-dom';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import { OfferDetails } from '../../components/offer-details/offer-details';
import { Map } from '../../components/map/map';
import { MAX_NEAR_PLACES_COUNT } from '../../const/const';
import { OffersList } from '../../components/offers-list/offers-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import { dropOffer, fetchNearOffers, fetchOffer } from '../../store/actions';

function OfferScreen(): JSX.Element {
  const {id} = useParams();
  const dispatch = useAppDispatch();

  const offer = useAppSelector((state) => state.offer);
  const nearOffers = useAppSelector((state) => state.nearOffers);
  const nearOffersToRender = nearOffers.slice(0, MAX_NEAR_PLACES_COUNT);
  //не отрисовывает количество точек на карте

  useEffect(() => {
    if(id) {
      dispatch(fetchOffer(id));
      dispatch(fetchNearOffers(id));
    }
    return () => {
      dispatch(dropOffer());
    };
  }, [dispatch, id]);


  if(!offer) {
    return <NotFoundScreen />;
  }

  const activeCity = offer.city;

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
            offers={nearOffersToRender}
            selectedOffer={offer.id}
          />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OffersList block='near' offers={nearOffersToRender}/>
          </section>
        </div>
      </main>
    </div>
  );
}
export default OfferScreen;
