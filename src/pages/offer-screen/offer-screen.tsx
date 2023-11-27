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
import { dropOffer } from '../../store/actions';
import { fetchNearOffersAction, fetchOfferAction, fetchReviewsAction } from '../../store/api-actions';
import LoadingScreen from '../loading-screen/loading-screen';

function OfferScreen(): JSX.Element {
  const {id} = useParams();
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector((state) => state.isOfferLoading);
  const offer = useAppSelector((state) => state.offer);
  const nearOffers = useAppSelector((state) => state.nearOffers);
  const nearOffersToRender = nearOffers.slice(0, MAX_NEAR_PLACES_COUNT);

  useEffect(() => {
    if(id) {
      dispatch(fetchOfferAction(id));
      dispatch(fetchNearOffersAction(id));
      dispatch(fetchReviewsAction(id));
    }
    return () => {
      dispatch(dropOffer());
    };
  }, [dispatch, id]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if(!offer) {
    return <NotFoundScreen />;
  }

  const {title, city: activeCity} = offer;
  const nearOffersForMap = nearOffersToRender.concat(offer);
  return(
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
            offers={nearOffersForMap}
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
